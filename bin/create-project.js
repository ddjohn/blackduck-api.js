import debug from 'debug';
const log = debug('create-project.js');

log('loading...');

import { BlackDuckAPI, BlackDuckReports } from '../index.js';
import { API_TOKEN, API_URL } from '../config.js';

var args = process.argv.slice(2);

const bd = new BlackDuckAPI(API_URL, API_TOKEN);

bd.getBearer().then((bearer) => {

    bd.createProject(args[0]).then((result) => {
        console.log(result);
    });
});

log('run()');
