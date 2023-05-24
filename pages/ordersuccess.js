import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center'
import Footer from '@/components/Footer';
import Header from '@/components/Header'
import Nav from '@/components/Navbar';
import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';

export default function Ordersuccess() {
    // const [confirm, setConfirm] = useState('');
    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    // const [clickd, setClicked] = useState(false);
    const { clearCart } = useContext(CartContext)
    return (
        <>
            <Head>
                <title>NextZone - Order Success</title>

            </Head>
            <Nav />
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Center>
                <div className='flex flex-col gap-4 items-center justify-center'>

                    <span className='mt-4 text-xl'>

                        You have to pay a amount of
                        <span className='px-2 text-2xl text-bold'>

                            $
                            {router.query.name}
                        </span>
                        at the time of delivery
                    </span>

                    {!clicked ?
                        <button onClick={() => {

                            setClicked(true)
                            toast.success("Order placed")
                            localStorage.removeItem('cart')
                            clearCart();
                        }
                        } className='bg-green-400 w-2/5 rounded-md shadow px-4 py-1 ' >Confirm Order</button>
                        : <span className='text-center text-green-600 text-2xl text-bold'>Order Placed Successfully</span>}
                </div>
            </Center>
            <Footer />
        </>
    )
}
