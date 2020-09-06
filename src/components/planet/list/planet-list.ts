import {LitElement, html, customElement, css, property} from 'lit-element';
import {until} from 'lit-html/directives/until.js';
import env from '../../../environments/env.js';
import '../item/planet-item.js';

/**
 *  Planet list element.
 *
 * @element - sw-planet-list
 * @csspart container
 * @todo i18n, dark/light mode, loading custom properties
 */
@customElement('sw-planet-list')
export class PlanetList extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

  /**
   * Loading text.
   */
  @property({type: String, attribute: 'loading-text'})
  loadingText = 'Loading...';

  render() {
    const planets = fetch(`${env.SWAPI}/planets/`).then((r) => r.json());
    return html`${until(
      planets.then((response: IPlanetResult) =>
        response.results.map(
          (planet, i) =>
            html`<sw-planet-item
              planet="${JSON.stringify(planet)}"
              key="${i}"
            ></sw-planet-item>`
        )
      ),
      html`<span>${this.loadingText}</span>`
    )}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sw-planet-list': PlanetList;
  }
}
