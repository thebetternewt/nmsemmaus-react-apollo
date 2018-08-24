import styled from 'styled-components';
import { RED } from './colors';

export const ActionButton = styled.button`
  align-items: center;
  background-color: ${RED};
  border: 3px solid ${RED};
  border-radius: 100px;
  display: flex;
  color: #fff;
  cursor: pointer;
  font-family: 'Montserrat', helvetica, arial, sans-serif;
  /* font-size: 1.1rem; */
  font-size: inherit;
  font-weight: 500;
  justify-content: center;
  padding: 0 1.5em;
  text-transform: uppercase;
  transition: all 200ms ease-out;
  box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.4);
  margin-left: 8px;
  height: 80px;
  max-height: 70%;

  &:hover,
  &:active,
  &:focus {
    background-color: #fff;
    color: ${RED};
  }
`;
