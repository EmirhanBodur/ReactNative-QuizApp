import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState("");

  const startQuiz = () => {
    navigation.navigate("Quiz", { userName });
  };

  const result = () => {
    navigation.navigate("Result");
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#4E6B5C] relative">
      <View className="w-3/4 items-center">
        <View
          className="mb-20 items-center"
          style={{
            width: 160,
            height: 160,
          }}
        >
          <View className="bg-white rounded-full p-6 items-center justify-center w-48 h-48">
            <Text className="text-4xl font-bold text-[#004d40]">QUIZ</Text>
            <Text className="text-2xl text-[#FFC107]">Native</Text>
          </View>
        </View>

        <TextInput
          placeholderTextColor="#EEEFF2"
          placeholder="Adınızı ve nickname giriniz"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          className="w-full px-4 py-2 mb-40 border text-[#EEEFF2] border-[#EEEFF2] rounded-lg"
        />
      </View>
      <TouchableOpacity
        className="absolute bottom-20 left-4 right-4 mb-16 px-4 py-3 bg-[#FFC107] rounded-2xl"
        onPress={startQuiz}
        disabled={!userName}
      >
        <Text className="text-center text-lg font-bold text-white">Başla</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="absolute bottom-0 left-4 right-4 mb-16 px-4 py-3 bg-[#FFC107] rounded-2xl"
        onPress={result}
      >
        <Text className="text-center text-lg font-bold text-white">
          Puanlar
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
