import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TESTIMONIALS } from "@/constants/madsContent";
import BackButton from "@/components/BackButton";

export default function Testimonials() {
  return (
    <SafeAreaView className="flex-1 bg-white-100">

      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100/10">
        <BackButton />
        <Text className="text-lg font-quicksand-bold text-dark-100">Testimonios</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-6 pt-6 pb-10">
        <Text className="text-2xl font-quicksand-bold text-dark-100 mb-1">
          Lo que dicen de nosotros
        </Text>
        <Text className="text-sm font-quicksand-medium text-gray-100 leading-relaxed mb-6">
          Empresas líderes que confían en MADS para su gestión de personas.
        </Text>

        <View className="gap-y-4">
          {TESTIMONIALS.map((item) => (
            <View key={item.name} className="bg-white rounded-3xl p-5 border border-gray-100/10 shadow-sm shadow-black/5">
              <Text className="text-[10px] font-quicksand-bold text-primary uppercase tracking-wider mb-2">
                {item.tag}
              </Text>
              <Text className="text-sm font-quicksand-medium text-gray-100 leading-relaxed mb-4">
                "{item.quote}"
              </Text>
              <Text className="text-sm font-quicksand-bold text-dark-100">{item.name}</Text>
              <Text className="text-xs font-quicksand-medium text-gray-100">{item.company}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
