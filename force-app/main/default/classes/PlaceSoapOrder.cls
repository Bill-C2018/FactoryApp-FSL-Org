public with sharing class PlaceSoapOrder {

    @AuraEnabled
    public static String placeOrder(String IName, List<Map<String,String>> items) {
        system.debug( IName);
        system.debug(items[0]);


        Account a;
        try {
        
            a = [SELECT Name From Account WHERE Name = :IName];
        } catch(exception e) {
            a = new Account();
            a.Name = IName;
            insert a;
            
        }  
        System.debug('record id ' + a.Id);
        //return items[0].get('Name');
        return IName;

    }
}
