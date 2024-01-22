# Simple http client

Sends GET/POST/PUT/PATCH/DELETE requests and dumps response to terminal. Requires `node v20.10.0`

To install necessary packages:
```
npm install
```

To run tests
```
npm run test
```
To run the client using npm/node

```
node src/app.js <METHOD> <URL> <HEADERS> <BODY>
npm run start -- <METHOD> <URL> <HEADERS> <BODY>
npm run start -- GET https://nytimes.com
npm run start -- POST https://httpbin.org/post -h 'Content-Type'
```

Or run provided script
```
./httpclient GET https://nytimes.com
./httpclient GET https://httpbin.org/get?param=parameter
./httpclient POST https://httpbin.org/post -h 'Content-Type: application/json' -b 'fieldA: valueA'
./httpclient POST https://httpbin.org/post -h 'Content-Type: application/json' -b 'fieldA: valueA' -b 'fieldB: valueB'
```

Notes:
- both -h and --header, -b and --body works fine.
- if there is only one field you want to pass curly brackets `{`, `}` are optional. When same key is used multiple times, lastmost one is used.
- you can also specify two or more fields by simply repeating `-h`,`-b` flags.
- the capital cases are **important** when specifying `'Content-Type'`.
- expected format for headers and body is strictly JSON (although loose formatting is fine, for example, quotes around strings are not necessary), otherwise script will throw an error. If content type is application/x-www-form-urlencoded it gets converted accordingly inside the program. 