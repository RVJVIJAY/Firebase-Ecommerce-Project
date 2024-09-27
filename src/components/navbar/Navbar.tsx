import { json, Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import React from "react";
import { GiBatMask } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { path } from "../../routes";
const Navbar = () => {
  const userdata = (localStorage.getItem('users'));
  const user=userdata ?JSON.parse(userdata):null
  const cartItems=useSelector((state:any)=>state.cart)
  console.log(user);
    // navigate 
    const navigate = useNavigate();

    // logout function 
    const logout = () => {
        localStorage.removeItem('users');  // or use clear() method 
        console.log("user",user)
        navigate("/login")
    }

    // navList Data
    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-md px-5 ">
            {/* Home */}
            <li>
                <Link to={path.home}>Home</Link>
            </li>
            {/* All Product */}
            <li>
                <Link to={path.allProduct}>All Product</Link>
            </li>
            {/* Signup */}
            {!user ? <li>
                <Link to={path.signup}>Signup</Link>
            </li> : ""}
            {/* Signup */}
            {!user ? <li>
                <Link to={path.signup}>Login</Link>
            </li> : ""}
            {/* User */}
            {user?.role === "user" && <li>
                <Link to={path.userDashboard}>User</Link>
            </li>}
            {/* Admin */}
            {user?.role === "admin" && <li>
                <Link to={path.adminDashboard}>Admin</Link>
            </li>}
            {/* logout */}
            {user && <li className=" cursor-pointer" onClick={logout}>
              Logout
            </li>}
            {/* Cart */}
            <li>
                <Link to={path.cart}>
                cart ({cartItems.length})
                </Link>
            </li>
        </ul>
    )
  return (
    <nav className="bg-pink-600 sticky top-0">
      {/* main  */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        {/* left  */}
        <div className="left py-3 lg:py-0 flex items-center space-x-3">
          <div>
            <GiBatMask className="w-10 h-10 text-white" />
          </div>
          <div>
            <Link to={path.home}>
              <h2 className="font-bold text-white text-2xl">VJ-Kart</h2>
            </Link>
          </div>
        </div>

        {/* right  */}
        <div className="right flex justify-center mb-4 lg:mb-0">{navList}</div>

        {/* Search Bar  */}
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
