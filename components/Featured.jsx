import Image from "next/image";
import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";

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

export default function Featured() {
    return (
        <>
            <Bg>

                <Center>

                    <Wrapper>
                        <Column>
                            <div>

                                <Title>Pro Anywhere</Title>
                                <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nobis maiores pariatur officia assumenda odio asperiores rem possimus esse, repellendus unde veniam eaque quia. Ratione modi, inventore amet suscipit dolore possimus quod corporis impedit qui distinctio molestiae perspiciatis voluptatibus sapiente.</Desc>
                                <Button white outline size="l">Read More</Button>
                                <Button primary size="l" >Add To Cart</Button>
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
