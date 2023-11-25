import React from 'react'
import LottieView from 'lottie-react-native'
const ActivityIndicator = ({visible})=> {
   if(!visible) return null
    return (
        <LottieView autoPlay loop source={require('../../assets/animation/loading.json')} className="bg-blue-200 z-50"/>
    )
 
}
export default ActivityIndicator
