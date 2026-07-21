import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useEffect, useRef, useState } from "react";
import cn from 'clsx';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import CartButton from "@/components/CartButton";
import SpecialtyIcon from "@/components/SpecialtyIcon";
import SearchBar from "@/components/SearchBar";
import HeroSection from "@/components/home/HeroSection";
import BannerCarousel from "@/components/home/BannerCarousel";
import EmployeeJourneyMarquee from "@/components/home/EmployeeJourneyMarquee";
import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import useAppwrite from "@/lib/useAppwrite";
import useDragScroll from "@/lib/useDragScroll";
import { openWhatsApp } from "@/lib/whatsapp";
import { getMenu, getCategories } from "@/lib/appwrite";
import { Category, MenuItem } from "@/type";

export default function Index() {
  const { user } = useAuthStore();
  const { query } = useLocalSearchParams<{ query: string }>();
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const categoriesDragScroll = useDragScroll();

  const { data: categories } = useAppwrite({ fn: getCategories });

  const { data: menuItems, loading, refetch } = useAppwrite({
    fn: getMenu,
    params: { category: activeCategory, query },
  });

  // useAppwrite solo fetchea al montar; re-fetcheamos cuando cambia el filtro o la búsqueda.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    refetch({ category: activeCategory, query } as any);
  }, [activeCategory, query]);

  return (
    <SafeAreaView className="flex-1 bg-white-100">

      {/* HEADER FIJO */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2 bg-white-100">
        <Image source={images.logo} style={{ width: 96, height: 30 }} resizeMode="contain" />
        <CartButton />
      </View>

      {/* CONTENIDO DESLIZABLE */}
      <FlatList
        data={menuItems as MenuItem[] || []}
        keyExtractor={(item) => item.$id || item.name}
        numColumns={2}
        columnWrapperClassName="justify-between px-6 gap-x-4 mb-4"
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}

        ListHeaderComponent={
          <View className="mb-6">

            {/* HERO A PANTALLA COMPLETA, SIN TARJETA */}
            <HeroSection greeting={user?.name ? `Hola, ${user.name}` : "Bienvenido a MADS"} />

            {/* BANNER INFORMATIVO ROTATIVO */}
            <BannerCarousel />

            <Text className="text-xs font-quicksand-bold text-gray-100 tracking-widest uppercase px-6 mt-8 mb-1">
              Qué proyectos podemos hacer
            </Text>
            <Text className="text-2xl font-quicksand-bold text-dark-100 px-6 mb-4">
              Cubrimos todo el Employee Journey
            </Text>

            {/* CINTA AUTO-DESPLAZABLE (MARQUEE) */}
            <EmployeeJourneyMarquee />

            <Text className="text-2xl font-quicksand-bold text-dark-100 px-6 mt-8 mb-4">
              Nuestras Áreas
            </Text>

            {/* BUSCADOR (antes vivía en el tab Search, ahora es parte del catálogo) */}
            <View className="px-6 mb-4">
              <SearchBar />
            </View>

            {/* PASTILLAS DE SELECCIÓN DE ÁREA */}
            <FlatList
              ref={categoriesDragScroll.listRef}
              {...categoriesDragScroll.webHandlers}
              style={categoriesDragScroll.style}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[{ $id: undefined, name: "Todo" }, ...((categories as Category[]) || [])]}
              keyExtractor={(item) => item.$id || "all"}
              contentContainerClassName="px-6 gap-x-3 mb-2"
              renderItem={({ item }) => {
                const isActive = activeCategory === item.$id;
                return (
                  <TouchableOpacity
                    onPress={() => setActiveCategory(item.$id)}
                    className={cn(
                      "px-5 py-2.5 rounded-full border-2",
                      isActive
                        ? "bg-primary border-primary"
                        : "bg-white border-gray-100/10"
                    )}
                  >
                    <Text
                      className={cn(
                        "text-sm font-quicksand-bold",
                        isActive ? "text-white" : "text-gray-100"
                      )}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            <Text className="text-2xl font-quicksand-bold text-dark-100 px-6 mt-8 mb-2">
              Especialidades
            </Text>
          </View>
        }

        ListFooterComponent={
          <View>
            <View className="px-6 mt-8">
              <TouchableOpacity
                onPress={openWhatsApp}
                className="bg-dark-100 rounded-3xl py-6 px-6 items-center"
              >
                <Text className="text-white text-lg font-quicksand-bold mb-3 text-center">
                  Contanos lo que necesitas y lo resolvemos
                </Text>
                <View className="bg-primary self-center px-5 py-2.5 rounded-full flex-row items-center gap-x-2">
                  <Text className="text-white text-xs font-quicksand-bold">
                    ¿Cómo te podemos ayudar?
                  </Text>
                  <Ionicons name="logo-whatsapp" size={14} color="#ffffff" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        }

        ListEmptyComponent={
          <View className="h-64 items-center justify-center px-10">
            {loading ? (
              <ActivityIndicator size="large" color="#E91E8C" />
            ) : (
              <Text className="text-gray-100 font-quicksand-medium text-center text-base">
                No hay soluciones disponibles actualmente para esta área de consultoría.
              </Text>
            )}
          </View>
        }

        renderItem={({ item }) => (
          <TouchableOpacity
            className="w-[47%] bg-white rounded-3xl pb-4 mb-4 shadow-sm shadow-black/5 border border-gray-100/10 justify-between overflow-hidden"
            onPress={() => router.push(`/menu/${item.$id}`)}
          >
            <SpecialtyIcon
              name={item.name}
              fontSize={48}
              borderRadius={0}
              style={{ width: '100%', height: 128, marginBottom: 12, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
            />

            <View className="flex-1 justify-start mb-3 px-4">
              <Text className="text-base font-quicksand-bold text-dark-100" numberOfLines={2}>
                {item.name}
              </Text>
              <Text className="text-xs font-quicksand-medium text-gray-100 mt-1" numberOfLines={2}>
                {item.description}
              </Text>
            </View>

            <View className="flex-row items-center justify-between mt-auto pt-2 border-t border-gray-100/5 px-4">
              <Text className="text-xs font-quicksand-bold text-primary">
                Ver solución
              </Text>
              <LinearGradient
                colors={["#4C5FD9", "#14B8A6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}
              >
                <Image
                  source={images.plus}
                  style={{ width: 12, height: 12 }}
                  resizeMode="contain"
                  tintColor="#ffffff"
                />
              </LinearGradient>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
