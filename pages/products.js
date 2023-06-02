import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductBox from "@/components/ProductBox";
import styled from "styled-components";
import { motion } from "framer-motion";
import Nav from "@/components/Navbar";
import Head from "next/head";
import Footer from "@/components/Footer";
import { useEffect } from "react";
const ProductsGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr ;
gap: 30px;
padding-top: 30px;
padding-bottom: 20px;



@media screen and (max-width: 700px) {
    display: grid;
grid-template-columns: 1fr 1fr 1fr;
   
  }

  @media screen and (max-width: 550px) {
    display: grid;
grid-template-columns: 1fr 1fr;
   
  }

  
  @media screen and (max-width: 400px) {
    display: grid;
grid-template-columns: 1fr;
   
  }


`;
export default function ProductsPage({ products }) {

    return (
        <>
            <Head>
                <title>NextZone - All Products</title>

            </Head>
            <div className="overflow-x-hidden">

                <Nav />
                <Center>
                    <motion.div
                        className="container text-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}

                    >
                        <ProductsGrid>
                            {products.length > 0 && products.map(product => (
                                <div key={product._id}>
                                    <ProductBox {...product} />
                                </div>
                            ))}
                        </ProductsGrid>
                    </motion.div>
                </Center>
                <Footer />
            </div>

        </>
    )
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, { sort: { '_id': -1 } });

    return {
        props: {
            products: JSON.parse(JSON.stringify(products))

        }
    };
}
