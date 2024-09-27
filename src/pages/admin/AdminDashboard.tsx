import React, { useContext } from "react";
import { IoBagHandle } from "react-icons/io5";
import { TbListNumbers } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ProductDetail from "./ProductDetail";
import OrderDetail from "./OrderDetail";
import UserDetail from "./UserDetail";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { path } from "../../routes";

const AdminDashboard = () => {
    const context=useContext(myContext)
    const {getAllProduct,getAllOrders,getAllUsers}=context
    const navigate=useNavigate()
    const userdata=localStorage.getItem('users')
    const user=userdata ? JSON.parse(userdata): null;

    return (
        <div>
            {/* Top */}
            <div className="top mb-5 px-5 mt-5">
                <div className=" bg-pink-50 py-5 border border-pink-100 rounded-lg">
                    <h1 className=" text-center text-2xl font-bold text-pink-500">Admin Dashboard</h1>
                </div>
            </div>
        <div className="flex justify-center mb-4">
           <button type="button" onClick={()=>navigate(path.home)} className="flex  bg-pink-50 text-center p-4 font-bold text-pink-500">Back to Home</button>
        </div>
            <div className="px-5">
                {/* Mid  */}
                <div className="mid mb-5">
                    {/* main  */}
                    <div className=" bg-pink-50 py-5 rounded-xl border border-pink-100">
                        {/* image  */}
                        <div className="flex justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
                        </div>
                        {/* text  */}
                        <div className="mt-2">
                            <h1 className=" text-center text-lg text-pink-500"><span className=" font-bold">Name :</span> {user?.role==='admin'?'ADMIN':""}</h1>
                            <h1 className=" text-center text-lg text-pink-500"><span className=" font-bold">Email :</span>{user?.role==='admin'?user?.email:""}</h1>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="">
                    <Tabs>
                    <TabList className="flex flex-wrap -m-4 text-center justify-center">
                        {/* Total Products */}
                        <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                            <div className=" border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl" >
                                <div className="text-pink-500 w-12 h-12 mb-3 inline-block" >
                                <IoBagHandle className="text-pink-500 w-12 h-12 mb-3" />
    
                                </div>
                                <h2 className="title-font font-medium text-3xl text-pink-400 fonts1" >{getAllProduct.length}</h2>
                                <p className=" text-pink-500  font-bold" >Total Products</p>
                            </div>
                        </Tab>

                        {/* Total Order  */}
                        <Tab className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
                            <div className=" border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl" >
                                <div className="text-pink-500 w-12 h-12 mb-3 inline-block" >
                                <TbListNumbers className="text-pink-500 w-12 h-12 mb-3"/>
                                </div>
                                <h2 className="title-font font-medium text-3xl text-pink-400 fonts1" >{getAllOrders.length}</h2>
                                <p className=" text-pink-500  font-bold" >Total Order</p>
                            </div>
                        </Tab>

                        {/* Total User  */}
                        <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                            <div className=" border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl" >
                                <div className="text-pink-500 w-12 h-12 mb-3 inline-block" >
                                  <FaUser className="text-pink-500 w-12 h-12 mb-3"/>

                                </div>
                                <h2 className="title-font font-medium text-3xl text-pink-400 fonts1" >{getAllUsers.length}</h2>
                                <p className=" text-pink-500  font-bold" >Total Users</p>
                            </div>
                        </Tab>
                    </TabList>
                    <TabPanel>
                       <ProductDetail />
                    </TabPanel>
                    <TabPanel>
                       <OrderDetail />
                    </TabPanel>
                    <TabPanel>
                        <UserDetail />
                    </TabPanel>
                    </Tabs>
                    
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;