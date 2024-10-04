import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CheckExistProductInLikedList, RemoveProduct, StoreData } from '../../storage/product.liked.storage';
import BouncyCheckbox from "react-native-bouncy-checkbox";


const FavoriteProductCard = ({ product, listSelected, setListSelected, pressIcon = undefined }: { product: IProduct, listSelected: IProduct[], setListSelected: (product: IProduct[]) => void, pressIcon?: () => Promise<void> | undefined }) => {
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

    const handleCheckboxChange = (isChecked: boolean, product: IProduct) => {
        let updatedSelectedProduct = []

        if (isChecked) {
            updatedSelectedProduct = [...listSelected, product]
        } else {
            updatedSelectedProduct = listSelected.filter((item) => item !== product)
        }
        setListSelected(updatedSelectedProduct)
    };

    return (
        <Pressable
            onPress={() => { pressBtnViewDetail(product) }}>
            <View style={styles.card}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.cardInfo}>
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
                <View style={styles.cardCheckboxBorder}></View>
                <View style={styles.cardCheckbox}>
                    <BouncyCheckbox
                        size={35}
                        fillColor="#e91e63"
                        iconStyle={{ borderColor: "#e91e63" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        isChecked={listSelected.includes(product)}  // Check true nếu brand nằm trong selectedBrands
                        onPress={(isChecked: boolean) => handleCheckboxChange(isChecked, product)}
                    // textComponent={<Text style={styles.checkboxText}>{brand}</Text>}
                    />
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
        marginBottom: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 5
    },
    productImage: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardInfo: {
        width: "60%",
    },
    cardCheckboxBorder: {
        borderLeftColor: "#ddd",
        borderLeftWidth: 1,
        marginHorizontal: 3,
        height: 70
    },
    cardCheckbox: {
        marginStart: 10,
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

export default FavoriteProductCard;
