import { RouteObject } from "react-router-dom";
import Home from "../components/pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/pages/Login";
import Orders from "../components/pages/Orders";
import DetailOrder from "../components/pages/DetailOrder";
import CreateOrder from "../components/pages/CreateOrder";
import Navbar from "../components/pages/Navbar/Navbar";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders/:id",
    element: (
      <ProtectedRoute>
        <Navbar />
        <DetailOrder />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create",
    element: (
      <ProtectedRoute>
        <Navbar />
        <CreateOrder />
      </ProtectedRoute>
    ),
  },
];

export default routes;
