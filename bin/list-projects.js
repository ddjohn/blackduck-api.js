import debug from 'debug';
const log = debug('list-projects.js');

log('loading...');

import { BlackDuckAPI, BlackDuckReports } from '../index.js';
import { API_TOKEN, API_URL } from '../config.js';

var args = process.argv.slice(2);

const bd = new BlackDuckAPI(API_URL, API_TOKEN);

bd.getBearer().then((bearer) => {

    bd.getProjects(args[0], '').then((projects) => {
        BlackDuckReports.projectsReport(projects);
    });
});

log('run()');
