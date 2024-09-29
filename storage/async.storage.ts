import AsyncStorage from '@react-native-async-storage/async-storage';


const getData = async (key: string): Promise<IProduct | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) as IProduct : null;
    } catch (e) {
        console.error("Error reading data:", e);
        return null;
    }
};

const GetAllKeys = async (): Promise<string[]> => {
    let keys: string[] = []
    try {
        keys = [...await AsyncStorage.getAllKeys()]
    } catch (e) {
        console.error("Error get key:", e);
        return keys;
    }

    return keys
}

const GetAllProduct = async (): Promise<IProduct[]> => {
    let productFormStorage: IProduct[] = []
    try {
        let keys: string[] = [];
        keys = await GetAllKeys()

        for (const key of keys) {
            const product = await getData(key)
            if (product !== null) {
                productFormStorage.push(product)
            }
        }
        return productFormStorage;

    } catch (e) {
        console.error("Error get all product:", e);
        return productFormStorage;
    }
};

const CheckExistProductInLikedList = async ({ product }: { product: IProduct }): Promise<boolean> => {
    const key = product.id + "";
    const existingProduct = await AsyncStorage.getItem(key);

    if (existingProduct == null) {
        return false;
    }
    return true;
}

const StoreData = async ({ product }: { product: IProduct }) => {
    try {
        const jsonValue = JSON.stringify(product);
        const key = product.id + "";
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error("Error saving data:", e);
    }
};

const RemoveProduct = async ({ product }: { product: IProduct }) => {
    try {
        await AsyncStorage.removeItem(product.id + "")
    } catch (e) {
        console.error("Error remove data:", e);
    }
}

export { CheckExistProductInLikedList, StoreData, GetAllProduct, GetAllKeys, RemoveProduct };


/*
const GetAllProduct = async (): Promise<IProduct[]> => {
    let productFormStorage: IProduct[] = []
    try {
        const keys: string[] = await GetAllKeys();
        const promises = keys.map(async (key) => {
            const product = await getData(key);
            return product;
        });

        const products = await Promise.all(promises);
        productFormStorage = products.filter(p => p !== null) as IProduct[];
        return productFormStorage;

    } catch (e) {
        console.error("Error getting all products:", e);
        return productFormStorage;
    }
};

*/
