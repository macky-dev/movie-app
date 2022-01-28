import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/store";
import SafeArea from "./src/components/SafeArea";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <Provider store={store}>
      <SafeArea>
        <Navigation />
        <StatusBar style="dark" />
      </SafeArea>
    </Provider>
  );
}
