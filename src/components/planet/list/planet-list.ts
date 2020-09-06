import {LitElement, html, customElement, css} from 'lit-element';
import {until} from 'lit-html/directives/until.js';
import '../item/planet-item.js';

/**
 *  Planet list element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
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

  render() {
    const planets = fetch('https://swapi.dev/api/planets/').then((r) =>
      r.json()
    );
    console.info(planets);
    return html`${until(
      planets.then((response: IPlanetResult) =>
        response.results.map(
          (planet, i) =>
            html`<sw-planet-item
              planet="${planet}"
              key="${i}"
            ></sw-planet-item>`
        )
      ),
      html`<span>Loading...</span>`
    )}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sw-planet-list': PlanetList;
  }
}
