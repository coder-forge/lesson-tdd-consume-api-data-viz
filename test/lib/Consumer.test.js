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
