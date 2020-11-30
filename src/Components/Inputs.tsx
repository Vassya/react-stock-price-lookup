import React, { FC, forwardRef, memo, useState } from "react";
import styled from "styled-components";

export enum ControlPlacementTypes {
  top,
  bottom,
  left,
  right,
}

export enum ItemsPlacements {
  Horizontal = 0,
  HorizontalFlow = 1,
  VerticalStack = 2,
}
export interface ContainerProps {
  name?: string;
  style?: React.CSSProperties;
  itemsPlacement?: ItemsPlacements;
}

export const Container: FC<ContainerProps> = memo((props) => {
  const { name, style, itemsPlacement, children } = props;

  const isHorizontal = itemsPlacement === ItemsPlacements.Horizontal;
  const defaultStyle: React.CSSProperties = {
    position: "relative",
    border: 0,
    borderStyle: "none",
    display: "flex",
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    flexDirection: isHorizontal ? "row" : "column",
    flexWrap: isHorizontal ? "nowrap" : "wrap",
    flexGrow: isHorizontal ? 1 : 0,
    flexShrink: isHorizontal ? 1 : 0,
    width: isHorizontal ? "100%" : "auto",
    height: "auto",
  };

  return (
    <div id={name} style={{ ...defaultStyle, ...style }}>
      {children}
    </div>
  );
});

Container.displayName = "Container";

const InputContainer = styled.div<any>`
  position: relative;
  color: grey;
  display: flex;
  width: 100%;
  img {
    cursor: pointer;
    position: absolute;
    height: 50%;
    bottom: 20%;
    right: 1rem;
    opacity: 1;
  }
  border-bottom: 1px solid var(--grey);
  margin-bottom: 0.3em;
`;

const NiceLabel = styled.label<any>`
  transition: 0.3s;
  position: absolute;
  text-align: left;
  width: fit-content;
  pointer-events: none;
  height: 30%;
  bottom: 35%;
  left: 0rem;

  ${(props) =>
    props.lift &&
    `
    bottom: 75%;
    font-size: .8rem;
    color: var(--primary);
    `}
`;

const NiceInput = styled.input<any>`
  width: 100%;
  border: none;
  padding: 1rem ${({ trailingIcon }) => (trailingIcon ? 2.5 : 1)}rem 0.5rem 0rem;
  font-size: inherit;
  font-family: inherit;
  background-color: rgba(255, 255, 255, 0);
  color: ${({ readOnly }) => (readOnly ? "gray" : "var(--text-color)")};
  &:focus {
    outline: none;
  }
`;

const UnderLine = styled.div<any>`
  height: 1px;
  width: 0%;
  bottom: -1px;
  transition: 0.3s;
  position: absolute;
  ${(props) =>
    props.lift &&
    `
          width: 100%;
          background-color: var(--primary);
      `}
`;
interface InputProps {  // extends React.Props<HTMLInputElement>
  value?: string;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
  trailingIcon?: JSX.Element;
  style?: React.CSSProperties;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  trailingIconOnclick?: VoidFunction;
}

export const Input: FC<InputProps> = memo(forwardRef(
  (props: InputProps, forwardRef: React.Ref<HTMLInputElement>) => {
    const {
      value,
      placeholder,
      trailingIcon,
      trailingIconOnclick,
      onChange,
      readOnly,
      className,
      style,
      ...rest
    } = props;

    const ref = forwardRef || React.createRef<HTMLInputElement>();

    const [isFocused, setIsFocused] = useState(false);
    const hasText = value ? value.length > 0 : 0;

    return (
      <InputContainer style={style} {...rest}>
        <NiceLabel lift={isFocused || hasText}>{placeholder}</NiceLabel>
        <NiceInput
          ref={ref}
          className={className}
          readOnly={readOnly}
          value={value || ""}
          trailingIcon={trailingIcon}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={onChange}
        />
        {trailingIcon && (
          <InputAddon
            trailingIcon={trailingIcon}
            onClick={trailingIconOnclick}
          />
        )}
        <UnderLine lift={isFocused || hasText} />
      </InputContainer>
    );
  }
));

function InputAddon({ trailingIcon, ...props }) {
  return (
    <div style={{ marginTop: "0.5em", cursor: "pointer" }} {...props}>
      <div style={{ marginTop: "0.5em" }}>{trailingIcon}</div>
    </div>
  );
}

Input.defaultProps = {
  value: "",
  readOnly: false,
};

