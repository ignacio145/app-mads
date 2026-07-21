import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FaqSection from "@/components/home/FaqSection";
import BackButton from "@/components/BackButton";

export default function Faq() {
  return (
    <SafeAreaView className="flex-1 bg-white-100">

      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100/10">
        <BackButton />
        <Text className="text-lg font-quicksand-bold text-dark-100">Preguntas frecuentes</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pt-4 pb-10">
        <FaqSection />
      </ScrollView>
    </SafeAreaView>
  );
}
