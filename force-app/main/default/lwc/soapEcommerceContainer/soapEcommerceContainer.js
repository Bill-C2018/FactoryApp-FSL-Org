import {api, track, LightningElement } from 'lwc';
import placeOrder from '@salesforce/apex/PlaceSoapOrder.placeOrder'

export default class SoapEcommerceContainer extends LightningElement {

    deliveryList
    customerFullName = ""
    
    
    @track orderList

    getdeliveryList() {
        return this.deliveryList
    }

    handleDeliveryData = (event) => {
    //    const newList = event.detail.items
        console.log("handle delivery data")
        console.log(event.detail.items)
        this.deliveryList = event.detail.items
        console.log(this.deliveryList)
        this.template.querySelector('c-ordered-items').updateCurrentOrders(this.deliveryList)
    }

    doupdateOrderName = (event) => {
        this.customerFullName = event.detail.name
        console.log("stored  " + this.customerFullName)
    }

    doPlaceTheOrder = (event) => {
        //make the call to apex to build the order records
        console.log("placing order")
        console.log(this.customerFullName)
        console.log("order items")
        console.log(this.deliveryList)
        placeOrder({IName: this.customerFullName, items: this.deliveryList}).
        then(results => {
            console.log(results)
        })
    }


}