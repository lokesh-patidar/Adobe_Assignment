import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useSelector } from "react-redux";
import UserInfo from "./components/UserInfo";
function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <div className="blur -top-[18%] right-[0rem]"></div>
      <div className="blur top-[36%] left-[-8rem]"></div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/view/:id"
          element={<UserInfo/>}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;
