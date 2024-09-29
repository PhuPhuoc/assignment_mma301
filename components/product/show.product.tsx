import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import ProductCard from "../card/card.product";
import { Ionicons } from '@expo/vector-icons';

const ShowProductsScreen = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [originalProducts, setOriginalProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchText, setSearchText] = useState('');

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://66f68687436827ced9777bb4.mockapi.io/api/v1/art_tool'); // API của bạn
            const data: IProduct[] = await response.json();
            setProducts(data);
            setOriginalProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleRefresh = async () => {
        fetchProducts();
        setSearchText("")
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e91e63" />
            </View>
        );
    }

    const handleSearch = (text: string) => {
        setSearchText(text)
        setProducts(originalProducts);
        if (searchText.length !== 0) {
            const filterProducts = originalProducts.filter(product =>
                product.artName.toLowerCase().includes(text.toLowerCase())
            )
            setProducts(filterProducts)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchcontainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search for products"
                    onChangeText={handleSearch}
                    value={searchText}
                />
                <Pressable style={styles.iconPress}>
                    <Ionicons name="search" size={24} color="#e91e63" style={styles.icon} />
                </Pressable>
            </View>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductCard product={item} fullscreen={false} />}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={handleRefresh}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 3,
        marginBottom: 20,
        marginHorizontal: 5,
    },
    input: {
        flex: 1,
        marginLeft: 10,
    },
    iconPress: {
        // backgroundColor: "#EEEEEE",
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    icon: {
        marginRight: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F8FF',
        paddingHorizontal: 5,
        paddingTop: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default ShowProductsScreen

