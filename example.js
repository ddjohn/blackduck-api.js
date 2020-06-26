import debug from 'debug';
const log = debug('example.js');

log('loading...');

import { BlackDuckAPI, BlackDuckReports } from './index.js';
import { API_TOKEN, API_URL } from './config.js';

const bd = new BlackDuckAPI(API_URL, API_TOKEN);

bd.getBearer().then((bearer) => {

    bd.getProjects('name:AOSP_Binary_Scan').then((projects) => {
        BlackDuckReports.projectsReport(projects);

        bd.getVersions(projects[0], 'versioName:android_q').then((versions) =>  {
            BlackDuckReports.versionsReport(versions);

            bd.getComponents(versions[0], '').then((components) => {
                BlackDuckReports.componentsReport(components);

                components.forEach(component => {
                    //BlackDuckReports.componentsReport(component);
                });
            });
        });
    });
});

log('run()');