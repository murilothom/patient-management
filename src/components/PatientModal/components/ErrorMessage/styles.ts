import styled from "styled-components";

export const Message = styled.span`
  position: absolute;
  color: ${({ theme }) => theme.red};
  font-size: 0.625rem;
  bottom: -0.9375rem;
  right: 0;
`;
