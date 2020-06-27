import debug from 'debug';
const log = debug('test-versions.js');

log('loading...');

import { BlackDuckAPI } from '../index.js';
import { API_TOKEN, API_URL } from '../config.js';
import assert from 'assert';
import sinon from 'sinon';
import got from 'got';

describe('Versions Test', () => {
  let sandbox = null;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  
  afterEach(() => {
    sandbox.restore()
  });

  it('List 3 versions', (done) => {
    const json = JSON.parse('{}');
    json["body"] = '{"totalCount":3, "items":[{"versionName":"a"},{"versionName":"b"},{"versionName":"c"}]}';
    sandbox.stub(got, 'get').returns(json);

    const project_object = JSON.parse('{}');
    project_object["_meta"] = '{"href":http://null.com/"}';

    const bd = new BlackDuckAPI(API_URL, API_TOKEN);

    bd.getComponents(project_object, '').then((versions) => {
      assert.ok(versions);

      versions.forEach((version)  => {
        assert.ok(version);
        assert.ok(version.versionName); 
      });
      done();
    });
  });
});
