/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import myContext from "../../context/myContext";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();
  const [userSignup, setuserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  console.log(userSignup)
  const usersignupfunction = async () => {
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      toast.error("Please fill all the fields..", {
        position: "top-right", // You can use 'top-right', 'bottom-right', 'bottom-left', etc.
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: true, // Hide the progress bar
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // You can set it to 'dark', 'light', 'colored'
      });
      setLoading(false);
    } else {
    }
    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );
      console.log(users);

      const userdetail = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };
      //STORE THE DATA INTO FIREBASE DB
      const userreference = collection(fireDB, "userDB");  // create collection with name userDB
      addDoc(userreference, userdetail);

      setuserSignup({
        name: "",
        email: "",
        password: "",
        role: "",
      });

      toast.success("user Sign in successfully...");
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Login Form  */}
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-pink-500 ">
              Signup
            </h2>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Full Name"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
              value={userSignup.name}
              onChange={(e) => {
                setuserSignup({
                  ...userSignup,
                  name: e.target.value,
                });
              }}
            />
          </div>

          {/* Input Two  */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
              value={userSignup.email}
              onChange={(e) => {
                setuserSignup({
                  ...userSignup,
                  email: e.target.value,
                });
              }}
            />
          </div>

          {/* Input Three  */}
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
              value={userSignup.password}
              onChange={(e) => {
                setuserSignup((val) => ({
                  ...val,
                  password: e.target.value,
                }));
              }}
            />
          </div>

          {/* Signup Button  */}
          <div className="mb-5">
            <button
              type="button"
              className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
              onClick={() => usersignupfunction()}
            >
              Signup
            </button>
          </div>

          <div>
            <h2 className="text-black">
              Have an account{" "}
              <Link className=" text-pink-500 font-bold" to={"/login"}>
                Login
              </Link>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
