import { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import cn from 'clsx';

// Banner informativo: 3 mensajes que rotan solos, rápido y paginado ("sale una, entra
// la otra"). Slide con Reanimated en el hilo de UI => anda en New Architecture / Expo Go.
// Cada card tiene su propio degradado con colores de la marca.
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
    // Medimos el ancho real del contenedor (no el de la ventana). En web, dentro del
    // "marco de teléfono", useWindowDimensions devuelve el ancho del navegador (~1280)
    // y las slides quedaban cortadas; onLayout da el ancho disponible de verdad.
    const [width, setWidth] = useState(0);
    const tx = useSharedValue(0);
    const indexRef = useRef(0);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!width) return;
        const id = setInterval(() => {
            const next = (indexRef.current + 1) % BANNERS.length;
            indexRef.current = next;
            // Se escribe fuera del updater de setState (no durante el render).
            tx.value = withTiming(-next * width, {
                duration: 450,
                easing: Easing.out(Easing.cubic),
            });
            setIndex(next);
        }, AUTO_MS);
        return () => clearInterval(id);
    }, [width, tx]);

    const animStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: tx.value }],
    }));

    return (
        <View className="mb-2 mt-2">
            <View style={{ overflow: 'hidden' }} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
                {width > 0 && (
                    <Animated.View
                        style={[
                            { flexDirection: 'row', width: width * BANNERS.length },
                            animStyle,
                        ]}
                    >
                        {BANNERS.map((b, i) => (
                            <View key={i} style={{ width }} className="px-6">
                                <LinearGradient
                                    colors={b.colors}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ borderRadius: 24, padding: 24, justifyContent: 'center', minHeight: 132 }}
                                >
                                    <Text className="text-white text-lg font-quicksand-bold mb-1">
                                        {b.title}
                                    </Text>
                                    <Text className="text-white/80 text-sm font-quicksand-medium leading-relaxed">
                                        {b.body}
                                    </Text>
                                </LinearGradient>
                            </View>
                        ))}
                    </Animated.View>
                )}
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
