import debug from 'debug';
const log = debug('example.js');

log('loading...');

import { BlackDuckAPI, BlackDuckReports } from './index.js';
import { API_TOKEN, API_URL } from './config.js';

const bd = new BlackDuckAPI(API_URL, API_TOKEN);

bd.getBearer().then((bearer) => {

    bd.getProjects('name:AOSP_Binary_Scan').then((projects) => {
        BlackDuckReports.projectReport(projects[0]);

        bd.getVersions(projects[0], '').then((versions) =>  {
            BlackDuckReports.projectVersion(versions[0]);
        });
    });
});

log('run()');