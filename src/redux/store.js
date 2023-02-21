//// burası redux store kayıt yeri
import {configureStore, combineReducers} from "@reduxjs/toolkit"

// burası reucerlarımızı ekleyeceğimiz yer
const rootReducer = combineReducers({
    
});

// burade reducerlar store a kaydediliyor.
const store = configureStore({
    reducer: rootReducer,
   
})

export default store