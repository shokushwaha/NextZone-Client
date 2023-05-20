import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});
export function CartContextProvider({ children }) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState({});
    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    const [cartProducts, setCartProducts] = useState([]);


    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }
        if (ls) {
            const str = JSON.parse(ls.getItem('loggedIn'))
            if (str === 'true')
                setLoggedIn(true);
        }
        if (ls) {
            const user = JSON.parse(ls.getItem('loggedInUser'))
            setLoggedInUser(user);
        }



    }, [cartProducts]);

    const cart = loggedInUser?.data?.cart;
    let id = loggedInUser?.data?._id;

    useEffect(() => {



        if (ls && ls.getItem('cart')) {

            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
        for (const i in cart) {
            if (!cartProducts.includes(i))
                cartProducts.push(i);
        }

        // fetchCart()
    }, [])


    // async function fetchCart() {
    //     const result = await axios.post('/api/getcart', { id });
    //     console.log(result.data);
    //     console.log(typeof (result));
    //     // const tempCart = result.data.cart;
    //     // console.log(tempCart)
    //     const tempArr = result.data;
    //     // console.log(tempArr)
    //     // console.log(typeof (tempArr))
    //     // console.log(tempArr[0].name)
    //     // for (const i in tempArr) {
    //     // console.log(i.name)
    //     // }
    //     const tempCart = tempArr[0].cart;
    //     for (let i = 0; i < tempCart.length; i++) {
    //         console.log(tempCart[i])
    //         if (!cartProducts.includes(tempCart[i])) {
    //             cartProducts.push(tempCart[i]);
    //         }
    //     }
    // }

    async function addProduct(productId) {
        await axios.post('/api/addtocart', {
            id
            , productId
        });
        setCartProducts(prev => [...prev, productId]);


    }
    async function removeProduct(productId) {
        await axios.post('/api/removefromcart', {
            id
            , productId
        });
        setCartProducts(prev => {
            const pos = prev.indexOf(productId);
            if (pos !== -1) {
                return prev.filter((value, index) => index !== pos);
            }
            return prev;
        })
    }

    async function clearCart() {
        await axios.post('/api/clearcart', { id });
        setCartProducts([]);
    }


    return (
        <CartContext.Provider value={{ loggedIn, setLoggedIn, loggedInUser, setLoggedInUser, cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}