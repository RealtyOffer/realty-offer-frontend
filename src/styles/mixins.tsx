// @flow
import { borderWidth, quarterSpacer, halfSpacer } from './size';
import {
  borderColor,
  lightestGray,
} from './color';

export const baseBorderStyle = `${borderWidth} solid ${borderColor}`;
export const baseBorderLightStyle = `${borderWidth} solid ${lightestGray}`;
export const baseShadowStyle = `0 ${quarterSpacer} ${halfSpacer} 0 rgba(0,0,0,0.1)`;

export const disabledStyle = `
  cursor: not-allowed;
  opacity: .65;
  pointer-events: none;
`;
