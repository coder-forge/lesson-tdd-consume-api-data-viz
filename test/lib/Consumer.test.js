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

    it.only('will authenticate', ()=>{

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
