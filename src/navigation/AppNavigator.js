import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import ReviewScreen from "../screens/ReviewScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{
          headerStatusBarHeight: 0,
          title: "Movie Detail",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="MovieReviews"
        component={ReviewScreen}
        options={{
          headerStatusBarHeight: 0,
          title: "Movie Reviews",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
