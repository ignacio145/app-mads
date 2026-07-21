import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AboutCards from "@/components/home/AboutCards";
import InfoNavCards from "@/components/home/InfoNavCards";
import EcosystemSection from "@/components/home/EcosystemSection";
import { images } from "@/constants";
import { ABOUT } from "@/constants/madsContent";

export default function Nosotros() {
  return (
    <SafeAreaView className="flex-1 bg-white-100">

      {/* HEADER */}
      <View className="items-center px-6 pt-6 pb-2">
        <Image source={images.logoVertical} style={{ width: 60, height: 46 }} resizeMode="contain" tintColor="#1a1a1a" />
        <Text className="text-2xl font-quicksand-bold text-dark-100 mt-3">
          Conocé MADS
        </Text>
        <Text className="text-sm font-quicksand-medium text-gray-100 text-center mt-1">
          Todo sobre cómo trabajamos, en un solo lugar.
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pt-4 pb-32">
        {/* QUÉ SOMOS */}
        <View className="px-6 mb-6">
          <Text className="text-xs font-quicksand-bold text-primary tracking-widest uppercase mb-2">
            {ABOUT.eyebrow}
          </Text>
          <Text className="text-2xl font-quicksand-bold text-dark-100 mb-3">
            {ABOUT.title}
            <Text className="text-primary">{ABOUT.titleHighlight}</Text>
            {ABOUT.titleEnd}
          </Text>
          <Text className="text-sm font-quicksand-medium text-gray-100 leading-relaxed mb-4">
            {ABOUT.description}
          </Text>
          <View className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
            <Text className="text-sm font-quicksand-bold text-dark-100">
              {ABOUT.quoteLine1}
            </Text>
            <Text className="text-sm font-quicksand-medium text-gray-100 mt-1">
              {ABOUT.quoteLine2}
            </Text>
          </View>
        </View>

        {/* Por qué trabajar con MADS + El Método MADS */}
        <AboutCards />

        {/* Ecosistema de consultoras */}
        <EcosystemSection />

        {/* Lo que dicen de nosotros + Preguntas frecuentes */}
        <InfoNavCards />
      </ScrollView>
    </SafeAreaView>
  );
}
