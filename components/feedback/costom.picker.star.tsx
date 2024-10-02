import { useState } from "react";
import { Pressable, StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

const CustomPicker = ({ fillterList, selectedOption, setSelectedOption }: { fillterList: FillterFeedback[], selectedOption: FillterFeedback, setSelectedOption: (value: FillterFeedback) => void }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View style={styles.pickerContainer}>
            <Pressable onPress={() => setIsOpen(true)} style={styles.pickerButton}>
                <View style={styles.selectedOptionContainer}>
                    <Text>{selectedOption.rating === "All feedbacks" ? `${selectedOption.rating}` : ''}</Text>
                    {selectedOption && selectedOption.rating !== "all" && (
                        // <AntDesign name="star" size={18} color="#FFD700" />
                        <View style={styles.ratingContainer}>
                            {Array.from({ length: parseInt(selectedOption.rating) }).map((_, starIndex) => (
                                <AntDesign key={starIndex} name="star" size={18} color="#FFD700" />
                            ))}
                        </View>
                    )}
                </View>
                <Ionicons name="chevron-down-circle-outline" size={27} color="#e91e63" />
            </Pressable>

            <Modal
                visible={isOpen}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsOpen(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
                    <View style={styles.modalContainer} onTouchStart={(e) => e.stopPropagation()}>
                        {fillterList.length > 0 ? (
                            fillterList.slice().reverse().map((fb, index) => (
                                <Pressable
                                    key={index}
                                    style={styles.cardfbContainer}
                                    onPress={() => {
                                        setSelectedOption(fb);
                                        setIsOpen(false);
                                    }}
                                >
                                    {fb.rating === "All feedbacks" ? (
                                        <Text style={styles.ratingText}>All Feedbacks</Text>
                                    ) : (
                                        <View style={styles.ratingContainer}>
                                            {Array.from({ length: parseInt(fb.rating) }).map((_, starIndex) => (
                                                <AntDesign key={starIndex} name="star" size={18} color="#FFD700" />
                                            ))}
                                        </View>
                                    )}
                                    <Text style={styles.totalText}>{fb.totalFB} reviews</Text>
                                </Pressable>
                            ))
                        ) : (
                            <Text style={styles.noFeedbackText}>No review list found</Text>
                        )}
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 7,
        width: "50%"
    },
    pickerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    selectedOptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 30,
        alignItems: 'center',
    },
    cardfbContainer: {
        borderColor: "#e91e63",
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: '#f9f9f9',
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 8,
        width: '100%',
    },
    ratingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginEnd: 5,
    },
    totalText: {
        fontSize: 14,
        color: '#666',
        marginStart: 17,
    },
    noFeedbackText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomPicker;
