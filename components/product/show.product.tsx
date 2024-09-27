import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native"
import ProductCard from "../card/card.product";

const dummy_products: IProduct[] = [
    { id: 1, name: 'Product 1', price: '$20.00', image: 'https://via.placeholder.com/150', liked: false, description: "huhuhu" },
    { id: 2, name: 'Product 2', price: '$45.00', image: 'https://via.placeholder.com/150', liked: true, description: "huhuhu" },
    { id: 3, name: 'Product 3', price: '$99.00', image: 'https://via.placeholder.com/150', liked: false, description: "huhuhu" },
    { id: 4, name: 'Product 4', price: '$20.00', image: 'https://via.placeholder.com/150', liked: false, description: "huhuhu" },
    { id: 5, name: 'Product 5', price: '$45.00', image: 'https://via.placeholder.com/150', liked: true, description: "huhuhu" },
    { id: 6, name: 'Product 6', price: '$99.00', image: 'https://via.placeholder.com/150', liked: false, description: "huhuhu" },
    { id: 7, name: 'Product 7', price: '$20.00', image: 'https://via.placeholder.com/150', liked: false, description: "huhuhu" },
    { id: 8, name: 'Product 8', price: '$45.00', image: 'https://via.placeholder.com/150', liked: true, description: "huhuhu" },
    { id: 9, name: 'Product 9', price: '$99.00', image: 'https://via.placeholder.com/150', liked: false, description: "huhuhu" },
];

const ShowProductsScreen = () => {
    const [products, setProducts] = useState<IProduct[]>(dummy_products)

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductCard product={item} fullscreen={false} />}
                keyExtractor={item => item.id + item.name}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24
    }
})

export default ShowProductsScreen
