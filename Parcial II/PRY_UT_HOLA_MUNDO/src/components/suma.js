import { LitElement,html,css } from "lit";

export class Suma extends LitElement {
    static properties = {
        num1: {type: Number},
        num2: {type: Number},
        num3: {type: Number},
    }
    render(){
        // let = this.num1 + this.num2 + this.num3;
        return html `
                <div>
                    <h2>La suma de ${this.num1} + ${this.num2} + ${this.num3} = ${this.num1 + this.num2 + this.num3}</p>
                </div>
        `
    }
    
    updated(changedProperties) {
        super.updated(changedProperties);
        if (isNaN(this.num1)) this.num1 = 0;
        if (isNaN(this.num2)) this.num2 = 0;
        if (isNaN(this.num3)) this.num3 = 0;
    }
}
customElements.define('suma-element', Suma);