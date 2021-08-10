import { track, LightningElement } from 'lwc';

import updateRemoteInventory from '@salesforce/apex/ApexCallout.updateRemoteInventory'
import getAccounts from '@salesforce/apex/ApexCallout.getAccounts'

export default class FactoryAppContainer extends LightningElement {

    @track soapList
    @track deliveryList
    @track accessToken
    @track accountList

    connectedCallback() {
        getAccounts()
        .then( data => {
            accountList = [...data]
        })
        .catch( error => {
            console.log(error.body.message)
        })

    }

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

        var remoteItem = {
            "barId": orderObj.soapId,
            "soapName": orderObj.soapName,
            "count": parseInt(orderObj.amount) * -1,
        }

        updateRemoteInventory({data: JSON.stringify(remoteItem), token: this.accessToken })
         .then( data => {
            console.log(data)
         })
         .catch( error => {
             console.log(error)
         })

    }

}