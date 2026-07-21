import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { images } from '@/constants';

interface InfoCard {
    title: string;
    subtitle: string;
    icon: string;
    href: string;
    colors: [string, string];
}

const CARDS: InfoCard[] = [
    {
        title: "Lo que dicen de nosotros",
        subtitle: "Testimonios de las empresas que ya trabajan con MADS.",
        icon: "💬",
        href: "/about/testimonials",
        colors: ["#14B8A6", "#4C5FD9"],
    },
    {
        title: "Preguntas frecuentes",
        subtitle: "Resolvé las dudas más comunes sobre cómo trabajamos.",
        icon: "❓",
        href: "/about/faq",
        colors: ["#7C3AED", "#E91E8C"],
    },
];

const InfoNavCards = () => (
    <View className="px-6 gap-y-4 mt-6 mb-2">
        {CARDS.map((card) => (
            <TouchableOpacity
                key={card.href}
                onPress={() => router.push(card.href as any)}
                className="rounded-3xl overflow-hidden"
                activeOpacity={0.9}
            >
                <LinearGradient
                    colors={card.colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 20 }}
                >
                    <View className="flex-row items-center justify-between">
                        <View className="flex-1 pr-4">
                            <Text style={{ fontSize: 26 }} className="mb-2">{card.icon}</Text>
                            <Text className="text-white text-lg font-quicksand-bold mb-1">
                                {card.title}
                            </Text>
                            <Text className="text-white/80 text-xs font-quicksand-medium leading-relaxed">
                                {card.subtitle}
                            </Text>
                        </View>
                        <View className="w-9 h-9 rounded-full bg-white/20 items-center justify-center">
                            <Image
                                source={images.arrowRight}
                                style={{ width: 14, height: 14 }}
                                resizeMode="contain"
                                tintColor="#ffffff"
                            />
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        ))}
    </View>
);

export default InfoNavCards;
