import debug from 'debug';
const log = debug('index.js');

log('loading...');

import got from 'got';

export class BlackDuckAPI {

	constructor(api, token)  {
		this._api    = api;
		this._token  = token;
		this._bearer = '';
	}

	async getBearer() {
		try {
			const result = await got.post(this._api + '/tokens/authenticate', {
				headers: {
					Authorization: 'token ' + this._token,
					Accept: 'application/vnd.blackducksoftware.user-4+json'
				},
				https: {
					rejectUnauthorized: false 
				}
			});

			const json = JSON.parse(result.body);

			log('bearer', json);
			this._bearer = json.bearerToken;

			return json;
		}
		catch(error) {
			log('error', error);
		}
	}
}

