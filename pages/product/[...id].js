import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center"
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product";
import { useContext } from "react";
import styled from "styled-components";
const Title = styled.div`
font-size:2rem;
`;
const Wrapper = styled.div`
display: grid;
grid-template-columns: 0.8fr 1.2fr;
gap: 40px;
margin-top: 40px;
min-height: 60vh;
`;

const WhiteBox = styled.div`
background: #fff;
border-radius: 10px;
padding:40px;
`;
export default function ProductPage({ product }) {

    const { addProduct } = useContext(CartContext);
    const addToCart = (id) => {
        addProduct(id);
    }
    return (
        <>
            <Header />
            <Center>
                <Wrapper>
                    <WhiteBox>
                        <ProductImages images={product.images} />
                    </WhiteBox>
                    <div >
                        <Title>
                            {product.title}
                        </Title>
                        <p>
                            {product.description}
                        </p>
                        <div className="flex  items-center justify-between">

                            <div className="mt-10 text-4xl">
                                ${product.price}
                            </div>
                            <div>
                                <button className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow" onClick={() => addToCart(product._id)}>

                                    <div class="absolute inset-0 w-3 bg-sky-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                                    <span class="relative text-black group-hover:text-white flex items-center justify-center gap-2 ">

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                        </svg>
                                        Add To Cart</span>
                                </button>


                            </div>
                        </div>
                    </div>

                </Wrapper>



            </Center>
        </>
    )
}
export async function getServerSideProps(context) {
    await mongooseConnect();
    const { id } = context.query;
    const product = await Product.findById(id)
    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        }
    }
}