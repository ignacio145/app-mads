import {View, Text} from 'react-native'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {useState} from "react";
import {createUser} from "@/lib/appwrite";
import * as Sentry from '@sentry/react-native'
import {validateEmail, validateName, validatePassword} from "@/lib/validation";
import useAuthStore from "@/store/auth.store";

const SignUp = () => {
    const { fetchAuthenticatedUser } = useAuthStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; form?: string }>({});

    const submit = async () => {
        const { name, email, password } = form;

        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (nameError || emailError || passwordError) {
            setErrors({ name: nameError, email: emailError, password: passwordError });
            return;
        }

        setErrors({});
        setIsSubmitting(true)

        try {
            await createUser({ email,  password,  name });
            await fetchAuthenticatedUser();

            router.replace('/');
        } catch(error: any) {
            setErrors({ form: error.message });
            Sentry.captureException(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <CustomInput
                placeholder="Ingresá tu nombre completo"
                value={form.name}
                onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
                label="Nombre completo"
                error={errors.name}
            />
            <CustomInput
                placeholder="Ingresá tu email"
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
                label="Email"
                keyboardType="email-address"
                error={errors.email}
            />
            <CustomInput
                placeholder="Ingresá tu contraseña"
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
                label="Contraseña"
                secureTextEntry={true}
                error={errors.password}
            />

            {errors.form && (
                <View className="bg-error/10 border border-error/30 rounded-2xl px-4 py-3">
                    <Text className="text-error text-sm font-quicksand-medium text-center">
                        {errors.form}
                    </Text>
                </View>
            )}

            <CustomButton
                title="Registrarme"
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className="flex justify-center mt-5 flex-row gap-2">
                <Text className="base-regular text-gray-100">
                    ¿Ya tenés una cuenta?
                </Text>
                <Link href="/sign-in" className="base-bold text-primary">
                    Ingresar
                </Link>
            </View>
        </View>
    )
}

export default SignUp
