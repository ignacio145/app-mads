import { router } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { METHOD_STEPS } from "@/constants/madsContent";
import BackButton from "@/components/BackButton";

export default function Method() {
  return (
    <SafeAreaView className="flex-1 bg-white-100">

      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100/10">
        <BackButton />
        <Text className="text-lg font-quicksand-bold text-dark-100">El Método MADS</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-6 pt-6 pb-10">
        <Text className="text-2xl font-quicksand-bold text-dark-100 mb-1">
          El Método MADS
        </Text>
        <Text className="text-sm font-quicksand-medium text-gray-100 leading-relaxed mb-6">
          Un proceso integral que te acompaña de principio a fin.
        </Text>

        <View className="gap-y-4">
          {METHOD_STEPS.map((step) => (
            <View key={step.number} className="flex-row gap-x-4">
              <LinearGradient
                colors={["#4C5FD9", "#14B8A6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
              >
                <Text className="text-white font-quicksand-bold text-base">{step.number}</Text>
              </LinearGradient>
              <View className="flex-1 pb-2">
                <Text className="text-base font-quicksand-bold text-dark-100 mb-1">
                  {step.title}
                </Text>
                <Text className="text-sm font-quicksand-medium text-gray-100 leading-relaxed">
                  {step.description}
                </Text>
              </View>
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
              Empezá tu proyecto
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
