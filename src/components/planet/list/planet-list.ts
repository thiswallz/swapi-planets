import {
  LitElement,
  html,
  customElement,
  css,
  property,
  TemplateResult,
} from 'lit-element';
import {until} from 'lit-html/directives/until.js';
import {iconLeft, iconRight} from '../../../assets/icons/navigation.js';
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
    .navigation {
      fill: white;
    }
    .navigation--disabled {
      fill: gray;
    }
  `;

  /**
   * Loading text.
   */
  @property({type: String, attribute: 'loading-text'})
  loadingText = 'Loading...';

  @property({type: Object})
  planets: Promise<IPlanetResult>;

  constructor() {
    super();
    this.planets = this.loadPlanets(`${env.SWAPI}/planets/`);
  }

  navigationHandler(url: string | null) {
    if (!url) {
      return;
    }
    this.planets = this.loadPlanets(url);
  }

  renderNavigationArrow(url: string | null, icon: TemplateResult) {
    return html`<a
      class="${url ? '' : 'navigation--disabled'}"
      @click="${() => {
        this.navigationHandler(url);
      }}"
    >
      ${icon}
    </a>`;
  }

  renderNavigation({previous, next}: IPlanetResult) {
    return html` <div class="navigation">
      <div class="navigation__previous">
        ${this.renderNavigationArrow(previous, iconLeft)}
      </div>
      <div class="navigation__next">
        ${this.renderNavigationArrow(next, iconRight)}
      </div>
    </div>`;
  }

  renderList(response: IPlanetResult) {
    return response.results.map(
      (planet, i) =>
        html`<sw-planet-item
          planet="${JSON.stringify(planet)}"
          key="${i}"
        ></sw-planet-item>`
    );
  }

  loadPlanets(url: string): Promise<IPlanetResult> {
    console.log(url);
    return fetch(url).then((r) => r.json());
  }

  render() {
    return html`${until(
      this.planets.then(
        (response: IPlanetResult) =>
          html`${this.renderList(response)} ${this.renderNavigation(response)}`
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
