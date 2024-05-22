import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./page/home-page/HomePage";
import MainLayout from "./component/main-layout/MainLayout";

function App() {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
