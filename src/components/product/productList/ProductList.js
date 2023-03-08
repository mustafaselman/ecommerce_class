//// home sayfasındaki ürünler hakkında gösterim, arama, sıralama yapabildiğiniz kısımla beraber tüm ürün kartlarının sergilendiği yer. ürün kartları (productıtem) adlı komponentde işlenecektir.
import React, { useEffect, useState } from 'react'
import styles from "./ProductList.module.scss"
import { BsFillGridFill } from "react-icons/bs"
import { FaListAlt } from 'react-icons/fa'
import Search from '../../search/Search'
import ProductItem from '../productItem/ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_SEARCH, selectFilteredProducts, SORT_PRODUCTS } from '../../../redux/slice/filterSlice'
import Pagination from '../../pagination/Pagination'

const ProductList = ({products}) => {

  const [ grid, setGrid ] = useState(true)
  const [ search, setSearch ] = useState("")
  const [sort,setSort] = useState("latest")

  const filteredProducts = useSelector(selectFilteredProducts)

  // şu anki sayfayı tutan state
  const [currentPage,setCurrentPage] = useState(1)
  //sayfa başına kaç ürün olacağını gösterir
  const productsPerPage = 9

  //sayfadaki son elemanın endexi (formülizasyon alttaki slice için oluşturuldu)
  const indexOfLastProduct = currentPage * productsPerPage
  //sayfadaki ilk elemanın endexi (formülizasyon alttaki slice için oluşturuldu)
  const indexOfFirstProduct = ( currentPage - 1 ) * productsPerPage
  //slice ilk elemanı alır,ikincisini almaz. Bu sebeple sayfada 9 eleman istiyorsak (0-9)(9-18)(18-27) şeklinde ilerlemeli
  const currentProducts = filteredProducts.slice(indexOfFirstProduct,indexOfLastProduct)

  const dispatch = useDispatch();

  useEffect(() =>
  {
    dispatch(SORT_PRODUCTS({ products, sort }))
  }, [ dispatch, products, sort ])

  useEffect(() =>
  {
    dispatch(FILTER_BY_SEARCH({ products, search }))
  }, [ dispatch, products, search ])

  return (
    // product-list clasının arasında "-" olduğu için bu şekilde yazdık.
    <div className={styles[ "product-list" ]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="orangered" onClick={() => setGrid(true)} />
          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />
          <p>
            <b>{filteredProducts.length}</b> Products found.
          </p>
        </div>
        {/* Buraya Search ile ilgili özel component yapılacak çünkü Search kısmını admin panelinde de kullanacağız */}
        <div>
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select name="category" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className={grid && `${styles.grid}`}>
        {products.lenght === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {currentProducts.map((product) =>
            {
              return (
                <div key={product.id}>
                  {/* objeler için spread operatörü kullanılabilir. {...} ile, product objesinin içindeki tüm propertylere erişilebilir. Ayrıca tüm objeyi beraber kullanacağımız için de "product" ı ayrı istedik. Grid durumuna göre de component özelleşeceği için onu da aldık. */}
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              )
            })}
          </>
        )}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} productsPerPage={productsPerPage} totalProducts={filteredProducts.length}/>
    </div>
  )
}

export default ProductList