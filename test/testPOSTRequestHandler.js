import should from 'should'
import { handleRequest } from '../src/requesthandler.js'

const POSTrequestWithNonExistentURL = {
    method: 'POST',
    url: 'https://nonexistenturl.com',
    header: {},
    body: {}
}

const POSTrequestWithBadEndpoint = {
    method: 'POST',
    url: 'https://httpbin.org/postwrong',
    header: {},
    body: {}
}

const POSTrequestWithJSONBody = {
    method: 'POST',
    url: 'https://httpbin.org/post',
    header: { 'Content-Type': 'application/json' },
    body: {
        "field1": "value1",
        "field2": "value2",
    }
}

const POSTrequestWithJSONBodyNoHeader = {
    method: 'POST',
    url: 'https://httpbin.org/post',
    body: {
        "field1": "value1",
        "field2": "value2",
    }
}

const POSTrequestWithURLEncodedBody = {
    method: 'POST',
    url: 'https://httpbin.org/post',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'field1=value1&field2=value2'
}

const POSTrequestWithJSONBody2 = {
    method: 'POST',
    url: 'https://reqres.in/api/users',
    header: { 'Content-Type': 'application/json' },
    body: { 'name': 'Brian', 'job': 'Barista' }
}

it('POST: gets rejected when URL does not exist', function () {
    return handleRequest(POSTrequestWithNonExistentURL).should.be.rejected();
})

it('POST: gets fulfilled with error code when endpoint does not exist', function () {
    return handleRequest(POSTrequestWithBadEndpoint)
        .should.be.fulfilled()
        .should.finally.have.property('status', 404);
})

it('POST: returns a JSON payload as is from httpbin.org', function () {
    return handleRequest(POSTrequestWithJSONBody).should.be.fulfilled()
        .should.finally.have.property('content')
        .have.property('json')
        .have.properties({ 'field1': 'value1', 'field2': 'value2' })

})

it('POST: returns a URL encoded payload as is from httpbin.org', function () {
    return handleRequest(POSTrequestWithURLEncodedBody).should.be.fulfilled()
        .should.finally.have.property('content')
        .have.property('form')
        .have.properties({ 'field1': 'value1', 'field2': 'value2' })

})

it('POST: sets header to application/json if no header given (httpbin.org)', function () {
    return handleRequest(POSTrequestWithJSONBodyNoHeader).should.be.fulfilled()
        .should.finally.have.property('content')
        .have.property('json')
        .have.properties({ 'field1': 'value1', 'field2': 'value2' })

})

it('POST: returns a JSON payload as is from reqres.in', function () {
    return handleRequest(POSTrequestWithJSONBody2).should.be.fulfilled()
        .should.finally.have.property('content')
        .have.properties(['name', 'job', 'id', 'createdAt'])

})
