import debug from 'debug';
const log = debug('create-version.js');

log('loading...');

import { BlackDuckAPI, BlackDuckReports } from '../index.js';
import { API_TOKEN, API_URL } from '../config.js';

var args = process.argv.slice(2);

const bd = new BlackDuckAPI(API_URL, API_TOKEN);

bd.getBearer().then((bearer) => {

	if (args[0] != '') {

		bd.getProjects('name:' + args[0], '').then((projects) => {

			if (projects.length != 0) {

                                bd.createVersion(projects[0], args[1]);
			}
		});
	}
});

log('run()');
