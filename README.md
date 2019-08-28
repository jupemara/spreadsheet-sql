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

For private spreadsheet you need to get google OAuth 2.0 credentials before using this module.
Please see [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/OAuth2) page for details. In almost cases you can generate new credentials in [API console](https://console.developers.google.com/apis/credentials).
After generating new OAuth 2.0 credential you usually have 3 credential values.

1. Client ID
2. Client Secret
3. Redirect URN

And also you can get manually Oauth 2.0 refresh token optionally.
You need to give above 3 values to the constructor of `PrivateSpreadSheet`. From v0.3.0 refresh token became to be optional.

```javascript
var PrivateSpreadsheet = require('spreadsheet-sql').PrivateSpreadsheet;

var spreadsheet = new PrivateSpreadsheet(
  'SPREADSHEET_KEY',
  'WORKSHEET_NAME',
  'CLIENT_ID',
  'CLIENT_SECRET',
  'REDIRECT_URN',
  'REFRESH_TOKEN' // refresh token is optional
);
return spreadsheet.query('SELECT * WHERE A = "user1"')
  .then(result => {
    console.log(result);
  });
```

#### About Handling Expiry of Access Token and Refresh Token

As we mentioned refresh token is optional from v0.3.0.
Because `googleapis/google-auth-library-nodejs` module can handle access token expiry.

So when you prefer use this module for getting spreadsheet data just only once, we recommend you to use without refresh token. Though when you need to get spreadsheet data repeatedly, you should use this module with refresh token.

It means `googleapis/google-auth-library-nodejs` tries to refresh access token when the access token is over expiry. If you would like to understand in code level, please check [here](https://github.com/googleapis/google-auth-library-nodejs/blob/87fee68c607337c5cc7e4a34a8b34daca88d3aab/src/auth/oauth2client.ts#L741).

Declaring Columns Like RDB
----

This module assumes first row as headers.
So you have to create following structure on spreadsheet.

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
