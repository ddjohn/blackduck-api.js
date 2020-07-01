import debug from 'debug';
const log = debug('list-components.js');

log('loading...');

import { BlackDuckAPI, BlackDuckReports } from '../index.js';
import { API_TOKEN, API_URL } from '../config.js';

var args = process.argv.slice(2);

const bd = new BlackDuckAPI(API_URL, API_TOKEN);

bd.getBearer().then((bearer) => {

    bd.getProjects(args[0], '').then((projects) => {

	if(projects.length != 0) {

            bd.getVersions(projects[0], args[1], '').then((versions) => {

	        if(versions.length != 0) {

                    bd.getComponents(versions[0], args[2], '').then((components) => {
                        BlackDuckReports.componentsReport(components);
                    });
	        }
            });
	}

    });
});

log('run()');
