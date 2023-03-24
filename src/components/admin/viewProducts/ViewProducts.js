//// admin panelindeki allproducts componenti
import { deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';
import Loader from '../../loader/Loader';
import styles from "./ViewProducts.module.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, STORE_PRODUCTS } from '../../../redux/slice/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import { FILTER_BY_SEARCH, selectFilteredProducts } from '../../../redux/slice/filterSlice';
import Search from '../../search/Search';

const ViewProducts = () => {

  const [search, setSearch] = useState("");

  const { data, isLoading } = useFetchCollection("products")
  
  const products = useSelector(selectProducts);

  const filteredProducts = useSelector(selectFilteredProducts);

  const dispatch = useDispatch();

  //data değiştikçe redux sürekli güncellenecektir.
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);
  
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product!!!',
      'You are about to delete this product?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL)
      },
      function cancelCb() {
        
      },
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom"
      },
    );
  }

  const deleteProduct = async(id, imageURL) =>
  {
    try
    {
      // firestore database den döküman silmek için kullanılır(products koleksiyonunun içindeki id si eşleşen döküman)
      await deleteDoc(doc(db, "products", id));
      // storage den dökümana bağlı resmi silmek için kullanılır.
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef)
      toast.success("Product deleted successfully.")
    } 
    catch (error)
    {
      toast.error(error.message)
    }
  }

  return (
    <>
    {isLoading && <Loader />}
    <div className={styles.table}>
      <h2>All Products</h2>
      <div className={styles.search}>
          <p>
            <b>{filteredProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {filteredProducts.length === 0 ? (
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
            {filteredProducts.map((product, index) =>
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
                  <Link to={`/admin/add-product/${id}`}>
                      <FaEdit size={20} color="green" />
                    </Link>
                    &nbsp;
                    <FaTrashAlt size={18} color="red" onClick={() => confirmDelete(id, imageURL)} />
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