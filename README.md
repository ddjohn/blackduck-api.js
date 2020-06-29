# bluckduck-api.js
Bluck Duck API for Node

## Using this package

```
$ mkdir test && cd test
$ npm init
$ vim package.json
Add: "type":"module"
$ npm install -s blackduck-api
$ cat > test.js
import { BlackDuckAPI, BlackDuckReports } from 'blackduck-api';
const bd = new BlackDuckAPI('http://blackduck.company.com/api', 'your_api_token');
bd.getBearer().then((bearer) => {
	console.log(bearer);
});
CTRL+D
$ node test.js                                 -- or --
$ node --experimental-modules test.js          -- if you skipped the type:module step --

```

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
* empty filter: list all
* available filters: name,projectTier,projectOwner 

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
> getVersions(project_object, filter))

Filter:
* empty filter: list all
* available filters: versionName,nickname,phase  

Example:

```
    bd.getProjects('name:someproject').then((projects) => {

        bd.getVersions(projects[0], '').then((versions) =>  {
            console.log(versions);
        });
    });
});
```

## Quering components
List components
> getComponents(version_object, filter))

Filter:
* empty filter: list all
* available filters: componentName,versionName 

Example:

```
    bd.getProjects('name:someproject').then((projects) => {

        bd.getVersions(projects[0], 'versioName:someversion').then((versions) =>  {

            bd.getComponents(versions[0], '').then((components) => {
                console.log(compoenents)
            });
        });
    });
```

## Quering bill-of-materia
List BOM components
> getBomComponents(version_object, filter))

Filter:
* empty - no filter, list all
* componentName:component - search for a specific component 

Example:

```
    bd.getProjects('name:someproject').then((projects) => {

        bd.getVersions(projects[0], 'versioName:someversion').then((versions) =>  {

            bd.getBomComponents(versions[0], '').then((components) => {
                console.log(compoenents)
            });
        });
    });
```

## Quering Users
List users
> getUsers(filter)

Filter:
* empty - no filter, list all

Example:

```
...
bd.getBearer().then((bearer) => {

    bd.getUsers('').then((users) => {
        console.log(users);
    });
});
```

## Quering Roles
List roles
> getRoles(filter)

Filter:
* empty - no filter, list all

Example:

```
...
bd.getBearer().then((bearer) => {

    bd.getRoles('').then((roles) => {
        console.log(roles);
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
> BlackDuckReports.projectsReports(projects);
```
 =================================================================================================== 
| total:1   | NAME                                     | DATE                     | USER            |
|---------------------------------------------------------------------------------------------------|
| project   | project1                                 | 2020-06-25T14:58:26.967Z | user10          |
| project   | project2                                 | 2020-06-25T14:58:26.967Z | user10          |
| project   | project3                                 | 2020-06-25T14:58:26.967Z | user11          |
 =================================================================================================== 
```

Print versions:
> BlackDuckReports.versionsReports(versions);
```
 ============================================================================================ 
| total:1   | NAME            | DATE                     | USER            | PHASE           |
|--------------------------------------------------------------------------------------------|
| version   | default         | 2020-06-25T14:58:26.969Z | user10          | DEVELOPMENT     |
| version   | android         | 2020-06-25T14:58:26.969Z | user10          | DEVELOPMENT     |
| version   | windows         | 2020-06-25T14:58:26.969Z | user11          | DEVELOPMENT     |
| version   | default         | 2020-06-25T14:58:26.969Z | user12          | DEVELOPMENT     |
 ============================================================================================ 
```

Print components:
> BlackDuckReports.componentsReports(components);
```

```


Print bill-of-materias:
> BlackDuckReports.componentsBomReports(bomcomponents);

Print users:
> BlackDuckReports.usersReports(users);
```
 =========================================================================================================================== 
| total:9   | NAME                 | FIRSTNAME            | LASTNAME             | EMAIL                                    |
|---------------------------------------------------------------------------------------------------------------------------|
| users     | user10               | Peter                | Karlsson             | peter.karlsson@gmail.com                 |
| users     | user11               | Sten                 | Nilsson              | sten.nilsson@gmail.com                   |
| users     | user12               | Helge                | Pettersson           | helge.pettersson@gmail.com               |
| users     | user13               | Alexandra            | Svensson             | alexandra.svensson@gmail.com             |
 =========================================================================================================================== 
```

Print roles:
> BlackDuckReports.rolesBomReports(roles);
```
 ===================================================================================================================== 
| total:8   | NAME                 | DESCRIPTION                                                                      |
|---------------------------------------------------------------------------------------------------------------------|
| roles     | Component Manager    | This role can create, update and delete custom components.                       |
| roles     | Global Code Scanner  | This user can run code scans and map them to any project.                        |
| roles     | Global Project Vi... | This role has read only access to all projects.                                  |
| roles     | License Manager      | Ability to create/modify/delete licenses.                                        |
| roles     | Policy Manager       | Ability to create/modify/delete policies.                                        |
| roles     | Project Creator      | This role can create projects/versions and edit their settings.                  |
| roles     | Super User           | This role has access to all user and project data. This person can create/mod... |
| roles     | System Administrator | This role will have access to system settings like the registration key, jobs... |
 ===================================================================================================================== 
```
