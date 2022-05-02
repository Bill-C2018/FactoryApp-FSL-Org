import {api, track,  LightningElement } from 'lwc';
import getSoaps from '@salesforce/apex/GetSoapList.GetSoaps'

export default class SoapList2 extends LightningElement {

    selectedRows

    @track soapTable2 = [
        {label:'Name', fieldName:'Name', type:'text'},
        {label:'Bar Type', fieldName: 'Bar_Type__c', type:'text'},
        {label:'Scent', fieldName:'Scent__c', type:'text'},
        {label:'In Stock',fieldName:'Number_Available__c',type:'Integer'},
    ];

    @track SoapList2

    getListOfSoaps = () => {
        console.log("+++++++++++++++++++ Calling getSoaps ++++++++++++++++++++")
        getSoaps()
        .then( data => {
            console.log("++++++++ in then handler:" + data)
            this.SoapList2 = [...data]
            console.log(this.SoapList2)
            let test = new Array()
//            test = [...this.soapList]
//            const evt= new CustomEvent('soaplistupdate', {detail:{soapList:test}})
//            this.dispatchEvent(evt)
            
        }) 
        .catch(error => {
            console.log('ERROR ERROR ERROR')
            console.log(error.body.message + ' Is kubernetes running?')
        })
 
    }

    connectedCallback() {
        this.getListOfSoaps();
    }

    handleClick() {
        var cmp = this.template.querySelector('lightning-datatable')
        console.log(cmp)
        var selected = cmp.getSelectedRows();
        console.log(selected)
    }
    getSelectedRow = (event) => {
        this.selectedRows = event.detail.selectedRows
        console.log("in select row handler")
        console.log(this.selectedRows)
        const evt= new CustomEvent('updatecurrentorder', {detail:{items:this.selectedRows}})
        this.dispatchEvent(evt)

    }
}


