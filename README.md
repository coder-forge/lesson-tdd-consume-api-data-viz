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
