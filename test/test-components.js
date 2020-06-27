import debug from 'debug';
const log = debug('test-components.js');

log('loading...');

import { BlackDuckAPI } from '../index.js';
import { API_TOKEN, API_URL } from '../config.js';
import assert from 'assert';
import sinon from 'sinon';
import got from 'got';

describe('Components Test', () => {
  let sandbox = null;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  
  afterEach(() => {
    sandbox.restore()
  });

  it('List 3 components', (done) => {
    const json = JSON.parse('{}');
    json["body"] = '{"totalCount":3, "items":[{"componentName":"a"},{"componentName":"b"},{"componentName":"c"}]}';
    sandbox.stub(got, 'get').returns(json);

    const version_object = JSON.parse('{}');
    version_object["_meta"] = '{"href":http://null.com/"}';

    const bd = new BlackDuckAPI(API_URL, API_TOKEN);

    bd.getComponents(version_object, '').then((components) => {
      assert.ok(components);

      components.forEach((component)  => {
        assert.ok(component);
        assert.ok(component.componentName); 
      });
      done();
    });
  });
});
