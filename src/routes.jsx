import Layout from "./components/Layout";
import BasicTemplates from "./pages/BasicTemplates";
import Contacts from "./pages/Contacts";
import CreateTemplate from "./pages/CreateTemplate";
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/Demo";
import Home from "./pages/Home";
import MyTemplates from "./pages/MyTemplates";
import Preview from "./pages/Preview";
import SendMail from "./pages/SendMail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import { Navigate } from "react-router-dom";
import useAuthStatus from "./hooks/useAuthStatus";
import { useRecoilValue } from "recoil";
import { userInfo } from "./utils/atoms";

const ProtectedRoute = ({ children }) => {
  const recoilUser = useRecoilValue(userInfo);
  const { user, isLoading } = useAuthStatus();

  if (!isLoading) {
    if (!recoilUser && !user) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  }
};

const PublicRoute = ({ children }) => {
  const recoilUser = useRecoilValue(userInfo);
  const { user, isLoading } = useAuthStatus();

  if (!isLoading) {
    if (recoilUser && user) {
      return <Navigate to="/dashboard/templates" replace />;
    }
    return children;
  }
};

const routes = [
  {
    element: <Layout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/demo",
    element: (
      <PublicRoute>
        <Demo />
      </PublicRoute>
    ),
  },
  {
    path: "/signin",
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
  {
    path: "/template/:id",
    element: (
      <ProtectedRoute>
        <CreateTemplate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/preview/:id",
    element: <Preview />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "templates", element: <MyTemplates /> },
      { path: "basic", element: <BasicTemplates /> },
      { path: "contacts", element: <Contacts /> },
      { path: "send", element: <SendMail /> },
      { path: "profile", element: <UserProfile /> },
    ],
  },
];

export default routes;
