import { styled } from "styled-components";

export const PatientsTableContainer = styled.table`
  width: 100%;
  padding: 0 1rem;

  thead {
    background-color: ${({ theme }) => theme["gray-100"]};
    line-height: 0;
  }

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

  td {
    padding: 0.75rem 1rem;
    color: ${({ theme }) => theme["gray-700"]};
    font-size: 0.875rem;
  }

  td > span, td > button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  td:first-child {
    color: ${({ theme }) => theme.blue};
  }

  td > button {
    background-color: transparent;
    cursor: pointer;
    line-height: 0;
    border: none;
    padding: 0.25rem;
  }
`;
