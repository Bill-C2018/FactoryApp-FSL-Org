import { api, LightningElement } from 'lwc';

export default class OrderItem extends LightningElement {

    @api soapname
    @api soapid
    @api barsonhand
    @api type
    @api scent
    orderDetails

    buttonHandler = (event) => {
        console.log("order clicked")
        var inp=this.template.querySelector("lightning-input");
        console.log(inp.value)
        
        this.orderDetails = {"soapId": this.soapid, "soapName": this.soapname, "amount": inp.value}
        const evt = new CustomEvent('updateorder', {detail: {order: orderDetails}})
        this.dispatchEvent(evt)
    }

}