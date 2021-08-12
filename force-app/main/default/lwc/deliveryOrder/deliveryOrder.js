import {api, track, LightningElement } from 'lwc';

export default class DeliveryOrder extends LightningElement {
    
    @api deliveryList
    @api accessToken

    @api orderList  = new Array()
  

    updateOrder = (event) => {
        var sn = event.detail.order.soapName
        var si = event.detail.order.soapId
        var sa = event.detail.order.amount
        var r = {name: sn, amount:sa, id: si}
        var found = false
        console.log("here")
        if(this.orderList == null) {
            console.log("null")
            this.orderList.push(r)
        } else {
            for(var x = 0 ; x < this.orderList.length; x++) {
                console.log("x = " + x)
                let s = this.orderList[x]
                if(s.id === r.id) {
                    this.orderList[x] = r
                    found = true
                    break
                }
            }
            if(!found) {
                console.log("not found")
                this.orderList.push(r)
            }
        }



    }
    handleNewOrder = (event) => {
        console.log('Order Button Clicked')
        const orderObj = this.orderList
        const evt = new CustomEvent('createorder', {detail: {order: orderObj}})
        this.dispatchEvent(evt)
        this.orderList = []
        
    }

    
}