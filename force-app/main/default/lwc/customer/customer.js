import { api, LightningElement } from 'lwc';


export default class Customer extends LightningElement {

    lname
    fname


    texthandlerfname = (event) => {
        this.fname = event.detail.value
        this.updateOrderName2();
    }

    texthandlerlname = (event) => {
        this.lname = event.detail.value
        this.updateOrderName2();
    }

    updateOrderName2 = () => {
        const evt = new CustomEvent('updateordername', {detail: {name: this.fname + "_" + this.lname}})
        this.dispatchEvent(evt)
    }

    
}