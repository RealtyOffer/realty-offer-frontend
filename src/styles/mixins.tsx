import {
  borderWidth, quarterSpacer, halfSpacer, baseSpacer,
} from './size';
import {
  borderColor,
  lightestGray,
} from './color';

export const baseBorderStyle = `${borderWidth} solid ${borderColor}`;
export const baseBorderLightStyle = `${borderWidth} solid ${lightestGray}`;

export const disabledStyle = `
  cursor: not-allowed;
  opacity: .65;
  pointer-events: none;
`;

export const z1Shadow = `0 ${quarterSpacer} ${quarterSpacer} 0 rgba(0,0,0,0.1)`;
export const z2Shadow = `0 ${quarterSpacer} ${halfSpacer} 0 rgba(0,0,0,0.1)`;
export const z3Shadow = `0 ${quarterSpacer} ${halfSpacer} ${quarterSpacer} rgba(0,0,0,0.1)`;
export const z4Shadow = `0 ${quarterSpacer} ${baseSpacer} ${baseSpacer} rgba(0,0,0,0.1)`;
