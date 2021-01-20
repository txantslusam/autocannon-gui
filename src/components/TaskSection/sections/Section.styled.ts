import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const SectionContainer = styled.div`
  min-height: 400px;
`;

export const ResultTitle = styled(Typography)`
  margin-top: 4rem;
  font-size: 2.5rem;
`;

export const ResultsLabel = styled(Typography)`
  margin: 1rem 1rem 0.5rem;
`;

export const ChartsArea = styled.div`
  max-width: 1200px;
  width: 100%;
    display: grid;
    grid-template-columns: 400px 400px 400px;
    grid-gap: 16px;
`;
