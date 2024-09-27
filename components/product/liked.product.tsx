import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native"
import ProductCard from "../card/card.product";

const dummy_liked_products: IProduct[] = [
    { id: 2, name: 'Product 2', price: '$45.00', image: 'https://via.placeholder.com/150', liked: true, description: "huhuhu" },
    { id: 5, name: 'Product 5', price: '$45.00', image: 'https://via.placeholder.com/150', liked: true, description: "huhuhu" },
    { id: 8, name: 'Product 8', price: '$45.00', image: 'https://via.placeholder.com/150', liked: true, description: "huhuhu" },
];

const LikedProductScreen = () => {
    const [products, setProducts] = useState<IProduct[]>(dummy_liked_products)

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductCard product={item} fullscreen={true} />}
                keyExtractor={item => item.id + item.name}
                numColumns={1}
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

export default LikedProductScreen
