import { LitElement } from 'lit-element';
import '../item/planet-item.js';
/**
 *  Planet list element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class PlanetList extends LitElement {
    static styles: import("lit-element").CSSResult;
    render(): import("lit-element").TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'sw-planet-list': PlanetList;
    }
}
//# sourceMappingURL=planet-list.d.ts.map