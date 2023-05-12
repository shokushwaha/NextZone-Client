import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductBox from "@/components/ProductBox";
import styled from "styled-components";
const ProductsGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr ;
gap: 30px;
padding-top: 30px;
padding-bottom: 20px;
`;
export default function ProductsPage({ products }) {
    return (
        <>

            <Header />
            <Center>
                <ProductsGrid>
                    {products.length > 0 && products.map(product => (
                        <div key={product._id}>
                            <ProductBox {...product} />
                        </div>
                    ))}
                </ProductsGrid>

            </Center>
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
