import styled from "styled-components";

export const InputContainer = styled.div`
    background: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 800px;
    position: relative;
    z-index: 1;
`;

export const InputContent = styled.div`
    z-index: 3;
    max-width: 1200px;
    position: absolute;
    padding: 8px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const InputH1 = styled.h1`
    color: #fff;
    font-size: 48px;
    text-align: center;

    @media screen and (max-width: 768px) {
        font-size: 40px;
    }

    @media screen and (max-width: 480px) {
        font-size: 32px;
    }
`;

export const InputP = styled.p`
    margin-top: 24px;
    color: #000;
    font-size: 24px;
    text-align: center;
    max-width: 600px;

    @media screen and (max-width: 768px) {
        font-size: 24px;
    }

    @media screen and (max-width: 480px) {
        font-size: 18px;
    }
`;

export const InputBtnWrapper = styled.form`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Button = styled.button`
    border-radius: 50px;
    background: ${({ primary }) => (primary ? '#06CCFF' : '#010606')};
    white-space: nowrap;
    padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')};
    color: ${({ dark }) => (dark ? '#010606' : '#fff')};
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;


    &:hover {
        transition: all 0.2s ease-in-out;
         background: ${({ primary }) => (primary ? '#fff' : '#06CCFF')};;
    }
`

export const Input = styled.input`
    border-radius: 50px;
    background: ${({ primary }) => (primary ? '#06CCFF' : '#010606')};
    white-space: nowrap;
    padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')};
    color: ${({ dark }) => (dark ? '#010606' : '#fff')};
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    margin-bottom: 10px;

    &:hover {
        transition: all 0.2s ease-in-out;
         background: ${({ primary }) => (primary ? '#fff' : '#06CCFF')};;
    }
`