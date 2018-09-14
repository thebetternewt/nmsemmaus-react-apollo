import styled from 'styled-components';

export default styled.div`
  ${props =>
    props.dark
      ? 'background-color: #333; color: #fff'
      : 'background-color: #fff; color: #111'};
  width: 100vw;
  padding: 1rem 0;
`;
