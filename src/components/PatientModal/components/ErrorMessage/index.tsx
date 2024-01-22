import { Message } from "./styles";

interface Props {
  message: string
}

export function ErrorMessage({ message }: Props) {
  return (
    <Message>
      {message}
    </Message>
  );
}
