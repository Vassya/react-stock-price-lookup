import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
  border: 0.2em solid rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #767676;
  border-radius: 50%;
  width: 2.28571429rem;
  height: 2.28571429rem;
  animation: ${spin} 1s linear infinite;
  margin: auto;
`;

const StyledText = styled.p`
  opacity: 0.7;
  width: 100%;
  text-align: center;
  font-size: 10px;
`;

export const spinner = ({ title = "Loading..." }) => {
  return (
    <div>
      <Spinner />
      <StyledText className="titleStyle">{title}</StyledText>
    </div>
  );
};

export default spinner;