import {fixture, html} from '@open-wc/testing';
import {PlanetItem} from '../../components/planet/item/planet-item';

const assert = chai.assert;

suite('sw-planet-item', () => {
  test('is defined', () => {
    const el = document.createElement('sw-planet-item');
    assert.instanceOf(el, PlanetItem);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<sw-planet-item></sw-planet-item>`);
    assert.shadowDom.equal(
      el,
      `
      <div>
        Planet not found
      </div>
    `
    );
  });
});
