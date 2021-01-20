import styled, { css } from 'styled-components';
import { remCalc } from '../../utils/styles/utils';
import colors from '../../utils/styles/colors';

export const Wrapper = styled.div<{fullWidth?: boolean}>`
  position: relative;
  height: 100%;
  ${({ fullWidth }) => fullWidth && '100%'};
`;

export const DropdownButton = styled.button`
  -webkit-appearance: none;
  background: none;
  border-radius: 0;
  outline: none;
  margin: 0;
  padding: 0;
  border: none;
  height: 100%;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

interface DropdownContainerProps {
  isOpen: boolean;
}

export const DropdownContainer = styled.div<DropdownContainerProps>`
  display: none;
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 100;
  width: ${remCalc(150)}rem;
  font-size: ${remCalc(14)}rem;
  padding: ${remCalc(12)}rem 0;
  background-color: #ffffff;
  border: ${remCalc(1)}rem solid ${colors.black06};
  border-radius: ${remCalc(11)}rem 0 ${remCalc(11)}rem ${remCalc(11)}rem;
  box-shadow: ${remCalc(2)}rem ${remCalc(4)}rem ${remCalc(6)}rem ${colors.black06};

  ${props => props.isOpen && css`
    display: flex;
  `}
`;

export const DropdownAction = styled.div`
  cursor: pointer;
  color: ${colors.darkGrey02};
  padding: ${remCalc(10)}rem ${remCalc(15)}rem;
  background-color: ${colors.black00};

  &:hover {
    background-color: ${colors.black04}
  }
`;

export const DropdownGroupSeparator = styled.div`
  height: ${remCalc(1)}rem;
  margin: ${remCalc(10)}rem ${remCalc(20)}rem;
  background-color: ${colors.black06};
`;
