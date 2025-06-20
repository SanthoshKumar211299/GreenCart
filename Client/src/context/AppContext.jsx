import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext= createContext();

export const AppContextProvider = ({children}) =>{

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
     const [user,setUser]= useState(null);
     const [isSeller,setIsSeller]= useState(false);
     const [showUserLogin,setShowUserLogin] = useState(false);
     const [products,setProducts] =useState([])
     const[cartItems,setCartItems] =useState({})
     const [searchQuery,setSearchQuery] =useState({})
    
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
  //Get Cart item Count
     const getCartCount = () =>{
      let totalCount = 0;
      for(const item in cartItems){
        totalCount += cartItems[item]
      }
      return totalCount;
     }

  //get Cart total amount

  const getCartAmount = () =>{
    let totalAmount = 0;
    for (const items in cartItems){
      let itemInfo = products.find((product)=>product._id === items);
      if(cartItems[items]>0){
        totalAmount += itemInfo.offerPrice * cartItems[items]
      }
    }
    return Math.floor(totalAmount * 100)/100;
  }

     useEffect(()=>{
      fetchProducts()
     },[])

    const value = {navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin ,products,cartItems,currency,addToCart,updateCartItems,removeCartItems,
      searchQuery,setCartItems,setSearchQuery,getCartAmount,getCartCount
    }


    return <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
}
export const useAppContext = () => {
  return useContext(AppContext)
}