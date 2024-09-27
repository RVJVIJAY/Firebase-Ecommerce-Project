import { addDoc, collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import myContext from "../../../context/myContext";
import Loader from "../../../Loader/Loader";
import { fireDB } from "../../../firebase/FirebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { path } from "../../../routes";


const AddProductPage = () => {
  const { id }:any= useParams(); // Get the product ID from URL params
  const context = useContext(myContext);
  const { loading, setLoading,getProductFunction } = context;
  const navigate = useNavigate();

  const categoryList = [
    { name: "fashion" },
    { name: "shirt" },
    { name: "jacket" },
    { name: "mobile" },
    { name: "laptop" },
    { name: "shoes" },
    { name: "home" },
    { name: "books" },
  ];

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Fetch single product if `id` exists for update functionality
  const getSingleProductFunction = async () => {
    if (id) {
      setLoading(true);
      try {
        const productTemp = await getDoc(doc(fireDB, "product", id));
        const productData = productTemp.data();
        setProduct({
          title: productData?.title,
          price: productData?.price,
          productImageUrl: productData?.productImageUrl,
          category: productData?.category,
          description: productData?.description,
          quantity: productData?.quantity,
          time: productData?.time,
          date: productData?.date,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  // Update product function
  const updateProduct = async () => {
    setLoading(true);
    try {
     
      await setDoc(doc(fireDB, "product", id), product); //setDoc is helpus to update the data in FB
      toast.success("Product Updated successfully");
      getProductFunction();
      setLoading(false);
      navigate(path.adminDashboard);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Add new product function
  const addProductFunction = async () => {
    if (
      product.title === "" ||
      product.category === "" ||
      product.price === "" ||
      product.description === "" ||
      product.quantity === null
    ) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    } else {
      setLoading(true);
    }

    try {
      const productRef = collection(fireDB, "product");
      await addDoc(productRef, product);
      toast.success("Product Added Successfully...");
      
      setLoading(false);
      navigate(path.adminDashboard);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add product");
      setLoading(false);
    }
  };

  // Handle form submission for both add/update
  const handleSubmit = () => {
    if (id) {
      updateProduct();
    } else {
      addProductFunction();
    }
  };

  // Fetch the product when `id` changes (for updating)
  useEffect(() => {
    if (id) {
      getSingleProductFunction();
    }
  }, [id]);

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {loading ? (
          <Loader />
        ) : (
          <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
            <div className="mb-5">
              <h2 className="text-center text-2xl font-bold text-pink-500 ">
                {id ? "Update Product" : "Add Product"}
              </h2>
            </div>

            {/* Input Fields */}
            <div className="mb-3">
              <input
                value={product.title}
                onChange={(e) => setProduct((pre) => ({ ...pre, title: e.target.value }))}
                type="text"
                placeholder="Product Title"
                className="bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
              />
            </div>

            <div className="mb-3">
              <input
                value={product.price}
                onChange={(e) => setProduct((pre) => ({ ...pre, price: e.target.value }))}
                type="number"
                placeholder="Product Price"
                className="bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
              />
            </div>

            <div className="mb-3">
              <input
                value={product.productImageUrl}
                onChange={(e) => setProduct((pre) => ({ ...pre, productImageUrl: e.target.value }))}
                type="text"
                placeholder="Product Image Url"
                className="bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
              />
            </div>

            <div className="mb-3">
              <select
                className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none"
                value={product.category}
                onChange={(e) => setProduct((pre) => ({ ...pre, category: e.target.value }))}
              >
                <option>Select Product Category</option>
                {categoryList.map((value, index) => (
                  <option key={index} value={value.name}>
                    {value.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <textarea
                value={product.description}
                onChange={(e) => setProduct((pre) => ({ ...pre, description: e.target.value }))}
                placeholder="Product Description"
                rows={5}
                className="w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300"
              />
            </div>

            <div className="mb-3">
              <button
                onClick={handleSubmit}
                type="button"
                className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
              >
                {id ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductPage;
