import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../../Loader/Loader";
import Layout from "../../layout/Layout";
import { path } from "../../routes";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, getAllProduct } = context;
  const filterdata = getAllProduct.filter((item) =>
    item.category.includes(categoryname)
  );
  console.log(filterdata);
  return (
    <Layout>
      <div className="">
        <section className="">
          {loading ? (
            <Loader />
          ) : filterdata.length > 0 ? (
            <div className="container px-5 py-5 mx-auto">
              <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">
                {categoryname}
              </h1>
              <div className="flex flex-wrap -m-4">
                {filterdata.map((item, index) => {
                  const { id, title, price, productImageUrl } = item;
                  return (
                    <div key={index} className="p-4 w-full md:w-1/4">
                      <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                        <img
                          className="lg:h-80  h-96 w-full"
                          src={productImageUrl}
                          alt="blog"
                          onClick={() => navigate(path.productInfo.replace(":id",`${id}`))}
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
                            <button className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-80 h-60 mx-auto my-auto py-10 bg-gray-100 rounded-lg shadow-lg absolute inset-0">
              <div className="flex justify-center mb-4">
                <img
                  className="w-16 h-16"
                  src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                  alt="No Product Found"
                />
              </div>
              <h1 className="text-gray-700 text-xl font-semibold text-center">
                No {categoryname} product found
              </h1>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default CategoryPage;
