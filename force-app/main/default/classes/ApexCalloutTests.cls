@isTest
public with sharing class ApexCalloutTests {


    @isTest
    public static void getAccountsTest() {
        Account acct = new Account(name='robert');
        insert acct;
        List<Account> res = ApexCallout.getAccounts();
        System.assertEquals('robert', res[0].Name);
    }


    @isTest
    public static void getSoapsListTest_Success() {

        MyHttpCalloutMock mockCall = new MyHttpCalloutMock('http://clm.dyndns-server.com/soaps_sf');
        Test.setMock(HttpCalloutMock.class, mockCall);
        List<BarOfSoap__c> soaps = ApexCallout.getSoapsList('http://clm.dyndns-server.com/soaps_sf');
        System.assertEquals('abcd', soaps[0].ExternalId__c);
    }


    @isTest
    public static void doLoginPostTest() {
        MyHttpCalloutMock mockCall = new MyHttpCalloutMock('http://clm.dyndns-server.com/login_sf');
        Test.setMock(HttpCalloutMock.class, mockCall);
        String res = ApexCallout.doLoginPost('[{"userName": "bob", "userPword": "Pword1"}]');
        System.assertEquals('1234abcd',res);

    }

    @isTest
    public static void updateRemoteInventoryTest() {
        MyHttpCalloutMock mockCall = new MyHttpCalloutMock('http://clm.dyndns-server.com/soaps/update');
        Test.setMock(HttpCalloutMock.class, mockCall);  
        String res = ApexCallout.updateRemoteInventory('data', 'token');
        System.assertEquals('Soap Updated', res);
  
    }

}
