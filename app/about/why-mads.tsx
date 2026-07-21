import { router } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { VALUE_PROPS } from "@/constants/madsContent";
import BackButton from "@/components/BackButton";

export default function WhyMads() {
  return (
    <SafeAreaView className="flex-1 bg-white-100">

      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100/10">
        <BackButton />
        <Text className="text-lg font-quicksand-bold text-dark-100">Por qué MADS</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-6 pt-6 pb-10">
        <Text className="text-2xl font-quicksand-bold text-dark-100 mb-1">
          Por qué trabajar con MADS
        </Text>
        <Text className="text-sm font-quicksand-medium text-gray-100 leading-relaxed mb-6">
          Todos los beneficios que tenés trabajando con nosotras.
        </Text>

        <View className="gap-y-4">
          {VALUE_PROPS.map((item) => (
            <View key={item.title} className="bg-white rounded-3xl p-5 border border-gray-100/10 shadow-sm shadow-black/5">
              <View className="flex-row items-center gap-x-3 mb-2">
                <Text style={{ fontSize: 26 }}>{item.icon}</Text>
                <Text className="flex-1 text-base font-quicksand-bold text-dark-100">
                  {item.title}
                </Text>
              </View>
              <Text className="text-sm font-quicksand-medium text-gray-100 leading-relaxed">
                {item.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="p-6 bg-white border-t border-gray-100/20">
        <TouchableOpacity
          onPress={() => router.push('/')}
          className="w-full rounded-full overflow-hidden"
        >
          <LinearGradient
            colors={["#4C5FD9", "#14B8A6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ paddingVertical: 16, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text className="text-white font-quicksand-bold text-base">
              ¿Cómo te podemos ayudar?
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
