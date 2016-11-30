"use strict";

const assert = require('chai').assert;

describe('Configuration', ()=>{

    it('config and config-dist properties match', (done)=>{

        const configDist = require('../../config-dist.js'),
            config = require('../../config.js');

        assert.deepEqual(Object.keys(configDist), Object.keys(config));
        done();
    }); // config and config-dist properties match

});
