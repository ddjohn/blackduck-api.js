import debug from 'debug';
const log = debug('test.js');

log('loading...');

import { BlackDuckAPI } from '../index.js';
import { API_TOKEN, API_URL } from '../config.js';
import assert from 'assert';
import sinon from 'sinon';
import got from 'got';

after(function () {
    sinon.restore();
});

describe('Bearer Test', () => {
    let sandbox = null;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });
  
    afterEach(() => {
      sandbox.restore()
    });

    it('Valid bearer', (done) => {
        const json = JSON.parse('{}');
        json["body"] = '{"bearerToken":"Hello"}';
        sandbox.stub(got, 'post').returns(json);

        const bd = new BlackDuckAPI(API_URL, API_TOKEN);
        const bearer = bd.getBearer().then((bearer) => {
            assert.ok(bearer.bearerToken);
            done();
        });
    });

    it('Invalid bearer due to incorrect token', (done) => {
        sandbox.stub(got, 'post').throws();

        const bd = new BlackDuckAPI(API_URL, 'wrong_token');
        const bearer = bd.getBearer().then((bearer) => {
            assert.strictEqual(bearer, undefined);
            done();
        });
    });

    /*
    it('Valid bearer due to missing black duck', (done) => {
        const bd = new BlackDuckAPI("http://www.google.com/", API_TOKEN);
        const bearer = bd.getBearer().then((bearer) => {
            assert.strictEqual(bearer, undefined);
            done();
        });
    });

    it('Valid bearer due to no black duck', (done) => {
        const bd = new BlackDuckAPI("http://www.localhost:46734/", API_TOKEN);
        const bearer = bd.getBearer().then((bearer) => {
            assert.strictEqual(bearer, undefined);
            done();
        });
    });
    */
});

