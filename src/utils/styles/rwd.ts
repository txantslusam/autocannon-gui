import {
  css, CSSObject, SimpleInterpolation, FlattenSimpleInterpolation,
} from 'styled-components';
import { remCalc } from './utils';

export enum Breakpoint {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  XLARGE = 'XLARGE',
  XXLARGE = 'XXLARGE',
}

type RWDFunction = (
  arg: CSSObject | TemplateStringsArray, ...interpolations: SimpleInterpolation[]
) => FlattenSimpleInterpolation;

export interface RWDObject {
  [Breakpoint.SMALL]: RWDFunction;
  [Breakpoint.MEDIUM]: RWDFunction;
  [Breakpoint.LARGE]: RWDFunction;
  [Breakpoint.XLARGE]: RWDFunction;
  [Breakpoint.XXLARGE]: RWDFunction;
}

const sizes = {
  [Breakpoint.SMALL]: `${remCalc(576)}em`,
  [Breakpoint.MEDIUM]: `${remCalc(1000)}em`,
  [Breakpoint.LARGE]: `${remCalc(1400)}em`,
  [Breakpoint.XLARGE]: `${remCalc(1800)}em`,
  [Breakpoint.XXLARGE]: `${remCalc(2000)}em`,
};

/**
 * Helper rwd object to handle media breakpoints in styled components
 * @example
 * styled.div`
 *  width: 100%;
 *
 *  ${rwd[Breakpoint.MEDIUM]`
 *    width: 50%;
 *  `}
 * `
 */
const rwd = Object.keys(sizes).reduce<RWDObject>((acc: RWDObject, label) => {
  acc[(label as Breakpoint)] = (...args) => css`
    @media (min-width: ${sizes[(label as Breakpoint)]}) {
      ${css(...args)}
    }
  `;

  return acc;
}, ({} as RWDObject));

export default rwd;
