import { productos } from "./products";
export const fetchdata = () => new Promise ((res,rej) => {
    setTimeout(()=> {
        res(productos);
    },1000);
});