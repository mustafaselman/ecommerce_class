//// admin panelindeki allproducts componenti
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const ViewProducts = () => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  const getProducts = () => {
    setIsLoading(true)
    try {

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