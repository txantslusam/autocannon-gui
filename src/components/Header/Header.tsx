import {Avatar, Typography} from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import { GridContainer } from '../Grid/Grid.styled';
import {BackgroundContainer, Title} from './Header.styled';


interface HeaderProps {
    isSticky?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSticky = true }) => {

    return (
        <BackgroundContainer>
            <GridContainer>
                <Title variant="h4">Benchmark</Title>
            </GridContainer>
        </BackgroundContainer>
    );
};

export default Header;
