import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import ProductCard from "../card/card.product";
import { GetAllProduct, RemoveAllProduct } from "../../storage/product.liked.storage";
import { useFocusEffect } from "@react-navigation/native";

const LikedProductScreen = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)


    const fetchProducts = async () => {
        setLoading(true); // Bắt đầu loading
        const product_in_storage = await GetAllProduct();
        setProducts(product_in_storage);
        setLoading(false); // Kết thúc loading
    };

    useFocusEffect(
        useCallback(() => {
            fetchProducts();
            // Cleanup function (optional)
            return () => {
                // Thực hiện các hành động cleanup nếu cần
            };
        }, []) // Empty dependency array
    );

    const handleRefresh = async () => {
        await fetchProducts(); // Gọi lại hàm khi người dùng kéo lên trên cùng
    };


    const handleDeleteAllProductInLiked = async () => {
        await RemoveAllProduct()
        await fetchProducts();
    }

    if (products?.length === 0) {
        return (
            <View style={styles.NoProductContainer}>
                <Text style={styles.NoProductText}>There are currently no favorite products.</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.btnLogoutContainer}>
                <Pressable
                    style={styles.logoutButton}
                    onPress={async () => await handleDeleteAllProductInLiked()}
                >
                    <Text style={styles.loginButtonText}>Delete All</Text>
                </Pressable>
            </View>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductCard product={item} fullscreen={true} pressIcon={() => handleRefresh()} />}
                keyExtractor={item => item.id + ""}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={handleRefresh}
                ListFooterComponent={() => {
                    return products.length > 0 ? (
                        <View style={styles.footerContainer}>
                            <Text style={styles.footerText}>All products have been loaded</Text>
                        </View>
                    ) : null;
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    footerContainer: {
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#CCCCCC',
    },
    container: {
        flex: 1,
        paddingBottom: 24
    },
    NoProductContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    NoProductText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#e91e63"
    },
    btnLogoutContainer: {
        marginVertical: 15,
        marginLeft: 5,
        justifyContent: "center",
        alignItems: 'flex-start',
    },
    logoutButton: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: "#e91e63",
        borderWidth: 2,
    },
    loginButtonText: {
        color: '#e91e63',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default LikedProductScreen
