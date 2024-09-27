import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AboutUserScreen from "../components/user/about.user";
import LikedProductScreen from "../components/product/liked.product";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowProductsScreen from "../components/product/show.product";
import ProductDetailScreen from "../components/product/detail.product";

import AntDesign from '@expo/vector-icons/AntDesign';


const ProductNavigator = () => {
    const Stack = createNativeStackNavigator<ProductStackParamList>();
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={ShowProductsScreen} options={{ title: "Home Page" }} />
            <Stack.Screen name="Detail" component={ProductDetailScreen} options={{ title: "Review Detail" }} />
        </Stack.Navigator>
    );
}

const LikedProductNavigator = () => {
    const Stack = createNativeStackNavigator<ProductStackParamList>();
    return (
        <Stack.Navigator initialRouteName="Liked">
            <Stack.Screen name="Liked" component={LikedProductScreen} options={{ title: "Favorite Products" }} />
            <Stack.Screen name="Detail" component={ProductDetailScreen} options={{ title: "Review Detail" }} />
        </Stack.Navigator>
    );
}

const AppNavigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveBackgroundColor: "#F5F5F5",
                    tabBarActiveTintColor: '#e91e63',
                    tabBarStyle: {
                        height: 70,
                    },
                    tabBarItemStyle: {
                        margin: 10,
                        borderRadius: 23,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                    }
                }}
            >
                <Tab.Screen
                    name="ProductPage"
                    component={ProductNavigator}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ focused }) => (
                            <AntDesign name="home" size={focused ? 26 : 22} color={focused ? "#e91e63" : "#BEBEBE"} />
                        ),
                    }} />
                {/* <Tab.Screen
                    name="About"
                    component={AboutUserScreen}
                    options={{
                        tabBarLabel: 'About',
                        tabBarIcon: ({ focused }) => (
                            <AntDesign name="infocirlceo" size={focused ? 26 : 22} color={focused ? "#e91e63" : "#BEBEBE"} />
                        ),
                    }} /> */}
                <Tab.Screen
                    name="LikedPage"
                    component={LikedProductNavigator}
                    options={{
                        tabBarLabel: 'Liked',
                        tabBarIcon: ({ focused }) => (
                            <AntDesign name="heart" size={focused ? 26 : 22} color={focused ? "#e91e63" : "#BEBEBE"} />
                        ),
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator
