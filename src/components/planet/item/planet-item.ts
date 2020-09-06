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
        <div>
          ${circleSVG(circleStyle, 50)} Planet ${this.planet.name},
          ${this.planet.climate}
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
