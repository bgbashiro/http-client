import should from "should";
import { handleRequest } from "../src/requesthandler.js";

const PUTrequestWithNonExistentURL = {
    method: 'PUT',
    url: 'https://nonexistenturl.com',
    header: {},
    body: {}
}

const PUTrequestWithBadEndpoint = {
    method: 'PUT',
    url: 'https://httpbin.org/putwrong',
    header: {},
    body: {}
}

const PUTrequestWithJSONBody = {
    method: 'PUT',
    url: 'https://httpbin.org/put',
    header: { 'Content-Type': 'application/json' },
    body: {
        "field1": "value1",
        "field2": "value2",
    }
}

const PUTrequestWithURLEncodedBody = {
    method: 'PUT',
    url: 'https://httpbin.org/put',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'field1=value1&field2=value2'
}

const PUTrequestWithJSONBodyNoHeader = {
    method: 'PUT',
    url: 'https://httpbin.org/put',
    body: {
        "field1": "value1",
        "field2": "value2",
    }
}

it('PUT: gets rejected when URL does not exist', function () {
    return handleRequest(PUTrequestWithNonExistentURL).should.be.rejected();
})

it('PUT: gets fulfilled with error code when endpoint does not exist', function () {
    return handleRequest(PUTrequestWithBadEndpoint)
        .should.be.fulfilled()
        .should.finally.have.property('status', 404);
})

it('PUT: returns a JSON payload as is from httpbin.org', function () {
    return handleRequest(PUTrequestWithJSONBody).should.be.fulfilled()
        .should.finally.have.property('content')
        .have.property('json')
        .have.properties({ 'field1': 'value1', 'field2': 'value2' })

})

it('PUT: returns a URL encoded payload as is from httpbin.org', function () {
    return handleRequest(PUTrequestWithURLEncodedBody).should.be.fulfilled()
        .should.finally.have.property('content')
        .have.property('form')
        .have.properties({ 'field1': 'value1', 'field2': 'value2' })

})

it('PUT: sets header to application/json if not given (httpbin.org)', function() {
    return handleRequest(PUTrequestWithJSONBodyNoHeader).should.be.fulfilled()
        .should.finally.have.property('content')
        .have.property('json')
        .have.properties({ 'field1': 'value1', 'field2': 'value2' })

})