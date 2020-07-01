import debug from 'debug';
const log = debug('list_roles.js');

log('loading...');

import { BlackDuckAPI, BlackDuckReports } from '../index.js';
import { API_TOKEN, API_URL } from '../config.js';

var args = process.argv.slice(2);

const bd = new BlackDuckAPI(API_URL, API_TOKEN);

bd.getBearer().then((bearer) => {

    bd.getRoles(args[0], args[1]).then((roles) => {
        BlackDuckReports.rolesReport(roles);
    });
});

log('run()');
