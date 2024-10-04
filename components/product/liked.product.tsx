import { useCallback, useEffect, useState } from "react";
import { Button, FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import ProductCard from "../card/card.product";
import { GetAllProduct, RemoveAllProduct, RemoveProduct } from "../../storage/product.liked.storage";
import { useFocusEffect } from "@react-navigation/native";
import FavoriteProductCard from "../card/card.favorite.product";

const LikedProductScreen = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)

    const [listSelected, setListSelected] = useState<IProduct[]>([])


    const fetchProducts = async () => {
        setLoading(true); // Bắt đầu loading
        const product_in_storage = await GetAllProduct();
        setProducts(product_in_storage.reverse());
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

    const handleDeleteSelected = async () => {
        for (const product of listSelected) {
            await RemoveProduct({ product });
        }
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
            <View style={styles.btnDeleteAllContainer}>
                <View style={styles.btnDeleteContainer}>
                    <Pressable
                        style={styles.btnSelectAll}
                        onPress={async () => { setListSelected(products) }}
                    >
                        <Text style={styles.txtSelectAll}>Select All</Text>
                    </Pressable>
                    <Pressable
                        style={styles.btnClearSelect}
                        onPress={async () => { setListSelected([]) }}
                    >
                        <Text style={styles.txtClearSelect}>Clear select</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable
                        disabled={listSelected.length === 0}
                        style={listSelected.length === 0 ? styles.btnDeleteDisable : styles.btnDelete}
                        onPress={async () => { await handleDeleteSelected() }}
                    >
                        <Text style={listSelected.length === 0 ? styles.btnDeleteTextDisable : styles.btnDeleteText}>Delete</Text>
                    </Pressable>
                </View>
            </View>
            <FlatList
                data={products}
                renderItem={({ item }) => <FavoriteProductCard product={item} listSelected={listSelected} setListSelected={setListSelected} pressIcon={() => handleRefresh()} />}
                keyExtractor={item => item.id + ""}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={handleRefresh}
                ListFooterComponent={() => {
                    return products.length > 0 ? (
                        <View style={styles.footerContainer}>
                            <Text style={styles.footerText}>All favorite products have been loaded</Text>
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
    btnDeleteAllContainer: {
        marginVertical: 15,
        marginLeft: 5,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: 'flex-start',

    },
    btnDeleteContainer: {
        flexDirection: "row",
        alignItems: 'flex-start',
        justifyContent: "flex-start",
    },
    btnDelete: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: "red",
        borderWidth: 2,
        marginEnd: 5
    },
    btnDeleteText: {
        color: 'red',
        fontSize: 13,
        fontWeight: 'bold',
    },
    btnDeleteDisable: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: "#DDDDDD",
        borderWidth: 2,
        marginEnd: 5
    },
    btnDeleteTextDisable: {
        color: '#DDDDDD',
        fontSize: 13,
        fontWeight: 'bold',
    },
    btnSelectAll: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: "#FF6600",
        borderWidth: 2,
        marginEnd: 5
    },
    txtSelectAll: {
        color: '#FF6600',
        fontSize: 13,
        fontWeight: 'bold',
    },
    btnClearSelect: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: "#33CCFF",
        borderWidth: 2,
        marginEnd: 5
    },
    txtClearSelect: {
        color: '#33CCFF',
        fontSize: 13,
        fontWeight: 'bold',
    },
})

export default LikedProductScreen
