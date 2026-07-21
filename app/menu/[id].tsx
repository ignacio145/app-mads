import { useLocalSearchParams, router } from "expo-router";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { databases, appwriteConfig } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { getMenu } from "@/lib/appwrite";
import { useCartStore } from "@/store/cart.store";
import { images } from "@/constants";
import { MenuItem } from "@/type";
import SpecialtyIcon from "@/components/SpecialtyIcon";
import BackButton from "@/components/BackButton";

export default function SolutionDetail() {
  const { id } = useLocalSearchParams();
  const { addItem } = useCartStore();
  
  const [solution, setSolution] = useState<MenuItem | null>(null);
  const [dbLoading, setDbLoading] = useState(true);

  // 🚀 Traemos la lista completa de Appwrite para buscar nuestro item de forma dinámica
  const { data: menuItems, loading: listLoading } = useAppwrite({ fn: getMenu });

  useEffect(() => {
    let isMounted = true;

    const fetchSolution = async () => {
      if (!id) return;
      try {
        setDbLoading(true);
        // Intentamos traer el documento individual por ID
        const response = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.menuCollectionId,
          id as string
        );
        if (isMounted) setSolution(response as unknown as MenuItem);
      } catch (error) {
        console.log("Buscando en la lista local de Appwrite...");
        // 🚀 Fallback Dinámico: Si la consulta directa falla, extraemos el item real de la lista
        if (menuItems) {
          const matchedItem = (menuItems as MenuItem[]).find(item => item.$id === id);
          if (matchedItem && isMounted) setSolution(matchedItem);
        }
      } finally {
        if (isMounted) setDbLoading(false);
      }
    };

    fetchSolution();
    return () => { isMounted = false; };
  }, [id, menuItems]);

  // Spinner de carga mientras resuelve Appwrite
  if ((dbLoading && listLoading) && !solution) {
    return (
      <View className="flex-1 bg-white-100 justify-center items-center">
        <ActivityIndicator size="large" color="#E91E8C" />
      </View>
    );
  }

  // Si por alguna razón extrema no encuentra nada, un resguardo dinámico mínimo
  const currentSolution = solution || {
    $id: id as string,
    name: "Solución MADS Corporativa",
    description: "Cargando especificaciones del pilar de consultoría seleccionado...",
    price: 0,
    image_url: "https://img.freepik.com/free-vector/business-team-brainstorming-discussing-startup-project_74855-6902.jpg",
    category: "Consultoría"
  };

  // 💡 Lógica Dinámica para Entregables según la Categoría Real del Item
  const getDynamicDeliverables = (category: string = "", name: string = "") => {
    const lowerCat = category.toLowerCase();
    const lowerName = name.toLowerCase();

    if (lowerCat.includes("tech") || lowerCat.includes("digital") || lowerName.includes("software") || lowerName.includes("tecnología")) {
      return [
        "Arquitectura de software y prototipado ágil.",
        "Despliegue de infraestructura Cloud optimizada.",
        "QA Testing y transferencia de código fuente."
      ];
    }
    if (lowerCat.includes("financ") || lowerCat.includes("cost") || lowerName.includes("finanzas") || lowerName.includes("auditor")) {
      return [
        "Auditoría transaccional e identificación de fugas.",
        "Modelado proyectivo de costos e impuestos.",
        "Estructuración de matrices de riesgo financiero."
      ];
    }
    // Entregables estándar corporativos para cualquier otra especialidad
    return [
      `Diagnóstico situacional enfocado en ${name}.`,
      "Dashboard de seguimiento de KPIs en tiempo real.",
      "Manual de transferencia metodológica MADS."
    ];
  };

  const deliverables = getDynamicDeliverables(currentSolution.category, currentSolution.name);

  return (
    <SafeAreaView className="flex-1 bg-white-100">
      
      {/* BARRA SUPERIOR E ESTÁTICA */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100/10">
        <BackButton />
        <Text className="text-lg font-quicksand-bold text-dark-100">Detalle de Solución</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-10">
        
        {/* SECCIÓN 1: PORTADA CON ÍCONO + DEGRADADO DE LA ESPECIALIDAD */}
          <View className="w-full h-64 items-center justify-center overflow-hidden border-b border-gray-100/10 relative">
            <SpecialtyIcon
              name={currentSolution.name}
              borderRadius={0}
              fontSize={72}
              style={{ width: '100%', height: '100%' }}
            />
          </View>

        <View className="px-6 mt-6">
          
          {/* SECCIÓN 2: CATEGORÍA Y NOMBRE REAL (100% DINÁMICO) */}
          <Text className="text-xs font-quicksand-bold text-primary tracking-wider uppercase mb-1">
            {currentSolution.category || "Consultoría Integrada"}
          </Text>
          <Text className="text-2xl font-quicksand-bold text-dark-100 mb-4">
            {currentSolution.name}
          </Text>
          
          {/* SECCIÓN 3: ALCANCE Y DESCRIPCIÓN REAL (100% DINÁMICA) */}
          <View className="bg-white rounded-3xl p-5 shadow-sm shadow-black/5 border border-gray-100/10 mb-6">
            <Text className="text-sm font-quicksand-bold text-dark-100 mb-2">Alcance de la Especialidad</Text>
            <Text className="text-sm font-quicksand-medium text-gray-100 leading-relaxed">
              {currentSolution.description || "Sin descripción detallada cargada en la base de datos."}
            </Text>
          </View>

          {/* SECCIÓN 4: ESPECIFICACIONES DE ENTREGA */}
          <Text className="text-sm font-quicksand-bold text-dark-100 mb-3 px-1">Especificaciones de Entrega</Text>
          <View className="flex-row gap-x-4 mb-6">
            <View className="flex-1 bg-white p-4 rounded-2xl border border-gray-100/10">
              <Text className="text-[11px] font-quicksand-medium text-gray-100 uppercase tracking-wider">Formato</Text>
              <Text className="text-sm font-quicksand-bold text-dark-100 mt-1">One Stop Shop</Text>
            </View>
            <View className="flex-1 bg-white p-4 rounded-2xl border border-gray-100/10">
              <Text className="text-[11px] font-quicksand-medium text-gray-100 uppercase tracking-wider">Despliegue</Text>
              <Text className="text-sm font-quicksand-bold text-dark-100 mt-1">In-Company</Text>
            </View>
          </View>

          {/* SECCIÓN 5: ENTREGABLES INCLUIDOS (DEDUCCIÓN DINÁMICA) */}
          <View className="bg-white rounded-3xl p-5 shadow-sm shadow-black/5 border border-gray-100/10">
            <Text className="text-sm font-quicksand-bold text-dark-100 mb-3">Qué incluye el Hub de Solución</Text>
            <View className="gap-y-2.5">
              {deliverables.map((deliverable, index) => (
                <View key={index} className="flex-row items-start gap-x-2.5">
                  <View className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                  <Text className="flex-1 text-sm font-quicksand-medium text-gray-100 leading-normal">
                    {deliverable}
                  </Text>
                </View>
              ))}
            </View>
          </View>

        </View>
      </ScrollView>

      {/* SECCIÓN 6: ACCIÓN Y ENVÍO AL CARRITO */}
      <View className="p-6 bg-white border-t border-gray-100/20">
        <TouchableOpacity
          onPress={() => {
            addItem({
              id: currentSolution.$id,
              name: currentSolution.name,
              price: 0,
              image_url: currentSolution.image_url,
              customizations: []
            });
            router.push('/cart');
          }}
          className="w-full bg-primary py-4 rounded-full items-center justify-center shadow-lg shadow-primary/20"
        >
          <Text className="text-white font-quicksand-bold text-base">
            Solicitar esta Solución
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}