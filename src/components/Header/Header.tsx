import React from 'react';
import { GridContainer } from '../Grid/Grid.styled';
import { BackgroundContainer, Title } from './Header.styled';

const Header: React.FC = () => (
  <BackgroundContainer>
    <GridContainer>
      <Title variant="h4">Benchmark</Title>
    </GridContainer>
  </BackgroundContainer>
);

export default Header;
