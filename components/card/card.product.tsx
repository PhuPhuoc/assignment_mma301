import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const CARD_WIDTH_HAlFSCREEN = (width / 2) - 10;
const CARD_WIDTH_FULLSCREEN = width - 10;

const ProductCard = ({ product, fullscreen }: { product: IProduct, fullscreen: boolean }) => {

    const nav = useNavigation<NavigationProp<ProductStackParamList>>();
    const pressBtnViewDetail = (item: IProduct) => {
        nav.navigate("Detail", { product: item })
    }

    return (
        <Pressable
            onPress={() => { pressBtnViewDetail(product) }}>
            <View style={fullscreen ? [styles.card, { width: CARD_WIDTH_FULLSCREEN }] : [styles.card, { width: CARD_WIDTH_HAlFSCREEN }]}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <TouchableOpacity onPress={() => { }} style={styles.likeIcon}>
                        <AntDesign name={product.liked ? 'heart' : 'hearto'} size={24} color={product.liked ? '#e91e63' : '#666'} />
                    </TouchableOpacity>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        // width: CARD_WIDTH,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 15,
        marginHorizontal: 5,  // Khoảng cách giữa các card
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    productImage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    infoContainer: {
        paddingHorizontal: 7,
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productName: {
        paddingTop: 5,
        paddingLeft: 7,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
    },
    productPrice: {
        fontSize: 16,
        color: '#e91e63',
        fontWeight: 'bold',
    },
    likeIcon: {
        padding: 8,
    },
});

export default ProductCard;
