import {View, Text, KeyboardAvoidingView, Platform, ScrollView, Dimensions, Image, TouchableOpacity} from 'react-native'
import {Redirect, Slot, router} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import Svg, {Path} from "react-native-svg";
import {images} from "@/constants";
import useAuthStore from "@/store/auth.store";

export default function AuthLayout() {
    const { isAuthenticated } = useAuthStore();

    if(isAuthenticated) return <Redirect href="/" />

    const heroHeight = Dimensions.get('screen').height / 2.25;
    const canGoBack = router.canGoBack();

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <View
                    className="w-full relative items-center justify-center overflow-hidden"
                    style={{ height: heroHeight }}
                >
                    <LinearGradient
                        colors={["#4C5FD9", "#14B8A6"]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                    />

                    <Image
                        source={images.maddyHero}
                        style={{ width: 200, height: 228, marginTop: -10 }}
                        resizeMode="contain"
                    />
                    <View className="absolute items-center" style={{ bottom: 46 }}>
                        <Image source={images.logo} style={{ width: 150, height: 46 }} resizeMode="contain" tintColor="#ffffff" />
                    </View>

                    {canGoBack && (
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="absolute z-10 p-2 rounded-full border border-white/40 bg-white/10"
                            style={{ top: 20, left: 24 }}
                        >
                            <Image
                                source={images.arrowRight}
                                style={{ width: 16, height: 16, transform: [{ rotate: '180deg' }] }}
                                tintColor="#ffffff"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    )}

                    {/* Transición orgánica hacia el formulario, en vez del corte recto */}
                    <Svg
                        viewBox="0 0 500 60"
                        preserveAspectRatio="none"
                        style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', height: 46 }}
                    >
                        <Path d="M0,32 C130,68 370,-6 500,26 L500,60 L0,60 Z" fill="#ffffff" />
                    </Svg>
                </View>
                <Slot />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}