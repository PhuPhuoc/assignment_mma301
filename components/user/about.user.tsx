import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Text, View, Image, Button, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { GetUserLoggedIn, UserLogout } from "../../storage/user.login.storage";
import GetImageSource from "../../utils/getUserAvatar";
import { useAuth } from "../../auth/use.auth";

const AboutUserScreen = () => {
    const { logout } = useAuth();
    const [user, setUser] = useState<IUserInfo>();
    const [loading, setLoading] = useState(false);

    const getUserInStorage = async () => {
        setLoading(true); // Bắt đầu loading
        const user_logged_in = await GetUserLoggedIn();
        if (user_logged_in !== null) {
            setUser(user_logged_in);
        }
        setLoading(false); // Kết thúc loading
    };

    useFocusEffect(
        useCallback(() => {
            getUserInStorage();
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e91e63" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={GetImageSource(user?.imgSource)} style={styles.avatar} />
            <Text style={styles.username}>{user?.username}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <Pressable style={styles.logoutButton} onPress={() => logout()}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#e91e63', // Màu viền cho avatar
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: '#888',
        marginBottom: 20,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#e91e63',
        padding: 10,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default AboutUserScreen;
