# tutorial-consume-api - Part 1

### WIP work in progress

[Part 1](https://github.com/coder-forge/tutorial-consume-api/tree/part-1) - Part 2 - [Part 3](https://github.com/coder-forge/tutorial-consume-api/tree/part-3) - [Part 4](https://github.com/coder-forge/tutorial-consume-api/tree/part-4)

Part 2 - Build it to pass.

 - Write our first test case

### Write our first test case.

Now that we have our files in order its time to write our first test case. There
will be 2 types of requests that we can use with Github, unauthorised and
authorised. For public data, such as a list of a user's public repos, we won't
need any authorisation.

We start with how we'd like our module be called:
```javascript
    })// end beforeEach()

    it('will make GET request', ()=>{

        return Consumer
            .get({
                uri: config.host+'/orgs/octokit/repos',
            })
            .then(res => {
                console.log(res.statusCode);
                console.log(res.body);
            });
    });// end will make GET request
```

Looking at the above I've decided that promises would be best, as we're dealing
with calls on the wire and thus won't know exactly when a response has returned.
The call will be `Consumer.get(Object).then(fn)`. The `then()` callback will be
fired only when there is a result returned from the remote API, and this
callback will `console.log()` the response body.

So we can now edit our `Consumer` class to match our test case. Edit the file
`lib/Consumer.js` adding in the methods we think we'll need:
```javascript
"use strict";

const request = require('request'),
    Promise = require('bluebird');

/**
 * Consumer Class.
 */
class Consumer{

    /**
     * Make a get request to resource.
     * @param {Object} opts Request modules options object.
     * @return {Promise} Resolves to Request.response object.
     */
    get(opts){

        return new Promise((resolve, reject)=>{

            request(opts, (err, res, body)=>{
                if(err) return reject(err);

                return resolve(res);
            });
        });
    }

}

module.exports = Consumer;
```

We know we are going to make a network call, so we'll require the `request`
module, and we know we are going to use promises, so we'll require the
`bluebird` module.
```javascript
const request = require('request'),
    Promise = require('bluebird');
```

Next we'll create our class with one `get()` method. This method will take
an Object `options` and return a Promise object with the line:
```javascript
return new Promise((resolve, reject)=>{
    ...
});
```

It is inside this promise that we make our request:
```javascript
request(opts, (err, res, body)=>{
    ...
});
```

If there's an error we will `reject` it. A rejection will trigger `.catch()`,
instead of `then()` - but more on this later.
```javascript
if(err) return reject(err);
```

Else if no error then we `resolve()` the result. This will trigger the `.then()`
callback in our test case above.
```javascript
return resolve(res);
```

We can now test the above by running the following on the command line:
```bash
$ npm test
```

Wo, whats this. Running the tests produces:

```bash
Consumer Class
statusCode: 403
body: Request forbidden by administrative rules. Please make sure your request has a User-Agent header (http://developer.github.com/v3/#user-agent-required). Check https://developer.github.com for other possible causes.

  will make GET request (600ms)
```

The `res.statusCode` is 403. This is a HTTP Verb that reports the status of the
process. 400's mean there was something wrong on our side, authentication,
resource not found. 500's mean there was something wrong on their end, a bug,
a timeout etc. 200's are what we want for success. 201 means something was
updated and 200 means resource returned successfully.

Our tests are passing. We know by the `✓` beside the test case name `will make
GET request (600ms)`. As we got an error we want then to fail. Then we'll fix
the error of the missing `User-Agent` header.

We need to `reject()` some error info if the server doesn't return 200. In the
same method, `get()`, under the line checking existence of error `if(err) return
 reject(err)` we add the line:
```javascript
request(opts, (err, res, body)=>{
    if(err) return reject(err);
    if(res.statusCode!=200) return reject({ // if not 200
        statusCode: res.statusCode,
        body: body,
    });// end if not 200

    return resolve(res);
});
```

Now running our tests with `npm test` from the command line will fail the test.
So found something to error check, the statusCode, execellent. Now to get the
test to pass. Add the following to the top of the `get()` method in Consumer.js:
```javascript
get(opts){

    // definite headers needed by API
    (opts.headers) ?
        opts.headers['User-Agent'] = 'coder-forge test' :
        opts.headers = {
            'User-Agent': 'coder-forge test',
        };
    ...
}
```

If the headers don't exist, then create them. If they do then add the User-Agent
which alyways has to be 'coder-forge test'. The next piece of the puzzle is to
test the results in a programatic manner. For this we will use the assert
module. In the `.then()` callback in our test case, replace the console.log()
with `assert.equal(res.statusCode, 200)`.
```javascript
return Consumer
    .get({
        uri: config.host+'/orgs/octokit/repos',
    })
    .then(res => {
        assert.equal(res.statusCode, 200);
    });
```


### Mocking the request

We want to be able to run these tests multiple times an hour. Making actual
requests to the remote API everytime is not feasible. One is the time it will
take for these tests to run. Another is rate limiting of the remote API, which
only allows x amount of calls per y amount of time. To solve this we will use
the `nock` module.

We pass the host of the remote API to nock, along with the endpoint, and nock
will intercept the call. Stop it going out on the wire, and return only what
you define it to. In the test case `will make GET request`:
```javascript
it('will make GET request', ()=>{

    const expectedBody = [{id:417862,name:'octokit.rb'}];

    nock(config.host)
        .get('/orgs/octokit/repos')
        .reply(200, expectedBody);

    return Consumer
        ...
});
```

```javascript
    const expectedBody = [{id:417862,name:'octokit.rb'}];
```
First we are defining a body that our mock of GitHub will return. For our
purposes here we don't need the rull (massive) response. But if our `get()`
method were to do any transforming of the data then we would need `expectedBody`
to equal that.

```javascript
    nock(config.host)
        .get('/orgs/octokit/repos')
        .reply(200, expectedBody);
```
Here we are telling nock to intercept calls to `config.host`, which we have
defined in our `beforeEach()`, that are looking for the endpoint
`/orgs/octokit/repos`. Nock is then told to reply with status of 200 and the
`expectedBody`.

Now we test that we get the results we've asked nock to return. Where we have
the `assert()` for the statusCode, add the following underneath:
```javascript
    assert.deepEqual(res.body, expectedBody);
```

Our `Consumer.test.js` file should now look like:
```javascript
"use strict";

const assert = require('chai').assert,
    nock = require('nock');

const ConsumerClass = require('../../lib/Consumer');
let Consumer, config;

describe('Consumer Class', ()=>{

    beforeEach(()=>{

        config = {
            host: 'https://api.github.com'
        }

        Consumer = new ConsumerClass(config);
    }); // end beforeEach()

    it('will make GET request', ()=>{

        const expectedBody = [{id:417862,name:'octokit.rb'}];

        nock(config.host)
            .get('/orgs/octokit/repos')
            .reply(200, expectedBody);

        return Consumer
            .get({
                uri: config.host+'/orgs/octokit/repos',
            })
            .then(res => {
                assert.equal(res.statusCode, 200);
                assert.deepEqual(res.body, expectedBody);
            });
    });

});
```

The `lib/Consumer.js` file:
```javascript
"use strict";

const request = require('request'),
    Promise = require('bluebird');

/**
 * Consumer Class.
 */
class Consumer{

    /**
     * Make a get request to resource.
     * @param {Object} opts Request modules options object.
     * @return {Promise} Resolves to Request.response object.
     */
    get(opts){

        // definite headers needed by API
        (opts.headers) ?
            opts.headers['User-Agent'] = 'coder-forge test' :
            opts.headers = {
                'User-Agent': 'coder-forge test',
            };
        opts.method = 'GET';
        opts.json = true;

        return new Promise((resolve, reject)=>{

            request(opts, (err, res, body)=>{
                if(err) return reject(err);
                if(res.statusCode!=200) return reject({
                    statusCode: res.statusCode,
                    body: body,
                });

                return resolve(res);
            });
        });
    }

}

module.exports = Consumer;
```

Running `npm test` from the command line should now pass:
```
$ npm test

> tutorial-consume-api@1.0.0 test /opt/coder-forge/tutorial-consume-api
> mocha test/**/*.test.js



  Consumer Class
    ✓ will make GET request


  1 passing (41ms)

```
