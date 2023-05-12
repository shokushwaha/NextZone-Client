
import { useEffect } from "react";
import styled from "styled-components";
import ProductBox from "./ProductBox";
import Center from "./Center";
const ProductsGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap: 30px;
padding-top: 30px;
padding-bottom: 40px;
`;
const StyledTitle = styled.div`
font-weight: 900;
font-size: 2rem;
padding-top: 20px;
border-bottom: 2px solid black;
`;
export default function NewProducts({ products }) {

    return (
        <>
            <Center>
                <StyledTitle>New Arrivals</StyledTitle>

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
