import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import useAuthStore from '@/store/auth.store';
import BackButton from '@/components/BackButton';
import { images } from '@/constants';
import { account } from '@/lib/appwrite'; // 🚀 Importamos "account" directo del SDK nativo
import { useState } from 'react';
import { router } from 'expo-router';

const Profile = () => {
    const { user, setIsAuthenticated, setUser } = useAuthStore();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);

            // 1. Le ordenamos a Appwrite destruir de verdad la sesión activa en el servidor
            await account.deleteSession('current');

            // 2. Limpiamos el estado local de Zustand
            setUser(null);
            setIsAuthenticated(false);

            // 3. Redireccionamos de inmediato al Login
            router.replace('/sign-in');
        } catch (error) {
            console.log("Error al cerrar sesión:", error);
            // Por si las dudas (bypass): si el servidor falla, limpiamos igual localmente para no trabar al usuario
            setUser(null);
            setIsAuthenticated(false);
            router.replace('/sign-in');
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white-100">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32">

                {/* PORTADA CON DEGRADADO DE MARCA */}
                <View className="relative" style={{ height: 176 }}>
                    <LinearGradient
                        colors={["#4C5FD9", "#14B8A6"]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    />
                    <View className="absolute z-10" style={{ top: 20, left: 24 }}>
                        <BackButton />
                    </View>
                    <Text className="text-white text-lg font-quicksand-bold text-center mt-6">
                        Mi Perfil
                    </Text>

                    <Svg
                        viewBox="0 0 500 60"
                        preserveAspectRatio="none"
                        style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', height: 40 }}
                    >
                        <Path d="M0,32 C130,68 370,-6 500,26 L500,60 L0,60 Z" fill="#fafafa" />
                    </Svg>
                </View>

                {/* AVATAR FLOTANTE SOBRE EL BORDE */}
                <View className="items-center" style={{ marginTop: -64 }}>
                    <View className="w-28 h-28 rounded-full border-4 border-white-100 overflow-hidden bg-white shadow-lg shadow-black/10">
                        {user?.avatar ? (
                            <Image source={{ uri: user.avatar }} className="w-full h-full" resizeMode="cover" />
                        ) : (
                            <LinearGradient
                                colors={["#E91E8C", "#7C3AED"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Image source={images.person} className="w-10 h-10" tintColor="#ffffff" resizeMode="contain" />
                            </LinearGradient>
                        )}
                    </View>

                    <Text className="text-2xl font-quicksand-bold text-dark-100 mt-4 mb-1">
                        {user?.name || 'Cliente MADS'}
                    </Text>
                    <View className="bg-primary/10 px-3 py-1 rounded-full">
                        <Text className="text-xs font-quicksand-bold text-primary">
                            Aliado Corporativo
                        </Text>
                    </View>
                </View>

                {/* TARJETA DE DATOS DE CONTACTO */}
                <View className="mx-6 mt-8 bg-white rounded-3xl p-5 shadow-sm shadow-black/5 border border-gray-100/10">
                    <View className="profile-field mb-0">
                        <View className="profile-field__icon">
                            <Image source={images.envelope} className="w-5 h-5" tintColor="#E91E8C" resizeMode="contain" />
                        </View>
                        <View>
                            <Text className="text-[11px] font-quicksand-medium text-gray-100 uppercase tracking-wider">Email</Text>
                            <Text className="text-sm font-quicksand-bold text-dark-100 mt-0.5">
                                {user?.email || 'contacto@mads.land'}
                            </Text>
                        </View>
                    </View>

                    <View className="h-px bg-gray-100/10 my-4" />

                    <View className="profile-field mb-0">
                        <View className="profile-field__icon">
                            <Image source={images.star} className="w-5 h-5" tintColor="#E91E8C" resizeMode="contain" />
                        </View>
                        <View>
                            <Text className="text-[11px] font-quicksand-medium text-gray-100 uppercase tracking-wider">Plan</Text>
                            <Text className="text-sm font-quicksand-bold text-dark-100 mt-0.5">
                                One Stop Shop MADS
                            </Text>
                        </View>
                    </View>
                </View>

                {/* CERRAR SESIÓN */}
                <View className="mx-6 mt-8">
                    <TouchableOpacity
                        onPress={handleLogout}
                        disabled={isLoggingOut}
                        className="flex-row items-center justify-center bg-error rounded-full py-4 shadow-lg shadow-error/30"
                        activeOpacity={0.8}
                    >
                        {isLoggingOut ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <>
                                <Image source={images.logout} className="w-6 h-6 mr-3" tintColor="#ffffff" resizeMode="contain" />
                                <Text className="text-white font-quicksand-bold text-lg">
                                    Cerrar Sesión
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
