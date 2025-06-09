import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext= createContext();

export const AppContextProvider = ({children}) =>{

    const currency = import.meta.VITE_CURRENCY;

    const navigate = useNavigate();
     const [user,setUser]= useState(true);
     const [isSeller,setIsSeller]= useState(false);
     const [showUserLogin,setShowUserLogin] = useState(false);
     const [products,setProducts] =useState([])
     const[cartItems,setCartItems] =useState({})
    
     //fetch all products
     const fetchProducts = async ()=> {
      setProducts(dummyProducts)
     }

     //add all products
     const addToCart = (itemsId) =>{
      let cartData = structuredClone(cartItems);

      if(cartData[itemsId]){
        cartData[itemsId]+= 1;
      }else{
        cartData[itemsId] =1;
      }
      setCartItems(cartData);
      toast.success("Added to cart")
     }
     //Update the cart component
     const updateCartItems = (itemsId,quantity)=>{
      let cartData =structuredClone(cartItems);
      cartData[itemsId]=quantity;
      setCartItems(cartData)
      toast.success('Cart updated')
     }
      //Remove product from cart
      const removeCartItems = (itemsId) =>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemsId]){
          cartData[itemsId]-=1;
          if(cartData[itemsId]=== 0){
            delete cartData[itemsId]
          }
        }
        toast.success("Removed from cart")
        setCartItems(cartData)
      }


     useEffect(()=>{
      fetchProducts()
     },[])

    const value = {navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin ,products,cartItems,currency,addToCart,updateCartItems,removeCartItems}

    return <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
}
export const useAppContext = () => {
  return useContext(AppContext)
}