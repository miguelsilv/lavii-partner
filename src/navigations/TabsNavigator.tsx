import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ActivitiesScreen from "@/screens/Tabs/Activities";
import HomeScreen from "@/screens/Tabs/Home";
import TestScreen from "@/screens/Tabs/Test";

const Tab = createBottomTabNavigator();

function DemoTab({ route }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{route.name} Screen</Text>
    </View>
  );
}

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName = options.tabBarIcon;
        const label = options.title || route.name;

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.tabBarItem}
          >
            {iconName &&
              iconName({
                focused: isFocused,
                color: isFocused ? "#A47864" : "#000",
                size: 24,
              })}
            <Text
              style={{
                color: isFocused ? "#A47864" : "#000",
                fontSize: 12,
                marginTop: 4,
              }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Início",
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <Ionicons name="home" color={color} size={size} />
            ) : (
              <Ionicons name="home-outline" color={color} size={size} />
            );
          },
        }}
      />
      <Tab.Screen
        name="activity"
        component={ActivitiesScreen}
        options={{
          title: "Atividade",
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <Ionicons name="time" color={color} size={size} />
            ) : (
              <Ionicons name="time-outline" color={color} size={size} />
            );
          },
        }}
      />
      <Tab.Screen
        name="alert"
        component={DemoTab}
        options={{
          title: "Notificações",
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <Ionicons name="notifications" color={color} size={size} />
            ) : (
              <Ionicons
                name="notifications-outline"
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="settings"
        component={TestScreen}
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <Ionicons name="person" color={color} size={size} />
            ) : (
              <Ionicons name="person-outline" color={color} size={size} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    height: 70,
    borderRadius: 15,
    backgroundColor: "#a4786433",
    marginHorizontal: 24,
    marginBottom: 24,
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabBarItem: {
    alignItems: "center",
    justifyContent: "center",
  },
});
