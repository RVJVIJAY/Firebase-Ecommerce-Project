/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { toast } from "react-toastify";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../../Loader/Loader";
const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const userLoginFunction = async () => {
    // validation
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All Fields are required");
      setLoading(false);
    } else {
      setLoading(true);
    }

    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );
      // console.log(users.user)

      try {
        const q = query(
          collection(fireDB, "userDB"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          });
          toast.success("Login Successfully");
          setLoading(false);
          if (user.role === "user") {
            navigate("/user-dashboard");
          } else {
            navigate("/admin-dashboard");
          }
        });
        return () => data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login Failed");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {/* Login Form  */}
      {loading ? (
        <Loader />
      ) : (
        <div className=" bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-pink-500 ">
              Login
            </h2>
          </div>

          {/* Input Two  */}
          <div className="mb-3">
            <input
              value={userLogin.email}
              onChange={(e) => {
                setUserLogin((pre) => ({
                  ...pre,
                  email: e.target.value,
                }));
              }}
              type="email"
              placeholder="Email Address"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
            />
          </div>

          {/* Input Three  */}
          <div className="mb-5">
            <input
              value={userLogin.password}
              onChange={(e) =>
                setUserLogin((pre) => ({
                  ...pre,
                  password: e.target.value,
                }))
              }
              type="password"
              placeholder="Password"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
            />
          </div>

          {/* Signup Button  */}
          <div className="mb-5">
            <button
              onClick={userLoginFunction}
              type="button"
              className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Login
            </button>
          </div>

          <div>
            <h2 className="text-black">
              Don't Have an account{" "}
              <Link className=" text-pink-500 font-bold" to={"/signup"}>
                Signup
              </Link>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
