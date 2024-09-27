import {
    Button,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";
import PropTypes from "prop-types";
const BuyNowModal = ({ paymentinfo, setpaymentinfo,buynowfuntion}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const {
        name,
        email,
        address,
        cartno,
        exp,
        cvv
    } = paymentinfo;

    // Handler for updating paymentinfo
    const handleChange = (e) => {
        const { name, value } = e.target;
        setpaymentinfo((prev) => ({
            ...prev,
            [name]: value, // dynamically set the value of the field
        }));
    };

    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl"
            >
                Buy now
            </Button>
            <Dialog open={open} handler={handleOpen} className="bg-pink-50">
                <DialogBody className="p-6">
                    {/* Simple Form Layout */}
                    <div className="space-y-4">
                        {/* Cardholder Name */}
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Cardholder Name"
                                value={name}
                                onChange={handleChange}
                                className="bg-pink-50 border border-pink-200 px-3 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleChange}
                                className="bg-pink-50 border border-pink-200 px-3 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={address}
                                onChange={handleChange}
                                className="bg-pink-50 border border-pink-200 px-3 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                            />
                        </div>

                        {/* Card Number */}
                        <div>
                            <input
                                type="text"
                                name="cartno"
                                placeholder="Card Number"
                                value={cartno}
                                onChange={handleChange}
                                className="bg-pink-50 border border-pink-200 px-3 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                            />
                        </div>

                        {/* Expiry Date and CVV */}
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                name="exp"
                                placeholder="MM/YY"
                                value={exp}
                                onChange={handleChange}
                                className="bg-pink-50 border border-pink-200 px-3 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                            />

                            {/* CVV */}
                            <input
                                type="password"
                                name="cvv"
                                placeholder="CVV"
                                value={cvv}
                                onChange={handleChange}
                                className="bg-pink-50 border border-pink-200 px-3 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                            />
                        </div>

                        {/* Buy Now Button */}
                        <div className="mt-4">
                            <Button
                                type="button"
                                onClick={
                                    ()=>{
                                        handleOpen()
                                        buynowfuntion()
                                    }
                                    
                                }
                                
                                className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 rounded-lg"
                            >
                                Buy now
                            </Button>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
};
BuyNowModal.propTypes = {
    paymentinfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      cartno: PropTypes.string.isRequired,
      exp: PropTypes.string.isRequired,
      cvv: PropTypes.string.isRequired,
    }).isRequired,
    setpaymentinfo: PropTypes.func.isRequired,
    buynowfuntion: PropTypes.func.isRequired,
  };
export default BuyNowModal;
