import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./Palette.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import "./Global.css";
import { MantineProvider } from "@mantine/core";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <MantineProvider>
        <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
