import {api, LightningElement } from 'lwc';

export default class DeliveryOrder extends LightningElement {
    
    @api deliveryList
    @api accessToken
  

    handleNewOrder = (event) => {
        console.log('first level')
        const orderObj = event.detail.order
        console.log(orderObj.soapId)
        const evt = new CustomEvent('createorder', {detail: {order: orderObj}})
        this.dispatchEvent(evt)
    }

    
}