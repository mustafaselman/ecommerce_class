//// burası redux store kayıt yeri
import {configureStore, combineReducers} from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"

// burası reucerlarımızı ekleyeceğimiz yer
const rootReducer = combineReducers({
    auth: authReducer,
});

// burade reducerlar store a kaydediliyor.
const store = configureStore({
    reducer: rootReducer,
   
})

export default store