
@isTest
global with sharing class MyHttpCalloutMock implements HttpCalloutMock {

    private String targetEndPoint;
    private String targetMethod;
    private String JsonString = '[{"soapName": "bob", "barType": "full", "scent": "rose", "color": "blue", "baseType": "gm", "ID": "abcd", "moldStyle": "full", "count": 7}]';
    private String loginToken = '1234abcd';

    global MyHttpCalloutMock(String endPoint) {
        targetEndPoint = endPoint;
    }

    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        String endPoint = req.getEndpoint();
        String method = req.getMethod();

        //Get all Soaps
        if (method.equals('GET') && endPoint.equalsIgnoreCase(targetEndPoint)) {
            res.setHeader('Content-Type', 'application/json');
            res.setBody(JsonString);
            res.setStatusCode(200);
            res.setStatus('should be good');
        } 

        //Login
        if(method.equals('POST') && endPoint.equalsIgnoreCase(targetEndPoint)) {
            String bdy = req.getBody();
            if(bdy.contains('bob')) {
                res.setHeader('Content-Type', 'application/json');
                res.setBody(loginToken);
                res.setStatusCode(200);
                res.setStatus('good to go');
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.setBody('');
                res.setStatusCode(200);
                res.setStatus('failed login');
            
            }


        }

        if(method.equals('PUT') && endPoint.equalsIgnoreCase(targetEndPoint)) {
            String bdy = req.getBody();
            String token = req.getHeader('access-token');
            if(token.equalsIgnoreCase('token')) {
                res.setHeader('Content-Type', 'application/json');
                res.setBody('Soap Updated');
                res.setStatusCode(200);
                res.setStatus('good to go');
            }
 
        }

        return res;
    }
}
