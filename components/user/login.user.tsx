import React, { useEffect, useState } from "react";
import { Button, Text, View, TextInput, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { useAuth } from "../../auth/use.auth";

const LoginScreen = () => {
    const { loginByExistUser, loginWithEmailPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        loginByExistUser()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Please log in to continue</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
            />

            <Pressable onPress={() => loginWithEmailPassword(email, password)} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Log In</Text>
            </Pressable>

            <Pressable onPress={() => { /* handle forgot password */ }}>
                <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </Pressable>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <Pressable onPress={() => { /* handle sign up */ }}>
                    <Text style={styles.signupText}>Sign Up</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPassword: {
        color: '#e91e63',
        marginTop: 15,
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        marginTop: 30,
    },
    footerText: {
        color: '#888',
    },
    signupText: {
        color: '#e91e63',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
