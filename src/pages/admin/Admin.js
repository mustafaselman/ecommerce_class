//// admin sayfası
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../../components/admin/navbar/Navbar'
import Home from '../../components/admin/home/Home'
import styles from "./Admin.module.scss"
import ViewProducts from '../../components/admin/viewProducts/ViewProducts'
import AddProduct from '../../components/admin/addProduct/AddProduct'
import Orders from '../../components/admin/orders/Orders'
import OrderDetails from '../../components/admin/orderDetails/OrderDetails'

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        {/* admin panelindeki sol navbar */}
        <Navbar/>
      </div>
      <div className={styles.content}>
        <Routes>

          {/* admin panelindeki home componenti */}
          <Route path="home" element={<Home/>}/>

          {/* admin panelindeki allproducts componenti */}
          <Route path="all-products" element={<ViewProducts/>}/>

          {/* admin panelindeki add product componenti */}
          <Route path="add-product/:id" element={<AddProduct/>}/>

          {/* admin panelindeki orders componenti */}
          <Route path="orders" element={<Orders/>}/>

          {/* admin panelindeki orders componentinin içindeki order statusa tıklayınce çıkam order details componenti */}
          <Route path="order-details/:id" element={<OrderDetails/>}/>

        </Routes>
      </div>
    </div>
  )
}

export default Admin