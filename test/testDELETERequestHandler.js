import should from "should";
import { handleRequest } from "../src/requesthandler.js";

const DELETErequestWithNonExistentURL = {
    method: 'DELETE',
    url: 'https://nonexistenturl.com',
    header: {},
    body: {}
}

const DELETErequestWithBadEndpoint = {
    method: 'DELETE',
    url: 'https://httpbin.org/deletewrong',
    header: {},
    body: {}
}

const DELETErequestWithJSONBody = {
    method: 'DELETE',
    url: 'https://httpbin.org/delete',
    header: { 'Content-Type': 'application/json' },
    body: {
        "field1": "value1",
        "field2": "value2",
    }
}

const DELETErequestWithURLEncodedBody = {
    method: 'DELETE',
    url: 'https://httpbin.org/delete',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'field1=value1&field2=value2'
}

const DELETErequestWithJSONBodyNoHeader = {
    method: 'DELETE',
    url: 'https://httpbin.org/delete',
    body: {
        "field1": "value1",
        "field2": "value2",
    }
}

it('DELETE: gets rejected when URL does not exist', function () {
    return handleRequest(DELETErequestWithNonExistentURL).should.be.rejected();
})

it('DELETE: gets fulfilled with error code when endpoint does not exist', function () {
    return handleRequest(DELETErequestWithBadEndpoint)
        .should.be.fulfilled()
        .should.finally.have.property('status', 404);
})

it('DELETE: returns a JSON payload as is from httpbin.org', function () {
    return handleRequest(DELETErequestWithJSONBody).should.be.fulfilled()
        .should.finally.have.property('content')
        .have.property('json')
        .have.properties({ 'field1': 'value1', 'field2': 'value2' })

})

it('DELETE: returns a URL encoded payload as is from httpbin.org', function () {
    return handleRequest(DELETErequestWithURLEncodedBody).should.be.fulfilled()
        .should.finally.have.property('content')
        .have.property('form')
        .have.properties({ 'field1': 'value1', 'field2': 'value2' })

})

it('DELETE: sets header to application/json if not given (httpbin.org)', function() {
    return handleRequest(DELETErequestWithJSONBodyNoHeader).should.be.fulfilled()
        .should.finally.have.property('content')
        .have.property('json')
        .have.properties({ 'field1': 'value1', 'field2': 'value2' })

})