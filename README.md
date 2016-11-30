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

We will be using node js's native package manager, npm, so we will use this to
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
the file `tests/lib/Consumer.test.js` and also the file `tests/config.js`.

So...
  - `lib/Consumer.js` - our code for consuming the remove API
  - `test/lib/Consumer.test.js` - the tests for our code

##### creating configuration files

Next we will create a configuration file. We don't want these configuration
settings to pushed to a git repo yet, at the same time we do want to show a
sample configuration for users to work from. To solve this will involve creating
the following 3 files in our project root:
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

`.config-dist.js`

Now for our sample configuration file, `config-dist.js`, which we will place
in the root of our folder. This will grow when we need to add authentication
information. The `config-dist.js` file isn't listed in our `.gitignore` file
above, therefore this WILL be commited to the git repostiroy, so NO sensitive
data like keys should go in here. Just the expected parameters with a value of
`""`.

Because we have our `config.js` file we will also want to test this. The test
we will be doing is to make sure that `config-dist.js` properties match
`config.js` properties. So create the file `test/config.test.js`.

For `config-dist.js` enter the following:
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

`config.js`

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
    └── config.test.js
    └── lib
        └── Consumer.test.js
```

### Create our test suite

There are many ways of writing unit tests but using a framework is always a
plus. For this tutorial we will be using the `mocha` framework. We will want it
installed `globally`, which means it can be run from the command line - so use
the `-g` switch when installing. To install it run:

```bash
$ npm install -g mocha
```

You can test if it installed correctly by running:
```bash
$ mocha --version
2.5.3
```

If you get an error then its not installed globally. This can be a pain on
some machines, such as windows. Once you have `mocha installed globally` you
can continue.

Now we can start writing some code. In the file `test/config.test.js` we
will start our test suite by entering the following...
```javascript
"use strict";

const assert = require('chai').assert;

describe('Configuration', ()=>{

    it('config and config-dist properties match', (done)=>{
        done();
    }); // config and config-dist properties match

});
```

Starting from the top:
```javascript
"use strict";

const assert = require('chai').assert;
```

Here are are requiring the libraries that we will be using. We will use the
assert object from the `chai` module.

The next block:
```javascript
describe('Configuration', ()=>{

    it('config and config-dist properties match', (done)=>{
        done();
    }); // config and config-dist properties match

});
```

There are 2 handy helper functions here. `describe()`, which declares a test
suite and `it()` which declares a unit test. We can group unit tests into test
suites by placing our `it()` calls inside a `describe()` call.

### install dependencies

Before we run our tests we must install the dependencies. This is done using the
node package manager, `npm`, and also updating our `package.json`. We can do
both from the command line.

```bash
$ npm install --save-dev chai nock
```

After running the above check your `package.json` file. You should see the
dependencies listed along with their version numbers in the section
`"devDependencies"`.

We can now run our tests with `mocha`.

```bash
$ mocha tests/**/*.test.js

    Configuration
      ✓ config and config-dist properties match


    1 passing (16ms)
```

### Writing our first test case

We want our test case `config and config-dist properties match` to actually test
that the properties in `config.js` match the properties in `config-dist.js`. To
do this we will get the first level properties of both files and assert that
they are the same. The below test will suit our purposes but if our config
objects were more than one level we would need something slightly more complex.

So in our test file for configuration we will enter the following:
```javascript
...
    it('config and config-dist properties match', (done)=>{

        const configDist = require('../../config-dist.js'),
            config = require('../../config.js');

        assert.deepEqual(Object.keys(configDist), Object.keys(config));
        done();
    }); // config and config-dist properties match
...
```

First we get both files, then we use `assert.deepEqual` from the chai module to
test both properties are the same. Running `mocha tests/**/*.test.js` will
pass, so try adding a property to one of the config files, "accidentaly", and
run mocha again. You see, it fails ;)

In part two we will start testing the `Consumer.js` class.
