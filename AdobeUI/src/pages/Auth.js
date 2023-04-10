import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../actions/authActions";

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);

  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };

  const [isSignUp, setIsSignUp] = useState(true);
  const [compPass, setCompPass] = useState(true);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password == data.confirmpass
        ? dispatch(signUp(data))
        : setCompPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setCompPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };

  return (
    <div className="Auth h-screen flex justify-center items-center">
      <div className="w-1/2   mx-auto">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h3 className="text-xl font-bold mb-3">
            {isSignUp ? "Register" : "Login"}
          </h3>
          <div className="flex flex-col gap-4 h-[160px]">
            {isSignUp && (
              <div className="lg:flex gap-3">
                <input
                  required
                  type="text"
                  placeholder="First Name"
                  className="infoInput bg-transparent outline-none px-4 py-2  border-b-2 border-black w-1/2"
                  name="firstname"
                  onChange={handleChange}
                  value={data.firstname}
                />
                <input
                  required
                  type="text"
                  placeholder="Last Name"
                  className="infoInput bg-transparent outline-none px-4 py-2  border-b-2 border-black w-1/2"
                  name="lastname"
                  onChange={handleChange}
                  value={data.lastname}
                />
              </div>
            )}

            <div>
              <input
                required
                type="text"
                placeholder="Username"
                className="infoInput bg-transparent outline-none px-4 py-2  border-b-2 border-black w-full"
                name="username"
                onChange={handleChange}
                value={data.username}
              />
            </div>
            <div className="flex gap-3">
              <input
                required
                type="password"
                className="infoInput bg-transparent outline-none px-4 py-2  border-b-2 border-black w-1/2"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
              />
              {isSignUp && (
                <input
                  required
                  type="password"
                  className="infoInput bg-transparent outline-none px-4 py-2  border-b-2 border-black w-1/2"
                  name="confirmpass"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={data.confirmpass}
                />
              )}
            </div>
          </div>

          <div style={{ display: compPass ? "none" : "block" }}>
            <p className="text-xs font-semibold text-red-600">
              * Confirm Password not same
            </p>
          </div>
          <span
            style={{
              fontSize: "12px",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => {
              setIsSignUp((prev) => !prev);
              resetForm();
            }}
          >
            {isSignUp
              ? "Already have an account Login"
              : "Don't have an account Sign up"}
          </span>
          <button
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-2.5 text-center mr-2 mb-2 w-1/2 overflow-hidden h-10"
            type="Submit"
          >
            {loading ? (
              <div className="">
                <img
                  className="relative bottom-28 scale-120 w-[800px] opacity-75"
                  src="https://i.pinimg.com/originals/ef/fa/c5/effac5ecee67363733385ec47159eb43.gif"
                  alt=""
                />
                <p className="relative z-20 bottom-52">Loading...</p>
              </div>
            ) : isSignUp ? (
              "SignUp"
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
