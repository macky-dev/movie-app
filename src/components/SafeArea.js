import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const SafeArea = ({ children }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#fff" }}
        edges={["right", "top", "left"]}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SafeArea;
