import styled from "styled-components"
import css from "styled-jsx/css";

const StyledButton = styled.button`
border: none;
padding: 4px 10px;
border-radius: 4px;
cursor: pointer;
${props => props.white && props.outline && css`
    background-color: gray;
    color: #000;
    border:2px solid white;
`}

${props => props.primary && css`
background-color: green;
color: #fff; 
    
`}

${props => props.size === 'l' && css`
    font-size: 1.2rem;
    padding: 10px 20px;
`}
`;

export default function Button({ children, ...rest }) {
    return (
        <>
            <StyledButton {...rest}>{children}</StyledButton>
        </>
    )
}
