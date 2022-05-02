import { LightningElement } from 'lwc';

export default class PlaceOrderButton extends LightningElement {

    doPlaceOrder = (event) => {
        console.log("Place order clicked")
        const evt = new CustomEvent('placetheorder', {detail: {name: "placeorder"}})
        this.dispatchEvent(evt)        
    }
}