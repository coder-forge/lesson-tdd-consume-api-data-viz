# tutorial-consume-api - Part 1

### WIP work in progress

[Part 1](/tutorial-consume-api/blob/part-1) - [Part 2](/tutorial-consume-api/blob/part-2) - [Part 3](/tutorial-consume-api/blob/part-3) - [Part 4](/tutorial-consume-api/blob/part-4)

Part 1 - plan & skeleton by tdd.

  - read specs
  - json sample data of remote resource
  - create config
  - unit test for getToken method
  - unit test for isValid method
  - unit test for getData method
  - npm install save dependencies (bluebird, mocha, nock)

### Read Specs

Reading the documentation is one of the most important starting points, it
should be obvious but needs to be emphasised. For this tutorial we are only
interested in certain resources for the [@todo choose api] API. The resources we
are interested in are:

  1. authenticate get token from api
  2. get [dataType] data from api

Once we are authenticated then we can get the data.

First things first we need to initiate our project. We will do this using the
node package manager that ships with node (`npm`). Create a project folder,
change into it and run:
```bash
$ npm init
```
(hit enter for all questions for now).

### JSON sample data

Once we have the documentation read, then we select the parts that we are
interested in and create some mock data. The reason is that we will be `mocking`
out the remote API. With unit tests you want them running regularly. This
creates 2 problems, firstly making real requests to the remote API will take
time and secondly most API's have `rate limiting`. This means your only allowed
to make x amount of requests over y amount of time. For example 200 requests per
day. So we `mock` the remote API to mimic the data it will return.

Create the file `test/data/getData.json`. Your project file structure should now
look like:
```bash
├── package.json
└── test
    └── data
        └── getData.json
```

### create config

Next we will create a configuration file. We don't want these configuration
settings being pushed to a git repo yet at the same time we do want to show a
sample configuration. To solve this will involve 3 files in our project root:
`.gitignore`,`config-dist.js`,`config.js`

`.gitignore`
Here we list files and folders that we don't want pushed to a git repo. Some are
sensitive such as `config.js`, and some are for managing bloat and pollution,
such as `node_modules`, which we will explain in part 2. Add the following to
`.gitignore` (note filename starts with a `.`)
```bash
node_modules
config.js
```

`config-dist.js`
This file should be added to the git repo. It is a sample of what `config.js`
should look like. Add the following to `config-dist.js`:
```javascript
"use strict";
/**
 * Fill out params below and save as `config.js`
 *
 * @link http://docs.api.site.tld/register-app
 * @author me <me@me.me>
 */

const config = {

    client_id: "",
    client_secret: "",
    app_name: "",
}

module.exports = config;
```

### Create unit test for getToken

There are many ways of writing unit tests but using a framework is always a
plus. For this tutorial we will be using `mocha`. We will want it installed
`globally` so use the `-g` switch. To install it run:
```bash
$ npm install -g mocha
```

Now we are going to start with authenticating to the remote API. This usually
involves returning a token that can be used over `https` (an encrypted
to the API connection). Create the file `test/lib/Consumer.test.js` and enter:
```javascript
"use strict";

describe('Consumer Class', ()=>{

    it('will authenticate', ()=>{

    });

});
```

The `describe()` and `it()` functions are part of the `mocha` test suite. We do
our testing inside the `it()` function, and we can group these in to
`describe()` functions. This will become more clearer as the file grows.

Next we are going to write out how we would call our authentication to the
remote API. Yes, we haven't created anything yet so this is obviously going to
fail. Welcome to TDD - write the tests first.
```javascript
"use strict";

describe('Consumer Class', ()=>{

    it('will authenticate', ()=>{

        const config = {
            client_id: 'foobar',
            client_secret: 'bizbaz',
            app_name: 'test',
        }

        return Consumer.authenticate(config)
            .then((token)=>{

                // test token
            })
            .catch((err)=>{
                throw err;
            })
    });
});
```

```javascript
const config = {
    client_id: 'foobar',
    client_secret: 'bizbaz',
    app_name: 'test',
}
```
We know from reading the specs that authentication will need params from a
config. As this is a unit test we will use fake config. This means that when we
do create the `authenticate()` method the config will need to be passed into it.
By writing our tests first we have decoupled the configuration, this is known as
dependency injection. For those that know it keeps maintenance of the code base
very clean. Worth looking up for those that don't and full debate beyond scope
of this tutorial ;)

```javascript
return Consumer.authenticate(config)
    .then((token)=>{

        // test token
    })
    .catch((err)=>{
        throw err;
    });
```
Here is the guts of our authentication call. `Consumer.authenticate().then()`.
As the authentication is going to be asynchonous, its a network call to the
remote API so we don't know exactly when the response will return, we use a
pattern known as `promises`. These are beyond the scope of this tutorial. In a
nutshell, when the API eventually returns a token the `then()` function will be
called. If an error happens the `catch()` function will be called.


### Is valid method

Next we will need a method to test if the token is valid. Tokens generally have
an expiry and need to be renewed. We will add another `it()` test case inside
our `describe()` function:
```javascript
"use strict";

describe('Consumer Class', ()=>{

    it('will authenticate', ()=>{
        ...
    });

    it('will validate token', ()=>{

        const config = {
            client_id: 'foobar',
            client_secret: 'bizbaz',
            app_name: 'test',
        }

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

The same promises We don't want to have to pass configuration in when
validating, or for every method. The best solution is to have config loaded
when class is constructed. We would have to do this for each unit test, but
mocha and most test frameworks provide a handy helper function `beforeEach` that
gets run before each unit test.

Our `test/lib/Consumer.js` file now looks like:
```javascript
"use strict";

let Consumer, ConsumerClass;

describe('Consumer Class', ()=>{

    beforeEach(()=>{

        const config = {
            client_id: 'foobar',
            client_secret: 'bizbaz',
            app_name: 'test',
        }

        Consumer = new ConsumerClass(config);
    })

    it('will authenticate', ()=>{

        return Consumer.authenticate(config)
            .then((token)=>{

                // test token
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

### test getData

Next we will write the tests for the getData method. If we have some
understanding of above then the following should make sense. Add another test
case inside our test suite:
```javascript
    ...
    it('will get data', ()=>{

        return Consumer.getData()
            .then((data)=>{

                // test data
            })
            .catch((err)=>{
                throw err;
            });
    });
    ...
```

### install dependencies

We now know, before writing our logic, that we will be using `mocha`, `bluebird`
, `assert` and `nock`. Only `bluebird` is needed for our app to actually run,
the others are needed for testing. We can add these to our `package.json` file
respectively:

Core application packages run:
```bash
$ npm install --save bluebird
```

For our unit testing packages run:
```bash
$ npm install --save-dev mocha assert nock
```
