import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import QuizScreen from "./src/Quiz";
import ResultScreen from "./src/QuizResult";
import HomeScreen from "./src/HomeScreen";

const Stack = createStackNavigator();

function App() {
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleQuizFinish = (finalScore) => {
    setScore(finalScore);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home" // Ekran adı Home olarak değiştirildi
          component={HomeScreen} // HomeScreen eklendi
        />

        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          initialParams={{ setQuizFinished: handleQuizFinish }}
        />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
