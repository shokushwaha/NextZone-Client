import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { motion } from "framer-motion";
const Bg = styled.div`
color: #fff;
background-color: #222;
padding: 40px 0px;
`;

const Title = styled.h1`
  margin:0;
  font-weight  :normal  ;
  font-size: 2rem;
  text-transform: uppercase;
  padding: 10px 0px;
`;

const Desc = styled.p`
   color: #aaa;
   font-size: 0.8rem;
`;

const Wrapper = styled.div`
display: grid;
grid-template-columns: 1.2fr 0.8fr;
gap:40px;
img{
    max-width: 100%;
}
`;

const Column = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const ButtonWrapper = styled.div`
display: flex;
gap: 10px;
margin-top: 20px;
`;

const StyledImage = styled.img`
border-radius: 4px;
box-shadow: 0px 10px 10px gray;
transition: all;
transition-duration: 200ms;
:hover{
    transform: translateY(-4px);
    transform: scale(1.1);
}
`;

export default function Featured({ product }) {


    const { addProduct } = useContext(CartContext);
    const addFeaturedToCart = () => {
        addProduct(product._id);
    }

    return (
        <>
            <Bg>

                <Center>


                    <motion.div
                        className="container text-center"
                        initial={{ opacity: 0, x: "-2000px" }}
                        animate={{ opacity: 1, x: "0px" }}
                        exit={{ opacity: 0, x: "-2000px" }}
                        transition={{ duration: 1 }}
                    >
                        <Wrapper>
                            <Column>
                                <div>

                                    <Title>{product.title}</Title>
                                    <Desc>{product.description}</Desc>
                                    <ButtonWrapper>
                                        <ButtonLink white outlined href={'/product/' + product._id}>
                                            Read More</ButtonLink>
                                        <Button primary size="l" onClick={addFeaturedToCart} >
                                            <CartIcon />
                                            Add To Cart</Button>
                                    </ButtonWrapper>
                                </div>

                            </Column>
                            <Column>

                                <StyledImage src="https://res.cloudinary.com/dt21djrjq/image/upload/v1683804256/mah5bgotqqq4szpxhos6.jpg" alt="featured image" />


                            </Column>

                        </Wrapper>
                    </motion.div>
                </Center>
            </Bg>
        </>
    )
}

