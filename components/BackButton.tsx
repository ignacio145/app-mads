import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Botón de regreso único y consistente en toda la app: círculo blanco, borde suave,
// chevron vectorial en rosa de marca. Al ser un ícono de fuente (no un PNG) se dibuja
// al instante, sin el parpadeo "borde primero, flecha después".
// Si no hay historial (deep-link directo) vuelve al Home — clave en iPhone.
const BackButton = () => {
    const handleBack = () => {
        if (router.canGoBack()) { router.back(); } else { router.replace('/'); }
    };

    return (
        <TouchableOpacity
            onPress={handleBack}
            hitSlop={8}
            className="w-11 h-11 rounded-full border border-gray-100 bg-white shadow-sm shadow-black/5 items-center justify-center"
        >
            <Ionicons name="chevron-back" size={22} color="#E91E8C" style={{ marginLeft: -2 }} />
        </TouchableOpacity>
    );
};

export default BackButton;
