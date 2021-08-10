public with sharing class ApexCallout {

    @AuraEnabled
    public static List<Account>  getAccounts(){
        try {

            return [Select Name, ID from Account ORDER BY Name];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
	@AuraEnabled
	public static List<BarOfSoap__c> getSoapsList(String url) {
 
		// Instantiate a new http object
		Http h = new Http();
 
		// Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
		HttpRequest req = new HttpRequest();
		req.setEndpoint('http://clm.dyndns-server.com/soaps_sf');
		req.setMethod('GET');
        try {
		// Send the request, and return a response
		HttpResponse res = h.send(req);
		
 
		// Deserialize the JSON string into collections of primitive data types.
        System.debug(res.getBody());

        if(res == null || res.getStatusCode() != 200) {
            throw new AuraHandledException('no response');
        }
        List<BarOfSoapMapper> responses = (List<BarOfSoapMapper>) JSON.deserialize(res.getBody(),List<BarOfSoapMapper>.class);

        
        List<BarOfSoap__c> records = new List<BarOfSoap__c>();
        for (BarOfSoapMapper response : responses) {
            records.add(response.getRecord());
        }
        return records;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }


	}

    @AuraEnabled
    public static String doLoginPost(String data) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('http://clm.dyndns-server.com/login_sf');
        req.setMethod('POST');
        Http http = new Http();
        String ct = 'application/json';
        req.setHeader( 'Content-Type', ct);
        req.setBody(data);
        HttpResponse res = http.send(req);
        System.debug(res.getBody());
        return res.getBody();
    }

    @AuraEnabled
    public static string updateRemoteInventory(String data, String token){
        try {
            
            System.debug(token);
            System.debug(data);
            HttpRequest req = new HttpRequest();
            req.setEndpoint('http://clm.dyndns-server.com/soaps/update');
            req.setMethod('PUT');
            Http http = new Http();
            String ct = 'application/json';
            req.setHeader( 'Content-Type', ct);
            req.setHeader( 'access-token', token);
            req.setBody(data);
            HttpResponse res = http.send(req);
            System.debug(res.getBody());
            return res.getBody();
                
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
  
}
