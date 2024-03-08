import Layout from "./components/Layout";
import BasicTemplates from "./pages/BasicTemplates";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/Demo";
import Home from "./pages/Home";
import MyTemplates from "./pages/MyTemplates";
import Preview from "./pages/Preview";
import Profile from "./pages/Profile";
import SendMail from "./pages/SendMail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const routes = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/demo", element: <Demo /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/profile", element: <Profile /> },
      { path: "/preview", element: <Preview /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "templates", element: <MyTemplates /> },
      { path: "basic", element: <BasicTemplates /> },
      { path: "contacts", element: <Contacts /> },
      { path: "send", element: <SendMail /> },
    ],
  },
];

export default routes;
