import should from 'should';
import { handleRequest } from '../src/requesthandler.js';

const GETrequestWithNonExistentURL = {
    method: 'GET',
    url: 'https://nonexistenturl.com'
}

const GETrequestWithBadEndpoint = {
    method: 'GET',
    url: 'https://google.com/handleme'
}

const GETrequestWithBadParams = {
    method: 'GET',
    url: 'https://api.nationalize.io/?nme=alex'
}

const GETrequestWithHTMLResponse = {
    method: 'GET',
    url: 'https://tldr.sh/'
}

const GETrequestWithJSONResponse = {
    method: 'GET',
    url: 'https://datausa.io/api/data?drilldowns=Nation&measures=Population'
}

it('get rejected when URL does not exist', function () {
    return handleRequest(GETrequestWithNonExistentURL).should.be.rejected();
})

it('gets fulfilled with error code when endpoint does not exist', function () {
    return handleRequest(GETrequestWithBadEndpoint)
        .should.be.fulfilled()
        .should.finally.have.property('status', 404);
})

it('shows error when passed parameters are wrong.', function () {
    return handleRequest(GETrequestWithBadParams)
        .should.be.fulfilled()
        .should.finally.have.property('content')
        .have.property("error", "Missing name parameter")
})

it('fetches and dumps html content correctly', function () {
    return handleRequest(GETrequestWithHTMLResponse)
        .should.be.fulfilled()
        .should.finally.have.property('content')
        .and.startWith("<!DOCTYPE html").and.endWith("</html>");
})

it('fetches and dumps html content correctly', function () {
    return handleRequest(GETrequestWithHTMLResponse)
        .should.be.fulfilled()
        .should.finally.have.property('content')
        .and.startWith("<!DOCTYPE html").and.endWith("</html>");
})

it('fetches and dumps JSON content correctly', function () {
    return handleRequest(GETrequestWithJSONResponse)
        .should.be.fulfilled()
        .should.finally.have.property('content')
        .have.properties(['data', 'source'])
        .property('data').have.size(1)
})