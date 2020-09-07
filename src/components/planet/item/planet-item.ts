import {LitElement, html, customElement, property, css} from 'lit-element';
import {circleSVG, FILL} from '../../../helpers/circle';
import {planetStyle} from '../../../helpers/planet-colors';

const PLANET_SIZE = 100;
/**
 * Planet item.
 *
 */
@customElement('sw-planet-item')
export class PlanetItem extends LitElement {
  static styles = css`
    @keyframes spin {
      to {
        transform: rotateZ(360deg);
      }
    }

    :host {
      display: block;
      width: 100%;
    }
    .planet-container {
      display: grid;
      justify-items: center;
      grid-gap: 15px;
      height: 100%;
      grid-template-rows: 1fr 20px 20px;
    }
    .planet-container svg .main-circle {
    }
  `;

  /**
   * Planet Object.
   */
  @property({type: Object})
  planet: IPlanet | null = null;

  /**
   * Planet Index.
   */
  @property({type: Number})
  key = 0;

  render() {
    if (this.planet) {
      const circle = {
        size: PLANET_SIZE,
        rotation: this.planet.rotation_period,
        ...planetStyle(this.planet),
      };
      const surfaceWaterCircle = {
        size: PLANET_SIZE * (~~this.planet.surface_water / 100),
        fill: FILL.water.pattern,
      };

      return html`
        <div class="planet-container">
          ${circleSVG(circle, [surfaceWaterCircle])}
          <div>Planet ${this.planet.name}</div>
          <small>${this.planet.climate}</small>
        </div>
      `;
    } else {
      return html` <div>Planet not found</div> `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sw-planet-item': PlanetItem;
  }
}
