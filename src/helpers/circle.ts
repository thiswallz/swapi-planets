import {html} from 'lit-element';

export interface ICircleStyleSVG {
  stroke?: string;
  strokeWidth?: number;
  fill: string;
}

export const circleSVG = (style: ICircleStyleSVG, size: number) => {
  return html`<svg
    height="${size}"
    viewBox="0 0 ${size} ${size}"
    width="${size}"
  >
    <circle
      cx="${size / 2}"
      cy="${size / 2}"
      r="${(size - (style.strokeWidth || 0)) / 2}"
      style="stroke:${style.stroke};
               stroke-width: ${style.strokeWidth};
               fill:${style.fill}"
    />
  </svg>`;
};
