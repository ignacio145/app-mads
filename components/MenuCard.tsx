import {Text, TouchableOpacity, Platform} from 'react-native'
import {MenuItem} from "@/type";
import {useCartStore} from "@/store/cart.store";
import SpecialtyIcon from "@/components/SpecialtyIcon";

const MenuCard = ({ item: { $id, image_url, name, price }}: { item: MenuItem}) => {
    const { addItem } = useCartStore();

    return (
        <TouchableOpacity className="menu-card" style={Platform.OS === 'android' ? { elevation: 10, shadowColor: '#878787'}: {}}>
            <SpecialtyIcon name={name} size={80} borderRadius={24} style={{ position: 'absolute', top: -32 }} />
            <Text className="text-center base-bold text-dark-100 mb-2" numberOfLines={1}>{name}</Text>
            <TouchableOpacity className="mb-4" onPress={() => addItem({ id: $id, name, price, image_url, customizations: []})}>
                <Text className="paragraph-bold text-primary">Solicitar +</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export default MenuCard
