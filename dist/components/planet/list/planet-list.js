var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, css } from 'lit-element';
import { until } from 'lit-html/directives/until.js';
import '../item/planet-item.js';
/**
 *  Planet list element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
let PlanetList = class PlanetList extends LitElement {
    render() {
        const planets = fetch('https://swapi.dev/api/planets/').then((r) => r.json());
        console.info(planets);
        return html `${until(planets.then((response) => response.results.map((planet, i) => html `<sw-planet-item
              planet="${planet}"
              key="${i}"
            ></sw-planet-item>`)), html `<span>Loading...</span>`)}`;
    }
};
PlanetList.styles = css `
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;
PlanetList = __decorate([
    customElement('sw-planet-list')
], PlanetList);
export { PlanetList };
//# sourceMappingURL=planet-list.js.map