////sepetteki ürünlerin kaydını yöneten redux : carta ürün ekleme ve artırma, cartan ürün çıkarma ve azaltma, cartı temizleme, cart ürün sayısı , toplam fiyat işlemleri yürütülecektir. 
import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state,action) {
      // console.log(action.payload)
      // eşleşme yaptığı elemanın indexini döndürür yoksa -1 döndürür
      const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

      if(productIndex >= 0) {
          state.cartItems[productIndex].cartQuantity += 1;
          toast.info(`${action.payload.name} increased by one`, {position:"top-left"})
      } else {
          const tempProduct = {...action.payload, cartQuantity: 1}
          state.cartItems.push(tempProduct)
          toast.success(`${action.payload.name} added to cart`, {position:"top-left"})
      }
        //stringify sıkıştırıp metne dönüştürüp kaydediyor.
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
    },
    DECREASE_CART(state,action) {
      const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

      if(state.cartItems[productIndex].cartQuantity > 1) {
          state.cartItems[productIndex].cartQuantity -= 1
          toast.info(`${action.payload.name} decreased by one`, {position:"top-left"})
      } else if (state.cartItems[productIndex].cartQuantity === 1){
          const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
          state.cartItems = newCartItem
          toast.success(`${action.payload.name} removed from cart`, {position:"top-left"})
      }
      localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
    },
    REMOVE_FROM_CART(state,action) {
      const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
      state.cartItems = newCartItem
      toast.success(`${action.payload.name} removed from cart`, {position:"top-left"})
      localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
    },
  }
});

export const {ADD_TO_CART,DECREASE_CART,REMOVE_FROM_CART} = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer