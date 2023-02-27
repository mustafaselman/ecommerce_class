//// admin panelindeki allproducts componenti
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/config';
import Loader from '../../loader/Loader';
import styles from "./ViewProducts.module.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ViewProducts = () => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=> {
    getProducts();
  },[])
  
  const getProducts = () => {
    setIsLoading(true)
    try {
      // belirli bir koleksiyonu almak için kullanılır
      const productsRef = collection(db, "products");
      // seçtiğimiz koleksiyonu sıralamak için kullanılır.
      const q = query(productsRef, orderBy("createdAt", "desc"));
      // gerçek zamanlı anlık olarak sıraladığımız bu verileri dinlemek için kullanılır.
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot)
        // console.log(snapshot.docs[0].data())
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        // console.log(allProducts);
        setProducts(allProducts);
        setIsLoading(false)
      })

    }
    catch(error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  };

  return (
    <>
    {isLoading && <Loader />}
    <div className={styles.table}>
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p>No product found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>s/n</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) =>
            {
              const { id, name, price, imageURL, category } = product;
              return (

                <tr key={id}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    <img src={imageURL} alt={name} style={{ width: "100px" }}></img>
                  </td>
                  <td>
                    {name}
                  </td>
                  <td>
                    {category}
                  </td>
                  <td>
                    {`$${price}`}
                  </td>
                  <td className={styles.icons}>
                    <Link to="/admin/add-product/">
                      <FaEdit size={20} color="green" />
                    </Link>
                    &nbsp;
                    <FaTrashAlt size={18} color="red" />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  </>

  )
}

export default ViewProducts