import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./Palette.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import "./Global.css";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import store from "../store";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <Provider store={store}>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  );
}

export default App;
