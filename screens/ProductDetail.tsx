import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";
import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";
import Font from "../constants/Font";

type Props = NativeStackScreenProps<RootStackParamList, "Product-detail">;

const IMAGE_HEIGHT = 440;

StatusBar

const ProductDetail: React.FC<Props> = ({ route, navigation }) => {

  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);

  const product = route.params.product;
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }}>
    
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing * 2,}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: Spacing/2 }}>
            <Ionicons name="arrow-back-outline" size={Spacing*3} color={Colors.text} />
          </TouchableOpacity>
          <Text style={{
            padding: Spacing/2,
            fontSize: Spacing*2,
            fontFamily: Font['poppins-semiBold'],
            color: Colors.text,
          }}>Details</Text>
          <TouchableOpacity style={{ padding: Spacing/2 }}>
            <Ionicons name="cart-outline" size={Spacing*3} color={Colors.text} />
          </TouchableOpacity>
        </View>
      
      <ScrollView style={{
        paddingHorizontal: Spacing*2,
        flex: 1
      }}>

        <Image 
          source={product.image}
          style={{
            width: '100%',
            height: IMAGE_HEIGHT,
            borderRadius: Spacing*4,
            marginVertical: Spacing,

          }}
        />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: Spacing,
        }}>
          <Text style={{ 
            fontSize: Spacing*3,
            fontFamily: Font['poppins-semiBold'],
            color: Colors.text,
          }}>
            {product?.name}
          </Text>
          <View style={{
            flexDirection: "row",
            alignItems: 'center',

          }}>
            {product?.colors?.map((color, index) => (
              <View key={color?.id}  style={[{
                margin: Spacing/5,
                borderRadius: Spacing*2,
              }, activeColorIndex === index && {borderRadius: Spacing*2,  borderWidth: Spacing/2, borderColor: Colors.borderWithOpacity } ]}>
                <TouchableOpacity
                onPress={() => setActiveColorIndex(index)}
                
                style={{
                  backgroundColor: color.code,
                  height: Spacing * 2,
                  width: Spacing * 2,
                  borderRadius: Spacing,
                }} />

              </View>
            ))}
          </View>
        </View>

        <Text style={{
          color: Colors.text,
          fontFamily: Font['poppins-regular'],
        }}>
          {product?.description}
        </Text>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: Spacing,
          
        }}>
          <Ionicons 
          name="star-outline" 
          color={Colors.secondary}
          size={Spacing*2} 
          />
          <Text style={{
            marginLeft: Spacing,
            color: Colors.gray,
            fontFamily: Font['poppins-regular'],
          }}>
            {product?.rating}
          </Text>
          <Text style={{
            marginLeft: Spacing,
            color: Colors.gray,
            fontFamily: Font['poppins-regular'],
          }}>
            ({product?.reviews}) reviews
          </Text>
        </View>

        <View style={{ flexDirection: 'row'}}>
          {product?.sizes?.map((size, index) => (
            <TouchableOpacity
            onPress={() => setActiveSizeIndex(index)} 
            key={size?.id} 
            style={[{
              paddingHorizontal: Spacing*2,
              paddingVertical: Spacing,
              borderWidth: 1,
              borderColor: Colors.border,
              borderRadius: Spacing * 2,
              marginRight: Spacing,
            }, activeSizeIndex === index && {backgroundColor: Colors.primary, borderWidth: 0} ]}>
              <Text style={{
                fontFamily: Font['poppins-regular'],
                fontSize: Spacing*1.4,
                color: activeSizeIndex === index ? Colors.onPrimary : Colors.text,

              }}
              >{size?.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      <View style={{
        paddingHorizontal: Spacing*2,
        paddingVertical: Spacing*1.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}> 
        <Text style={{
          fontFamily: Font['poppins-bold'],
          fontSize: Spacing * 3.5,
          color: Colors.text
        }}>${product?.price}</Text>
        <TouchableOpacity style={{
          backgroundColor: Colors.primary,
          paddingHorizontal: Spacing*3,
          paddingVertical: Spacing*2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '60%',
          borderRadius: Spacing*5,

        }}>
          <Ionicons name="cart-outline" size={Spacing*3} color={Colors.onPrimary} />
          <Text style={{
            fontFamily: Font['poppins-semiBold'],
            color: Colors.onPrimary,
            fontSize: Spacing*2,
            marginLeft: Spacing/2,

          }}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
