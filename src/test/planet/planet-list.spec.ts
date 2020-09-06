import {fixture, html, expect} from '@open-wc/testing';
import {PlanetList} from '../../components/planet/list/planet-list';
import sinon from 'sinon';

const assert = chai.assert;

suite('sw-planet-list', () => {
  sinon.spy(window, 'fetch').alwaysReturned(Promise.resolve([]));

  test('is defined', () => {
    const el = document.createElement('sw-planet-list');
    assert.instanceOf(el, PlanetList);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<sw-planet-list></sw-planet-list>`);
    assert.shadowDom.equal(
      el,
      `
      <span>
        Loading...
      </span>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(
      html`<sw-planet-list loading-text="Waiting..."></sw-planet-list>`
    );
    assert.shadowDom.equal(
      el,
      `
      <span>
        Waiting...
      </span>
    `
    );
  });

  test('should render a list with 1 planet', async () => {
    const list: Promise<IPlanetResult> = Promise.resolve({
      count: 60,
      next: 'http://swapi.dev/api/planets/?page=2',
      previous: null,
      results: [
        {
          name: 'Kamino',
          rotation_period: 27,
          orbital_period: 463,
          diameter: 19720,
          climate: 'temperate',
          gravity: '1 standard',
          terrain: 'ocean',
          surface_water: 100,
          population: 1000000000,
          created: '2014-12-10T12:45:06.577000Z',
          edited: '2014-12-20T20:58:18.434000Z',
          url: 'http://swapi.dev/api/planets/10/',
        },
      ],
    });
    const el = (await fixture(
      html`<sw-planet-list .planets=${list}></sw-planet-list>`
    )) as PlanetList;
    await el.updateComplete;
    const item = el?.shadowRoot?.querySelector('sw-planet-item');
    expect(item?.getAttribute('key')).to.equal('0');
    expect((await el.planets).next).to.equal((await list).next);
  });

  test('should go to next page', async () => {
    const list: Promise<IPlanetResult> = Promise.resolve({
      count: 60,
      next: 'http://swapi.dev/api/planets/?page=99',
      previous: null,
      results: [
        {
          name: 'Kamino',
          rotation_period: 27,
          orbital_period: 463,
          diameter: 19720,
          climate: 'temperate',
          gravity: '1 standard',
          terrain: 'ocean',
          surface_water: 100,
          population: 1000000000,
          created: '2014-12-10T12:45:06.577000Z',
          edited: '2014-12-20T20:58:18.434000Z',
          url: 'http://swapi.dev/api/planets/10/',
        },
      ],
    });
    const el = (await fixture(
      html`<sw-planet-list .planets=${list}></sw-planet-list>`
    )) as PlanetList;
    const loadPlanetsSpy = sinon.spy(el, 'loadPlanets');
    await el.updateComplete;
    const link: any = el.shadowRoot!.querySelector('.navigation__next > a')!;
    link.click();
    expect(loadPlanetsSpy.callCount).to.equal(1);
    const {next} = await list;
    if (next) {
      expect(loadPlanetsSpy.calledWith(next)).to.be.true;
    }
  });

  test('should go to previous page', async () => {
    const list: Promise<IPlanetResult> = Promise.resolve({
      count: 60,
      next: null,
      previous: 'http://swapi.dev/api/planets/?page=0',
      results: [
        {
          name: 'Kamino',
          rotation_period: 27,
          orbital_period: 463,
          diameter: 19720,
          climate: 'temperate',
          gravity: '1 standard',
          terrain: 'ocean',
          surface_water: 100,
          population: 1000000000,
          created: '2014-12-10T12:45:06.577000Z',
          edited: '2014-12-20T20:58:18.434000Z',
          url: 'http://swapi.dev/api/planets/10/',
        },
      ],
    });
    const el = (await fixture(
      html`<sw-planet-list .planets=${list}></sw-planet-list>`
    )) as PlanetList;
    const loadPlanetsSpy = sinon.spy(el, 'loadPlanets');
    await el.updateComplete;
    const link: any = el.shadowRoot!.querySelector('.navigation__previous> a')!;
    link.click();
    expect(loadPlanetsSpy.callCount).to.equal(1);
    const {next} = await list;
    if (next) {
      expect(loadPlanetsSpy.calledWith(next)).to.be.true;
    }
  });

  test('should not be able to go previous page', async () => {
    const list: Promise<IPlanetResult> = Promise.resolve({
      count: 60,
      next: 'url',
      previous: null,
      results: [
        {
          name: 'Kamino',
          rotation_period: 27,
          orbital_period: 463,
          diameter: 19720,
          climate: 'temperate',
          gravity: '1 standard',
          terrain: 'ocean',
          surface_water: 100,
          population: 1000000000,
          created: '2014-12-10T12:45:06.577000Z',
          edited: '2014-12-20T20:58:18.434000Z',
          url: 'http://swapi.dev/api/planets/10/',
        },
      ],
    });
    const el = (await fixture(
      html`<sw-planet-list .planets=${list}></sw-planet-list>`
    )) as PlanetList;
    const loadPlanetsSpy = sinon.spy(el, 'loadPlanets');
    await el.updateComplete;
    const link: any = el.shadowRoot!.querySelector('.navigation__previous> a')!;
    link.click();
    expect(loadPlanetsSpy.callCount).to.equal(0);
  });
});
