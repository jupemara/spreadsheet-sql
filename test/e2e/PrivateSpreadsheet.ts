import test from 'ava';
import { GoogleAuth, OAuth2Client } from 'google-auth-library';
import { PrivateSpreadsheet } from '../../lib/PrivateSpreadsheet';

test.beforeEach(async (t) => {
  const client = new OAuth2Client(
    process.env.GOOGLE_API_OAUTH2_CLIENT_ID,
    process.env.GOOGLE_API_OAUTH2_CLIENT_SECRET,
    process.env.GOOGLE_API_OAUTH2_REDIRECT_URN,
  );
  client.setCredentials({
    refresh_token: process.env.GOOGLE_API_OAUTH2_REFRESH_TOKEN,
  });
  t.context = {
    spreadsheet: new PrivateSpreadsheet(
      process.env.TEST_SPREADSHEET_KEY,
      'test',
      client,
    ),
  };
});

test('PrivateSpreadsheet.query with query = "SELECT * WHERE A = "spreadsheet-sql-private001"", it returns one result object', async (t) => {
  const result = await t.context['spreadsheet'].query(
    'SELECT * WHERE A = "spreadsheet-sql-private001"',
  );
  t.is(result.length, 1);
  t.is(result[0].name, 'spreadsheet-sql-private001');
  t.is(result[0].url, 'https://spreadsheet-sql-private001.example.com');
});

test('PrivateSpreadsheet.query with query = "SELECT * WHERE A = "spreadsheet-sql-private002" AND C = "spreadsheet-sql-private002@example.com"", it returns one result object', async (t) => {
  const result = await t.context['spreadsheet'].query(
    'SELECT * WHERE A = "spreadsheet-sql-private002" AND C = "spreadsheet-sql-private002@example.com"',
  );
  t.is(result.length, 1);
  t.is(result[0].name, 'spreadsheet-sql-private002');
  t.is(result[0].url, 'https://spreadsheet-sql-private002.example.com');
});

test('PrivateSpreadsheet.query with query = "SELECT * WHERE A = "null-url-user"", it returns Array B(url) has no value(null)', async (t) => {
  const result = await t.context['spreadsheet'].query(
    'SELECT * WHERE A = "null-url-user"',
  );
  t.is(result.length, 1);
  t.is(result[0].name, 'null-url-user');
  t.is(result[0].url, null);
});

test('PrivateSpreadsheet.query when using second worksheet with query = "SELECT * WHERE A = spreadsheet-sql-private001", it returns one result object', async (t) => {
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly',
  });
  const client = await auth.getClient();
  const spreadsheet = new PrivateSpreadsheet(
    process.env.TEST_SPREADSHEET_KEY,
    'test002',
    client,
  );
  const result = await spreadsheet.query(
    'SELECT * WHERE A = "spreadsheet-sql-private001"',
  );
  t.is(result.length, 1);
  t.deepEqual(['full_name', 'full_url', 'e_mail'], Object.keys(result[0]));
  t.is(result[0].full_name, 'spreadsheet-sql-private001');
  t.is(result[0].full_url, 'https://spreadsheet-sql-private001.example.com');
});
