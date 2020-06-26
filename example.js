import debug from 'debug';
const log = debug('example.js');

log('loading...');

import { BlackDuckAPI } from './index.js';
import { API_TOKEN, API_URL } from './config.js';

const bd = new BlackDuckAPI(API_URL, API_TOKEN);

bd.getBearer().then((bearer) => {
    log(bearer);
});

log('run()');