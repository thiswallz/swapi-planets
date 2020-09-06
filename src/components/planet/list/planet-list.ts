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
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
      grid-template-rows: 200px;
      gap: 20px;
      transition: all 1s ease 0s;
    }
    .navigation {
      fill: hsl(0deg 0% 100% / 77%);
    }
    .navigation a {
      cursor: pointer;
    }
    .navigation a:hover:not(.navigation--disabled) {
      fill: hsl(0deg 0% 100% / 97%);
    }
    a.navigation--disabled {
      fill: gray;
      cursor: default;
    }
    sw-planet-item {
      border-radius: 6px;
      border: 2px dashed var(--subtle-yellow);
      background: var(--bg-dark);
      margin: 10px;
      padding: 10px;
      box-sizing: border-box;
    }
    .navigation__next {
      position: fixed;
      right: 10px;
      bottom: 10px;
    }
    .navigation__previous {
      position: fixed;
      left: 10px;
      bottom: 10px;
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
    this.dispatchEvent(
      new CustomEvent('loading', {
        detail: {
          status: true,
        },
      })
    );
    return fetch(url)
      .then((r) => r.json())
      .finally(() => {
        this.dispatchEvent(
          new CustomEvent('loading', {
            detail: {
              status: false,
            },
          })
        );
      });
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
