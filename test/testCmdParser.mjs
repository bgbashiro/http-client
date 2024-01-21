import assert from 'assert'
import should from 'should'
import { parseArguments } from '../src/cmdparser.js'

it("test whether error is raised when no argument is given", function () {
    (()=>parseArguments([])).should.throwError();
})

it("tests whether normal GET request is parsed ", function () {
    (() => parseArguments("GET google.com".split(" "))).should.not.throwError();
})