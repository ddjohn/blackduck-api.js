import debug from 'debug';
const log = debug('example.js');

log('loading...');

import { BlackDuckAPI, BlackDuckReports } from './index.js';
import { API_TOKEN, API_URL } from './config.js';

const bd = new BlackDuckAPI(API_URL, API_TOKEN);

bd.getBearer().then((bearer) => {

    /*
     * Parent project
     */
    bd.getProjects('name:some_parent_project').then((projects) => {
        BlackDuckReports.projectsReport(projects);

        bd.getVersions(projects[0], 'versioName:some_version').then((versions) => {
            BlackDuckReports.versionsReport(versions);

            bd.getComponents(versions[0], '').then((components) => {
                BlackDuckReports.componentReport(components[0]);
            });
        });
    });

    /*
     * Child project
     */
    bd.getProjects('name:some_child_project').then((projects) => {
        BlackDuckReports.projectsReport(projects);

        bd.getVersions(projects[0], 'versioName:some_version').then((versions) => {
            BlackDuckReports.versionsReport(versions);

            bd.getComponents(versions[0], '').then((components) => {
                BlackDuckReports.componentReport(components[0]);
            });

            bd.getBomComponents(versions[0], '').then((components) => {
                BlackDuckReports.bomComponentReport(components[0]);
            });
        });
    });
});

log('run()');