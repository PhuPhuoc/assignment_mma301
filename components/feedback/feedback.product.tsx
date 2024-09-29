import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import DummyFeedback from '../../assets/feedback.json'

const ProductFeedback = () => {
    const [feedbackList, setFeedbackList] = useState<IFeedback[]>([]);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = DummyFeedback;
                setFeedbackList(response);
            } catch (error) {
                console.error("Error loading feedback:", error);
            }
        };

        fetchFeedback();
    }, []);

    return (
        <View style={styles.container}>
            {feedbackList.length > 0 ? (
                feedbackList.map((feedback, index) => (
                    <View key={index} style={styles.feedbackContainer}>
                        <View style={styles.UserStartContainer}>
                            <Text style={styles.userName}>{feedback.user}</Text>
                            <View style={styles.ratingContainer}>
                                {[...Array(feedback.rating)].map((_, i) => (
                                    <AntDesign key={i} name="star" size={20} color="#FFD700" />
                                ))}
                            </View>
                        </View>
                        <Text style={styles.comment}>{feedback.comment}</Text>
                    </View>
                ))
            ) : (
                <Text>Không có phản hồi nào!</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 20,
    },
    feedbackContainer: {
        marginBottom: 15,
    },
    UserStartContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    comment: {
        fontSize: 14,
        color: '#666',
    },
});

export default ProductFeedback;
