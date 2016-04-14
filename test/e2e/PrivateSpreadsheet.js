'use strict';

const test = require('ava');
const PrivateSpreadsheet = require('../../dist/index').PrivateSpreadsheet;

test.beforeEach(t => {
  t.context.spreadsheet = new PrivateSpreadsheet(
    process.env.TEST_SPREADSHEET_KEY,
    process.env.TEST_WORKSHEET_NAME,
    process.env.GOOGLE_API_OAUTH2_CLIENT_ID,
    process.env.GOOGLE_API_OAUTH2_CLIENT_SECRET,
    process.env.GOOGLE_API_OAUTH2_REDIRECT_URN,
    process.env.GOOGLE_API_OAUTH2_REFRESH_TOKEN
  );
});

test('PrivateSpreadsheet.query with query = "SELECT * WHERE A = "spreadsheet-sql-private001"", it returns one result object', async t => {
  const result = await t.context.spreadsheet.query('SELECT * WHERE A = "spreadsheet-sql-private001"');
  t.is(result.length, 1);
  t.is(result[0].name, 'spreadsheet-sql-private001');
  t.is(result[0].url, 'https://spreadsheet-sql-private001.example.com');
});

test('PrivateSpreadsheet.query with query = "SELECT * WHERE A = "spreadsheet-sql-private002" AND C = "spreadsheet-sql-private002@example.com"", it returns one result object', async t => {
  const result = await t.context.spreadsheet.query('SELECT * WHERE A = "spreadsheet-sql-private002" AND C = "spreadsheet-sql-private002@example.com"');
  t.is(result.length, 1);
  t.is(result[0].name, 'spreadsheet-sql-private002');
  t.is(result[0].url, 'https://spreadsheet-sql-private002.example.com');
});

test('PrivateSpreadsheet.query with query = "SELECT * WHERE A = "null-url-user"", it returns Array B(url) has no value(null)', async t => {
  const result = await t.context.spreadsheet.query('SELECT * WHERE A = "null-url-user"');
  t.is(result.length, 1);
  t.is(result[0].name, 'null-url-user');
  t.is(result[0].url, null);
});
