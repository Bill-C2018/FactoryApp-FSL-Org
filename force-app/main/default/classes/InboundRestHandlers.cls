
@RestResource(urlMapping='/InventoryUpdate/*')
global with sharing class InboundRestHandlers {   

    @HttpGet
    global static List<BarOfSoap2__c> getCurrentInventory() {
        List<BarOfSoap2__c> inv = [SELECT Name, Bar_Type__c, Scent__c, 
                    Number_Available__c, Item_Number__c FROM BarOfSoap2__c LIMIT 200];
        return inv; //I imagine this will need to be massaged in one way or another
    }

    @HttpPost
    global static String updateInventory(String itemNumber, Integer numberOfBarsToAdd) {

        BarOfSoap2__c b = [SELECT Number_Available__c FROM BarOfSoap2__c 
                    WHERE Item_Number__c = :itemNumber LIMIT 1];
        b.Number_Available__c = b.Number_Available__c +  numberOfBarsToAdd;
        update b;     
        return 'bobs your uncle';
/*
//this will be done by the flow on the update of the soap record
        UpdateSoapsEvent__e ue = new UpdateSoapsEvent__e(Type__c = 'bobs your uncle');
        insert ue;
*/
    }

}
