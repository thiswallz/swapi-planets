import {LitElement, html, customElement, property, css} from 'lit-element';
import {circleSVG} from '../../../helpers/circle';
import {planetStyle} from '../../../helpers/planet-colors';

/**
 * Planet item.
 *
 */
@customElement('sw-planet-item')
export class PlanetItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .planet-container {
      display: grid;
      justify-items: center;
      grid-gap: 15px;
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
      const circleStyle = planetStyle(this.planet);

      return html`
        <div class="planet-container">
          ${circleSVG(circleStyle, 120)} Planet ${this.planet.name}
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
