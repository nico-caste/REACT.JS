import { createContext, useContext, useState } from "react";

const AppContext = createContext ();

export const useAppContext = () => useContext(AppContext);

export const ContextProvider = (props) => {
    const [cart,setCart] = useState([]);

    function agregarACarrito (prod, cantidad){
        const nuevoProd = {
            ...prod,
            cantidad,
        };
        if (cart.some (el=> el.id === prod.id)) {
            const newCart = cart.map (element => {
                if (element.id === prod.id) {
                    return {
                        ...element,
                        cantidad: element.cantidad + cantidad
                    };
                } else {
                    return element;
                };
            })
            setCart (newCart);
        } else {
            setCart ([...cart, nuevoProd]);
        };
    };

    return(
        <AppContext.Provider value={{cart, agregarACarrito}}>
            {props.children}
        </AppContext.Provider>
    )
};