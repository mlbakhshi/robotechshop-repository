import { useEffect, useState } from "react"
import { ShopContext } from "../context/shopContext-Context";

export const useCart=()=>{
   const [cartItems,setCartItems] = useState()

   useEffect(()=>{
      const data = localStorage.getItem("Onlineshop_items")
      setCartItems(!! JSON.parse(data) ? JSON.parse(data) :[])
         },[])

   useEffect(()=>{
      if(cartItems !== undefined)
localStorage.setItem("Onlineshop_items",JSON.stringify(cartItems))
   },[cartItems])
   const addToCart = (itemId) => {
      if(!cartItems.find((item)=> item.id === itemId))
        setCartItems([...cartItems,{id: itemId, count:1}])
     else
     setCartItems(cartItems.map((item)=>{
        if(item.id === itemId)
        return {...item, count: item.count + 1 }
        else
        return item
     }))
      
    };
  
    const removeFromCart = (itemId) => {
      setCartItems(cartItems.map((i)=>{
        if(i.id === itemId)
           return {...i , count: i.count ===0?0:i.count-1}
        else
        return i
      }))
    };

    
      return {cartItems, addToCart , removeFromCart}
    
}