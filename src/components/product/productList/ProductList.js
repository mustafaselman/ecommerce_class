//// home sayfasındaki ürünler hakkında gösterim, arama, sıralama yapabildiğiniz kısımla beraber tüm ürün kartlarının sergilendiği yer. ürün kartları (productıtem) adlı komponentde işlenecektir.
import React, { useState } from 'react'
import styles from "./ProductList.module.scss"
import { BsFillGridFill } from "react-icons/bs"
import { FaListAlt } from 'react-icons/fa'

const ProductList = () => {

  const [ grid, setGrid ] = useState(true)

  return (
    // product-list clasının arasında "-" olduğu için bu şekilde yazdık.
    <div className={styles[ "product-list" ]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="orangered" onClick={() => setGrid(true)} />
          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />
          <p>
            <b>10</b> Products found.
          </p>
        </div>
        {/* Buraya Search ile ilgili özel component yapılacak çünkü Search kısmını admin panelinde de kullanacağız */}
        <div>
          <p>Search</p>
        </div>
        {/* Sort Products */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select name="category" >
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default ProductList