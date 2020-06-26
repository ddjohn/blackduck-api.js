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
List projects - filter
> getProjects(filter)

Filter:
* empty - no filter
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
