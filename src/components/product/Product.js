////home sayfasında productlist ve productfilterin beraber sergilendiği yer
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { GET_PRICE_RANGE, selectProducts, STORE_PRODUCTS } from '../../redux/slice/productSlice'
import styles from "./Product.module.scss"
import ProductFilter from './productFilter/ProductFilter'
import ProductList from './productList/ProductList'
import spinnerImg from "../../assets/spinner.gif"

const Product = () => {

  const { data, isLoading } = useFetchCollection("products")
  
  const products = useSelector(selectProducts);
  // console.log(products)

  const dispatch = useDispatch();

  //data değiştikçe redux sürekli güncellenecektir.
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
    dispatch(
      GET_PRICE_RANGE({
        products:data,
      })
    );
  }, [dispatch, data]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          {isLoading ? null : <ProductFilter/>}
        </aside>
        <div className={styles.content}>
          {isLoading ? (<img src={spinnerImg} alt="Loading.." style={{width: "50px"}} className="--center-all"/>) : (<ProductList products={products}/>)}
        </div>
      </div>
    </section>
  )
}

export default Product