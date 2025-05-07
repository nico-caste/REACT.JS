
# Projecto React Js - Coderhouse
## Entrega final
### Castellanos Nicolas
#### Esta es una app de e-comerce desarrollada con react JS - vite y utilizando como base de datos Firebase/Firestore.### En esta demo permite:
✅ Explorar productos por categorías

✅ Ver detalles de cada producto como cantidad en stock, descripcion y costos

✅ Agregar al carrito y gestionar cantidades

✅ Simular compra (sin pasarela de pago real)
### Caracteristicas principales:
* #### Catalogo dinamico:
Los productos se cargan desde Firebase Firestore
* #### Carrito persistente:
Manejo de estado con React Context
* #### Filtrado por categorías:
Navegacion con React Router
### Como funciona
#### 1. Carga de productos
Se obtienen desde Firebase Firestore al iniciar la app.

Se almacenan en el Contexto Global para evitar multiples llamadas.

#### 2. Gestion del carrito
Agregar productos: Controla el stock disponible.

Modificar cantidades: Actualiza el total en tiempo real.

Eliminar productos: Restaura el stock.

#### 3. Navegacion
Home: Muestra todos los productos.

/categoria/:categoria : Filtra por categoría.

/detalle/:id : Muestra detalles + selector de cantidad.

/cart : Muestra productos en el carrito permitiendo controlar su stock modificando dinamicamente el total y subtotal

## Demo

https://react-js-coder-git-master-nicolas-projects-1433c515.vercel.app


## Environment Variables

Este proyecto requiere las siguientes certificaciones:

VITE_API_KEY=AIzaSyDYlGI1IXUVoIDbeWoA2oCWdyfQDBCU5Es
VITE_AUTH_DOMAIN=proyecto-react-coder-69527.firebaseapp.com
VITE_PROJECT_ID=proyecto-react-coder-69527
VITE_STORAGE_BUCKET=proyecto-react-coder-69527.firebasestorage.app
VITE_MESSAGING_SENDER_ID=998130211939
VITE_APP_ID=1:998130211939:web:ba5af589aaa75b58cbac56
VITE_MEASUREMENT_ID=G-T5F7E6KBE6

