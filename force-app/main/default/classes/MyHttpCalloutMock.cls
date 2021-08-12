
@isTest
global with sharing class MyHttpCalloutMock implements HttpCalloutMock {
    public MyHttpCalloutMock() {

    }

    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        String endPoint = req.getEndpoint();
        String method = req.getMethod();

        if (method == 'PUT') {
            res.setHeader('Content-Type', 'application/json');
            res.setBody('ok from http mock');
            res.setStatusCode(200);
        }

        return res;
    }
}
