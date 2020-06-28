import debug from 'debug';
const log = debug('index.js');

log('loading...');

import got from 'got';

export class BlackDuckAPI {

    constructor(api, token) {
        this._api = api;
        this._token = token;
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
        catch (error) {
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
        catch (error) {
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
        catch (error) {
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
        catch (error) {
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
        catch (error) {
            log('error', error);
        }
    }
}

function format(str, length) {
    if(str.length > length) {
        return str.substring(0, length-3) + '...';
    }
    else {
        return str.padEnd(length);
    }
}

export class BlackDuckReports {

    static projectsReport(projects) {
        console.log(' =================================================================================================== ');
        console.log(
            '|', format('total:' + projects.length, 9), 
            '|', format('NAME', 40), 
            '|', format('DATE', 24), 
            '|', format('USER', 15), 
            '|');
        console.log('|---------------------------------------------------------------------------------------------------|');

        projects.forEach((project) => {
            this.projectReport(project);
        });
        console.log(' =================================================================================================== ');
    }

    static projectReport(project) {
        console.log(
            '|', format('project', 9), 
            '|', format(project.name, 40), 
            '|', format(project.createdAt, 24), 
            '|', format(project.createdBy, 15), 
            '|');
    }

    static versionsReport(versions) {
        console.log(' ============================================================================================ ');
        console.log(
            '|', format('total:' + versions.length, 9), 
            '|', format('NAME', 15), 
            '|', format('DATE', 24), 
            '|', format('USER', 15), 
            '|', format('PHASE', 15), 
            '|');
        console.log('|--------------------------------------------------------------------------------------------|');

        versions.forEach((version) => {
            this.versionReport(version);
        });
        console.log(' ============================================================================================ ');
    }

    static versionReport(version) {
        console.log(
            '|', format('version', 9), 
            '|', format(version.versionName, 15), 
            '|', format(version.createdAt, 24), 
            '|', format(version.createdBy, 15), 
            '|', format(version.phase, 15), 
            '|');
    }

    static componentsReport(components) {
        console.log(' ========================================================================================================= ');
        console.log(
            '|', format('total:' + components.length, 9), 
            '|', format('NAME', 40), 
            '|', format('VERSION', 15),
            '|', format('LICENSE', 30), 
            '|');
        console.log('|---------------------------------------------------------------------------------------------------------|');

        components.forEach((component) => {
            this.componentReport(component);
        });
        console.log(' ========================================================================================================= ');
    }

    static componentReport(component) {
        component.licenses.forEach((license) => {
            console.log(
            '|', format('component', 9), 
            '|', format(component.componentName, 40), 
            '|', format(component.componentVersionName, 15), 
            '|', format(license.licenseDisplay, 30), 
            '|');
        });
    }

    static bomComponentsReport(components) {
        console.log(' ======================================================================================================================= ');
        console.log(
            '|', format('total:' + components.length, 9), 
            '|', format('NAME', 40), 
            '|', format('VERSION', 25), 
            '|', format('VULNERABILITY', 15), 
            '|', format('SCORE', 5), 
            '|', format('SEVERITY', 8),
            '|');
        
        console.log(' ----------------------------------------------------------------------------------------------------------------------- ');

        components.forEach((component) => {
            this.bomComponentReport(component);
        });
        console.log(' ======================================================================================================================= ');

    }

    static bomComponentReport(component) {
        console.log(
            '|', format('bom', 9), 
            '|', format(component.componentName, 40), 
            '|', format(component.componentVersionName, 25), 
            '|', format(component.vulnerabilityWithRemediation.vulnerabilityName, 15), 
            '|', format('' + component.vulnerabilityWithRemediation.overallScore, 5), 
            '|', format(component.vulnerabilityWithRemediation.severity, 8),
            '|');
    }
}