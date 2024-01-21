import should from 'should'
import { parseArguments } from '../src/cmdparser.js'

const simpleGETRequest = "GET google.com".split(" ");
const simplePOSTRequest = "POST somepost.com".split(" ");
const GETRequestWithHeaderShortParams = "GET google.com -h 'Content-Type: application/json'".split(" ");
const GETRequestWithHeaderLongParams = "GET google.com --header 'Content-Type: application/json'".split(" ");
const POSTRequstWithBodyShortParams = "POST google.com -b '{lat:42, long:44}'".split(" ")
const POSTRequstWithBodyLongParams = "POST google.com --body '{lat:42, long:44}'".split(" ")
const POSTRequstWithBodyAndHeader1 = "POST google.com -h 'Content-Type: application/json' --body '{lat:42, long:44}'".split(" ")
const POSTRequstWithBodyAndHeader2 = "POST google.com --header 'Content-Type: application/json' -b '{lat:42, long:44}'".split(" ")

it("test whether error is raised when no argument is given", function () {
    (() => parseArguments([])).should.throwError();
})

it("test whether error is raised when non-existend HTTP method is passed", function () {
    (() => parseArguments("READ google.com".split(" "))).should.throwError("READ is not a HTTP method");
    (() => parseArguments("LISTEN google.com".split(" "))).should.throwError("LISTEN is not a HTTP method");
})

it("tests whether simple GET request is parsed ", function () {
    let parsedArgs = parseArguments(simpleGETRequest);
    parsedArgs.should.have.keys('method', 'url');
    parsedArgs.should.have.property('method').is.equal("GET");
    parsedArgs.should.have.property('url').is.equal("google.com");
})


it("test whether simple POST request is parsed", function () {
    let parsedArgs = parseArguments(simplePOSTRequest);
    parsedArgs.should.have.keys('method', 'url');
    parsedArgs.should.have.property('method').is.equal("POST");
    parsedArgs.should.have.property('url').is.equal("somepost.com");
})

it("tests headers are populated when passed in (short params)", function () {
    let parsedArgs = parseArguments(GETRequestWithHeaderShortParams);
    parsedArgs.should.have.keys('method', 'url', 'header');
    parsedArgs.should.have.property('method').is.equal('GET');
    parsedArgs.should.have.property('url').is.equal('google.com');
    parsedArgs.should.have.property('header').and.have.value('Content-Type', 'application/json');
})

it("tests headers are populated when passed in (long params)", function () {
    let parsedArgs = parseArguments(GETRequestWithHeaderLongParams);
    parsedArgs.should.have.keys('method', 'url', 'header');
    parsedArgs.should.have.property('method').is.equal('GET');
    parsedArgs.should.have.property('url').is.equal('google.com');
    parsedArgs.should.have.property('header').and.have.value('Content-Type', 'application/json');
})

it("tests body is populated when passed in (short params)", function () {
    let parsedArgs = parseArguments(POSTRequstWithBodyShortParams);
    parsedArgs.should.have.keys('method', 'url', 'header');
    parsedArgs.should.have.property('method').is.equal('POST');
    parsedArgs.should.have.property('url').is.equal('google.com');
    parsedArgs.should.have.property('body').and.have.value('lat', 42).and.have.value('long', 44);
})

it("tests body is populated when passed in (long params)", function () {
    let parsedArgs = parseArguments(POSTRequstWithBodyLongParams);
    parsedArgs.should.have.keys('method', 'url', 'header');
    parsedArgs.should.have.property('method').is.equal('POST');
    parsedArgs.should.have.property('url').is.equal('google.com');
    parsedArgs.should.have.property('body').and.have.value('lat', 42).and.have.value('long', 44);
})

it("tests both header and body is populated when passed in", function () {
    let parsedArgs;

    parsedArgs = parseArguments(POSTRequstWithBodyAndHeader1);
    parsedArgs.should.have.keys('method', 'url', 'header');
    parsedArgs.should.have.property('method').is.equal('POST');
    parsedArgs.should.have.property('url').is.equal('google.com');
    parsedArgs.should.have.property('header').and.have.value('Content-Type', 'application/json');
    parsedArgs.should.have.property('body').and.have.value('lat', 42).and.have.value('long', 44);

    parsedArgs = parseArguments(POSTRequstWithBodyAndHeader2);
    parsedArgs.should.have.keys('method', 'url', 'header');
    parsedArgs.should.have.property('method').is.equal('POST');
    parsedArgs.should.have.property('url').is.equal('google.com');
    parsedArgs.should.have.property('header').and.have.value('Content-Type', 'application/json');
    parsedArgs.should.have.property('body').and.have.value('lat', 42).and.have.value('long', 44);
})