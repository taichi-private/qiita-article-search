import styled from "styled-components";

interface ButtonProps {
  text: string;
  callBack: () => void;
}
const ButtonItem = styled.div`
  background: #ff0000;
`

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <ButtonItem onClick={() => {
      props.callBack();
    }}>{props.text}</ButtonItem>
  );
} 