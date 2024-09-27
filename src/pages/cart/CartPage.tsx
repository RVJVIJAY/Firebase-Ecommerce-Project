import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { fireDB } from "../../firebase/FirebaseConfig";
import Layout from '../../layout/Layout.tsx';
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const CartPage = () => {
  const userdata = localStorage.getItem('users');
  const user=userdata ? JSON.parse(userdata) : null;
  const cartItems = useSelector((state:any) => state.cart);
  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Deleted from cart");
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const cartItemTotal = cartItems
    .map((item) => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [paymentinfo, setpaymentinfo] = useState({
    name: "",
    email: "",
    address: "",
    cartno: "",
    exp: "",
    cvv: "",
  });

  const { name, email, address, cartno, exp, cvv } = paymentinfo;

  const buynowfuntion = async () => {
    // Validate payment information
    if (
      name === "" ||
      email === "" ||
      address === "" ||
      cartno === "" ||
      exp === "" ||
      cvv === ""
    ) {
      return toast.error("All payment fields are required");
    }

    const orderInfo = {
      cartItems,
      paymentinfo: {
        name,
        email,
        address,
        cartno,
        exp,
        cvv,
      },
      email: user.email,
      userid: user.uid,
      status: "confirmed",
      createdAt: Timestamp.now(), 
    };

    console.log("orderinfo", orderInfo);
    try {
      const orderRef = collection(fireDB, 'order');
      await addDoc(orderRef, orderInfo);
      setpaymentinfo({
        name: "",
        email: "",
        address: "",
        cartno: "",
        exp: "",
        cvv: "",
      });
      toast.success("Order Placed Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place the order");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-7xl px-2 lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item, index) => {
                      const {
                        id,
                        title,
                        price,
                        productImageUrl,
                        quantity,
                        category,
                      } = item;
                      return (
                        <div key={index}>
                          <li className="flex py-6 sm:py-6 ">
                            <div className="flex-shrink-0">
                              <img
                                src={productImageUrl}
                                alt="img"
                                className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                              <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                <div>
                                  <div className="flex justify-between">
                                    <h3 className="text-sm">
                                      <div className="font-semibold text-black">
                                        {title}
                                      </div>
                                    </h3>
                                  </div>
                                  <div className="mt-1 flex text-sm">
                                    <p className="text-sm text-gray-500">
                                      {category}
                                    </p>
                                  </div>
                                  <div className="mt-1 flex items-end">
                                    <p className="text-sm font-medium text-gray-900">
                                      ₹{price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <div className="mb-2 flex">
                            <div className="min-w-24 flex">
                              <button
                                onClick={() => handleDecrement(id)}
                                type="button"
                                className="h-7 w-7"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className="mx-1 h-7 w-9 rounded-md border text-center"
                                value={quantity}
                              />
                              <button
                                onClick={() => handleIncrement(id)}
                                type="button"
                                className="flex h-7 w-7 items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                            <div className="ml-6 flex text-sm">
                              <button
                                onClick={() => deleteCart(item)}
                                type="button"
                                className="flex items-center space-x-1 px-2 py-1 pl-0"
                              >
                                <FaTrash size={12} className="text-red-500" />
                                <span className="text-xs font-medium text-red-500">
                                  Remove
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <h1>Not Found</h1>
                )}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <div>
                <dl className="space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">
                      Price ({cartItemTotal} item)
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ₹ {cartTotal}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4 ">
                    <dt className="text-base font-medium text-gray-900">
                      Total Amount
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ₹ {cartTotal}
                    </dd>
                  </div>
                </dl>
                <div className="px-2 pb-4 font-medium text-green-700">
                  <div className="flex gap-4 mb-6">
                    {user ? (
                      <BuyNowModal
                        paymentinfo={paymentinfo}
                        setpaymentinfo={setpaymentinfo}
                        buynowfuntion={buynowfuntion}
                      />
                    ) : (
                      <Navigate to="/login" />
                    )}
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
