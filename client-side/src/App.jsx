import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./routes/homePage/homePage";
import Layout from "./routes/layout/layout";
import ListPage from "./routes/listPage/listPage";
import LoginPage from "./routes/loginPage/loginPage";
import ProfilePage from "./routes/profilePage/profilePage";
import RegisterPage from "./routes/registerPage/registerPage";
import SinglePage from "./routes/singlePage/singlePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
