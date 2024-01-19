import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"
import { Home } from "./pages/Home"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DeletePatientModalProvider } from "./contexts/DeletePatientModalContext";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <DeletePatientModalProvider>
        <Home />
      </DeletePatientModalProvider>

      <ToastContainer theme="colored" />
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
