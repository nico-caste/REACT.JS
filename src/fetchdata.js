import { collection, getDocs, } from "firebase/firestore";
import {db} from "./firebaseConfig";

export const fetchdata = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const productos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return productos;
    } catch (err) {
      console.error("Error fetching products: ", err);
      throw err;
    }
  };