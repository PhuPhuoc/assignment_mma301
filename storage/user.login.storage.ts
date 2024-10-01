import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEY_USER_LOGIN } from '../utils/const';

const key = KEY_USER_LOGIN

const StoreUserLoginInfo = async (userInfo: IUserInfo) => {
    try {
        const jsonValue = JSON.stringify(userInfo);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error("cannot save user login info to local storage: ", e)
    }
};

const CheckUserLoggedIn = async (): Promise<boolean> => {
    try {
        const userJson = await AsyncStorage.getItem(key);
        console.log("user loggin in: ", userJson)
        if (userJson !== null) {
            return true
        }
    } catch (e) {
        console.error("cannot check user login info in local storage: ", e)
    }
    return false
}

const GetUserLoggedIn = async (): Promise<IUserInfo | null> => {
    try {
        const userJson = await AsyncStorage.getItem(key);
        if (userJson !== null) {
            return JSON.parse(userJson) as IUserInfo
        }
    } catch (e) {
        console.error("cannot save user login info to local storage: ", e)
    }
    return null
}

const UserLogout = async () => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.error("cannot log out user in local storage: ", e)
    }
    console.log('Done.')
}

export { CheckUserLoggedIn, StoreUserLoginInfo, UserLogout, GetUserLoggedIn }
