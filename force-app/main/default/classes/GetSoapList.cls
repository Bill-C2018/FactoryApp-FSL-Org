public without sharing class GetSoapList {

    @AuraEnabled
    public static List<BarOfSoap2__c>  GetSoaps() {
        
        system.debug('in get soaps');

        List<BarOfSoap2__c> res = new List<BarOfSoap2__c>();
        for (List<BarOfSoap2__c> a: [Select Name, ID, Bar_Type__c, Scent__c, Number_Available__c from BarOfSoap2__c ORDER BY Name]) {
            res.addAll(a);
        }
        return res;
    }
}
