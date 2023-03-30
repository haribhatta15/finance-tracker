import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase-config";
import { useDispatch } from "react-redux";
import { setUser } from "./pages/register-login/userSlice";

function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    user && dispatch(setUser(user));
  });

  // return
  return (
    // create a wrapper
    <div className="wrapper">
      <Layout>
        <h1></h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
      <ToastContainer />
    </div>
  );
}

export default App;
