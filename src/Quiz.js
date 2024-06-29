import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import data from "./data";
import { SafeAreaView } from "react-native-safe-area-context";
import { Circle } from "react-native-progress";

import { db, ref, push, set } from "./firebase";
import { StatusBar } from "expo-status-bar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const durationInSeconds = 10; // Her bir soru için süre saniye cinsinden

export default function Quiz({ navigation, route }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(data.length).fill(null)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [progress, setProgress] = useState(1); // Başlangıçta tam dolu olan daire
  const [timerRunning, setTimerRunning] = useState(false); // Zamanlayıcının çalışıp çalışmadığını takip etmek için

  const { userName } = route.params;

  useEffect(() => {
    setQuestions(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Soru geldiğinde zamanlayıcıyı başlat
    startTimer();
  }, [currentQuestionIndex]); // currentQuestionIndex değiştiğinde yeniden başlat

  useEffect(() => {
    if (timerRunning) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress - 1 / (durationInSeconds * 10);
          if (newProgress <= 0) {
            clearInterval(interval);
            setTimerRunning(false); // Zamanlayıcıyı durdur
            goToNextQuestion(); // Zaman dolduğunda bir sonraki soruya geç
            return 0;
          }
          return newProgress;
        });
      }, 100); // Her saniye güncelle

      return () => clearInterval(interval);
    }
  }, [timerRunning]);

  const startTimer = () => {
    setProgress(1); // İlerleme çemberini sıfırla
    setTimerRunning(true); // Zamanlayıcıyı başlat
  };

  const goToNextQuestion = () => {
    setShowCorrectAnswer(false);
    setSelectedOptions((prevSelectedOptions) => {
      const updatedSelectedOptions = [...prevSelectedOptions];
      updatedSelectedOptions[currentQuestionIndex] = null;
      return updatedSelectedOptions;
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const checkAnswer = (index) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (index === currentQuestion.answer) {
      setScore(score + 10);
      setShowCorrectAnswer(true);
    }

    setSelectedOptions((prevSelectedOptions) => {
      const updatedSelectedOptions = [...prevSelectedOptions];
      updatedSelectedOptions[currentQuestionIndex] = index;
      return updatedSelectedOptions;
    });

    if (currentQuestionIndex === questions.length - 1) {
      setTimeout(() => {
        setQuizFinished(true);
      }, 3000);
    } else {
      setTimeout(goToNextQuestion, 3000);
    }
  };

  const saveQuizResultToFirebase = async () => {
    const quizResultRef = ref(db, "quizResults");
    const newQuizResultRef = push(quizResultRef);

    const quizResultData = {
      userName: userName,
      score: score,
    };

    try {
      await set(newQuizResultRef, quizResultData);
      navigation.navigate("Result", { userName, score });
    } catch (error) {
      console.error(
        "Firebase Realtime Database'ye quiz sonucu yazılırken hata oluştu:",
        error
      );
      // Hata durumunda gerekiyorsa hata işlemleri yapılabilir
    }
  };

  useEffect(() => {
    const saveAndNavigate = async () => {
      if (quizFinished) {
        await saveQuizResultToFirebase();
      }
    };

    saveAndNavigate();
  }, [quizFinished]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ccc",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const circleSize = 90;
  const borderWidth = 1;
  return (
    <SafeAreaView className="flex-1 bg-[#EFF0F3] ">
      <ScrollView>
        <View className="relative justify-center mt-20 items-center ">
          <View className="absolute bottom-48 z-20 items-center">
            <Circle
              progress={progress}
              size={circleSize}
              borderWidth={borderWidth}
              color="#ABD1C6"
              unfilledColor="#004643"
              thickness={12}
              showsText
              textStyle={{ color: "black", fontSize: 28, fontWeight: 48 }}
              formatText={() => `${Math.ceil(progress * durationInSeconds)}`}
            />
          </View>
          <View className="flex-1 justify-center items-center">
            <View className="w-96 max-w-lg min-h-[220px] rounded-xl bg-white border border-black justify-center items-center">
              <Text className="font-bold text-center text-xl m-1 p-6">
                {currentQuestion && currentQuestion.question}
              </Text>
            </View>
          </View>
        </View>

        <View
          className="mt-4 w-full justify-center items-center"
          style={{
            flexDirection: "column",
          }}
        >
          {currentQuestion &&
            currentQuestion.choices &&
            currentQuestion.choices.map((choice, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor:
                    showCorrectAnswer && index === currentQuestion.answer
                      ? "green"
                      : selectedOptions[currentQuestionIndex] === index
                      ? "red"
                      : "white",
                  borderRadius: 10,
                  padding: windowHeight * 0.03, // Yüksekliğe göre padding
                  marginBottom: windowHeight * 0.02, // Yüksekliğe göre marginBottom
                  borderWidth: 1,
                  borderColor: "#4E6B5C",
                  width: windowWidth * 0.9, // Genişliğe göre width
                  margin: windowWidth * 0.02, // Genişliğe göre margin
                }}
                onPress={() => checkAnswer(index)}
                disabled={selectedOptions[currentQuestionIndex] !== null}
              >
                <Text
                  style={{
                    color:
                      selectedOptions[currentQuestionIndex] === index
                        ? "white"
                        : "black",
                    textAlign: "center",
                  }}
                >
                  {choice}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
