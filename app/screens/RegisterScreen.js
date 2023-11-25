import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
  } from "react-native";
  import React from "react";
  import { Icon } from "@rneui/base";
  import { useNavigation } from "@react-navigation/native";
  import { removeItem } from "../../utils/asyncStorage";
  import * as Animatable from "react-native-animatable";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";
//   import { FIREBASE_AUTH, FIREBASE_STORAGE, FIRESTORE_DB } from "../../firebase";
//   import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
//   import {
//     doc,
//     setDoc,
//     addDoc,
//     collection,
//     onSnapshot,
//   } from "firebase/firestore";
//   import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
  import useImage from "../../hook/useImage";
  import { useState } from "react";
//   import UploadScreen from "./UploadScreen";
  import ActivityIndicator from "../components/ActivityIndicator";
  
  const RegisterScreen = () => {
    const navigation = useNavigation();
    const { handlePress, newImg } = useImage();
    const [progress, setProgress] = useState(0);
    const [uploadedimg, setUploadedimg] = useState("")
    const [visibleUpload, setVisibleUpload] = useState(false);
    const [loading, setLoading] = useState(false)
    // console.log(newImg);
    // const auth = FIREBASE_AUTH;
    const clearOnboarding = async () => {
      try {
        removeItem("onboarded");
        navigation.navigate("OnboardingScreen");
      } catch (error) {
        console.log("Error @clearOnboarding: ", error);
      }
    };
    const login = () => {
      navigation.navigate("LoginScreen");
    };
    const uploadImage = async (newImg, fileType) => {
      const response = await fetch(newImg);
      const blob = await response.blob();
    //   const storageRef = ref(
    //     FIREBASE_STORAGE,
    //     "Profileimage/" + new Date().getTime()
    //   );
    //   const uploadimage = uploadBytesResumable(storageRef, blob);
    //   uploadimage.on(
    //     "state_changed",
    //     (snapshot) => {
    //       const progress =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       console.log("upload is" + progress + "% done");
    //       setProgress(progress);
    //     },
    //     () => {},
    //     () => {
    //       getDownloadURL(uploadimage.snapshot.ref).then(async (downloadurl) => {
    //         console.log("downloadURL here", downloadurl);
    //         setUploadedimg(downloadurl)
    //       });
    //     }
    //   );
    };
    const registerUser = async (value) => {
      console.log("this should show uploadedimg,", uploadedimg);
      setLoading(true);
    //   const { email, password, fullname } = value;
    //   try {
    //     const user = await createUserWithEmailAndPassword(
    //       FIREBASE_AUTH,
    //       email,
    //       password
    //     );
    //     const userCred = user.user;
    //     await updateProfile(userCred, {
    //       displayName: fullname,
    //       photoURL: newImg,
    //     });
    //     await uploadImage(newImg, "image");
    //     userInformation(user, value);
    //     console.log("User created successfully", user);
    //     setLoading(false);
    //   } catch (error) {
    //     console.log(error);
    //     alert("signUp failed: " + error.message);
    //   }
    };
    
    // const userInformation = async (user, value) => {
    //   const { email, fullname, department, role, phone } = value;
    //   try {
    //     const docRef = await setDoc(doc(FIRESTORE_DB, `users/${user.user.uid}`), {
    //       fullname,
    //       email,
    //       department,
    //       role,
    //       phone,
         
    //     });
    //   } catch (error) {
    //     console.log("There was an error", error);
    //   }
    // };
  
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
        department: "",
        role: "",
        fullname: "",
        phone: "",
      },
      validationSchema: Yup.object({
        fullname: Yup.string()
          .min(6, "Must be 6 characters or more")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(6, "Must be 6 characters or more")
          .required("Required"),
        department: Yup.string().required("Required"),
        role: Yup.string().required("Required"),
        phone: Yup.string().required("Required").max(11, "More than 11 numbers"),
      }),
      onSubmit: (values) => registerUser(values),
    });
    return (
      <KeyboardAvoidingContainer>
        <View className="flex-1 items-center justify-center bg-white">
          {/* <UploadScreen progress={progress} visible={visibleUpload} /> */}
          {loading && <ActivityIndicator visible={true} />}
          <View className="w-[50%] bg-orange-100 h-40 mt-5">
            <Animatable.Image
              source={require("../../assets/loginn.gif")}
              animation="slideInUp"
              iterationCount={1}
              className="w-[100%] h-[100%] object-contain"
            />
          </View>
          <View className="flex items-center my-4">
            <Text className="text-xl font-semibold">Sign up with OpexRoom</Text>
            <Text className="text-gray-500">
              Strictly for Opex consultanting staff
            </Text>
          </View>
  
          <View className=" w-full p-4">
            <TouchableWithoutFeedback onPress={handlePress}>
              <View className="flex-column">
                <View className="w-10 h-10 rounded-lg mt-2 overflow-hidden flex items-center justify-center bg-gray-200">
                  {!newImg && (
                    <View>
                      <Icon name="camera" type="font-awesome" size={24} />
                    </View>
                  )}
                  {newImg && (
                    <Image source={{ uri: newImg }} className="w-full h-full" />
                  )}
                </View>
                <Text className="text-gray-400">Profile Image</Text>
              </View>
            </TouchableWithoutFeedback>
            <View className="flex-row space-x-2 border-b border-gray-100 py-2 flex items-center">
              <Icon name="user" type="font-awesome" color="gray" />
              <TextInput
                id="fullname"
                name="fullname"
                placeholder="Fullname"
                value={formik.values.fullname}
                onChangeText={formik.handleChange("fullname")}
                onBlur={formik.handleBlur("fullname")}
                className="flex-1"
              />
              {formik.touched.fullname && formik.errors.fullname ? (
                <Text className="text-xs text-red-300 text-center">
                  {formik.errors.fullname}
                </Text>
              ) : null}
            </View>
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
            <View className="flex-row space-x-2 border-b border-gray-100 py-2 flex items-center">
              <Icon name="users" type="font-awesome" color="gray" />
              <TextInput
                id="department"
                name="department"
                placeholder="Department"
                value={formik.values.department}
                onChangeText={formik.handleChange("department")}
                onBlur={formik.handleBlur("department")}
                className="flex-1"
              />
              {formik.touched.department && formik.errors.department ? (
                <Text className="text-xs text-red-300 text-center">
                  {formik.errors.department}
                </Text>
              ) : null}
            </View>
            <View className="flex-row space-x-2 border-b border-gray-100 py-2 flex items-center">
              <Icon name="folder-outline" type="ionicon" color="gray" />
              <TextInput
                id="role"
                name="role"
                placeholder="Role"
                value={formik.values.role}
                onChangeText={formik.handleChange("role")}
                onBlur={formik.handleBlur("role")}
                className="flex-1"
              />
              {formik.touched.role && formik.errors.role ? (
                <Text className="text-xs text-red-300 text-center">
                  {formik.errors.role}
                </Text>
              ) : null}
            </View>
            <View className="flex-row space-x-2 border-b border-gray-100 py-2 flex items-center">
              <Icon name="phone" type="font-awesome" color="gray" />
              <TextInput
                id="phone"
                name="phone"
                placeholder="Phone number"
                value={formik.values.phone}
                onChangeText={formik.handleChange("phone")}
                onBlur={formik.handleBlur("phone")}
                className="flex-1"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <Text className="text-xs text-red-300 text-center">
                  {formik.errors.phone}
                </Text>
              ) : null}
            </View>
  
            <TouchableOpacity
              onPress={formik.handleSubmit}
              className="mt-5 bg-blue-400 p-3 rounded-lg"
            >
              <Text className="text-center font-semibold text-blue-100 text-lg">
                Register
              </Text>
            </TouchableOpacity>
            <View className="w-full">
              {/* <Text className="text-center py-5 text-lg text-gray-400 font-semibold">Or</Text> */}
            </View>
  
            <TouchableOpacity
              onPress={formik.handleSubmit}
              className=" rounded-lg  flex flex-row items-center justify-center space-x-2 bg-orange-200 mt-3 p-2"
            >
              <Icon name="google" type="font-awesome" color="red" />
              <Text className="text-center font-semibold text-white text-lg">
                Google
              </Text>
            </TouchableOpacity>
            <View className="flex-row space-x-2 justify-center mt-4">
              <Text className="text-gray-500">Do have an account?</Text>
              <TouchableOpacity onPress={login}>
                <Text className="font-semibold text-sm text-orange-300">
                  Login
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
  
  export default RegisterScreen;
  