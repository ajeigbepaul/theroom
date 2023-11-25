import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { removeItem } from "../../utils/asyncStorage";
import * as Animatable from "react-native-animatable";
import { useFormik } from "formik";
import * as Yup from "yup";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";
// import { FIREBASE_AUTH } from "../../firebaseConfig";
// import { onAuthStateChanged, signInWithEmailAndPassword, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";

const LoginScreen = () => {
  const navigation = useNavigation();
//   const auth = FIREBASE_AUTH;
//   let googleProvider = new GoogleAuthProvider()
  const clearOnboarding = async () => {
    try {
      removeItem("onboarded");
      navigation.navigate("OnboardingScreen");
    } catch (error) {
      console.log("Error @clearOnboarding: ", error);
    }
  };
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       console.log("Auth state chaged", user);
//       if (user) {
//         navigation.replace("Home");
//       }
//     });
//     return unsubscribe;
//   }, []);
  const register = () => {
    navigation.navigate("Register");
  };
//   const loginUser = async (values) => {
//     const { email, password } = values;
//     try {
//       const response = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//       alert("login failed: " + error.message);
//     }
//     console.log("this are the values here now for email", values.email);
//   };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => loginUser(values),
  });
  return (
    <KeyboardAvoidingContainer>
      <View className="flex-1 items-center justify-center">
        <View className="w-[50%] bg-green-100 h-40 mt-10">
          <Animatable.Image
            source={require("../../assets/loginn.gif")}
            animation="slideInUp"
            iterationCount={1}
            className="w-[100%] h-[100%] object-contain"
          />
        </View>
        <View className="flex items-center my-4">
          <Text className="text-xl font-semibold">Login to OpexRoom</Text>
          <Text className="text-gray-500">
            Strictly for Opex consultanting staff
          </Text>
        </View>
        <View className=" w-full p-4">
          <View className="flex-row space-x-2 border-b border-gray-100 py-2 flex items-center">
            <Icon name="at" type="font-awesome" color="gray" />
            <TextInput
              id="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              className="flex-1"
              keyboardType="email-address"
            />
            {formik.touched.email && formik.errors.email ? (
              <Text className="text-xs text-red-300 text-center">
                {formik.errors.email}
              </Text>
            ) : null}
          </View>
          <View className="flex-row space-x-2 border-b border-gray-100 py-2 flex items-center">
            <Icon name="lock-closed-outline" type="ionicon" color="gray" />
            <TextInput
              id="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              secureTextEntry={true}
              className="flex-1"
            />
            {formik.touched.password && formik.errors.password ? (
              <Text className="text-xs text-red-300 text-center">
                {formik.errors.password}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            onPress={formik.handleSubmit}
            className="mt-5 bg-blue-400 p-3 rounded-lg"
          >
            <Text className="text-center font-semibold text-blue-100 text-lg">
              Login
            </Text>
          </TouchableOpacity>
          <View className="w-full">
            {/* <Text className="text-center py-5 text-lg text-gray-400 font-semibold">Or</Text> */}
          </View>

          <TouchableOpacity
            className=" rounded-lg  flex flex-row items-center justify-center space-x-2 bg-orange-200 mt-3 p-2"
          >
            <Icon name="google" type="font-awesome" color="red" />
            <Text className="text-center font-semibold text-white text-lg">
              Google
            </Text>
          </TouchableOpacity>
          <View className="flex-row space-x-2 justify-center mt-4">
            <Text className="text-gray-500">New to the app?</Text>
            <TouchableOpacity onPress={register}>
              <Text className="font-semibold text-sm text-orange-300">
                Register
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={clearOnboarding}>
            <Text className="font-semibold text-sm text-orange-700">Reset</Text>
          </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </KeyboardAvoidingContainer>
  );
};

export default LoginScreen;
