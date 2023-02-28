//// burası redux store kayıt yeri
import {configureStore, combineReducers} from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"
import productReducer from "./slice/productSlice"

// burası reucerlarımızı ekleyeceğimiz yer
const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
});

// burade reducerlar store a kaydediliyor.
const store = configureStore({
    reducer: rootReducer,
   
})

export default store