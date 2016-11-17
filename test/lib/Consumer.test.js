"use strict";

const ConsumerClass = require('../../lib/Consumer'),
    nock = require('nock');

let consumer;

describe('get data', ()=>{

    beforeEach(()=>{

        consumer = new ConsumerClass();
    })

    it('will get data from resource', (done)=>{

        const scope = nock('https://api.endpoint.io')
            .get('/foobar/woop/woop')
            .reply({
                test: 'object',
            });

        consumer.getData()
            .then((data)=>{

                scope.done();
                done();
            })
            .catch(done);
    });

    it('will prepare data for d3js', (done)=>{
        done();
    });
});
