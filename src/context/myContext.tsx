import { createContext } from "react";

interface MyContextType {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    getAllProduct: any[]; 
    getProductFunction: () => Promise<any>;
    getAllOrders: any[];
    deleteOrder: (id: string) => Promise<void>;
    getAllUsers: any[];
}

const defaultValue: MyContextType = {
    loading: false,
    setLoading: () => {}, 
    getAllProduct: [],
    getProductFunction: async () => {}, 
    getAllOrders: [],
    deleteOrder: async () => {}, 
    getAllUsers: [],
};

// Create the context with the default value
const myContext = createContext<MyContextType>(defaultValue);

export default myContext;
