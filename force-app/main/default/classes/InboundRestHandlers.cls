
@RestResource(urlMapping='/InventoryUpdate/*')
global with sharing class InboundRestHandlers {   

    @HttpGet
    global static List<BarOfSoap2__c> getCurrentInventory() {
        List<BarOfSoap2__c> inv = [SELECT Name, Bar_Type__c, Scent__c, 
                    Number_Available__c, Item_Number__c FROM BarOfSoap2__c LIMIT 200];
        return inv; 
        //This sends back an interesting JSON blob .. need to write a quick 
        //client so I can see how to parse it all
        
    }

    //lets be correct here this should be a put and not a post
    @HttpPut
    global static String updateInventory(String itemNumber, Integer numberOfBarsToAdd) {

        BarOfSoap2__c b = [SELECT Number_Available__c FROM BarOfSoap2__c 
                    WHERE Item_Number__c = :itemNumber LIMIT 1];
        b.Number_Available__c = b.Number_Available__c +  numberOfBarsToAdd;
        update b;     
        return 'bobs your uncle';

        //Note that the send event flow will trigger on the update and send the platform event
    }

}
