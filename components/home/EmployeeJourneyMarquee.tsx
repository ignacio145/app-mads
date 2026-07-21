import { View, Text, Image } from 'react-native';
import Animated, {
    useAnimatedRef,
    useSharedValue,
    useFrameCallback,
    useAnimatedScrollHandler,
    scrollTo,
} from 'react-native-reanimated';
import { images, offers } from '@/constants';

const CARD_WIDTH = 220;
const GAP = 16;
const ITEM = CARD_WIDTH + GAP;
const LOOP = offers.length * ITEM;   // ancho de una copia
const SPEED = 0.5;                    // px por frame => lento y continuo (~30px/s a 60fps)

// Marquee que se auto-desplaza en loop continuo Y se puede arrastrar con el dedo.
// Corre 100% en el hilo de UI con Reanimated (funciona en New Architecture / Expo Go SDK 54,
// donde el Animated clásico con native driver no mueve los transforms).
// Triplicamos el contenido y trabajamos en la banda central para arrastrar hacia ambos lados.
const EmployeeJourneyMarquee = () => {
    const aref = useAnimatedRef<Animated.ScrollView>();
    const offset = useSharedValue(LOOP); // arranca en la banda central
    const paused = useSharedValue(false);

    const data = [...offers, ...offers, ...offers];

    // Cada frame avanza el scroll (salvo que el usuario esté arrastrando).
    // Arranca inactivo y se activa en onLayout, cuando el ref del ScrollView ya
    // está montado (así evitamos el warning "scrollTo with uninitialized ref").
    const frame = useFrameCallback(() => {
        if (paused.value) return;
        offset.value += SPEED;
        if (offset.value >= LOOP * 2) offset.value -= LOOP; // reencuadra invisible
        scrollTo(aref, offset.value, 0, false);
    }, false);

    const onScroll = useAnimatedScrollHandler({
        onBeginDrag: () => {
            paused.value = true;
        },
        onScroll: (e) => {
            // Mientras el usuario arrastra, seguimos su posición.
            if (paused.value) offset.value = e.contentOffset.x;
        },
        onEndDrag: () => {
            if (offset.value >= LOOP * 2) offset.value -= LOOP;
            else if (offset.value < LOOP) offset.value += LOOP;
            paused.value = false;
        },
        onMomentumEnd: () => {
            if (offset.value >= LOOP * 2) offset.value -= LOOP;
            else if (offset.value < LOOP) offset.value += LOOP;
            paused.value = false;
        },
    });

    return (
        <Animated.ScrollView
            ref={aref}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={onScroll}
            onLayout={() => frame.setActive(true)}
            contentContainerStyle={{ paddingHorizontal: 24 }}
        >
            {data.map((item, index) => (
                <View
                    key={`${item.id}-${index}`}
                    style={{
                        width: CARD_WIDTH,
                        height: 176,
                        marginRight: GAP,
                        backgroundColor: item.color,
                        borderRadius: 24,
                        padding: 20,
                        justifyContent: 'space-between',
                        overflow: 'hidden',
                    }}
                >
                    <Text style={{ fontSize: 32 }}>{item.icon}</Text>
                    <View>
                        <Text className="text-base font-quicksand-bold text-white leading-snug">
                            {item.title}
                        </Text>
                        <View className="flex-row items-center mt-2 gap-x-2">
                            <Text className="text-xs font-quicksand-medium text-white/80">
                                Ver pilar MADS
                            </Text>
                            <Image
                                source={images.arrowRight}
                                style={{ width: 14, height: 14 }}
                                resizeMode="contain"
                                tintColor="#ffffff"
                            />
                        </View>
                    </View>
                </View>
            ))}
        </Animated.ScrollView>
    );
};

export default EmployeeJourneyMarquee;
