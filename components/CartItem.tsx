import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { images } from "@/constants";
import SpecialtyIcon from "@/components/SpecialtyIcon";

const CartItem = ({ item }: { item: CartItemType }) => {
    const { increaseQty, decreaseQty, removeItem } = useCartStore();

    return (
        <View className="cart-item">
            <View className="flex flex-row items-center gap-x-3">
                <SpecialtyIcon name={item.name} size={64} borderRadius={12} fontSize={28} />

                <View className="flex-1">
                    {/* Forzamos tipografía corporativa Quicksand */}
                    <Text className="text-base font-quicksand-bold text-dark-100">{item.name}</Text>
                    
                    {/* Ajustamos el texto para que parezca una solicitud de alcance técnico */}
                    <Text className="text-xs font-quicksand-medium text-primary mt-1">
                        Requerimiento de consultoría
                    </Text>

                    <View className="flex flex-row items-center gap-x-4 mt-3">
                        {/* Botón Menos (Reducir alcance) */}
                        <TouchableOpacity
                            onPress={() => decreaseQty(item.id, item.customizations!)}
                            className="cart-item__actions items-center justify-center"
                        >
                            <Image
                                source={images.minus}
                                style={{ width: 10, height: 10 }} // 🚀 Tamaño controlado nativo
                                resizeMode="contain"
                                tintColor={"#E91E8C"} // 🎨 Rosa oficial de MADS
                            />
                        </TouchableOpacity>

                        <Text className="text-base font-quicksand-bold text-dark-100">{item.quantity}</Text>

                        {/* Botón Más (Aumentar alcance) */}
                        <TouchableOpacity
                            onPress={() => increaseQty(item.id, item.customizations!)}
                            className="cart-item__actions items-center justify-center"
                        >
                            <Image
                                source={images.plus}
                                style={{ width: 10, height: 10 }} // 🚀 Tamaño controlado nativo
                                resizeMode="contain"
                                tintColor={"#E91E8C"} // 🎨 Rosa oficial de MADS
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Botón de eliminar propuesta (Tacho de basura) */}
            <TouchableOpacity
                onPress={() => removeItem(item.id, item.customizations!)}
                className="flex-center p-2"
            >
                <Image 
                    source={images.trash} 
                    style={{ width: 20, height: 20 }} 
                    resizeMode="contain" 
                    tintColor="#5D5F6D" // Gris neutro profesional
                />
            </TouchableOpacity>
        </View>
    );
};

export default CartItem;