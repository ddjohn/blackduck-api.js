import { API_TOKEN, API_URL } from './config.mjs';
import { BlackDuckAPI, BlackDuckReports } from './blackduck-api.mjs';

const bd = new BlackDuckAPI(API_URL, API_TOKEN);

bd.getBearer().then((bearer) => {
    console.log(bearer);

    bd.getProjects('', '').then((projects) => {
        console.log('projects: '  + projects.length);

        projects.forEach((project) => {
            console.log('project: '  + project.name);

            bd.getVersions(project, '', '').then((versions) => {
                console.log('versions: '  + versions.length);
        
                versions.forEach((version) => {
                    console.log('version: ' + version.versionName);

                    bd.getComponents(version, '', '').then((components) => {
                        console.log('components: ' + components.length);

                        components.forEach((component) => {
                            console.log('component: ' + component.componentName);

                            bd.getComments(component, '', '').then((comments) => {
                                console.log('comments: ' + comments.length);

                                comments.forEach((comment) => {
                                    console.log('comment: ' + comment.comment);
                                });
                            });
                        });
                    });
                });
            });
        });
    });    
});
