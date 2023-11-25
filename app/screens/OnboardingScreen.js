import { Image } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { setItem } from "../../utils/asyncStorage";

const OnbordingScreen = ({ navigation }) => {
  //   const navigation = useNavigation()
  const lastDone = async () => {
    try {
      navigation.navigate("LoginScreen");
      setItem("onboarded", "1");
    } catch (error) {
      console.log("Error @setItem :", error);
    }
  };
  return (
    <Onboarding
      onDone={lastDone}
      onSkip={() => navigation.navigate("LoginScreen")}
      pages={[
        {
          backgroundColor: "white",
          image: (
            <Image
              source={require("../../assets/onboard2.jpg") }
              width={300}
              height={300}
              className="w-4/5 h-[65%]"
            />
          ),
          title: "Welcome",
          subtitle: "Welcome To Opex Room",
        //   titleStyles: { fontSize:'700' },
        },
        {
          backgroundColor: "orange",
          image: <Image source={require("../../assets/onboarding-img2.png")} width={300}
          height={300} />,
          title: "Seamless Chats with colleagues",
          subtitle: "Enjoy your discussion without worries",
        },
        {
          backgroundColor: "#fd3b93",
          image: <Image source={require("../../assets/onboarding-img3.png")} width={300}
          height={300} />,
          title: "Satisfied",
          subtitle: "Your satisfaction is our desire",
        },
      ]}
    />
  );
};

export default OnbordingScreen;
