import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoute from "../Routes/PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/aboutUs',
                Component: AboutUs
            },
            {
                path: '/coverage',
                Component: Coverage
            },
            {
                path: '/sendparcel',
                element: <PrivateRoute>
                    <SendParcel />
                </PrivateRoute>
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    }
]);
export default router;