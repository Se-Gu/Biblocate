import { NavigationContainer } from "@react-navigation/native";
import Navbar from "./navigation/Navbar";
import { ThemeProvider, Button, createTheme } from "@rneui/themed";

const theme = createTheme({
  components: {
    Button: {
      raised: true,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Navbar />
      </NavigationContainer>
    </ThemeProvider>
  );
}
