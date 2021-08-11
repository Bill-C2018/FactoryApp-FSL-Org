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
    TODO: need to handle a failure 
    */
    createOrder = (event) => {
        console.log('top level')
        const orderObj = event.detail.order

        //would normally pass this off to a thread 
        for(var x = 0; x < orderObj.length; x++) {
            let r = orderObj[x]
            var remoteItem = {
                "barId": r.id,
                "soapName": r.name,
                "count": parseInt(r.amount) * -1,
            } 
            
            //TODO: validate object before calling out with it
            

            updateRemoteInventory({data: JSON.stringify(remoteItem), token: this.accessToken })
            .then( data => {
               console.log(data)
            })
            .catch( error => {
                console.log(error)
            })
        }
        //TODO: why does this blow up?
        this.template.querySelector('c-factory-inventory').forceRefresh();

       
    }

}