[![CircleCI](https://circleci.com/gh/jupemara/spreadsheet-sql.svg?style=svg)](https://circleci.com/gh/jupemara/spreadsheet-sql)

spreadsheet-sql
====

Getting Google spreadsheet data by using like SQL.

Outline
----

This node module can extract user data from [google spreadsheet](https://docs.google.com/spreadsheets/u/0/).
And you can use SQL like syntax. e.g: `SELECT * WHERE A = "user1"`.
Of course we support private spreadsheet data also.

Install
----

```bash
$ npm install spreadsheet-sql
```

Google Spreadsheet Query Language Specification
----

You can use the syntax like SQL according to [google spreadsheet query language specification](https://developers.google.com/chart/interactive/docs/querylanguage).

Breaking Changes at v1.x.x
----

In previous version we support only OAuth2.0 authentication. actual code is bellow

```javascript
// CAUTION: from 1.x.x this code does not work...
var PrivateSpreadsheet = require('spreadsheet-sql').PrivateSpreadsheet;
var spreadsheet = new PrivateSpreadsheet(
  'SPREADSHEET_KEY',
  'WORKSHEET_NAME',
  'CLIENT_ID',
  'CLIENT_SECRET',
  'REDIRECT_URN',
  'REFRESH_TOKEN',
);
return spreadsheet.query('SELECT * WHERE A = "user1"')
  .then(result => {
    console.log(result);
  });
```

from 1.x.x `PrivateSpreadsheet` receives google auth library authentication client instead of direct OAuth2 parameters.

```javascript
var PrivateSpreadsheet = require('spreadsheet-sql').PrivateSpreadsheet;
var Oauth2Client = require('google-auth-library').OAuth2Client;

var client = new OAuth2Client(
  'OAUTH2_CLIENT_ID',
  'OAUTH2_CLIENT_SECRET',
);
client.setCredentials({
  refresh_token: 'OAUTH2_REFRESH_TOKEN',
});
var spreadsheet = new PrivateSpreadsheet(
  'SPREADSHEET_KEY',
  'WORKSHEET_NAME',
  client,
);
return spreadsheet.query('SELECT * WHERE A = "user1"')
  .then(result => {
    console.log(result);
  });
```

Examples
----

### Public Spreadsheet

```javascript
var PublicSpreadsheet = require('spreadsheet-sql').PublicSpreadsheet;

// first argument is spreadsheet key, second argument is worksheet name.
// spreadsheet key is included spreadsheet URL.
// e.g: "https://docs.google.com/spreadsheets/d/SPREADSHEET_KEY"
var spreadsheet = new PublicSpreadsheet('SPREADSHEET_KEY', 'WORKSHEET_NAME');
return spreadsheet.query('SELECT * WHERE A = "user1"')
  .then(result => {
    console.log(result);
  });
```

Executing above snippet, you can get json format result.

```json
[{
  "column1": "user1",
  "column2": "John",
  "column3": "Smith"
}]
```

### Private Spreadsheet

For private spreadsheet access, you need to get google authentication.
You can use any google authentication method. GCP service account, OAuth2.0, Workload Identity Federation, etc. 
It means you can use `google-auth-library.AuthClient` as `PrivateSpreadsheet`'s argument.
(in previous our version we support only [OAuth2.0](https://developers.google.com/identity/protocols/OAuth2).)

```TypeScript
// use default credentials case
import { GoogleAuth } from 'google-auth-library';

(async () => {
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });
  const client = await auth.getClient();
  const sheets = new PrivateSpreadsheet(
    'SPREADSHEET_KEY',
    'WORKSHEET_NAME',
    client,
  );
  const data = await sheets.query('SELECT * WHERE A = "user1"');
  console.log(data);
})();
```

To understand how to use google authentication with nodejs library, please see [googleapis/google-auth-library-nodejs](https://github.com/googleapis/google-auth-library-nodejs#impersonated-credentials-client).

Defining Columns Like RDB
----

This module assumes the first row as headers.
You have to create a following structure on spreadsheet.

| username | last_name | first_name |
| ---- | ---- | ---- |
| user1 | John | Smith |
| user2 | John | Smith |

Test
----

We use [ava](https://github.com/sindresorhus/ava) test framework.

```bash
npm test
```

Build
----

We use [webpack](https://webpack.github.io) + [ts-loader](https://github.com/TypeStrong/ts-loader).

```bash
npm run build
```

License
----

WTFPL. haha!
