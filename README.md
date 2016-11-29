# tutorial-consume-api - Part 1

### WIP work in progress

Part 1 - [Part 2](https://github.com/coder-forge/tutorial-consume-api/tree/part-2) - [Part 3](https://github.com/coder-forge/tutorial-consume-api/tree/part-3) - [Part 4](https://github.com/coder-forge/tutorial-consume-api/tree/part-4)

Part 1 - plan & skeleton by tdd.

  - read specs
  - create our directories and files
  - write our test suite
  - npm install save dependencies (bluebird, mocha, nock, chai)

### Read Specs

Reading the documentation is one of the most important starting points, it
should be obvious but needs to be emphasised. For this tutorial we will be using
the Github API and will only be interested in two resources:

  1. A users's public repo's
  2. A users's private repo's

### Create our directories and files

##### initializing the project

We will be using node js's native package manager, so we will use this to
`initiate` our project. From the root directory run:
```bash
$ npm init
```

You can click `enter` for all questions, or fill them out. Our directory should
now contain one file `package.json` that should look something like: (yours may
differ depending on the answers you provided above).
```json
{
  "name": "foo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

I always use `git` for managing my code. Also both Github and Bitbuck use `git`,
so we will also initialize a git repository. From the command line run:
```bash
$ git init
```

This will add a `.git` folder to your project root. On some machines folders
starting with `.` are hidden, so you may not see it.

##### creating our module and test files

Next we are going to create our main file and a test file for it. Generally its
a good idea for some standard when placing core files and the `lib/`, short for
library, seems to be the standard with `nodejs`. Create the empty file
`lib/Consumer.js`.

Its also generally a good idea to organise your code that tests your module. A
`tests/` directory suits perfectly. The standard with most testing frameworks is
to mimic the directory structure of your code in the `tests/` folder. So create
the file `tests/lib/Consumer.test.js`.

So...
  - `lib/Consumer.js` - our code for consuming the remove API
  - `test/lib/Consumer.test.js` - the tests for our code

##### creating configuration files

Next we will create a configuration file. We don't want these configuration
settings being pushed to a git repo yet, at the same time we do want to show a
sample configuration. To solve this will involve 3 files in our project root:
`.gitignore`,`config-dist.js`,`config.js`

`.gitignore`
Here we list files and folders that we don't want pushed to a git repo. Some are
sensitive such as `config.js`, and some are for managing bloat and pollution,
such as `node_modules`, which we will explain in part 2. Add the following to
`.gitignore` (note filename starts with a `.`) in your project root.
```bash
node_modules
config.js
```

Now for our sample configuration file, `config-dist.js`, which we will place
in the root of our folder. This will grow as we need to add authentication
information. The `config-dist.js` file isn't listed in our `.gitignore` file
above, therefore this WILL be commited to the git repostiroy, so NO sensitive
data like keys should go in here. Just the expected parameters with a value of
`""`.

```javascript
"use strict";
/**
 * Fill out params below and save as `config.js`
 */

const config = {

    host: "",
}

module.exports = config;
```

So the above `config-dist.js` file will export an object with the host param.
Next we create our config file that will be loaded by our module. Create the
file `config.js` and enter the following:

```javascript
"use strict";
/**
 * Fill out params below and save as `config.js`
 */

const config = {

    host: "https://api.github.com",
}

module.exports = config;
```

Our directory structure should now look like: (note you may not see the `.git`
or the `.gitgnore` if you are on Windows.)
```bash
├── config-dist.js
├── config.js
├── .git
├── .gitgnore
├── lib
│   └── Consumer.js
└── package.json
└── tests
    └── lib
        └── Consumer.test.js
```

### Create our test suite

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
