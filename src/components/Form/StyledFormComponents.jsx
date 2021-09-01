import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  margin-bottom: 1.5rem;
`;

export const StyledTitle = styled.h1`
  text-align: center;
  text-transform: uppercase;
  color: #2db57f;
  font-size: 2rem;
  margin-bottom: 1rem;

  text-shadow: 1px 1px 1px -2px rgba(0, 0, 0, 0.56);
`;

export const StyledLable = styled.label`
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

  min-width: 330px;
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
`;

export const StyledButton = styled.button`
  width: 250px;
  align-self: center;
  padding: 0.5rem 1rem;
  border: 1px solid #c15ae0;
  border-radius: 0.5rem;

  font-size: 1.5rem;

  text-transform: uppercase;

  color: #c15ae0;
  background: transparent;
  cursor: pointer;
  transition: transform 250ms ease-in-out, box-shadow 250ms ease-in-out;

  &:hover,
  &:focus {
    transform: translateY(-0.15rem);
    box-shadow: 2px 2px 5px -2px rgba(0, 0, 0, 0.56);
  }
`;
