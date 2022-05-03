import { api, track, LightningElement } from 'lwc';

export default class OrderedItems extends LightningElement {

    @track currentorders


    @api
    updateCurrentOrders(orders) {

        this.currentorders = orders

    }



  
}