import React from 'react';
import styled from 'styled-components';

export default () => (
  <React.Fragment>
    <Backdrop />
    <ModalCard />
  </React.Fragment>
);

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalCard = styled.div`
  width: 300px;
  height: 300px;
  background-color: #fff;
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
`;
