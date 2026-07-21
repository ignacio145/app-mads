const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return "Ingresá tu email.";
    if (!EMAIL_REGEX.test(email.trim())) return "Ingresá un email válido.";
    return undefined;
};

export const validatePassword = (password: string, minLength = 8): string | undefined => {
    if (!password) return "Ingresá tu contraseña.";
    if (password.length < minLength) return `La contraseña debe tener al menos ${minLength} caracteres.`;
    return undefined;
};

export const validateName = (name: string): string | undefined => {
    if (!name.trim()) return "Ingresá tu nombre completo.";
    if (name.trim().length < 2) return "Ingresá un nombre válido.";
    return undefined;
};
