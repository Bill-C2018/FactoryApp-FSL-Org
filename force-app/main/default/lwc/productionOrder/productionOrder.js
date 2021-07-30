import { api,LightningElement } from 'lwc';

export default class ProductionOrder extends LightningElement {
    soapTable = [
        {label:'Name', fieldName:'Name', type:'text'},
        {label:'Bar Type', fieldName:'barType__c', type:'text'},
        {label:'Base Type', fieldName:'baseType__c', type:'text'},
        {label:'Scent', fieldName:'scent__c', type:'text'},
        {label:'Color', fieldName:'color__c',type:'text'},
        {label:'Style', fieldName:'moldStyle__c',type:'text'},
        {label:'In Stock',fieldName:'count__c',type:'Integer'},
      ];
      
    @api soapList
    @api accessToken

    
}