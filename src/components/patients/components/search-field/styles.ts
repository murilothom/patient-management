import styled from 'styled-components';

export const SearchFieldContainer = styled.div`
  line-height: 0;
  width: 11.25rem;
  height: 2.5rem;
  padding: 0.625rem 0.9375rem;
  border: 1px solid ${({ theme }) => theme['gray-200']};
  border-radius: 5px;
  display: flex;
  gap: 0.5rem;

  @media(max-width: 720px) {
    width: 10.55rem;
    height: 2.25rem;
  }

  & > input {
    max-width: calc(100% - 1rem);
    border: none;
    color: ${({ theme }) => theme['gray-400']};
    box-shadow: none;
  }
`;
