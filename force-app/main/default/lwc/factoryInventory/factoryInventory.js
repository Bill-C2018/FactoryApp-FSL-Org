import { api, track, LightningElement } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getSoapsList from '@salesforce/apex/ApexCallout.getSoapsList'

export default class FactoryInventory extends LightningElement { 

    @track soapTable = [
        {label:'Name', fieldName:'Name', type:'text'},
        {label:'Bar Type', fieldName:'barType__c', type:'text'},
        {label:'Base Type', fieldName:'baseType__c', type:'text'},
        {label:'Scent', fieldName:'scent__c', type:'text'},
        {label:'Color', fieldName:'color__c',type:'text'},
        {label:'Style', fieldName:'moldStyle__c',type:'text'},
        {label:'In Stock',fieldName:'count__c',type:'Integer'},
      ];

    @track soapList

    @api accessToken
    


    // use the toast component to display errors
    showError = (msg) => {
        const evt = new ShowToastEvent({
            title: 'OOPS Something went wrong',
            message: msg,
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt)        
    }


    connectedCallback() {
        getSoapsList()
        .then( data => {
            this.soapList = [...data]
            console.log(this.soapList)
            let test = new Array()
            test = [...this.soapList]
            const evt= new CustomEvent('soaplistupdate', {detail:{soapList:test}})
            this.dispatchEvent(evt)
            
        }) 
        .catch(error => {
            this.showError(error.body.message + ' Is kubernetes running?')
        })       
    }


    getSelectedRow = (event) => {
        const selectedRows = event.detail.selectedRows
        const evt= new CustomEvent('scheduledelivery', {detail:{items:selectedRows}})
        this.dispatchEvent(evt)


/*
        console.log("table clicked")
        const selectedRows = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++){
            alert("You selected: " + selectedRows[i].Name);
        }
*/

    }
}