import debug from 'debug';
const log = debug('test-project.js');

log('loading...');

import { BlackDuckAPI } from '../index.js';
import { API_TOKEN, API_URL } from '../config.js';
import assert from 'assert';
import sinon from 'sinon';
import got from 'got';

describe('Projects Test', () => {
  let sandbox = null;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore()
  });

  it('List 3 projects', (done) => {
    const json = JSON.parse('{}');
    json["body"] = '{"totalCount":3, "items":[{"name":"a"},{"name":"b"},{"name":"c"}]}';
    sandbox.stub(got, 'get').returns(json);

    const bd = new BlackDuckAPI(API_URL, API_TOKEN);

    bd.getProjects('').then((projects) => {
      assert.ok(projects);

      projects.forEach((project) => {
        assert.ok(project);
        assert.ok(project.name);
      });
      done();
    });
  });
});
