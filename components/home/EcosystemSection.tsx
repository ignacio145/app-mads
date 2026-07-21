import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ECOSYSTEM_PROFILES } from '@/constants/madsContent';

const EcosystemSection = () => (
    <View className="mb-2 mt-4">
        <Text className="text-2xl font-quicksand-bold text-dark-100 px-6 mb-1">
            Un ecosistema para cada desafío
        </Text>
        <Text className="text-sm font-quicksand-medium text-gray-100 px-6 mb-4">
            Representamos un ecosistema diverso de consultores, metodologías y experiencias.
        </Text>
        <View className="px-6 gap-y-3">
            {ECOSYSTEM_PROFILES.map((profile) => (
                <TouchableOpacity
                    key={profile.id}
                    onPress={() => router.push(`/ecosystem/${profile.id}`)}
                    className="flex-row items-center bg-white rounded-3xl p-4 border border-gray-100/10 shadow-sm shadow-black/5"
                >
                    <LinearGradient
                        colors={profile.colors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{ fontSize: 26 }}>{profile.icon}</Text>
                    </LinearGradient>
                    <View className="flex-1 ml-4">
                        <Text className="text-base font-quicksand-bold text-dark-100 mb-1">
                            {profile.title}
                        </Text>
                        <Text className="text-xs font-quicksand-medium text-gray-100" numberOfLines={2}>
                            {profile.description}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

export default EcosystemSection;
