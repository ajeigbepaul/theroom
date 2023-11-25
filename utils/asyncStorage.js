import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Error storing value @setItem", error);
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key); // Store the retrieved value in a variable
    return value;
  } catch (error) {
    console.log("Error retrieving item @getItem", error);
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing item @removeItem", error);
  }
};
