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

    async getUsers(query, filter) {
        try {
            const result = await got.get(this._api + '/users?limit=9999&q=' + query + '&filter=' + filter, {
                headers: {
                    Authorization: 'Bearer ' + this._bearer,
                    Accept: 'application/vnd.blackducksoftware.user-4+json'
                },
                https: {
                    rejectUnauthorized: false
                }
            });

            const json = JSON.parse(result.body);
            log('users', json.totalCount);

            return json.items;
        }
        catch (error) {
            log('error', error);
        }
    }

    async getRoles(query, filter) {
        try {
            const result = await got.get(this._api + '/roles?limit=9999&q=' + query + '&filter=' + filter, {
                headers: {
                    Authorization: 'Bearer ' + this._bearer,
                    Accept: 'application/vnd.blackducksoftware.user-4+json'
                },
                https: {
                    rejectUnauthorized: false
                }
            });

            const json = JSON.parse(result.body);
            log('roles', json.totalCount);

            return json.items;
        }
        catch (error) {
            log('error', error);
        }
    }

    async getProjects(query, filter) {
        try {
            const result = await got.get(this._api + '/projects?limit=9999&q=' + query + '&filter=' + filter, {
                headers: {
                    Authorization: 'Bearer ' + this._bearer,
                    Accept: 'application/vnd.blackducksoftware.project-detail-4+json'
                },
                https: {
                    rejectUnauthorized: false
                }
            });

            const json = JSON.parse(result.body);
            if(json === undefined) {
                log('projects', 0);
                return [];
            } else {
                log('projects', json.totalCount);
                return json.items;
            }
        }
        catch (error) {
            log('error', error);
            return null;
        }
    }

    async getVersions(project_object, query, filter) {
        try {
            const result = await got.get(project_object._meta.href + '/versions?limit=9999&q=' + query + '&filter=' + filter, {
                headers: {
                    Authorization: 'Bearer ' + this._bearer,
                    Accept: 'application/vnd.blackducksoftware.project-detail-5+json'
                },
                https: {
                    rejectUnauthorized: false
                }
            });

            const json = JSON.parse(result.body);
            if(json === undefined) {
                log('versions', 0);
                return [];
            } else {
                log('versions', json.totalCount);
                return json.items;
            }
        }
        catch (error) {
            log('error', error);
        }
    }

    async getCustomFields(project_object, query, filter) {
        try {
            const result = await got.get(project_object._meta.href + '/custom-fields', {
                headers: {
                    Authorization: 'Bearer ' + this._bearer,
                    Accept: 'application/vnd.blackducksoftware.project-detail-5+json'
                },
                https: {
                    rejectUnauthorized: false
                }
            });

            const json = JSON.parse(result.body);
            if(json === undefined) {
                log('custom-fields', 0);
                return [];
            } else {
                log('custom-fields', json.totalCount);
                return json.items;
            }
        }
        catch (error) {
            log('error', error);
        }
    }

    async getComponents(version_object, query, filter) {
        try {
            const result = await got.get(version_object._meta.href + '/components?limit=9999&q=' + query + '&filter=' + filter, {
                headers: {
                    Authorization: 'Bearer ' + this._bearer,
                    Accept: 'application/vnd.blackducksoftware.bill-of-materials-6+json'
                },
                https: {
                    rejectUnauthorized: false
                }
            });

            const json = JSON.parse(result.body);
            if(json === undefined) {
                log('components', 0);
                return [];
            } else {
                log('components', json.totalCount);
                return json.items;
            }
        }
        catch (error) {
            log('error', error);
        }
    }

    async getBomComponents(version_object, query, filter) {
        try {
            const result = await got.get(version_object._meta.href + '/vulnerable-bom-components?limit=9999&q=' + query + '&filter=' + filter, {
                headers: {
                    Authorization: 'Bearer ' + this._bearer,
                    Accept: 'application/vnd.blackducksoftware.bill-of-materials-6+json'
                },
                https: {
                    rejectUnauthorized: false
                }
            });

            const json = JSON.parse(result.body);
            if(json === undefined) {
                log('bom', 0);
                return [];
            } else {
                log('bom', json.totalCount);
                return json.items;
            }
        }
        catch (error) {
            log('error', error);
        }
    }

    deleteProject(project_object) {
        this.deleteObject(project_object);
    }

    deleteVersion(version_object) {
        this.deleteObject(version_object);
    }

    deleteComponent(component_object) {
        this.deleteObject(component_object);
    }

    async deleteObject(object) {
        try {
            const result = await got.delete(object._meta.href, {
                headers: {
                    Authorization: 'Bearer ' + this._bearer,
                },
                https: {
                    rejectUnauthorized: false
                }
            });

            log('delete', 'ok');
            return true;
        }
        catch (error) {
            log('error', error);
            return false;
        }
    }

    async createProject(name) {
        try {
            const result = await got.post(this._api + '/projects', {
                json: {
                    name: '' + name,
                    description: 'Generated by https://www.npmjs.com/package/blackduck-api',
                    projectLevelAdjustments: true
                },
                headers: {
                    Authorization: 'Bearer ' + this._bearer,
                    Accept: 'application/vnd.blackducksoftware.project-detail-4+json'                    
                },
                https: {
                    rejectUnauthorized: false
                }
            });

            return true;
        }
        catch (error) {
            log('error', error);
            return false;
        }
    }

    async createVersion(project_object, name) {
        try {
            const result = await got.post(project_object._meta.href + '/versions', {
                json: {
                    versionName: '' + name,
                    phase: 'PLANNING',
                    distribution: 'INTERNAL'
                },
                headers: {
                    Authorization: 'Bearer ' + this._bearer,
                },
                https: {
                    rejectUnauthorized: false
                }
            });

            return true;
        }
        catch (error) {
            log('error', error);
            return false;
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

    static usersReport(users) {
        console.log(' =========================================================================================================================== ');
        console.log(
            '|', format('total:' + users.length, 9), 
            '|', format('USERNAME', 20), 
            '|', format('FIRSTNAME', 20), 
            '|', format('LASTNAME', 20), 
            '|', format('EMAIL', 40), 
            '|');
        console.log('|---------------------------------------------------------------------------------------------------------------------------|');

        users.forEach((user) => {
            this.userReport(user);
        });
        console.log(' =========================================================================================================================== ');
    }

    static userReport(user) {
        console.log(
            '|', format('user', 9), 
            '|', format(user.userName, 20), 
            '|', format(user.firstName, 20), 
            '|', format(user.lastName, 20), 
            '|', format(user.email, 40), 
            '|');
    }

    static rolesReport(roles) {
        console.log(' ===================================================================================================================== ');
        console.log(
            '|', format('total:' + roles.length, 9), 
            '|', format('NAME', 20), 
            '|', format('DESCRIPTION', 80), 
            '|');
        console.log('|---------------------------------------------------------------------------------------------------------------------|');
    
        roles.forEach((role) => {
            this.roleReport(role);
        });
        console.log(' ===================================================================================================================== ');
    }

    static roleReport(role) {
        console.log(
            '|', format('role', 9), 
            '|', format(role.name, 20), 
            '|', format(role.description, 80), 
            '|');
    }

    static projectsReport(projects) {
        console.log(' ======================================================================================================================= ');
        console.log(
            '|', format('total:' + projects.length, 9), 
            '|', format('NAME', 60), 
            '|', format('DATE', 24), 
            '|', format('USER', 15), 
            '|');
        console.log('|-----------------------------------------------------------------------------------------------------------------------|');

        projects.forEach((project) => {
            this.projectReport(project);
        });
        console.log(' ======================================================================================================================= ');
    }

    static projectReport(project) {
        console.log(
            '|', format('project', 9), 
            '|', format(project.name, 60), 
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
        console.log(' ======================================================================================================================== ');
        console.log(
            '|', format('total:' + components.length, 9), 
            '|', format('NAME', 40), 
            '|', format('VERSION', 20),
            '|', format('LICENSE', 40), 
            '|');
        console.log('|------------------------------------------------------------------------------------------------------------------------|');

        components.forEach((component) => {
            this.componentReport(component);
        });
	console.log(' ======================================================================================================================== ');
    }

    static componentReport(component) {
        component.licenses.forEach((license) => {
            console.log(
            '|', format('component', 9), 
            '|', format(component.componentName, 40), 
            '|', format(component.componentVersionName, 20), 
            '|', format(license.licenseDisplay, 40), 
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
