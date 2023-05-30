import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewsView from "./screens/NewsView";
import ReadLater from "./screens/ReadLater";
import NewsDetail from "./screens/NewsDetail";
import { Ionicons } from "@expo/vector-icons";
import FavoritesContextProvider from "./store/context/favorites-context";

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "#3f2f25" },
      }}
    >
      <Stack.Screen name="Latest News" component={NewsView} />
      <Stack.Screen name="Detailed News" component={NewsDetail} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesContextProvider>
      <NavigationContainer>
        <BottomTabs.Navigator
          screenOptions={{
            headerShown: true,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#351401" },
            headerTintColor: "white",
            tabBarStyle: {
              height: 90,
              paddingHorizontal: 5,
              paddingTop: 0,
              backgroundColor: "#351401",
              position: "absolute",
              borderTopWidth: 0,
            },
            contentStyle: { backgroundColor: "#3f2f25" },
          }}
        >
          <BottomTabs.Screen
            name="News"
            component={StackNav}
            options={{
              // title: "All Categories",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="newspaper" size={24} color="gray" />
              ),
            }}
          />
          <BottomTabs.Screen
            name="Later"
            component={ReadLater}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="bookmark" size={24} color="gray" />
              ),
            }}
          />
        </BottomTabs.Navigator>
      </NavigationContainer>
    </FavoritesContextProvider>
  );
}
