import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import Screen from './Screen';
const KeyboardAvoidingContainer = ({children}) => {
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
    ><Screen>

      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </Screen>
    </KeyboardAvoidingView>
  );
}

export default KeyboardAvoidingContainer