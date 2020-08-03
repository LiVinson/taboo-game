import React from "react"
import ReactDOM from "react-dom"
import {createStore} from "redux"
import { Provider } from "react-redux"
import rootReducer from "store/reducers/rootReducer"
import { ThemeProvider } from "styled-components"
import "./index.scss"
import App from "App"
import GlobalStyle from "./global-design/globalStyles";
import theme from "./global-design/theme";

const store = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <GlobalStyle />
      <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

