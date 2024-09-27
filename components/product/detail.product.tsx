import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { RouteProp, useRoute } from '@react-navigation/native';

// const ProductDetailScreen = ({ route }: { route: any }) => {
//     const { product }: { product: IProduct } = route.params;

const ProductDetailScreen = () => {
    const route = useRoute<RouteProp<ProductStackParamList>>();
    const product = route.params?.product
    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Product not found SOS</Text>
            </View>
        );
    }
    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.productImage} />

            <View style={styles.detailsContainer}>
                <Text style={styles.productName}>{product.name}</Text>

                <View style={styles.priceLikeContainer}>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <TouchableOpacity>
                        <AntDesign
                            name={product.liked ? 'heart' : 'hearto'}
                            size={30}
                            color={product.liked ? '#e91e63' : '#666'}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.productDescription}>{product.desc}</Text>

                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    productImage: {
        width: '100%',
        height: 300,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 20,
    },
    detailsContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -30,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    priceLikeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    productPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#e91e63',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#555',
    },
    productDescription: {
        fontSize: 16,
        color: '#666',
        marginVertical: 10,
        lineHeight: 22,
    },
    buyButton: {
        marginTop: 30,
        backgroundColor: '#e91e63',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#e91e63',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProductDetailScreen;
