import { api, track, LightningElement } from 'lwc';


export default class Customer extends LightningElement {

    lname

    @track fname


    @api
    resetCustomerName() {
        this.fname = ""
    }
    texthandlerfname = (event) => {
        this.fname = event.detail.value
        this.updateOrderName2();
    }

    texthandlerlname = (event) => {
        this.lname = event.detail.value
        this.updateOrderName2();
    }

    updateOrderName2 = () => {
        const evt = new CustomEvent('updateordername', {detail: {name: this.fname }})
        this.dispatchEvent(evt)
    }

    
}