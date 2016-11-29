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

    it('will make GET request ', (done)=>{
        done();
    }); // end will make GET request

});
