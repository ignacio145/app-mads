import { ID } from "react-native-appwrite";
import { appwriteConfig, databases } from "./appwrite";
import dummyData from "./data";

interface Category {
    name: string;
    description: string;
}

interface MenuItem {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    category_name: string;
    customizations: string[];
}

interface DummyData {
    categories: Category[];
    menu: MenuItem[];
}

const data = dummyData as DummyData;

async function clearCollection(collectionId: string): Promise<void> {
    const existing = await databases.listDocuments(appwriteConfig.databaseId, collectionId);
    for (const doc of existing.documents) {
        await databases.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id);
    }
}

async function seed(): Promise<void> {
    console.log("Limpiando catálogo anterior...");
    await clearCollection(appwriteConfig.menuCollectionId);
    await clearCollection(appwriteConfig.categoriesCollectionId);

    console.log("Creando áreas de MADS...");
    const categoryMap: Record<string, string> = {};

    // 1. Crear las Áreas de MADS en la tabla de categorías
    for (const cat of data.categories) {
        const doc = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
            ID.unique(),
            cat
        );
        categoryMap[cat.name] = doc.$id;
    }

    console.log("Creando especialidades corporativas...");
    // 2. Crear las Especialidades de MADS en la tabla de menú
    for (const item of data.menu) {
        const documentData: Record<string, any> = {
            name: item.name,
            description: item.description,
            image_url: item.image_url, 
            price: item.price,
            rating: item.rating,
            calories: item.calories,
            protein: item.protein,
            
            // Apunta de manera exacta a la columna requerida por tu Appwrite
            categories: categoryMap[item.category_name]
        };

        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            ID.unique(),
            documentData
        );
    }

    console.log("✅ Seeding complete.");
}

export default seed;