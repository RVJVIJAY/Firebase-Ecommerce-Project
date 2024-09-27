import React, { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { path } from "../../routes";
// productData

const HomePageProductCard = () => {
  const context = useContext(myContext);
  const { loading, getAllProduct } = context;
  const navigate = useNavigate();
  const cartItems = useSelector((state:any) => state.cart);
  const dispatch = useDispatch();
  console.log("cartitem", cartItems);

  const addcart = (item) => {
    dispatch(addToCart(item));
    toast.success("item added to cart");
  };
  const deletecart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("item deleted from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <div className="mt-10">
      {/* Heading  */}
      <div className="">
        <h1 className=" text-center mb-5 text-2xl font-semibold">
          Bestselling Products
        </h1>
      </div>

      {/* main  */}
      <section className="">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {getAllProduct.slice(0, 8).map((item, index) => {
              const { id, title, price, productImageUrl } = item;
              return (
                <div key={index} className="p-4 w-full md:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                    <img
                      className="lg:h-80  h-96 w-full"
                      src={productImageUrl}
                      alt="blog"
                      onClick={() => navigate(path.productInfo.split(":id").join(`${id}`))}
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        VJ-KART
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {title.substring(0, 25)}
                      </h1>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        ₹{price}
                      </h1>

                      <div className="flex justify-center ">
                        {cartItems.some((p) => p.id === item.id) ? (
                          <button
                            onClick={() => deletecart(item)}
                            className=" bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                          > Delete From Cart</button>
                        ) : (
                          <button
                            onClick={() => addcart(item)}
                            className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                          >Add To Cart</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCard;
