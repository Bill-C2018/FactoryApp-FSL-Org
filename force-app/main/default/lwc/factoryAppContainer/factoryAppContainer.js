import { track, LightningElement } from 'lwc';

import updateRemoteInventory from '@salesforce/apex/ApexCallout.updateRemoteInventory'

export default class FactoryAppContainer extends LightningElement {

    @track soapList
    @track deliveryList
    @track accessToken

    remoteObj = {barId: "", soapName: "", count: "0"}

    handleSoapListUpdate = (event) => {

        const newList = event.detail.soapList
        this.soapList = [...newList]
   
    }

    handleDeliveryData = (event) => {
        const newList = event.detail.items
        this.deliveryList = newList

    }

    handleLogin = (event) => {
        const token = event.detail.token
        console.log('login event: ' + token)
        this.accessToken = token
    }

    /* 
    need to update the remote db and create a 
    SF order record. Then clear the selection in the 
    inventory list and update that list
    */
    createOrder = (event) => {
        console.log('top level')
        const orderObj = event.detail.order

        this.remoteObj.barId = 
        this.remoteObj.soapName =  orderObj.soapName
        this.remoteObj.count = orderObj.amount

        var item = {
            "barId": orderObj.soapId,
            "soapName": orderObj.soapName,
            "count": parseInt(orderObj.amount) * -1,
        }

        console.log(item)
        console.log(this.accessToken)
        console.log(JSON.stringify(item))

        updateRemoteInventory({data: JSON.stringify(item), token: this.accessToken })
         .then( data => {
            console.log(data)
         })
         .catch( error => {
             console.log(error)
         })

    }

}