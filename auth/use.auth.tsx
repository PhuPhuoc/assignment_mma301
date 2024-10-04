import React, { createContext, useState, ReactNode, useContext } from 'react';
import { CheckUserLoggedIn, StoreUserLoginInfo, UserLogout } from '../storage/user.login.storage';

const duumyEmail: string = "phuoc"
const duumyPass: string = "123"

const dummyUser: IUserInfo = {
    userId: "1",
    username: "Phu Phuoc",
    email: "phuoc@gmail.com",
    imgSource: "red_user.png"
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const loginByExistUser = async () => {
        const loggedin = await CheckUserLoggedIn();
        if (loggedin) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }

    const loginWithEmailPassword = (email: string | null, password: string | null) => {
        if (email === duumyEmail && password === duumyPass) {
            StoreUserLoginInfo(dummyUser)
            setIsLoggedIn(true)
            return;
        } else {
            alert("Wrong email or password!")
        }
        return;
    }

    const logout = async () => {
        await UserLogout()
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, loginByExistUser, loginWithEmailPassword, logout }} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
