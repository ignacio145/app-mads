import {Account, AppwriteException, Avatars, Client, Databases, ID, Query, Storage} from "react-native-appwrite";
import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import { DEMO_CATEGORIES, DEMO_SPECIALTIES } from "@/constants/demoData";

// Mapeo de códigos de error de Appwrite a mensajes en español entendibles para el usuario.
const AUTH_ERROR_MESSAGES: Record<string, string> = {
    user_invalid_credentials: "Email o contraseña incorrectos.",
    user_already_exists: "Ya existe una cuenta con ese email.",
    user_email_already_exists: "Ya existe una cuenta con ese email.",
    user_not_found: "No encontramos una cuenta con ese email.",
    user_blocked: "Esta cuenta fue bloqueada. Contactá a soporte.",
    user_password_mismatch: "Las contraseñas no coinciden.",
    password_recently_used: "Esa contraseña ya fue usada antes. Elegí otra.",
    password_personal_data: "La contraseña no puede contener tu nombre, email u otros datos personales.",
    general_rate_limit_exceeded: "Demasiados intentos. Esperá unos minutos y volvé a intentar.",
    general_argument_invalid: "Uno de los datos ingresados no es válido.",
};

export const getAuthErrorMessage = (e: unknown): string => {
    if (e instanceof AppwriteException) {
        return AUTH_ERROR_MESSAGES[e.type] || e.message || "Ocurrió un error inesperado. Probá de nuevo.";
    }
    if (e instanceof Error) return e.message;
    return "Ocurrió un error inesperado. Probá de nuevo.";
};

export const appwriteConfig = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "6a3fdd62000cc7dce9f2",
  platform: "com.jsm.foodordering",
  databaseId: "6a3fe0400020065571b2",
  userCollectionId: "users",
  menuCollectionId: "menu",
  categoriesCollectionId: "categories",
  // --- LOS 3 NUEVOS ---
  bucketId: "6a400dad0006cbfabbcc",
  customizationsCollectionId: "customizations",
  menuCustomizationsCollectionId: "menu_customizations",
};

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)
        if(!newAccount) throw Error;

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl }
        );
    } catch (e) {
        throw new Error(getAuthErrorMessage(e));
    }
}

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        await account.createEmailPasswordSession(email, password);
    } catch (e) {
        throw new Error(getAuthErrorMessage(e));
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (e) {
        throw new Error(getAuthErrorMessage(e));
    }
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
    try {
        const queries: string[] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries,
        )

        return menus.documents;
    } catch (e) {
        // Fallback para el demo/portfolio: si Appwrite está pausado o sin conexión,
        // servimos especialidades de ejemplo para que la grilla nunca quede vacía.
        let items = DEMO_SPECIALTIES;
        if (category) items = items.filter((i) => i.categories === category);
        if (query) items = items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()));
        return items as any;
    }
}

export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )

        return categories.documents;
    } catch (e) {
        // Fallback para el demo/portfolio (ver getMenu).
        return DEMO_CATEGORIES as any;
    }
}