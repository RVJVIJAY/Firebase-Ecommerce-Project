import { FaStar } from "react-icons/fa6";
import Layout from "../../layout/Layout";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import myContext from "../../context/myContext";
import Loader from "../../Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

const ProductInfo = () => {
  const [singleproduct, setsingleproduct] = useState<any[]>([]); // Use an array type for product data
  const { id } = useParams();
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const cartItems = useSelector((state:any) => state.cart);
  const dispatch = useDispatch();

  const addcart = (item) => {
    dispatch(addToCart(item));
    toast.success("The product is now in your cart");
  };

  const deletecart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Product has been deleted from your cart");
  };

  const getSingleProductFunction = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      if (id) {
        const productRef = doc(fireDB, "product", id);
        const singleproductDoc = await getDoc(productRef);
        console.log("sing",singleproductDoc.data())
        if (singleproductDoc.exists()) {
          const data = singleproductDoc.data();
          setsingleproduct([{...data,id}]); // If single product, set as an array
          console.log("single",singleproduct)
        } else {
          console.log("No such data is found");
          toast.error("No such data is found");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch product data");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, [id]);

  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
        {loading ? (
          <Loader /> // Show loader while fetching data
        ) : singleproduct.length > 0 ? ( // Check if array has products
          <div className="max-w-6xl px-4 mx-auto">
            {singleproduct.map((product) => (
              <div key={product.id} className="flex flex-wrap mb-24 -mx-4">
                <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                  <div className="">
                    <img
                      className="w-full lg:h-[39em] rounded-lg"
                      src={product.productImageUrl}
                      alt={product.title}
                    />
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2">
                  <div className="lg:pl-20">
                    <div className="mb-6">
                      <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                        {product.title}
                      </h2>
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className="text-yellow-500 w-6 h-6"
                          />
                        ))}
                        <span className="ml-2 text-gray-600">(5 reviews)</span>
                      </div>
                      <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400">
                        <span>Rs. {product.price}</span>
                      </p>
                    </div>
                    <div className="mb-6">
                      <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                        Description:
                      </h2>
                      <p>{product.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center mb-6">
                      {cartItems.some((p) => p.id === product.id) ? (
                        <button
                          onClick={() => deletecart(product)}
                          className=" bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                        >
                          Delete From Cart
                        </button>
                      ) : (
                        <button
                          onClick={() => addcart(product)}
                          className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                        >
                          Add To Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No product found</p> // Fallback message
        )}
      </section>
    </Layout>
  );
};

export default ProductInfo;
