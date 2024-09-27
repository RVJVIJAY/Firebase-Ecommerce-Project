import React, { useContext } from "react";
import myContext from "../../context/myContext";

const UserDetail = () => {
    const context=useContext(myContext);
    const {getAllUsers}=context;
    return (
        <div>
            <div>
                <div className="py-5 flex justify-between items-center">
                    {/* text  */}
                    <h1 className=" text-xl text-pink-300 font-bold">All User</h1>
                </div>

                {/* table  */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400" >
                        <tbody>
                            <tr>
                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    S.No.
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Name
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Email
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Uid
                                </th>

<th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                   Role
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    Date
                                </th>
                               
                            </tr>
                           {
                            getAllUsers.map((item,index)=>{
                                const {date,email,name,role,time,uid}=item;
                                return(
                                    <tr className="text-pink-300">
                                    <td 
                                    className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                                       {index+1}
                                    </td>
    
                                    <td 
                                    className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {name}
                                    </td>
    
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                                        {email}
                                    </td>
    
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                                        {uid}
                                    </td>
    
    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                                        {role}
                                    </td>
    
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                                        {date}
                                    </td>
                                </tr>
                                )
                            })
                           }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;