import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useState } from "react";

import { categories, products, user } from "../data/index";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { StatusBar } from "expo-status-bar";
const { width } = Dimensions.get("window");

const IMAGE_WIDTH = width / 2 - Spacing * 3;
const IMAGE_HEIGHT = 250;

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {

  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <SafeAreaView>
      <StatusBar style="dark" />

      <View style={{ 
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: Spacing*2,
        paddingHorizontal: Spacing*2
      }}>
        <View style={{
          flexDirection: "row",
          alignItems: 'center',

        }}>
          <Image 
          source={user?.image} 
          style={{ 
            width: Spacing * 2,
            height: Spacing*2,
          }} 
          />
          <Text style={{
            fontFamily: Font["poppins-semiBold"],
            fontSize: Spacing * 2,
            color: Colors.text,
            marginLeft: Spacing,

          }}>Hi, {user?.name}</Text>
        </View>
        <View style={{ 
          flexDirection: 'row',
          alignItems: 'center'
         }}>
          <TouchableOpacity style={{padding: Spacing*2}}>
            <Ionicons name="search-outline" size={Spacing*3} color={Colors.text} />
          </TouchableOpacity>

          <TouchableOpacity style={{padding: Spacing*2}}>
            <Ionicons name="cart-outline" size={Spacing*3} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{
        paddingHorizontal: Spacing*2
      }}>
      
      <View style={{
        // paddingHorizontal: Spacing*2,
        // paddingVertical: Spacing,
      }}>
        <Text style={{
          fontSize: Spacing*3.5,
          fontFamily: Font['poppins-bold'],
          color: Colors.text,

         }}
        >
          Explore the best 
          <Text style={{
            fontSize: Spacing*4,
            color: Colors.primary,
        }}> collection 
        </Text> for your 
        </Text>
      </View>
      <View>
        <Text style={{ 
          fontFamily: Font['poppins-bold'], 
          fontSize: Spacing*2}}>
            Categories
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: Spacing }}>
        {
          [{ id: 0, name:"All" }, ...categories]?.map((category, index) => (
            <TouchableOpacity
            onPress={() => setActiveCategory(index) } 
            key={category?.id}            
            style={[{
              paddingHorizontal: Spacing*2,
              paddingVertical: Spacing/2,
              borderWidth: 1,
              borderRadius: Spacing*2,
              borderColor: Colors.border,
              marginRight: Spacing,
            }, activeCategory === index && { backgroundColor: Colors.primary } ]}>
              <Text style={[{
                color: Colors.text,
                fontSize: Spacing*1.4,
                fontFamily: Font['poppins-regular']
              }, {color: activeCategory === index ? Colors.onPrimary : Colors.text}  ]}>
                {category?.name}
              </Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{
          fontFamily: Font['poppins-semiBold'],
          fontSize: Spacing*2
        }}>Popular</Text>
        <TouchableOpacity style={{
          paddingVertical: Spacing,
        }}>
          <Text style={{
            fontFamily: Font['poppins-semiBold'],
            fontSize: Spacing*1.6,
          }}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: Spacing }}>
        {products?.map((product) => (
          <TouchableOpacity
          onPress={() => navigate('Product-detail', {product})}
          key={product?.id} 
          style={{
            marginVertical: Spacing,
          }}>
            <Image source={product?.image} style={{
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
              borderRadius: Spacing*2,
              marginVertical: Spacing,
            }} />
            <Text style={{
              fontFamily: Font['poppins-semiBold'],
              fontSize: Spacing*1.4,
              color: Colors.text,
            }}>{product?.name}
            </Text>
            <View>
              <Text style={{
                fontFamily: Font['poppins-semiBold'],
                fontSize: Spacing*1.4,
                color: Colors.gray,
              }}>${product?.price}
              </Text>
              <View style={{ 
                width: Spacing/2, 
                height: Spacing/2, 
                backgroundColor: Colors.gray,
                borderRadius: Spacing/4,
                marginHorizontal: Spacing, 
                }} />
              <Text style={{
                fontFamily: Font['poppins-semiBold'],
                fontSize: Spacing*1.4,
                color: Colors.gray,
              }}>{product?.brand}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
