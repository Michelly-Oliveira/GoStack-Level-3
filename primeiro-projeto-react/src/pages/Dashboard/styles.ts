import styled, { css } from 'styled-components';
import { shade } from 'polished';

// Define that the Form has a prop called hasError
interface FormProps {
    hasError: boolean;
}

export const Title = styled.h1`
    font-size: 48px;
    color: #3a3a3a;
    margin-top: 80px;
    max-width: 450px;
    line-height: 56px;
`;

export const Form = styled.form<FormProps>`
    margin-top: 40px;
    max-width: 700px;
    display: flex;

    input {
        /* Take all the space available on the 700px except the width of the button */
        flex: 1;
        height: 70px;
        padding: 0 24px;
        border: 0;
        border-radius: 5px 0 0 5px;
        color: #3a3a3a;
        border: 2px solid #fff;
        border-right: 0;

        /* Use an arrow function to have access to the props of the element and create/modify styles based on it*/
        /* add css to the inline condition */
        ${props =>
            props.hasError &&
            css`
                border-color: #c53030;
            `}

        &::placeholder {
            color: #a8a8b3;
        }
    }

    button {
        width: 210px;
        height: 70px;
        background: #04d301;
        border: 0;
        border-radius: 0 5px 5px 0;
        color: #fff;
        font-weight: bold;
        transition: background-color 0.2s;

        &:hover {
            background: ${shade(0.2, '#04d301')};
        }
    }
`;

export const Error = styled.span`
    display: block;
    color: #c53030;
    margin-top: 8px;
`;

export const Repositories = styled.div`
    margin-top: 80px;
    max-width: 700px;

    a {
        background: #fff;
        border-radius: 5px;
        width: 100%;
        padding: 24px;
        display: block;
        text-decoration: none;
        display: flex;
        align-items: center;
        transition: transform 0.2s;

        &:hover {
            transform: translateX(10px);
        }

        /* If an <a> element comes after aonther <a> element, apply margin-top */
        & + a {
            margin-top: 16px;
        }

        img {
            width: 64px;
            height: 64px;
            border-radius: 50%;
        }

        div {
            margin: 0 16px;
            flex: 1;

            strong {
                font-size: 20px;
                color: #3d3d4d;
            }

            p {
                font-size: 18px;
                color: #a8a8b3;
                margin-top: 4px;
            }
        }

        svg {
            margin-left: auto;
            color: #cbcbd6;
        }
    }
`;
