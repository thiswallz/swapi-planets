import { LitElement } from 'lit-element';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class PlanetItem extends LitElement {
    static styles: import("lit-element").CSSResult;
    /**
     * The name to say "Hello" to.
     */
    name: string;
    /**
     * The number of times the button has been clicked.
     */
    count: number;
    render(): import("lit-element").TemplateResult;
    foo(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'sw-planet-item': PlanetItem;
    }
}
//# sourceMappingURL=planet-item.d.ts.map