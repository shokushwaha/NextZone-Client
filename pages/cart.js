import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Input from "@/components/Input";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import Footer from "@/components/Footer";
import { Toaster, toast } from "react-hot-toast";
import Confetti from 'react-confetti'
const ColumnsWrapper = styled.div`
display: grid;
grid-template-columns: 1.2fr 0.8fr;
gap: 40px;
margin-top: 40px;





  @media screen and (max-width: 550px) {
   
display  :flex ;
flex-direction: column;
justify-content: center;

}

  



`;

const Box = styled.div`
background-color: #fff;
border: 10px;
padding: 20px;
min-height:90vh;
overflow-x: hidden;
`;


const StyledButton = styled.button`
width: 100%;
background-color: transparent;
color:green ;
border:1px solid green;
padding: 4px 15px;
border-radius: 4px;
transition: all;
transition-duration: 200ms;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 10px;
:hover{
    background-color: green;
    color: white;
    transform: scale(1.1);
    svg{
        display: flex;
      width: 100px;
    }
    span{
        display: none;
    }
}
`;

const StyledTable = styled.table`
width: 100%;
th{
    padding: 10px 0px;
    text-align: left;
    text-transform: uppercase;
    color: #bbb;
    font-size: 0.8rem;
    border-bottom: 2px solid black;
}
tr{
    border-bottom: 2px solid #f0f0f0;
}
img{
    width: 80px;
    border-radius: 10px;
    background-color: #f0f0f0;
    padding: 4px;
}
`;
const ProductCell = styled.div`
display: flex;
flex-direction: column;
padding-bottom: 10px;
padding-top: 4px;

`;
const QuantityButton = styled.button`
width: 30%;
font-size: 1.5rem;
border: 2px solid #f0f0f0;
border-radius: 10px;
margin: 0px 10px;

@media screen and (max-width: 770px) {
   
   font-size: 1.2rem;
   width: 15%;
   
   text-align: center;
  
   }

@media screen and (max-width: 430px) {
   
   font-size: 1.2rem;
   width: 15%;
 
   
   }
`;

const CityHolder = styled.div`
display: flex;
gap:10px;
`;
const ClearButton = styled.button`
background-color: #ff8080;
padding: 2px 8px;
border-radius: 4px;
:hover{
    background-color: #ff3333;
    box-shadow  :0px 0px 4px #ff3333 ;
}

`;
export default function CartPage() {

    const { loggedInUser, cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (cartProducts?.length > 0) {
            axios.post('/api/cart', { ids: cartProducts }).then(response => setProducts(response.data));
        }
        else {
            setProducts([]);
        }

    }, [cartProducts])

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window?.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
        }
    }, []);
    const moreOfThisProduct = (id) => {
        addProduct(id);
    }
    const lessOfThisProduct = (id) => {
        removeProduct(id);
    }

    const clearAll = () => {
        clearCart();
        setProducts([]);
    }

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    let discountedPrice = 0;
    for (let i = 0; i < products.length; i++) {

        let p = products[i].price;
        let d = products[i].discount
        discountedPrice = discountedPrice + (p - (p * d) / 100);
    }
    let id = loggedInUser?.data?._id;
    const goToPayment = async () => {
        if (!name || !city || !email || !postalCode || !streetAddress || !country) {
            alert("Fill all the details");
            return;
        }
        await axios.post('/api/order', { id, cartProducts });
        const response = await axios.post('/api/checkout', {
            name, email, city, postalCode, streetAddress, country,
            cartProducts, discountedPrice
        });
        if (response.data.url) {
            window.location = response.data.url;
        }
        else {
            alert("Some error occured")
        }

        clearCart();
    }




    const payOnDelivery = async () => {
        if (!name || !city || !email || !postalCode || !streetAddress || !country) {

            alert("Fill all the details");
            return;
        }

        router.push(
            {
                pathname:
                    '/ordersuccess',
                query: { name: discountedPrice }
            }

        );
    }


    if (isSuccess) {
        return (
            <>
                <Head>
                    <title>NextZone - Cart</title>

                </Head>

                <Navbar />

                <Center>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                    <Confetti className=' mx-auto'
                        width={1000}
                        height={800}
                    />
                    <Box>
                        <div className="flex flex-col gap-10 ">

                            <div className='flex flex-col gap-4 mt-4 bg-green-200 p-4 rounded-md shadow'>

                                <h1>Payment Successfull!</h1>
                                <p>Thanks for your Order</p>
                            </div>
                            <div className='text-gray-400 font-bold border-b-2 border-gray-400 px-4 py-2 w-1/3' >

                                <Link href={'/'}>Go To Home....</Link>
                            </div>
                        </div>
                    </Box>

                </Center>
            </>
        )
    }

    return (
        <div className="overflow-x-hidden">
            <Header />
            <Center>
                <motion.div
                    className="container text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}

                >

                    <ColumnsWrapper>
                        <Box>
                            <h2>Cart</h2>
                            {!cartProducts?.length && (
                                <>
                                    <div>
                                        Your cart is empty
                                    </div>

                                </>
                            )}
                            {
                                products?.length > 0 && (
                                    <StyledTable>
                                        <thead>
                                            <tr>

                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>



                                            {products.map(product => (
                                                <>
                                                    <tr key={product._id}>
                                                        <ProductCell>

                                                            <td>
                                                                <img src={product.images[0]} alt="image" />
                                                            </td>
                                                            <td>    {product.title}</td>
                                                        </ProductCell>
                                                        <td >


                                                            <QuantityButton onClick={() => lessOfThisProduct(product._id)} >-</QuantityButton>
                                                            {cartProducts.filter(id => id === product._id).length}
                                                            <QuantityButton onClick={() => moreOfThisProduct(product._id)}>+</QuantityButton>
                                                        </td>
                                                        <td>${cartProducts.filter(id => id === product._id).length * product.price}</td>

                                                    </tr>

                                                </>
                                            )
                                            )
                                            }
                                            <tr>
                                                <td>
                                                    <ClearButton onClick={clearAll}>
                                                        Clear Cart
                                                    </ClearButton>
                                                </td>
                                                <td></td>
                                                <td className="flex flex-col">
                                                    <span className="text-gray-400 line-through">
                                                        ${total}
                                                    </span>
                                                    <span className="text-gray-800 font-bold">
                                                        ${discountedPrice}
                                                    </span>
                                                </td>
                                            </tr>


                                        </tbody>
                                    </StyledTable>
                                )
                            }
                        </Box>

                        {!!cartProducts?.length && (
                            <Box>
                                <h2>Order Information</h2>


                                <Input type="text"
                                    required
                                    placeholder="Name"
                                    value={name}
                                    name="name"
                                    onChange={e => setName(e.target.value)} />
                                <Input type="text"
                                    placeholder="Email"
                                    required
                                    value={email}

                                    name="email"
                                    onChange={e => setEmail(e.target.value)} />
                                <CityHolder>
                                    <Input type="text"
                                        placeholder="City"
                                        required
                                        value={city}
                                        name="city"
                                        onChange={e => setCity(e.target.value)} />
                                    <Input type="text"
                                        placeholder="Postal Code"
                                        value={postalCode}
                                        name="postalCode"
                                        required
                                        onChange={e => setPostalCode(e.target.value)} />
                                </CityHolder>
                                <Input type="text"
                                    placeholder="Street Address"
                                    value={streetAddress}
                                    required
                                    name="streetAddress"
                                    onChange={e => setStreetAddress(e.target.value)} />
                                <Input type="text"
                                    placeholder="Country"
                                    value={country}
                                    required
                                    name="country"
                                    onChange={e => setCountry(e.target.value)} />

                                <StyledButton onClick={goToPayment}>
                                    <span>
                                        Continue To Payment
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 hidden">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </StyledButton>
                                <StyledButton onClick={payOnDelivery}>
                                    <span>
                                        Pay on Delivery
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 hidden">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </StyledButton>

                            </Box>

                        )}



                    </ColumnsWrapper>
                </motion.div>
            </Center>
            <Footer />

        </div>
    )
}
