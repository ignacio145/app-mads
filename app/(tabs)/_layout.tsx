import { Redirect, Slot, Tabs } from "expo-router";
import useAuthStore from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@/constants";
import cn from "clsx";

// Botón central con el logo MADS: en línea con el resto de los íconos, apenas más
// grande y con el gradiente de marca para distinguirlo sin salirse de la barra.
const CenterTabButton = ({ onPress }: any) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={{ alignItems: 'center', justifyContent: 'center' }}
    >
        <LinearGradient
            colors={["#4C5FD9", "#14B8A6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#4C5FD9',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.25,
                shadowRadius: 6,
                elevation: 4,
            }}
        >
            <Image
                source={images.logoVertical}
                style={{ width: 28, height: 24 }}
                resizeMode="contain"
                tintColor="#ffffff"
            />
        </LinearGradient>
    </TouchableOpacity>
);

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
    <View className="items-center justify-center" style={{ width: 68 }}>
        {focused ? (
            <LinearGradient
                colors={["#4C5FD9", "#14B8A6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' }}
            >
                <Image
                    source={icon}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                    tintColor="#ffffff"
                />
            </LinearGradient>
        ) : (
            <Image
                source={icon}
                style={{ width: 22, height: 22 }}
                resizeMode="contain"
                tintColor="#5D5F6D"
            />
        )}
        <Text className={cn('text-[10px] font-quicksand-bold mt-1', focused ? 'text-primary' : 'text-gray-200')}>
            {title}
        </Text>
    </View>
)

// Variante con ícono de Ionicons (no todos los tabs tienen un PNG dedicado en assets/icons).
const TabBarIonIcon = ({ focused, name, title }: { focused: boolean; name: keyof typeof Ionicons.glyphMap; title: string }) => (
    <View className="items-center justify-center" style={{ width: 68 }}>
        {focused ? (
            <LinearGradient
                colors={["#4C5FD9", "#14B8A6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' }}
            >
                <Ionicons name={name} size={20} color="#ffffff" />
            </LinearGradient>
        ) : (
            <Ionicons name={name} size={22} color="#5D5F6D" />
        )}
        <Text className={cn('text-[10px] font-quicksand-bold mt-1', focused ? 'text-primary' : 'text-gray-200')}>
            {title}
        </Text>
    </View>
)

export default function TabLayout() {
    const { isAuthenticated } = useAuthStore();

    // if(!isAuthenticated) return <Redirect href="/sign-in" />

    return (
        <Tabs screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                // 🚀 FIX 1: Apaga el sitemap dinámico para que no cree elementos fantasma en Web
                sitemap: false, 
                tabBarStyle: {
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    marginHorizontal: 20,
                    height: 80,
                    paddingTop: 0,
                    paddingBottom: 0,
                    position: 'absolute',
                    bottom: 40,
                    backgroundColor: 'white',
                    shadowColor: '#1a1a1a',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 5
                },
                tabBarItemStyle: {
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                // 🚀 FIX 3: La librería reserva un slot fijo (chico) para el ícono con
                // justify-content: flex-start, así que nuestro contenido (badge + label,
                // más alto que un ícono normal) queda pegado arriba. Forzamos que el slot
                // ocupe el 100% del botón para que el centrado interno funcione de verdad.
                tabBarIconStyle: {
                    height: '100%',
                    marginBottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                }
            }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Inicio" icon={images.home} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='nosotros'
                options={{
                    title: 'Nosotros',
                    tabBarIcon: ({ focused }) => <TabBarIonIcon title="Nosotros" name="information-circle-outline" focused={focused} />
                }}
            />
            <Tabs.Screen
                name='contact'
                options={{
                    title: 'Contacto',
                    tabBarButton: (props) => <CenterTabButton onPress={props.onPress} />
                }}
            />
            <Tabs.Screen
                name='cart'
                options={{
                    title: 'Mis Solicitudes',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Solicitudes" icon={images.bag} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Perfil" icon={images.person} focused={focused} />
                }}
            />
            
            {/* 🚀 FIX 2: Declaramos el sitemap explícitamente y lo anulamos con href: null */}
            <Tabs.Screen 
                name="+sitemap" 
                options={{ 
                    href: null // Esto lo remueve por completo del render de la barra de navegación
                }} 
            />
        </Tabs>
    );
}