import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native"
import ProductCard from "../card/card.product";
import { GetAllProduct } from "../../storage/async.storage";
import { useFocusEffect } from "@react-navigation/native";

const LikedProductScreen = () => {
    const [products, setProducts] = useState<IProduct[]>()
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
        fetchProducts(); // Gọi lại hàm khi người dùng kéo lên trên cùng
    };

    if (products?.length === 0) {
        return (
            <View style={styles.NoProductContainer}>
                <Text>No product</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductCard product={item} fullscreen={true} />}
                keyExtractor={item => item.id + ""}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={handleRefresh}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24
    },
    NoProductContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }
})

export default LikedProductScreen
