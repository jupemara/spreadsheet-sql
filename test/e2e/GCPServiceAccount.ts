import test from 'ava';
import { GoogleAuth } from 'google-auth-library';
import { PrivateSpreadsheet } from '../../lib/PrivateSpreadsheet';
import { setServiceAccountFromEnv } from '../util/ServiceAccount';

test.beforeEach(async (t) => {
  await setServiceAccountFromEnv();
  const auth = new GoogleAuth({
    keyFile: 'test/service-account.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });
  const client = await auth.getClient();
  t.context = {
    client: client,
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
  const spreadsheet = new PrivateSpreadsheet(
    process.env.TEST_SPREADSHEET_KEY,
    'test002',
    t.context['client'],
  );
  const result = await spreadsheet.query(
    'SELECT * WHERE A = "spreadsheet-sql-private001"',
  );
  t.is(result.length, 1);
  t.deepEqual(['full_name', 'full_url', 'e_mail'], Object.keys(result[0]));
  t.is(result[0].full_name, 'spreadsheet-sql-private001');
  t.is(result[0].full_url, 'https://spreadsheet-sql-private001.example.com');
});
