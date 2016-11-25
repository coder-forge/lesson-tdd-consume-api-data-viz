# tutorial-consume-api

### WIP work in progress

This tutorial will teach consuming a remote api using test driven development. At the moment it is in a conceptual stage
but all contributions are welcome.

### Stack

NodeJS - Vanilla ES6

### Parts

[Part 1](tutorial-consume-api/blob/part-1) - [Part 2](tutorial-consume-api/blob/part-2) - [Part 3](tutorial-consume-api/blob/part-3) - [Part 4](tutorial-consume-api/blob/part-4)

This tutorial will be split into 4 parts, each with its own branch. This current
branch your on and the final part (part-4) will both contain the code for the
final result.

Part 1 - plan & skeleton by tdd.

  - read specs
  - json sample data of remote resource
  - create config
  - unit test for getToken method
  - unit test for isValid method
  - unit test for getData method
  - npm install save dependencies (bluebird, mocha, nock)

Part 2 - fill skeleton

  - pass method for getToken
  - pass method for isValid
  - pass method for getData

Part 3 - integration

  - decouple from `npm test`
  - runs on merge master / production
  - pass's

Part 4 - implement in framework

 - install express
 - create routes
 - viola ;)
