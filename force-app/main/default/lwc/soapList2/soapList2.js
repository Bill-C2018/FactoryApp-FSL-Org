import {api, track,  wire, LightningElement } from 'lwc';
import getSoaps from '@salesforce/apex/GetSoapList.GetSoaps'
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled }  from 'lightning/empApi';

//import ConsumptionScheduleId from '@salesforce/schema/ConsumptionRate.ConsumptionScheduleId';



export default class SoapList2 extends LightningElement {

    subscription = {};
    @api channelName = '/event/UpdateSoapsEvent__e';

    selectedRows


    @track soapTable2 = [
        {label:'Name', fieldName:'Name', type:'text'},
        {label:'Bar Type', fieldName: 'Bar_Type__c', type:'text'},
        {label:'Scent', fieldName:'Scent__c', type:'text'},
        {label:'In Stock',fieldName:'Number_Available__c',type:'Integer'},
    ];

    @track SoapList2

    getListOfSoaps = () => {
        this.SoapList2 = []
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
        this.registerErrorListener();
        this.handleSubscribe();
        this.getListOfSoaps();
        
    }

    // Handles subscribe button click
    handleSubscribe() {
        // Callback invoked whenever a new event message is received
        const thisReference = this;
        const messageCallback = function(response) {
            console.log('New message received 1: ', JSON.stringify(response));
            console.log('New message received 2: ', response);
            
            var obj = JSON.parse(JSON.stringify(response));
            console.log('New message received 4: ', obj.data.payload.Message__c);
            console.log('New message received 5: ', this.channelName);
/*
            const evt = new ShowToastEvent({
                title: 'Congrats!!',
                message: obj.data.payload.Type__c,
                variant: 'success',
            });
*/

//            const evt = new CustomEvent('placetheorder', {detail: {name: "placeorder"}})
//            thisReference.dispatchEvent(evt);
            // Response contains the payload of the new message received
            thisReference.refreshList();
        };

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe(this.channelName, -1, messageCallback).then(response => {
            // Response contains the subscription information on subscribe call
            console.log('Subscription request sent to: ', JSON.stringify(response.channel));
            this.subscription = response;
        });
    }

    registerErrorListener() {
        // Invoke onError empApi method
        onError(error => {
            console.log('Received error from server: ', JSON.stringify(error));
            // Error contains the server-side error
        });
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

    @api
    refreshList() {
        console.log("in refresh list +++++++++++++++++")
        this.getListOfSoaps()
        this.template.querySelector('lightning-datatable').selectedRows=[];

    }

    @api
    refreshOnUpdate() {
        console.log('----------------refresh on update ----------');
        this.SoapList2 = [];
        this.getListOfSoaps();


    }
}


