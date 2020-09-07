import {
  LitElement,
  html,
  customElement,
  property,
  css,
  eventOptions,
} from 'lit-element';
import {circleSVG, FILL} from '../../../helpers/circle';
import {planetStyle} from '../../../helpers/planet-colors';
import {debounce} from '../../../helpers/utils';
import {panelInfoPlanet} from '../../../helpers/overlay';

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
      position: relative;
    }
    .planet-container .info-planet {
      position: absolute;
      left: 5px;
      top: 5px;
      display: grid;
      grid-template-columns: repeat(2, 90px);
      background: var(--subtle-yellow);
      border-radius: 5px;
      border: 2px solid var(--subtle-yellow);
    }
    .planet-container .info-planet .info-planet__key {
      background: var(--bg-dark-hover);
      padding: 3px;
    }
    .planet-container .info-planet .info-planet__value {
      padding: 3px;
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

  /**
   * Planet Index.
   */
  @property({type: Boolean})
  showInfo = false;

  @eventOptions({passive: true})
  private _handleMouseEnter() {
    this.showInfo = true;
  }

  @eventOptions({passive: true})
  private _handleMouseOut(e: any) {
    this.showInfo = false;
  }

  render() {
    if (this.planet) {
      const circleStyle = planetStyle(this.planet);
      const circle = {
        size: PLANET_SIZE,
        rotation: this.planet.rotation_period,
        ...circleStyle,
      };
      const surfaceWaterCircle = {
        size: PLANET_SIZE * (~~this.planet.surface_water / 100),
        fill: FILL.water.pattern,
      };

      return html`
        <div
          @mouseenter=${debounce(() => this._handleMouseEnter(), 50)}
          @mouseleave=${debounce((e: any) => this._handleMouseOut(e), 50)}
          class="planet-container"
        >
          ${circleSVG(circle, [surfaceWaterCircle])}
          <div>Planet ${this.planet.name}</div>
          <small>${this.planet.climate}</small>
          ${this.showInfo ? panelInfoPlanet(this.planet, circleStyle.fill) : ''}
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
