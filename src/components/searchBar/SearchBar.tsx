import { useContext, useState } from "react";
import React from "react";
import myContext from "../../context/myContext";
import { Navigate, useNavigate } from "react-router-dom";
import { path } from "../../routes";
// Search Data

const SearchBar = () => {
  // Search State
  const [search, setSearch] = useState<string>("");
  const context = useContext(myContext);
  const { getAllProduct } = context;
  const navigate = useNavigate();

  // Filter Search Data
  const filterSearchData = getAllProduct
    .filter((obj) =>
      obj.title.toLowerCase().includes(search.toLocaleLowerCase())
    )
    .slice(0, 8);
  return (
    <div className="">
      {/* search input  */}
      <div className="input flex justify-center">
        <input
          type="text"
          placeholder="Search here"
          onChange={(e) => setSearch(e.target.value)}
          className=" bg-gray-200 placeholder-gray-400 rounded-lg px-2 py-2 w-96 lg:w-96 md:w-96 outline-none text-black "
        />
      </div>

      {/* search drop-down  */}
      <div className=" flex justify-center">
        {search && (
          <div className="block absolute bg-gray-200 w-96 md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2">
            {filterSearchData.length > 0 ? (
              <>
                {filterSearchData.map((item, index) => {
                  return (
                    <div key={index} className="py-2 px-2">
                      <div
                        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-pink-100 hover:shadow-md transition-all duration-300 rounded-lg"
                        onClick={() => navigate(path.productInfo.replace(":id",`${item.id}`))}
                      >
                        <img
                          className="w-10"
                          src={item.productImageUrl}
                          alt=""
                        />
                        <span className="font-medium text-gray-700">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <img
                    className=" w-20"
                    src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                    alt="img"
                  />
                  <p className="py-10 text-gray-500 text-center  text-lg ">
                    Search Product is Not found{" "}
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
