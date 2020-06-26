# bluckduck-api.js
Bluck Duck API for Node

## Authenticate to Black Duck Server

Create a authentication token in the Black Duck server.

> getBearer()

Example:

```
import { BlackDuckAPI } from 'blackduck-api';

const bd = new BlackDuckAPI("http://blackduck.company.com/api", "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef==");
bd.getBearer().then((bearer) => {
    log('Authenticated: ');
});
```
## Quering Projects
List projects
> getProjects(filter)

Filter:
* empty - no filter, list all
* name:project - search for a specific project 

Example:

```
...
bd.getBearer().then((bearer) => {

    bd.getProjects('').then((projects) => {
        console.log(projects);
    });
});
```

## Quering versions
List versions
> getVersions)

Filter:
* empty - no filter, list all
* versionName:version - search for a specific version 

Example:

```
    bd.getProjects('name:someproject').then((projects) => {

        bd.getVersions(projects[0], '').then((versions) =>  {
            console.log(versions);
        });
    });
});
```

## Report Helpers

Some simpler reports are available to get started.

Example:
```
import { BlackDuckAPI, BlackDuckReports } from 'blackduck-api.js';

const bd = new BlackDuckAPI(.., ...);

bd.getBearer().then((bearer) => {
    bd.getProjects('').then((projects) => {
        BlackDuckReports.projectReports(projects);
    });
});
```

Print projects:
> BlackDuckReports.projectReports(projects);

Print project:
> BlackDuckReports.projectReport(project);
