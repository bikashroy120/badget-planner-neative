import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CategoryList = ({category}) => {
  return (
    <View className=" p-5">
      <Text className=" text-[20px] font-bold">Latest Budget</Text>
      <View>
        {category?.map((item,index)=>(
            <View key={index}>
               <View className="w-[70px] h-[70px] rounded-md fle items-center justify-center" style={{backgroundColor:item?.color}}>
                    <Text className=" text-white text-[30px]">{item?.icon}</Text>
                </View>  
                <View>
                    <View>
                        <Text>{item?.name} </Text>
                    </View>
                </View>   
            </View>
        ))}
      </View>
    </View>
  )
}

export default CategoryList

const styles = StyleSheet.create({})