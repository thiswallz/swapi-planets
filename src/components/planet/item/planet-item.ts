import {LitElement, html, customElement, property, css} from 'lit-element';
import {circleSVG} from '../../../helpers/circle';
import {planetStyle} from '../../../helpers/planet-colors';

const PLANET_SIZE = 120;
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
    }
    .planet-container svg {
      animation: spin 20s linear infinite;
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
      console.log(this.planet.surface_water);
      const surfaceWaterCircle = {
        size: PLANET_SIZE * (~~this.planet.surface_water / 100),
        fill: '#03A9F4',
      };

      return html`
        <div class="planet-container">
          ${circleSVG(circle, surfaceWaterCircle)} Planet ${this.planet.name}
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
