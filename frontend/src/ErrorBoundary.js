import React from "react";
import { Route, Routes } from "react-router-dom";
import { path } from "./common/routesNames";
import { ALL_TEXT } from "./common/constants";

class ErrorBoundary extends React.Component {
  state = {
    error: null,
  };
  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI.
    return { error: true };
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return (
        <>
          <p>{ALL_TEXT.SOMETHING_ERROR}</p>
          <Routes>
            <Route to={path.login} />
          </Routes>
        </>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
