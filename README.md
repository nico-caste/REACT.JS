# E-commerce con React y Firebase

Una aplicación de comercio electrónico funcional construida con React, Vite y Firebase. El proyecto simula una experiencia de compra completa, desde la exploración del catálogo hasta la generación de órdenes, e incluye un panel de administración para la gestión de productos y pedidos.

### [Ver Demo](https://react-js-coder-git-master-nicolas-projects-1433c515.vercel.app/)

## Características Principales

* **Carrito de Compras Completo:** Añade, elimina y modifica la cantidad de productos con validación de stock en tiempo real.
* **Catálogo de Productos Dinámico:** Los productos se cargan desde Firebase Firestore y se pueden filtrar por categoría y marca.
* **Panel de Administración (`/admin`):**
    * **Gestión de Productos:** Formulario para agregar nuevos productos a la base de datos con categorías y marcas que se sugieren dinámicamente.
    * **Gestión de Órdenes:** Visualiza todas las órdenes de compra, actualiza su estado (en preparación, enviado, etc.) y elimina órdenes.
* **Notificaciones por Email:** Integración con EmailJS para notificar automáticamente a los clientes cuando el estado de su orden es actualizado por un administrador.
* **Diseño Totalmente Responsivo:** La interfaz se adapta fluidamente a dispositivos móviles, tablets y de escritorio.
* **Navegacion intuitiva:** Se implemento una navegacion fluida para el usuario, que permite una experiencia de usuario mas confortable**
## Tecnologías Utilizadas

* **Front-End:** React.js, Vite, Sass
* **Enrutamiento:** React Router DOM
* **Base de Datos:** Firebase / Firestore
* **Notificaciones:** SweetAlert2
* **Mailing:** EmailJS
* **Iconos:** React Icons

---