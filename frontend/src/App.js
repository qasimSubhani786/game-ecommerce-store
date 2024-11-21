import React from "react";
import "./App.css";
import ContextProvider from "./utils/context-api/contextProvider";
import ErrorBoundary from "./ErrorBoundary";
import BaseRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./utils/store";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Provider store={store}>
        <ContextProvider>
          <ErrorBoundary>
            <BaseRoutes />
          </ErrorBoundary>
        </ContextProvider>
      </Provider>
    </>
  );
}

export default App;
