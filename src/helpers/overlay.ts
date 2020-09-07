import {html} from 'lit-element';

export const panelInfoPlanet = (
  planet: IPlanet,
  background: string | undefined
) => {
  return html`
    <div
      class="info-planet"
      style="background:${background || '#fff'};filter: invert(1);color:black"
    >
      <div class="info-planet__key">Diameter</div>
      <div class="info-planet__value">${planet.diameter}</div>
      <div class="info-planet__key">Rotation</div>
      <div class="info-planet__value">${planet.rotation_period}h</div>
      <div class="info-planet__key">Surface water</div>
      <div class="info-planet__value">${planet.surface_water}%</div>
    </div>
  `;
};
