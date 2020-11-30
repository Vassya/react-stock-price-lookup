import React, { FC } from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(20%);
    opacity: .3;
  }

  to {
    transform: translateX(0%);
    opacity: 1;
  }
`;

const grow = keyframes`
  from {
    transform: scale(0);
    transform: translateX(-100%);
    opacity: .0;
  }

  to {
    transform: scale(1);
    transform: translateX(0%);
    opacity: 1;
  }
`;

const ItemContainer = styled.div<any>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.5rem;
  transition: 0.1s;
  opacity: 0.8;
  border-color: var(--primary);
  transform: translateZ(0);
  -moz-osx-font-smoothing: grayscale;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;

  &:hover {
    opacity: 1;
    transition: 0.1s;
    border-left: 5px solid var(--primary);
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:hover span {
    color: var(--primary) !important;
  }
  span {
    transform: scale(0) !important;
    animation: ${grow} 0.5s ease ${({ index = 0 }) => index / 10}s forwards !important;
  }
`;
const Titles = styled.div<any>`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 5px;
  animation: ${slideIn} 0.5s ease ${({ index = 0 }) => index / 10}s forwards;

  * {
    margin: 0;
  }

  & :nth-child(1)  {
  }

  & :nth-child(2)  {
    opacity: 0.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* number of lines to show */
  }
`;

export interface ListItemProps {
  preTitle: string;
  title: string;
  description?: string;
  index: number;
  width?: string;
  height?: string;
  image?: JSX.Element;
  className?: string;
  onClick?: VoidFunction;
  onMouseEnter?: (ev: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (ev: React.MouseEvent<HTMLElement>) => void;
}

export const ListItem: FC<ListItemProps> = React.memo((props) => {
  const {
    preTitle,
    title,
    description,
    width,
    height,
    index,
    image,
    onClick,
    ...rest
  } = props;
  return (
    <ItemContainer
      width={width}
      height={height}
      index={index}
      {...rest}
      onClick={onClick}
    >
      {image}
      <h5>{preTitle}</h5>
      <Titles index={index}>
        <h3>{title}</h3>
        <h4>{description}</h4>
      </Titles>
      <span>&gt;</span>
    </ItemContainer>
  );
});

ListItem.defaultProps = {
  title: "No Title",
  description: "",
  width: "100%",
  height: "4rem",
};
