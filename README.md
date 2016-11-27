# tutorial-consume-api - Part 1

### WIP work in progress

[Part 1](https://github.com/coder-forge/tutorial-consume-api/tree/part-1) - Part 2 - [Part 3](https://github.com/coder-forge/tutorial-consume-api/tree/part-3) - [Part 4](https://github.com/coder-forge/tutorial-consume-api/tree/part-4)

Part 2 - Build it to pass.

 - create library/files
 - mocking the remote api
 - getToken
 - isValid
 - getData

### Create library/files

Create the following `lib/Consumer.js`, so that your project folder now looks
like:
```bash
├── config-dist.js
├── config.js
├── lib
│   └── Consumer.js
├── LICENSE.md
├── node_modules
├── package.json
├── README.md
└── test
    ├── data
    │   └── getData.json
    └── lib
        └── Consumer.test.js
```
Basically there are many ways to structure a node application. This is my
preferred way as it allows for easy portability and has become standard on most
open source repos, eg bitbucket and github.

Config files, such as CI builds, linters etc go at the root. This is messy, I
hate it, but navigating through a repo on github or bitbucket its easy to see
what services (stack) an application is using. Very handy.

The next thing to notice is that test, with the exception of its `data/` folder,
maps the directories where the code lies. There's a lib folder at the root, so
there's a lib folder test/. By the end of this tutorial there will also be a
bin/ folder, but more on that later.

### Mocking the remote api

We want these tests to run as quickly as possible. If we're working on code we
don't want to be waiting 5, 10, 20 mins for tests. For this reason we are
writing unit tests, testing individual blocks of code as we're developing.
Waiting for replies from remote API's and rate-limiting, only allowed x amount
of calls a day/hour, will create problems if we want quick clean tests. To solve
this we mock out the remote API, in other words we make a fake version.

`nock` is an excellent tool to do this. Given the remote api url, it will listen
for this call and interupt it, returning what you want. So you could mimic a
response for a persons details and also error responses to make sure your code
is handling them efficiently.

In our tests will have to include the modules `nock` and `assert` from the
`chai` module. Also we will want to include the Consumer class file... so it
can be tested ;)

The file `test/lib/Consumer.test.js` should now look like:
```javascript
"use strict";

const assert = require('chai').assert,
    nock = require('nock');

const ConsumerClass = require('../../lib/Consumer.js');
let Consumer;

describe('Consumer Class', ()=>{

    beforeEach(()=>{

        const config = {
            api_url: 'http://url.to.remote.api',
            client_id: 'foobar',
            client_secret: 'bizbaz',
            app_name: 'test',
        }

        Consumer = new ConsumerClass(config);
    })

    it('will authenticate', ()=>{

        const expectedToken = 'wouldthisreallywork';

        nock(config.api_url)
            .get('/token')
            .reply(200, {
                auth_token: expectedToken,
            });

        return Consumer.authenticate(config)
            .then((actualToken)=>{

                // test token
                assert.equal(actualToken, expectedToken);
            })
            .catch((err)=>{
                throw err;
            });
    });

    it('will validate token', ()=>{

        return Consumer.isValid(config)
            .then((valid)=>{

                // test is valid
            })
            .catch((err)=>{
                throw err;
            });
    });
});
```
