import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CheckExistProductInLikedList, GetAllKeys, GetAllProduct, RemoveProduct, StoreData } from '../../storage/product.liked.storage';

const { width } = Dimensions.get('window');

// marginHorizontal
const CARD_MARGIN_HORIZONTAL = 5; // 1 card
const CARD_WIDTH_HAlFSCREEN = (width / 2) - CARD_MARGIN_HORIZONTAL * 2; // 2 card in 1 colum
const CARD_WIDTH_FULLSCREEN = width - CARD_MARGIN_HORIZONTAL * 2;

const ProductCard = ({ product, fullscreen, pressIcon = undefined }: { product: IProduct, fullscreen: boolean, pressIcon?: () => Promise<void> | undefined }) => {
    const [liked, setLiked] = useState(false);
    const nav = useNavigation<NavigationProp<ProductStackParamList>>();
    const pressBtnViewDetail = (item: IProduct) => {
        nav.navigate("Detail", { product: item })
    }

    useEffect(() => {
        const checkIfLiked = async () => {
            const flag = await CheckExistProductInLikedList({ product });
            setLiked(flag);
        };

        checkIfLiked();

        // Lắng nghe sự kiện quay lại từ trang Detail
        const unsubscribe = nav.addListener('focus', () => {
            checkIfLiked(); // Kiểm tra lại trạng thái liked khi quay lại
        });

        // Cleanup listener
        return unsubscribe;
    }, [product, nav]);


    const pressLikedProduct = async ({ product }: { product: IProduct }) => {
        const flag = await CheckExistProductInLikedList({ product })
        if (flag) {
            await RemoveProduct({ product });
            setLiked(false);
        } else {
            await StoreData({ product });
            setLiked(true);
        }
        if (pressIcon) {
            pressIcon();
        }
    }

    return (
        <Pressable
            onPress={() => { pressBtnViewDetail(product) }}>
            <View style={fullscreen ? [styles.card, { width: CARD_WIDTH_FULLSCREEN }] : [styles.card, { width: CARD_WIDTH_HAlFSCREEN }]}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text numberOfLines={2} style={styles.productName}>{product.artName}</Text>

                <View style={styles.infoContainer}>
                    <Text style={styles.productPrice}>${product.price}</Text>
                    {product.limitedTimeDeal > 0 ?
                        (
                            <View style={styles.LimitedPercentContainer}>
                                <MaterialCommunityIcons name="sale" size={20} color="#e91e63" />
                                <Text style={styles.productDeal}>{product.limitedTimeDeal * 100}%</Text>
                            </View>
                        ) : (
                            <></>
                        )
                    }

                    <Pressable onPress={() => pressLikedProduct({ product })} style={styles.likeIcon}>
                        <AntDesign name={liked ? 'heart' : 'hearto'} size={24} color={liked ? '#e91e63' : '#666'} />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 15,
        marginHorizontal: CARD_MARGIN_HORIZONTAL,  // Khoảng cách giữa các card
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    productImage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    LimitedPercentContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 7,
    },
    productDeal: {
        marginLeft: 3,
        color: "red"
    },
    infoContainer: {
        paddingHorizontal: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productName: {
        paddingTop: 5,
        paddingHorizontal: 7,
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
