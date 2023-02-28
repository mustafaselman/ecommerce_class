//// google firebase içerisinde 3 koleksiyon tutulacak: products, orders, reviews. Bu koleksiyonları toplu halde çekebilmek için bu hook kullanılacak
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCollection = () => {
    setIsLoading(true);

    try {
      // belirli bir koleksiyonu almak için kullanılır
      const docRef = collection(db, collectionName);
      // seçtiğimiz koleksiyonu sıralamak için kullanılır.
      const q = query(docRef, orderBy("createdAt", "desc"));
      // gerçek zamanlı anlık olarak sıraladığımız bu verileri dinlemek için kullanılır.
      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(allData);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return { data, isLoading };
};

export default useFetchCollection;
