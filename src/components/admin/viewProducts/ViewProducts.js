//// admin panelindeki allproducts componenti
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../../../firebase/config';

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
      })

    }
    catch(error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  };

  return (
    <div>ViewProducts</div>
  )
}

export default ViewProducts