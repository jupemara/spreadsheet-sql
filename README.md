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

const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});
const client = await auth.getClient();
const sheets = new PrivateSpreadsheet(
  'SPREADSHEET_KEY',
  'WORKSHEET_NAME',
  client,
)
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
