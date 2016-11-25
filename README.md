# tutorial-consume-api - Part 1

### WIP work in progress

[Part 1](tutorial-consume-api/blob/part-1) - [Part 2](tutorial-consume-api/blob/part-2) - [Part 3](tutorial-consume-api/blob/part-3) - [Part 4](tutorial-consume-api/blob/part-4)

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
sensitive such as `config.js`, and some are for managing bloat and polution,
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
    app_name: ""
}

module.exports = config;
```
