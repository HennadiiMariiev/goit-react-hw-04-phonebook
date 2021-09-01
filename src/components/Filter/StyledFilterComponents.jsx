import styled from "styled-components";

export const StyledLabel = styled.label`
  text-transform: uppercase;
  font-size: 1.25rem;
  font-weight: 600;

  color: #2db57f;

  display: flex;
  align-self: flex-end;
  align-items: center;
  justify-content: space-between;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  &:last-of-type {
    margin-bottom: 2rem;
  }
`;

export const StyledInput = styled.input`
  margin-left: 0.75rem;
  display: block;
  min-width: 350px;
  height: 2rem;
  font-size: 1.25rem;
  font-weight: 400;
  padding: 0.5rem 0.5rem 0.25rem;

  border: 0;
  border-bottom: 1px solid #c15ae0;
  color: #1f2120;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #ffffff inset !important;
  }

  &:focus {
    outline-color: #c15ae0;
  }

  &:disabled {
    border: 1px solid #e1e8e5;
  }
`;
