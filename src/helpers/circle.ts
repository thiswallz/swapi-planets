import {html} from 'lit-element';

export interface ICircleStyleSVG {
  size: number;
  rotation: number;
  stroke: string;
  strokeWidth: number;
  fill: string;
}

export const circleSVG = (
  circle: Partial<ICircleStyleSVG>,
  innerCircle: Partial<ICircleStyleSVG> | null = null
) => {
  if (!circle.size) {
    return html`<svg></svg>`;
  }
  return html`<div class="circle-container">
    <svg
      height="${circle.size}"
      viewBox="0 0 ${circle.size} ${circle.size}"
      width="${circle.size}"
      style="animation: spin ${circle.rotation}s linear infinite;"
    >
      <pattern
        id="inner-hex"
        x="0"
        y="0"
        width="12"
        height="10"
        patternUnits="userSpaceOnUse"
        viewBox="56 -254 112 190"
      >
        <g id="hexagon">
          <path
            style="fill:${innerCircle?.fill}"
            d="M168-127.1c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2L169.3-0.3 c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5C167-127,167.5-127.1,168-127.1 L168-127.1z"
          ></path>
          <path
            style="fill:${innerCircle?.fill}"
            d="M112-222.5c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2l-53.4,30.5 c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5 C111-222.4,111.5-222.5,112-222.5L112-222.5z"
          ></path>
          <path
            style="fill:${innerCircle?.fill}"
            d="M168-317.8c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2L169.3-191 c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5 C167-317.7,167.5-317.8,168-317.8L168-317.8z"
          ></path>
        </g>
      </pattern>
      <circle
        cx="${circle.size / 2}"
        cy="${circle.size / 2}"
        r="${(circle.size - (circle.strokeWidth || 0)) / 2}"
        style="stroke:${circle.stroke};
      stroke-dasharray: 10 5;
               stroke-width: ${circle.strokeWidth};
               fill:${circle.fill}"
      />
      ${innerCircle && innerCircle.size
        ? html`<svg>
            <circle
              cx="${circle.size / 2}"
              cy="${circle.size / 2}"
              r="${(innerCircle.size - (innerCircle.strokeWidth || 0)) / 2}"
              style="stroke:${innerCircle.stroke};
             stroke-width: ${innerCircle.strokeWidth};
             "
              fill="url(#inner-hex)"
            />
          </svg>`
        : ''}
    </svg>
  </div>`;
};
