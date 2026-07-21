import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { openWhatsApp } from "@/lib/whatsapp";

export default function Contact() {
  return (
    <SafeAreaView className="flex-1 bg-white-100">
      <View className="flex-1 items-center justify-center px-8">

        <LinearGradient
          colors={["#4C5FD9", "#14B8A6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 84, height: 84, borderRadius: 42, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}
        >
          <Ionicons name="chatbubbles-outline" size={38} color="#ffffff" />
        </LinearGradient>

        <Text className="text-2xl font-quicksand-bold text-dark-100 text-center mb-2">
          ¿Cómo te podemos ayudar?
        </Text>
        <Text className="text-sm font-quicksand-medium text-gray-100 text-center leading-relaxed mb-10">
          Contanos tu necesidad y te conectamos con la consultora ideal dentro de nuestro ecosistema. Somos tu primer mensaje siempre.
        </Text>

        <TouchableOpacity
          onPress={openWhatsApp}
          activeOpacity={0.9}
          className="w-full rounded-full overflow-hidden"
        >
          <LinearGradient
            colors={["#4C5FD9", "#14B8A6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 18 }}
          >
            <Ionicons name="logo-whatsapp" size={20} color="#ffffff" />
            <Text className="text-white font-quicksand-bold text-base">
              Escribinos por WhatsApp
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text className="text-xs font-quicksand-medium text-gray-100 text-center mt-4">
          Estamos disponibles 24/7. Respondemos rápido.
        </Text>
      </View>
    </SafeAreaView>
  );
}
