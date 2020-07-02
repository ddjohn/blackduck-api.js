import debug from 'debug';
const log = debug('report-project-managers.js');

log('loading...');

import { BlackDuckAPI, BlackDuckReports } from './index.js';
import { API_TOKEN, API_URL } from './config.js';

const bd = new BlackDuckAPI(API_URL, API_TOKEN);

bd.getBearer().then((bearer) => {
    console.log('Subject: Project manager report');
    console.log('Content-type: text/html');
    console.log('');

    bd.getProjects('').then((projects) => {

        projects.forEach((project) => {

            bd.getVersions(project, '').then((versions) => {

                bd.getComponents(versions[0], '', 'policyRuleSeverity:blocker').then((components) => {
                    if (components.length == 0) { }
                    else {
                        console.log('<h1>', project.name, '(', versions[0].versionName, ')</h1>');
                        console.log('<pre>');
                        BlackDuckReports.componentsReport(components);
                        console.log('</pre>');
                    }
                });
            });
        });
    });
});

log('run()');
