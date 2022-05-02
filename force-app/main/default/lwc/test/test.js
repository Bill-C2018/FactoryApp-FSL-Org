import { api, track, LightningElement } from 'lwc';

import getSoaps from '@salesforce/apex/GetSoapList.getSoaps'

export default class Test extends LightningElement {

    @track soapTable = [
        {label:'Name', fieldName:'Name', type:'text'},
        {label:'Bar Type', fieldName: 'Bar_Type__c', type:'text'},
        {label:'Scent', fieldName:'Scent__c', type:'text'},
        {label:'In Stock',fieldName:'Number_Available__c',type:'Integer'},
      ];

    @track soapList

    this.soapList = getSoaps()


}