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
    
    async getProjects(query) {
		try {
			const result = await got.get(this._api + '/projects?limit=9999&q=' + query, {
				headers: {
					Authorization: 'Bearer ' + this._bearer,
					Accept: 'application/vnd.blackducksoftware.project-detail-4+json'
				},
				https: {
					rejectUnauthorized: false 
				}
			});

			const json = JSON.parse(result.body);
			log('projects', json.totalCount);

			return json.items;
		}
		catch(error) {
			log('error', error);
		}
    }

    async getVersions(project_object, query) {
        try {
            const result = await got.get(project_object._meta.href + '/versions?limit=9999&q=' + query, {
                headers: {
                    Authorization: 'Bearer ' + this._bearer,
                    Accept: 'application/vnd.blackducksoftware.project-detail-5+json'
                },
                https: {
                    rejectUnauthorized: false 
                }
            });

            const json = JSON.parse(result.body);
			log('versions', json.totalCount);

            return json.items;
        }
        catch(error) {
            log('error', error);
        }
    }
    
    async getComponents(version_object, query) {
        try {
            const result = await got.get(version_object._meta.href + '/components?limit=9999&q=' + query, {
                headers: {
                    Authorization: 'Bearer ' + this._bearer,
                    Accept: 'application/vnd.blackducksoftware.bill-of-materials-6+json'
                },
                https: {
                    rejectUnauthorized: false 
                }
            });

			const json = JSON.parse(result.body);
			log('components', json.totalCount);

			return json.items;
        }
        catch(error) {
            log('error', error);
        }
    }
    
    async getBomComponents(version_object, query) {
        try {
            const result = await got.get(version_object._meta.href + '/vulnerable-bom-components?limit=9999&q=' + query, {
                headers: {
                    Authorization: 'Bearer ' + this._bearer,
                    Accept: 'application/vnd.blackducksoftware.bill-of-materials-6+json'
                },
                https: {
                    rejectUnauthorized: false 
                }
            });

            const json = JSON.parse(result.body);
			log('bomcomponents', json.totalCount);
				
            return json.items;
        }
        catch(error) {
            log('error', error);
        }
	}
}

export class BlackDuckReports {
	
	static projectsReport(projects) {
		console.log('   project>', 'NAME'.padEnd(40), 'DATE'.padEnd(30), 'USER'.padEnd(10));
		projects.forEach((project) => {
			this.projectReport(project);
        });
        console.log('  project>', 'total:', projects.length);
	}

	static projectReport(project) {
		console.log('  project>', project.name.padEnd(40), project.createdAt.padEnd(30), project.createdBy.padEnd(10));
	}

	static versionsReport(versions) {
		console.log('  version>', 'NAME'.padEnd(40), 'DATE'.padEnd(30), 'USER'.padEnd(10), 'PHASE'.padEnd(10));
		versions.forEach((version) => {
			this.versionReport(version);
		});
        console.log('  version>', 'total:', versions.length);
	}

    static versionReport(version) {
        console.log('  version>', version.versionName.padEnd(40), version.createdAt.padEnd(30), version.createdBy.padEnd(10), version.phase.padEnd(10));
	}

	static componentsReport(components) {
        console.log('component>', 'NAME'.padEnd(30), 'VERSION'.padEnd(30));
		components.forEach((component) => {
			this.componentReport(component);
		});
       console.log('components>', 'total:', components.length);
	}

    static componentReport(component) {
        console.log('component>', component.componentName.padEnd(30), component.componentVersionName.padEnd(30));
//        console.log('component>', component.licenseRiskProfile.counts);
//       //        console.log('component>', component.operationalRiskProfile.counts);
    }

	static bomComponentsReport(components) {
        console.log('      bom>', 'NAME'.padEnd(30), 'VERSION'.padEnd(30));
		components.forEach((component) => {
			this.componentReport(component);
		});
       console.log('       bom>', 'total:', components.length);
	}

    static bomComponentReport(component) {
       // console.log(component);

        console.log('      bom>', component.componentName, component.componentVersionName, component.license.licenseDisplay, component.vulnerabilityWithRemediation.vulnerabilityName,component.vulnerabilityWithRemediation.overallScore,  component.vulnerabilityWithRemediation.severity);
        
       // console.log('      bom>', component.componentName.padEnd(30), component.componentVersionName.padEnd(30));
        //console.log('      bom>', component.licenseRiskProfile.counts);
        //console.log('      bom>', component.securityRiskProfile.counts);
        //console.log('      bom>', component.operationalRiskProfile.counts);
    }
}