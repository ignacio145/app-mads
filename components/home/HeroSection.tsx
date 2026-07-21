import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { images } from '@/constants';
import { openWhatsApp } from '@/lib/whatsapp';

// Card estática de bienvenida (estilo app, no banner web): gradiente de marca contenido
// en un card redondeado, con el texto a la izquierda y Maddy a la derecha.
const HeroSection = ({ greeting }: { greeting?: string }) => (
    <View className="px-6 pt-3 pb-1">
        <LinearGradient
            colors={["#4C5FD9", "#14B8A6"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ borderRadius: 28, overflow: 'hidden' }}
        >
            <View className="flex-row items-stretch">
                <View className="flex-1 py-6 pl-6 pr-1 justify-center">
                    {greeting && (
                        <Text className="text-white/75 text-[11px] font-quicksand-bold tracking-widest uppercase mb-2">
                            {greeting}
                        </Text>
                    )}
                    <Text className="text-white text-xl font-quicksand-bold leading-snug">
                        El One Stop Shop de RRHH más grande de la región
                    </Text>
                    <TouchableOpacity
                        onPress={openWhatsApp}
                        className="bg-white self-start mt-4 px-4 py-2.5 rounded-full flex-row items-center gap-x-1.5"
                    >
                        <Text className="text-primary text-xs font-quicksand-bold">
                            ¿Cómo te podemos ayudar?
                        </Text>
                        <Ionicons name="logo-whatsapp" size={14} color="#E91E8C" />
                    </TouchableOpacity>
                </View>

                <View className="justify-end" style={{ width: 124 }}>
                    <Image
                        source={images.maddyHero}
                        style={{ width: 124, height: 166 }}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </LinearGradient>
    </View>
);

export default HeroSection;
