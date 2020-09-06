import {LitElement, html, customElement, property, css} from 'lit-element';

/**
 * Planet item.
 *
 */
@customElement('sw-planet-item')
export class PlanetItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

  /**
   * Planet Object.
   */
  @property({type: Object})
  planet = {};

  /**
   * Planet Index.
   */
  @property({type: Number})
  key = 0;

  render() {
    console.log(this.key, this.planet);
    return html` <div>Planet ${this.planet.name}</div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sw-planet-item': PlanetItem;
  }
}
