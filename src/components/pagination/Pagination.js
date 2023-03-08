//// home daki ürünleri sergilerken yada admin panelindeki tüm ürünleri gösterirken kullandığımız pagination burada oluşturulur.
import React, { useState } from 'react'
import styles from "./Pagination.module.scss"

const Pagination = ({currentPage,setCurrentPage,productsPerPage,totalProducts}) => {

  //gösterilecek sayfa numaraları
  const pageNumbers = []
  //toplam sayfa sayısı. Yukarıya yuvarlanma sebebi tam bölünmeyenlerde son kalan productlar için de bir sayfa ayrılması
  const totalPages = Math.ceil(totalProducts / productsPerPage)
  //min-max sayfa limitlerinin artırıp azaltılmasında kullanılacak. (0-5/5-10/10-15)
  const pageNumberLimit = 5
  //max sayfa limitini gösterecek state
  const [maxPageNumberLimit,setMaxPageNumberLimit] = useState(5)
  //min sayfa limitini gösterecek state
  const [minPageNumberLimit,setMinPageNumberLimit] = useState(0)

  //şu anki sayfayı belirlemek için kullanılır. Hangi sayfaya tıklanırsa o sayfaya geçer.
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  //next butonuna ait fonksiyon, tıklanınca önce kontrol ediyor; eğer current page max page limitine ulaşmışsa max-min page limitler güncelleniyor(0-5/5-10) .Sonra current page 1 artırılıyor
  //state güncellemesini if üzerinde kullansak dahi if içinde önceki değer olacaktır.
  const paginateNext = () => {

    if(currentPage === maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
    setCurrentPage(currentPage + 1)
  }

  //prev butonuna ait fonksiyon,tıklanınca önce kontrol ediyor; eğer (current page -1) min page limitine ulaşmışsa max-min page limitler güncelleniyor (5-10/0-5). Sonra current page 1 azaltılıyor
  const paginatePrev = () => {
    
    if((currentPage - 1) === minPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
    setCurrentPage(currentPage - 1)
  }

  // tüm sayfa numaraları kullanılmak üzere pageNumbers a kaydediliyor.
  for(let i = 1 ; i <= totalPages ; i++) {
    pageNumbers.push(i)
  }

  return (
    <ul className={styles.pagination}>
      {/* prev kısmı,sayfa 1 de gizlenecek */}
      <li
        onClick={paginatePrev}
        className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}
      >
        Prev
      </li>
      {/* numaraların gösterildiği yer, gösterilme limitleri max-min limitlere göre  */}
      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? `${styles.active}` : null}
            >
              {number}
            </li>
          );
        }
        return null;
      })}
      {/* next kısmı en son sayfada gizlenecek */}
      <li
        onClick={paginateNext}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? `${styles.hidden}`
            : null
        }
      >
        Next
      </li>
      {/* şu anki sayf ve toplam sayfa bilgisi veriliyor */}
      <p>
        <b className={styles.page}>{`page ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${totalPages}`}</b>
      </p>
    </ul>
  )
}

export default Pagination