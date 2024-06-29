import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { db, ref, onValue, off } from "./firebase"; // Firebase işlemleri
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ResultScreen() {
  const [firstPlace, setFirstPlace] = useState(null);
  const [secondPlace, setSecondPlace] = useState(null);
  const [thirdPlace, setThirdPlace] = useState(null);
  const [otherResult, setOtherResult] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const quizResultRef = ref(db, "quizResults");

    const fetchData = onValue(quizResultRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Fetched data:", data); // Veriyi konsola logla
      if (data) {
        // Skorları büyükten küçüğe sıralama işlemi
        const sortedResults = Object.keys(data)
          .map((key) => ({ id: key, ...data[key] })) // Veriyi nesne haline getirme
          .sort((a, b) => b.score - a.score); // Skorlara göre büyükten küçüğe sıralama

        // Sıralanmış sonuçlardan ilk üçünü state'e kaydetme
        setFirstPlace(sortedResults[0] || null);
        setSecondPlace(sortedResults[1] || null);
        setThirdPlace(sortedResults[2] || null);

        // Diğer skorları ayırma
        setOtherResult(sortedResults.slice(3));
      } else {
        setFirstPlace(null);
        setSecondPlace(null);
        setThirdPlace(null);
        setOtherResult([]);
      }
    });

    // Temizleme fonksiyonu: listener'ı kaldır
    return () => {
      off(quizResultRef, "value", fetchData); // listener'ı kapat
    };
  }, []);

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EFF0F3]">
      <StatusBar hidden={false} />
      <View className="flex-1 ">
        <View
          style={{
            flex: 1,
            minHeight: 400, // Example height
            backgroundColor: "rgba(0, 70, 67, 0.54)",
            marginBottom: 12,
            paddingTop: 20, // Top padding
            position: "relative", // For the main container
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: "27%",
              transform: [{ translateX: -120 }],
              marginTop: -10,
              height: 60,
              width: 447,
              backgroundColor: "#EFF0F3",
              borderTopLeftRadius: 240,
              borderTopRightRadius: 340,
            }}
          />
          <View className="flex-row items-center justify-between px-4">
            <TouchableOpacity onPress={handleGoBack}>
              <AntDesign name="left" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold">Skorlar</Text>
            <View className="w-6" />
            {/* Boşluk bırakmak için bir view ekliyoruz */}
          </View>
          <View className="flex-row mt-16 justify-around">
            {secondPlace && (
              <View className="items-center">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  className="w-20 h-20 rounded-full border-4 border-gray-200"
                />
                <Text className="text-center text-lg text-white mt-2">
                  {secondPlace.userName}
                </Text>
                <Text className="text-center text-base text-white text-gray-500">
                  {secondPlace.score}
                </Text>
              </View>
            )}
            {firstPlace && (
              <View className="items-center">
                <View className="w-24 h-24 rounded-full border-4 border-yellow-500 items-center justify-center">
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    }}
                    className="w-20 h-20 rounded-full"
                  />
                  <Text className="absolute bottom-0 w-full text-center text-yellow-500">
                    👑
                  </Text>
                </View>
                <Text className="text-center text-lg text-white mt-2">
                  {firstPlace.userName}
                </Text>
                <Text className="text-center text-base text-white text-gray-500">
                  {firstPlace.score}
                </Text>
              </View>
            )}
            {thirdPlace && (
              <View className="items-center">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  className="w-20 h-20 rounded-full border-4 border-gray-200"
                />
                <Text className="text-center text-lg text-white mt-2">
                  {thirdPlace.userName}
                </Text>
                <Text className="text-center text-base text-white text-gray-500">
                  {thirdPlace.score}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View className=" h-full min-w-full p-4">
          <ScrollView className="flex-1  p-2">
            {otherResult.map((item, index) => (
              <View
                key={item.id}
                className="flex-row items-center  p-4 mb-5 bg-white rounded-2xl"
              >
                <Text className="text-lg w-10">{index + 4}</Text>
                <View className="flex-row items-center flex-1 ">
                  <View className="flex-row items-center">
                    <Image
                      source={{
                        uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      }}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <Text className="text-lg">{item.userName}</Text>
                  </View>
                </View>
                <Text className="text-lg w-16 text-right">{item.score}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
