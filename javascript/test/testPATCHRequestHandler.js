import should from "should";
import { handleRequest } from "../src/requesthandler.js";

const PATCHrequestWithNonExistentURL = {
    method: 'PATCH',
    url: 'https://nonexistenturl.com',
    header: {},
    body: {}
}

const PATCHrequestWithBadEndpoint = {
    method: 'PATCH',
    url: 'https://httpbin.org/patchwrong',
    header: {},
    body: {}
}

const PATCHrequestWithJSONBody = {
    method: 'PATCH',
    url: 'https://httpbin.org/patch',
    header: { 'Content-Type': 'application/json' },
    body: {
        "field1": "value1",
        "field2": "value2",
    }
}

const PATCHrequestWithURLEncodedBody = {
    method: 'PATCH',
    url: 'https://httpbin.org/patch',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'field1=value1&field2=value2'
}

const PATCHrequestWithJSONBodyNoHeader = {
    method: 'PATCH',
    url: 'https://httpbin.org/patch',
    body: {
        "field1": "value1",
        "field2": "value2",
    }
}

it('PATCH: gets rejected when URL does not exist', function () {
    return handleRequest(PATCHrequestWithNonExistentURL).should.be.rejected();
})

it('PATCH: gets fulfilled with error code when endpoint does not exist', function () {
    return handleRequest(PATCHrequestWithBadEndpoint)
        .should.be.fulfilled()
        .should.finally.have.property('status', 404);
})

it('PATCH: returns a JSON payload as is from httpbin.org', function () {
    return handleRequest(PATCHrequestWithJSONBody).should.be.fulfilled()
        .should.finally.have.property('content')
        .have.property('json')
        .have.properties({ 'field1': 'value1', 'field2': 'value2' })

})

it('PATCH: returns a URL encoded payload as is from httpbin.org', function () {
    return handleRequest(PATCHrequestWithURLEncodedBody).should.be.fulfilled()
        .should.finally.have.property('content')
        .have.property('form')
        .have.properties({ 'field1': 'value1', 'field2': 'value2' })

})

it('PATCH: sets header to application/json if not given (httpbin.org)', function() {
    return handleRequest(PATCHrequestWithJSONBodyNoHeader).should.be.fulfilled()
        .should.finally.have.property('content')
        .have.property('json')
        .have.properties({ 'field1': 'value1', 'field2': 'value2' })

})