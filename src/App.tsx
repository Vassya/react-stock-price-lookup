import * as React from "react";
import routes from "./config/routesConfig";
import { Dashboard } from "Pages/Dashboard";
import { AppProvider } from "AppContext";
import ApiCalls from "api";
import "fake-backend";

export const App = () => {
  const api = new ApiCalls(
    "https://sandbox.iexapis.com/stable/",
    { Id: 1, Name: "Vasile", isAdmin: true }
  );

  return (
    <AppProvider routes={routes} api={api}>
      <Dashboard />
    </AppProvider>
  );
};

export default App;