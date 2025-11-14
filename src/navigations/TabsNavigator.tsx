import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ActivitiesScreen from "@/screens/Tabs/Activities";
import HomeScreen from "@/screens/Tabs/Home";
import SettingsScreen from "@/screens/Tabs/Settings";
import { alternativeColor, mutedColor, mutedLightColor, primaryLightColor } from "@lavii/ds";
import { Center, Container, Space } from "@lavii/ds";
import { RegularText } from "@lavii/ds";
import { scaleSize } from "@lavii/ds";

const Tab = createBottomTabNavigator();

function NotificationsTab({ route }: any) {
  return (
    <Container backgroundColor={alternativeColor} withVerticalPadding edges={{ top: "maximum", bottom: "maximum" }}>
      <Center>
        <MaterialIcons name="notifications" size={scaleSize(42)} color={mutedLightColor} />
        <Space size={scaleSize(16)} />
        <RegularText.Bold color={mutedColor}>Em breve teremos a central de notificações</RegularText.Bold>
      </Center>
    </Container>
  );
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
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
      layout={({ children, ...rest }) => <View style={{ flex: 1, backgroundColor: alternativeColor }}>{children}</View>}
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
        component={NotificationsTab}
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
        component={SettingsScreen}
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
    backgroundColor: primaryLightColor,
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
