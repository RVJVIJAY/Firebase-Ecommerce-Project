import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import type { User } from "firebase/auth";
interface Product {
  category: string;
  date: string;
  description: string;
  price: string;
  productImageUrl: string;
  quantity: number;
  time: any; 
  title: string;
  id: string; 
}
interface Users {
  date: "string",
  email: "string",
  name: "string",
  role: "string",
  time: any,
  uid: "string",
  id:"string"
}
const MyState = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [getAllProduct, setGetAllProduct] = useState<Product[]>([]);
  const [getAllOrders, setGetAllOrders] = useState<any[]>([]);
  const [getAllUsers, setGetAllUsers] = useState<Users[]>([]);

 
  

  const getProductFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "product"), orderBy("time"));
      /* const querydata=await getDocs(q)
      querydata.forEach(element => {
        console.log(element.id )
        console.log(element.data())
      }); */
      const data = onSnapshot(q, (querydata) => {
        let productarray:Product[]= [];
        querydata.forEach((val) => {
          productarray.push({ ...val.data(), id: val.id } as Product);
        });
        setGetAllProduct(productarray);
        setLoading(false);
        console.log(productarray);
      });
      return()=>data();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getAllOrderFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "order"), orderBy("createdAt"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let orderArray:any[] = [];
        console.log(orderArray)
        QuerySnapshot.forEach((doc) => {
          orderArray.push({ ...doc.data(), id: doc.id  });
        });
        setGetAllOrders(orderArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getAllUserFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "userDB"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let userArray:Users[] = [];
        console.log("user",userArray)
        QuerySnapshot.forEach((doc) => {
          userArray.push({ ...doc.data(), id: doc.id } as Users );
        });
        setGetAllUsers(userArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "order", id));
      toast.success("Order Deleted successfully");
      getAllOrderFunction();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductFunction();
    getAllOrderFunction();
    getAllUserFunction();
  }, []);
  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllProduct,
        getProductFunction,
        getAllOrders,
        deleteOrder,
        getAllUsers,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyState;
