import {View, Text, FlatList} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {useCartStore} from "@/store/cart.store";
import CustomHeader from "@/components/CustomHeader";
import CustomButton from "@/components/CustomButton";
import CartItem from "@/components/CartItem";

const Cart = () => {
    const { items, getTotalItems } = useCartStore();

    const totalItems = getTotalItems();

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={items}
                renderItem={({ item }) => <CartItem item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerClassName="pb-28 px-5 pt-5"
                ListHeaderComponent={() => <CustomHeader title="Mi Solicitud" />}
                ListEmptyComponent={() => (
                    <Text className="text-gray-100 font-quicksand-medium text-center text-base mt-10">
                        Todavía no seleccionaste ninguna solución MADS.
                    </Text>
                )}
                ListFooterComponent={() => totalItems > 0 && (
                    <View className="gap-5">
                        <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                            <Text className="h3-bold text-dark-100">
                                {`Soluciones seleccionadas (${totalItems})`}
                            </Text>
                        </View>

                        <CustomButton title="Enviar Solicitud" />
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Cart
