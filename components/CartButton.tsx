import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { router } from "expo-router";

const CartButton = () => {
    const { getTotalItems } = useCartStore();
    const totalItems = getTotalItems();

    return (
        <TouchableOpacity 
            onPress={() => router.push('/cart')}
            // 🚀 EL TRUCO: Agregamos items-center, justify-center y le damos un tamaño fijo (w-11 h-11)
            className="w-11 h-11 bg-white rounded-full border border-gray-100 shadow-sm shadow-black/5 items-center justify-center"
        >
            <Image 
                source={images.bag}
                style={{ width: 22, height: 22, transform: [{ translateX: -1 }] }}
                resizeMode="contain"
                tintColor="#E91E8C"
            />
            
            {/* Globo de cantidad */}
            {totalItems > 0 && (
                <View className="absolute -top-1 -right-1 bg-primary px-1.5 py-0.5 rounded-full min-w-5 justify-center items-center">
                    <Text className="text-white text-[10px] font-quicksand-bold">
                        {totalItems}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

export default CartButton;