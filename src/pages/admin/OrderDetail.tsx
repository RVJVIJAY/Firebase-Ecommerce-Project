import React, { useContext } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrders,deleteOrder} = context;
    
    return (
        <div>
            <div className="py-5">
                {/* Title */}
                <h1 className="text-xl text-pink-300 font-bold">All Orders</h1>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
                    <thead>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">
                                S.No.
                            </th>
                            <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Order Id
                            </th>
                            <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Image
                            </th>
                            <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Title
                            </th>
                            <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Category
                            </th>
                            <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Price
                            </th>
                            <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Quantity
                            </th>
                            <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Total Price
                            </th>
                            <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Status
                            </th>
                            <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Name
                            </th>
                            <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Address
                            </th>
                           
                            <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Email
                            </th>
                            <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Date
                            </th>
                            <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllOrders.map((order, orderIndex) => {
                            const { cartItems, paymentinfo, createdAt, id } = order;
                            const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

                            return cartItems.map((item, itemIndex) => (
                                <tr key={`${orderIndex}-${itemIndex}`} className="text-pink-300">
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                        {itemIndex === 0 ? orderIndex + 1 : ""}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                        {itemIndex === 0 ? id : ""}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                        <img src={item.productImageUrl} alt={item.title} />
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                        {item.title}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                        {item.category}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                        ₹ {item.price}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                        {item.quantity}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                        ₹ {item.price * item.quantity}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                        {order.status==='confirmed'?"confirmed":"rejected"}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                        {paymentinfo.name}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                        {paymentinfo.address}
                                    </td>
                                
                                  
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                        {paymentinfo.email}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                        {new Date(createdAt.seconds * 1000).toLocaleDateString()}
                                    </td>
                                    <td onClick={()=>deleteOrder(id)}className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer">
                                        Delete
                                    </td>
                                </tr>
                            ));
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetail;
