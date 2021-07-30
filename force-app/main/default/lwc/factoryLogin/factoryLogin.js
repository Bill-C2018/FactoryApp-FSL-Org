import { track, LightningElement } from 'lwc';

import doLoginPost from '@salesforce/apex/ApexCallout.doLoginPost'

export default class FactoryLogin extends LightningElement {

    @track AccessToken = ''
    userName = 'admin'
    userPword = 'Password1'

    handleInput = (event) => {
        if(event.target.name === 'Name') {
            this.userName = event.target.value
        } else if (event.target.name === 'Pword') {
            this.userPword = event.target.value
        }
    }
    doLogin = (event) => {
        console.log(this.userName)
        let user = {
            "userName": this.userName,
            "userPword": this.userPword,
            "emailAddy": "bob@google.com",
            }

        console.log('logging in')
        console.log(JSON.stringify(user))
        doLoginPost({data: JSON.stringify(user)})
        .then( data => {
            console.log(data)
            this.AccessToken = data;
            const evt= new CustomEvent('loginevent', {detail:{token:this.AccessToken}})
            this.dispatchEvent(evt)
        })
        .catch( error => {
            console.log(error)
        })
    }

}