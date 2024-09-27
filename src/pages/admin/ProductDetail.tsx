import { Link } from "react-router-dom";
import React, { useContext } from "react";
import myContext from "../../context/myContext";
import Loader from "../../Loader/Loader";
import { deleteDoc,doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { path } from "../../routes";
const ProductDetail = () => {
    const context=useContext(myContext)
    const {getAllProduct,loading,setLoading,getProductFunction}=context;

    const deleteproduct=async(id)=>{
        setLoading(true)
        try{    
            await deleteDoc(doc(fireDB,'product',id))
            toast.success('Product Deleted Succesfully...')
            getProductFunction();
            setLoading(false)
        }catch(err){
            console.log(err)
            toast.error('Unable to Delete the Product...')
            setLoading(false)
        }
    }
    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-pink-300 font-bold">All Product</h1>
                {/* Add Product Button  */}
                <Link to={path.addProduct}>
                    <button className="px-5 py-2 bg-pink-50 border border-pink-100 rounded-lg">Add Product</button>
                </Link>
            </div>
           {/*  <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div> */}
            {/* table  */}
            <div className="w-full overflow-x-auto mb-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400" >
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Image</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Title</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Price</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Category</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Date</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                        </tr>
                        {
                            getAllProduct.map((item,index)=>{
                                const {price,productImageUrl,category,date,title,id}=item;
                                return(
                                    <tr className="text-pink-300">
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                                       {index+1}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                  
                                   <div className="flex justify-center">
                                   <img className="w-20 " src={productImageUrl} alt="img" />
                                   </div>
                                        
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {title}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        ₹{price}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {category}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {date}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                                       <Link to={path.updateProduct.replace(":id",`${id}`)}>Edit</Link>
                                    </td>
                                    <td onClick={()=>deleteproduct(id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                                        Delete
                                    </td>
                                </tr>
                                )
                            })
                        }

                     
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;