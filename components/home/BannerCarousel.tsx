import { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import cn from 'clsx';

// Banner informativo: 3 mensajes que rotan solos con un fade ("se desvanece uno, entra
// el otro"). Se hace por opacidad y NO por ancho: así ocupa el 100% del contenedor sin
// depender de medir la pantalla — funciona en web (incluso dentro del "marco de teléfono",
// donde el ancho de ventana no coincide con el del marco) y en celular real por igual.
const BANNERS: { title: string; body: string; colors: [string, string] }[] = [
    {
        title: 'Vos nos contás tu necesidad.',
        body: 'Nosotras resolvemos. Somos tu primer mensaje siempre.',
        colors: ['#4C5FD9', '#7048E8'], // azul -> violeta
    },
    {
        title: 'Somos tu broker de RRHH.',
        body: 'Un solo interlocutor y canal para todas tus necesidades de capital humano.',
        colors: ['#7048E8', '#E91E8C'], // violeta -> rosa
    },
    {
        title: 'Centralizamos todo en un solo lugar.',
        body: 'Te conectamos con +50 consultoras especializadas, sin gestionar múltiples proveedores.',
        colors: ['#14B8A6', '#4C5FD9'], // teal -> azul
    },
];

const AUTO_MS = 3200;

const BannerCarousel = () => {
    const [index, setIndex] = useState(0);
    const indexRef = useRef(0);
    const opacity = useSharedValue(1);

    useEffect(() => {
        const id = setInterval(() => {
            // Fade out del actual; al terminar, cambia el mensaje y fade in del nuevo.
            opacity.value = withTiming(0, { duration: 220 }, (finished) => {
                if (!finished) return;
                const next = (indexRef.current + 1) % BANNERS.length;
                indexRef.current = next;
                runOnJS(setIndex)(next);
                opacity.value = withTiming(1, { duration: 340 });
            });
        }, AUTO_MS);
        return () => clearInterval(id);
    }, [opacity]);

    const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

    const banner = BANNERS[index];

    return (
        <View className="mb-2 mt-2">
            <View className="px-6">
                <Animated.View style={animStyle}>
                    <LinearGradient
                        colors={banner.colors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ borderRadius: 24, padding: 24, justifyContent: 'center', minHeight: 132 }}
                    >
                        <Text className="text-white text-lg font-quicksand-bold mb-1">
                            {banner.title}
                        </Text>
                        <Text className="text-white/80 text-sm font-quicksand-medium leading-relaxed">
                            {banner.body}
                        </Text>
                    </LinearGradient>
                </Animated.View>
            </View>

            {/* Puntos indicadores */}
            <View className="flex-row justify-center gap-x-2 mt-3">
                {BANNERS.map((_, i) => (
                    <View
                        key={i}
                        className={cn(
                            'h-1.5 rounded-full',
                            i === index ? 'bg-primary w-5' : 'bg-gray-200 w-1.5'
                        )}
                    />
                ))}
            </View>
        </View>
    );
};

export default BannerCarousel;
