import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Pressable, Modal } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { RouteProp, useRoute } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CheckExistProductInLikedList, RemoveProduct, StoreData } from '../../storage/product.liked.storage';
import ProductFeedback from '../feedback/feedback.product';
import ProductFeedback2 from '../feedback/demo.picker';

// const ProductDetailScreen = ({ route }: { route: any }) => {
//     const { product }: { product: IProduct } = route.params;

const ProductDetailScreen = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const route = useRoute<RouteProp<ProductStackParamList>>();
    const product = route.params?.product
    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Product not found SOS</Text>
            </View>
        );
    }

    const [liked, setLiked] = useState(false);
    useEffect(() => {
        const checkIfLiked = async () => {
            const flag = await CheckExistProductInLikedList({ product });
            setLiked(flag);
        };

        checkIfLiked();
    }, [product]);

    const pressLikedProduct = async ({ product }: { product: IProduct }) => {
        const flag = await CheckExistProductInLikedList({ product })
        if (flag) {
            await RemoveProduct({ product });
            setLiked(false);
        } else {
            await StoreData({ product });
            setLiked(true);
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Pressable
                onPress={() => setModalVisible(true)}
            >
                <Image source={{ uri: product.image }} style={styles.productImage} />
            </Pressable>

            <View style={styles.detailsContainer}>
                <Text style={styles.productName}>{product.artName}</Text>

                <View style={styles.brandDealContainer}>
                    <Text style={styles.brandTitle}>Brand: {product.brand}</Text>
                    <View style={styles.DealContainer}>
                        <Text style={styles.productDeal}>Limited Time Deal: {product.limitedTimeDeal * 100}%</Text>
                        <MaterialCommunityIcons name="sale" size={20} color="#e91e63" />
                    </View>
                </View>

                <View style={styles.priceLikeContainer}>
                    <Text style={styles.productPrice}>${product.price}</Text>
                    <Pressable onPress={() => pressLikedProduct({ product })}>
                        <AntDesign
                            name={liked ? 'heart' : 'hearto'}
                            size={30}
                            color={liked ? '#e91e63' : '#666'}
                        />
                    </Pressable>
                </View>


                <Text style={styles.sectionTitle}>Description: </Text>
                <Text style={styles.productDescription}>{product.description}</Text>

                <View style={styles.glassSurfaceContainer}>
                    <Text style={styles.glassSurfaceText}>
                        {product.glassSurface
                            ? 'This is a glass surface product'
                            : 'This is not a glass surface product'}
                    </Text>
                    <MaterialIcons
                        name={product.glassSurface ? 'check-circle' : 'cancel'}
                        size={24}
                        color={product.glassSurface ? 'green' : 'red'}
                    />
                </View>

                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
            
            <ProductFeedback />

            {/* modal for image */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Pressable
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <AntDesign name="closecircle" size={40} color="#fff" />
                    </Pressable>
                    <Image source={{ uri: product.image }} style={styles.fullScreenImage} />
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollContent: {
        paddingBottom: 30,
    },
    productImage: {
        width: '100%',
        height: 300,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
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
        marginBottom: 10,
    },
    productDeal: {
        color: "red",
        fontSize: 15,
        marginRight: 3,
    },
    brandDealContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    brandTitle: {
        fontSize: 17,
        color: "pink",
        fontStyle: "italic",
        fontWeight: "bold"
    },
    DealContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
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
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#555',
    },
    productDescription: {
        fontSize: 18,
        color: '#666',
        marginVertical: 10,
        lineHeight: 22,
    },
    glassSurfaceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    glassSurfaceText: {
        fontSize: 16,
        color: '#666',
        marginRight: 10,
    },
    buyButton: {
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    fullScreenImage: {
        width: '100%',
        height: '80%',
        resizeMode: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
});

export default ProductDetailScreen;
