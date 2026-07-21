import { Linking } from 'react-native';

// Contacto directo por WhatsApp (formato wa.me: código de país sin + ni espacios).
const WHATSAPP_NUMBER = '5491133221897';
const WHATSAPP_MESSAGE = 'Hola MADS, quiero saber cómo pueden ayudarme.';

export const WHATSAPP_URL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=` + encodeURIComponent(WHATSAPP_MESSAGE);

export const openWhatsApp = () => Linking.openURL(WHATSAPP_URL);
