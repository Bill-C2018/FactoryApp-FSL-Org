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
    
    timeoutID

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

    getRemoteData = () => {
        getSoapsList({url: 'http://clm.dyndns-server.com/soaps_sf'})
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

    doDelayedRefresh = () => {
        this.getRemoteData(); 
        clearTimeout(this.timeoutID);
    }

    @api
    forceRefresh()  {

        
        this.template.querySelector('lightning-datatable').selectedRows=[];
        const evt= new CustomEvent('scheduledelivery', {detail:{items:[]}})
        this.dispatchEvent(evt) 
        this.timeoutID = setTimeout(this.doDelayedRefresh, 5000)
 
       
    }

    connectedCallback() {
        this.getRemoteData();
    }

    handleClick() {
        var cmp = this.template.querySelector('lightning-datatable')
        console.log(cmp)
        var selected = cmp.getSelectedRows();
        console.log(selected)
        
    

    }
    getSelectedRow = (event) => {
        const selectedRows = event.detail.selectedRows
        const evt= new CustomEvent('scheduledelivery', {detail:{items:selectedRows}})
        this.dispatchEvent(evt)

    }
}