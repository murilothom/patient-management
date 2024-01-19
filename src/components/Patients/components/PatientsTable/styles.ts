import { styled } from "styled-components";

export const PatientsTableContainer = styled.table`
  width: 100%;
  padding: 0 1rem;
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme["gray-100"]};
  line-height: 0;

  tr > th {
    border: 1px solid ${({ theme }) => theme["gray-200"]};
    border-left: none;
    border-right: none;
    padding: 1rem;
  }

  tr > th > button {
    line-height: 0;
    cursor: pointer;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    color: ${({ theme }) => theme["gray-600"]};
    font-weight: 600;
    gap: 0.5rem;
  }

  tr > th > button:disabled {
    cursor: default;
  }
`;