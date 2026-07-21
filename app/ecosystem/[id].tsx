import { useLocalSearchParams, router } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ECOSYSTEM_PROFILES } from "@/constants/madsContent";
import BackButton from "@/components/BackButton";

export default function EcosystemDetail() {
  const { id } = useLocalSearchParams();
  const profile = ECOSYSTEM_PROFILES.find((p) => p.id === id) ?? ECOSYSTEM_PROFILES[0];

  return (
    <SafeAreaView className="flex-1 bg-white-100">

      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100/10">
        <BackButton />
        <Text className="text-lg font-quicksand-bold text-dark-100">Perfil de Consultor</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-6 pt-8 pb-10">
        <LinearGradient
          colors={profile.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 72, height: 72, borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 34 }}>{profile.icon}</Text>
        </LinearGradient>

        <Text className="text-2xl font-quicksand-bold text-dark-100 mt-5 mb-2">
          {profile.title}
        </Text>
        <Text className="text-sm font-quicksand-medium text-gray-100 leading-relaxed mb-6">
          {profile.description}
        </Text>

        <View className="bg-white rounded-3xl p-5 shadow-sm shadow-black/5 border border-gray-100/10">
          <Text className="text-sm font-quicksand-bold text-dark-100 mb-3">
            Qué caracteriza a este perfil
          </Text>
          <View className="gap-y-2.5">
            {profile.bullets.map((bullet) => (
              <View key={bullet} className="flex-row items-start gap-x-2.5">
                <View className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <Text className="flex-1 text-sm font-quicksand-medium text-gray-100 leading-normal">
                  {bullet}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="p-6 bg-white border-t border-gray-100/20">
        <TouchableOpacity
          onPress={() => router.push('/')}
          className="w-full bg-primary py-4 rounded-full items-center justify-center shadow-lg shadow-primary/20"
        >
          <Text className="text-white font-quicksand-bold text-base">
            Buscar soluciones con este perfil
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
