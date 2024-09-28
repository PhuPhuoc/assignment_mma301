import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native"
import ProductCard from "../card/card.product";

const LikedProductScreen = () => {
    const [products, setProducts] = useState<IProduct[]>()

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductCard product={item} fullscreen={true} />}
                keyExtractor={item => item.id + ""}
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
