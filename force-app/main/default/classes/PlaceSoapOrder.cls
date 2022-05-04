public without sharing class PlaceSoapOrder {

    @AuraEnabled
    public static String placeOrder(String IName, List<Map<String,String>> items) {
        system.debug( IName);
        system.debug(items[0]);
        /*
        validate / create the account
        */

        Id accountId = fetchAcctId(IName);
        System.debug('record id ' + accountId);
 
        /*
        now work on the order
        */

        Soap_Order__c theOrder = new Soap_Order__c();
        theOrder.Account__c = accountId;
        theOrder.Name = IName;

        insert theOrder;

        List<SoapOrderItem__c> orderItems = new List<SoapOrderItem__c>();
        for(Integer x = 0; x < items.size(); x++) {
            SoapOrderItem__c theItem = new SoapOrderItem__c();
            theItem.Name = items[x].get('Scent__c');
            theItem.Item__c = items[x].get('Id');
            theItem.Bar_Type__c = items[x].get('Bar_Type__c');
            theItem.Soap_Order__c = theOrder.Id;
            theItem.Quantity__c = Decimal.ValueOf(items[x].get('Number_Available__c'));
            orderItems.add(theItem);
        }

        insert orderItems;

        /*
        now create the individual order items
        */


        return accountId;

    }


    public static Id fetchAcctId(String inputName) {
        /*
        currently a bit of a hack .. assumes all exceptions are
        'not found' errors 
        */
        Account a;
        try {
        
            a = [SELECT Name From Account WHERE Name = :inputName];
        } catch(exception e) {
            a = new Account();
            a.Name = inputName;
            a.Soap_Account__c = true;
            insert a;
        } 
        
        return a.Id;

    }
}
