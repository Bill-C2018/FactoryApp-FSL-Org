import { api,track,LightningElement } from 'lwc';

export default class PlaceOrderButton extends LightningElement {


    @track displayButton

    doPlaceOrder = (event) => {
        console.log("Place order clicked")
        const evt = new CustomEvent('placetheorder', {detail: {name: "placeorder"}})
        this.dispatchEvent(evt)        
    }

    @api
    updatebuttonstate(isReady) {
        this.displayButton = isReady;
    }
}