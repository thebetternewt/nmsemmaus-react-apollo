import styled from 'styled-components';
import { PURPLE } from './colors';

export default styled.div`
  width: 180px;
  height: 5px;
  background-color: ${({ color }) => color || PURPLE};
  box-shadow: 2px 3px 15px rgba(0, 0, 0, 0.5);
  margin: ${({ margin }) => `${margin || '2rem'} auto`};
`;
