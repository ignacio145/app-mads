import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { images } from '@/constants';

interface AboutCard {
    title: string;
    subtitle: string;
    icon: string;
    href: string;
    colors: [string, string];
}

const CARDS: AboutCard[] = [
    {
        title: "Por qué trabajar con MADS",
        subtitle: "Todos los beneficios de tenernos como partner.",
        icon: "✨",
        href: "/about/why-mads",
        colors: ["#E91E8C", "#7C3AED"],
    },
    {
        title: "El Método MADS",
        subtitle: "Un proceso integral que te acompaña de principio a fin.",
        icon: "🧭",
        href: "/about/method",
        colors: ["#4C5FD9", "#14B8A6"],
    },
];

const AboutCards = () => (
    <View className="px-6 gap-y-4 mt-2 mb-2">
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

export default AboutCards;
