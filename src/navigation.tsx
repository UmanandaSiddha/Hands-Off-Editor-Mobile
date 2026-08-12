import React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBar} from './components/TabBar';
import {colors, fonts} from './theme';

import {SignInScreen} from './screens/SignIn';
import {OnboardingScreen} from './screens/Onboarding';
import {HomeScreen} from './screens/Home';
import {ProjectsScreen} from './screens/Projects';
import {ClipDeckScreen} from './screens/ClipDeck';
import {ClipPreviewScreen} from './screens/ClipPreview';
import {AssistantScreen} from './screens/Assistant';
import {StatsScreen} from './screens/Stats';
import {ProfileScreen} from './screens/Profile';
import {ExportHistoryScreen} from './screens/ExportHistory';
import {NotificationsScreen} from './screens/Notifications';
import {SettingsScreen} from './screens/Settings';
import {PricingScreen} from './screens/Pricing';

export type RootStackParamList = {
  SignIn: undefined;
  Onboarding: undefined;
  Tabs: undefined;
  ClipPreview: {index: number};
  Assistant: undefined;
  Projects: undefined;
  ExportHistory: undefined;
  Notifications: undefined;
  Settings: undefined;
  Pricing: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    card: colors.sidebar,
    text: colors.text,
    border: colors.line,
    primary: colors.accent,
  },
};

/** Pushed screens share this chrome: dark header, no shadow, back arrow only. */
const pushedScreen = {
  headerStyle: {backgroundColor: colors.bg},
  headerTitleStyle: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontSize: 16,
  },
  headerTintColor: colors.text,
  headerShadowVisible: false,
} as const;

function Tabs() {
  return (
    <Tab.Navigator
      tabBar={TabBar}
      screenOptions={{headerShown: false, sceneStyle: {backgroundColor: colors.bg}}}>
      <Tab.Screen name="Home" component={HomeScreen} options={{title: 'Home'}} />
      <Tab.Screen
        name="Clips"
        component={ClipDeckScreen}
        options={{title: 'Clips'}}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{title: 'Stats'}}
      />
      <Tab.Screen name="You" component={ProfileScreen} options={{title: 'You'}} />
    </Tab.Navigator>
  );
}

export function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: colors.bg},
        }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />

        <Stack.Screen
          name="ClipPreview"
          component={ClipPreviewScreen}
          options={{presentation: 'fullScreenModal'}}
        />
        <Stack.Screen
          name="Assistant"
          component={AssistantScreen}
          options={{presentation: 'modal'}}
        />

        <Stack.Group screenOptions={{headerShown: true, ...pushedScreen}}>
          <Stack.Screen
            name="Projects"
            component={ProjectsScreen}
            options={{title: 'Projects'}}
          />
          <Stack.Screen
            name="ExportHistory"
            component={ExportHistoryScreen}
            options={{title: 'Export history'}}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{title: 'Notifications'}}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{title: 'Settings'}}
          />
          <Stack.Screen
            name="Pricing"
            component={PricingScreen}
            options={{title: 'Plans'}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
