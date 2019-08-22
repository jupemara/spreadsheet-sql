[![CircleCI](https://circleci.com/gh/jupemara/spreadsheet-sql.svg?style=svg)](https://circleci.com/gh/jupemara/spreadsheet-sql)

spreadsheet-sql
====

Get spreadsheet data by using like SQL.

Outline
----

This node module can extract user data from [google spreadsheet](https://docs.google.com/spreadsheets/u/0/).
And you can use SQL like syntax. e.g: `SELECT * WHERE A = "user1"`.
Of course, you can extract data from private spreadsheet.

Install
----

```bash
npm install spreadsheet-sql
```

Example
----

### Public Spreadsheet

```javascript
var PublicSpreadsheet = require('spreadsheet-sql').PublicSpreadsheet;

// first argument is SpreadsheetKey, second argument is worksheet name.
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

prepare: For private spreadsheet, you need to get google OAuth2 credentials.
Please see [google OAuth2](https://console.developers.google.com/apis/credentials) page for detail.
After authoring google OAuth2, you have 4 credential informations.

1. Client ID
2. Client Secret
3. Redirect URN
4. Refresh Token

This module use nodejs google sdk at backend as OAuth2 client.
So you need to give above 4 informations to constructor.
See following private spreadsheet sample.

```javascript
var PrivateSpreadsheet = require('spreadsheet-sql').PrivateSpreadsheet;

var spreadsheet = new PrivateSpreadsheet(
  'SPREADSHEET_KEY',
  'WORKSHEET_NAME',
  'CLIENT_ID',
  'CLIENT_SECRET',
  'REDIRECT_URN',
  'REFRESH_TOKEN'
);
return spreadsheet.query('SELECT * WHERE A = "user1"')
  .then(result => {
    console.log(result);
  });
```

Deciding Columns Like RDB
----

This module assumes first row as columns.
So we recommended to create following structure spreadsheet.

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
