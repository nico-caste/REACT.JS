import { collection, getDocs, getDoc, doc, addDoc, writeBatch, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import emailjs from '@emailjs/browser';


export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const products = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id 
    }));
    return products;
  } catch (err) {
    console.error("Error al cargar productos: ", err);
    throw err;
  }
};

export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "productos"), productData);
    return docRef.id;
  } catch (err) {
    console.error("Error al agregar el producto:", err);
    throw err;
  }
};

export const updateProductStock = async (cart) => {
  const batch = writeBatch(db);

  for (const item of cart) {
    if (!item.id || typeof item.id !== 'string') {
      throw new Error(`Uno de los productos en el carrito tiene un ID inválido: ${item.nombre}`);
    }
    const productRef = doc(db, "productos", item.id);
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()) {
      throw new Error(`El producto ${item.nombre} no existe.`);
    }

    const currentStock = productDoc.data().stock;
    if (currentStock < item.cantidad) {
      throw new Error(`Stock insuficiente para ${item.nombre}.`);
    }

    batch.update(productRef, {
      stock: currentStock - item.cantidad
    });
  }

  await batch.commit();
};

export const getOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "ordenes"));
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return orders;
  } catch (err) {
    console.error("Error al cargar ordenes: ", err);
    throw err;
  }
};

export const createOrder = async (order) => {
  try {
    const docRef = await addDoc(collection(db, "ordenes"), order);
    return docRef.id;
  } catch (err) {
    console.error("Error al crear la orden:", err);
    throw err;
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, "ordenes", orderId);
    await updateDoc(orderRef, { estado: newStatus });
  } catch (err) {
    console.error("Error al actualizar la orden:", err);
    throw err;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const orderRef = doc(db, "ordenes", orderId);
    await deleteDoc(orderRef);
  } catch (err) {
    console.error("Error al eliminar la orden:", err);
    throw err;
  }
};

export const sendOrderStatusEmail = async (templateParams) => {
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  try {
    const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);
    console.log("Email enviado con éxito!", response.status, response.text);
  } catch (err) {
    console.error("Error al enviar el email:", err);
    throw err;
  }
};