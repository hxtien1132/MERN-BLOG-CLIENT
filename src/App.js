import { RouterProvider, createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import CategoryPosts from "./pages/CategoryPosts";
import AuthorPosts from "./pages/AuthorPosts";
import EditPost from "./pages/EditPost";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import Authors from "./pages/Authors";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import DeletePost from "./pages/DeletePost";
import { UserProvider } from "./context/userContext";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ProtectedRoute() {
  const { currentUser } = useContext(UserProvider);
  //nếu đăng nhập rồi thì navigate vô trong ouulet được k thì phải login
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <Layout />
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "create", element: <CreatePost /> },
      { path: "posts/:id", element: <PostDetails /> },
      { path: "posts/categories/:category", element: <CategoryPosts /> },
      { path: "posts/users/:id", element: <AuthorPosts /> },
      { path: "profile/:id", element: <UserProfile /> },
      { path: "myposts/:id", element: <Dashboard /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "posts/:id/delete", element: <DeletePost /> },
      { path: "authors", element: <Authors /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
