import {View, Text} from 'react-native'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {useState} from "react";
import {signIn} from "@/lib/appwrite";
import * as Sentry from '@sentry/react-native'
import {validateEmail} from "@/lib/validation";
import useAuthStore from "@/store/auth.store";

const SignIn = () => {
    const { fetchAuthenticatedUser } = useAuthStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});

    const submit = async () => {
        const { email, password } = form;

        const emailError = validateEmail(email);
        const passwordError = password ? undefined : "Ingresá tu contraseña.";

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        setErrors({});
        setIsSubmitting(true)

        try {
            await signIn({ email, password });
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
                title="Ingresar"
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className="flex justify-center mt-5 flex-row gap-2">
                <Text className="base-regular text-gray-100">
                    ¿Todavía no tenés una cuenta?
                </Text>
                <Link href="/sign-up" className="base-bold text-primary">
                    Registrate
                </Link>
            </View>
        </View>
    )
}

export default SignIn
