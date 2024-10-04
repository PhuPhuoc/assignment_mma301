import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const FillterProductBrand = ({ brandFilter, userbrandFilter, setUserbrandFilter }: { brandFilter: string[], userbrandFilter: string[], setUserbrandFilter: (value: string[]) => void }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    // Khi component mount, check những brand nào đã được chọn ban đầu dựa vào userbrandFilter
    useEffect(() => {
        setSelectedBrands(userbrandFilter)
    }, []);

    const handleCheckboxChange = (isChecked: boolean, brand: string) => {
        let updatedSelectedBrands = []

        if (isChecked) {
            updatedSelectedBrands = [...selectedBrands, brand]
        } else {
            updatedSelectedBrands = selectedBrands.filter((item) => item !== brand)
        }
        setSelectedBrands(updatedSelectedBrands)
    };

    const handleCloseModal = () => {
        setIsOpen(false)
        setUserbrandFilter(selectedBrands)
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setIsOpen(true)}>
                <View style={styles.btnFillter}>
                    <FontAwesome6 name="filter" size={17} color="#e91e63" />
                </View>
            </Pressable>

            <Modal
                visible={isOpen}
                transparent={true}
                animationType="slide"
                onRequestClose={() => handleCloseModal()}
            >
                <Pressable style={styles.modalOverlay} onPress={() => handleCloseModal()}>
                    <View style={styles.modalContainer} onTouchStart={(e) => e.stopPropagation()}>
                        {brandFilter.length > 0 ? (
                            brandFilter.map((brand, index) => (
                                <View key={brand + index} style={styles.checkboxContainer}>
                                    <BouncyCheckbox
                                        size={25}
                                        fillColor="#e91e63"
                                        iconStyle={{ borderColor: "#e91e63" }}
                                        innerIconStyle={{ borderWidth: 2 }}
                                        isChecked={selectedBrands.includes(brand)}  // Check true nếu brand nằm trong selectedBrands
                                        onPress={(isChecked: boolean) => handleCheckboxChange(isChecked, brand)}
                                        textComponent={<Text style={styles.checkboxText}>{brand}</Text>}
                                    />
                                </View>
                            ))
                        ) : (
                            <Text>No review list found</Text>
                        )}
                        <View style={styles.line}></View>
                        <View style={styles.btnClear}>
                            <Pressable
                                onPress={() => {
                                    setSelectedBrands([])
                                    setUserbrandFilter([])
                                    setIsOpen(false)
                                }}
                            >
                                <Text style={styles.txtBtnClear}>Clear Filter</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "15%",
    },
    btnFillter: {
        borderColor: "#e91e63",
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        width: '90%',
        maxHeight: '70%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 23,
        alignItems: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    line: {
        borderColor: "#ddd",
        borderWidth: 1,
        width: "100%",
        marginTop: 10,
        marginBottom: 20
    },
    btnClear: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#e91e63",
        borderRadius: 20,
    },
    txtBtnClear: {
        textAlign: "center",
        fontSize: 17,
        color: "#fff"
    }
});


export default FillterProductBrand
