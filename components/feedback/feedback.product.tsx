import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import DummyFeedback from '../../assets/feedback.json'
import CustomPicker from './costom.picker.star';


const ProductFeedback = () => {
    const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
    const [fillterFBList, setFillterFBList] = useState<FillterFeedback[]>([]);
    const [selectedOption, setSelectedOption] = useState<FillterFeedback>(
        { label: "All feedbacks", rating: "All feedbacks", totalFB: 0, listFB: [] }
    );

    const getFillterProductFeedback = () => {
        const listFillter: FillterFeedback[] = [
            { label: "1 star", rating: "1", totalFB: 0, listFB: [] },
            { label: "2 star", rating: "2", totalFB: 0, listFB: [] },
            { label: "3 star", rating: "3", totalFB: 0, listFB: [] },
            { label: "4 star", rating: "4", totalFB: 0, listFB: [] },
            { label: "5 star", rating: "5", totalFB: 0, listFB: [] },
            { label: "All feedbacks", rating: "All feedbacks", totalFB: 0, listFB: [] },
        ]

        for (let fb of feedbackList) {
            listFillter[listFillter.length - 1].listFB.push(fb)
            listFillter[listFillter.length - 1].totalFB++
            switch (fb.rating) {
                case 1:
                    listFillter[0].listFB.push(fb)
                    listFillter[0].totalFB++
                    break;
                case 2:
                    listFillter[1].listFB.push(fb)
                    listFillter[1].totalFB++
                    break;
                case 3:
                    listFillter[2].listFB.push(fb)
                    listFillter[2].totalFB++
                    break;
                case 4:
                    listFillter[3].listFB.push(fb)
                    listFillter[3].totalFB++
                    break;
                case 5:
                    listFillter[4].listFB.push(fb)
                    listFillter[4].totalFB++
                    break;
                default:
                    console.log("invalid feedback: ", fb)
                    break;
            }
        }
        setSelectedOption(listFillter[listFillter.length - 1])
        setFillterFBList(listFillter)
    }

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = DummyFeedback
                setFeedbackList(response)
            } catch (error) {
                console.error("Error loading feedback:", error)
            }
        };

        fetchFeedback();
    }, []);

    useEffect(() => {
        if (feedbackList.length > 0) {
            getFillterProductFeedback();
        }
    }, [feedbackList]);

    const calculateAverageRating = (): string => {
        if (feedbackList.length === 0) {
            let zero = 0
            return zero.toString()
        }
        const totalStar =
            feedbackList.reduce((totalStart, fb) => totalStart + fb.rating, 0) / feedbackList.length

        return totalStar.toFixed(1).toString()
    }
    const averageRating = calculateAverageRating();


    return (
        <View style={styles.container}>
            <View style={styles.fbContainer}>
                <View style={styles.averageContainer}>
                    <Text style={styles.averageText}>Average Rating</Text>
                    <View style={styles.averageRating}>
                        <Text style={styles.averageScore}>
                            {averageRating}
                        </Text>
                        <AntDesign name="star" size={24} color="#FFD700" />
                    </View>
                </View>
                <View style={styles.middleLine}>

                </View>
                <CustomPicker
                    fillterList={fillterFBList}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                />
            </View>
            <View style={styles.cardComment}>
                {selectedOption.listFB.length > 0 ? (
                    selectedOption.listFB.map((feedback, index) => (
                        <View key={index} style={styles.CommentContainer}>
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
                    <Text>There are currently no Feedbacks</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    middleLine: {
        borderColor: "#ddd",
        borderWidth: 0.7,
    },
    fbContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 20,
    },
    averageContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    averageText: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'bold',
        color: "#e91e63",
        textAlign: "center"
    },
    averageRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    averageScore: {
        fontSize: 23,
        fontWeight: 'bold',
        marginRight: 5,
    },
    feedbackContainer: {
    },
    cardComment: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 20,
    },
    CommentContainer: {
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
