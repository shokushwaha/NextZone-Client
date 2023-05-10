import Image from "next/image";
import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";

const Bg = styled.div`
color: #fff;
background-color: #222;
padding: 50px 0px;
`;

const Title = styled.h1`
  margin:0;
  font-weight  :normal  ;
`;

const Desc = styled.p`
   color: #aaa;
   font-size: 0.8rem;
`;

const Wrapper = styled.div`
display: grid;
grid-template-columns: 0.8fr 1.2fr;
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

export default function Featured({ product }) {
    return (
        <>
            <Bg>

                <Center>

                    <Wrapper>
                        <Column>
                            <div>

                                <Title>{product.title}</Title>
                                <Desc>{product.description}</Desc>
                                <ButtonWrapper>
                                    <ButtonLink white outlined size="l" href={'/products/' + product._id}>


                                        Read More</ButtonLink>
                                    <Button primary size="l" >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                        </svg>
                                        Add To Cart</Button>
                                </ButtonWrapper>
                            </div>

                        </Column>
                        <Column>
                            <Image
                                src="./public/next.svg"
                                width={200}
                                height={200}
                                alt="Image" />


                        </Column>

                    </Wrapper>

                </Center>
            </Bg>
        </>
    )
}

