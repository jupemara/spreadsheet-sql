import {GoogleAuth} from 'google-auth-library';
import {PrivateSpreadsheet} from './PrivateSpreadsheet';
import fs from 'fs';

let sheet, client;

describe('PrivateSpreadsheet.query with Google Cloud service account', () => {
  beforeAll(async () => {
    const key = '__key.json';
    await fs.promises.writeFile(
      key,
      process.env['SPREADSHEET_SQL_SERVICE_ACCOUNT'] ?? ''
    );
    const auth = new GoogleAuth({
      keyFile: key,
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });
    client = await auth.getClient();
    sheet = new PrivateSpreadsheet(
      process.env.TEST_SPREADSHEET_KEY ?? '',
      'test',
      client
    );
  });
  test('with query = "SELECT * WHERE A = "spreadsheet-sql-private001"", it returns one result object', async () => {
    const result = await sheet.query(
      'SELECT * WHERE A = "spreadsheet-sql-private001"'
    );
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('spreadsheet-sql-private001');
    expect(result[0].url).toBe(
      'https://spreadsheet-sql-private001.example.com'
    );
  });

  test('with query = "SELECT * WHERE A = "spreadsheet-sql-private002" AND C = "spreadsheet-sql-private002@example.com"", it returns one result object', async () => {
    const result = await sheet.query(
      'SELECT * WHERE A = "spreadsheet-sql-private002" AND C = "spreadsheet-sql-private002@example.com"'
    );
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('spreadsheet-sql-private002');
    expect(result[0].url).toBe(
      'https://spreadsheet-sql-private002.example.com'
    );
  });

  test('with query = "SELECT * WHERE A = "null-url-user"", it returns Array B(url) has no value(null)', async () => {
    const result = await sheet.query('SELECT * WHERE A = "null-url-user"');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('null-url-user');
    expect(result[0].url).toBe(null);
  });

  test('when using second worksheet with query = "SELECT * WHERE A = spreadsheet-sql-private001", it returns one result object', async () => {
    const result = await new PrivateSpreadsheet(
      process.env.TEST_SPREADSHEET_KEY ?? '',
      'test002',
      client
    ).query('SELECT * WHERE A = "spreadsheet-sql-private001"');
    expect(result.length).toBe(1);
    expect(Object.keys(result[0])).toEqual(['full_name', 'full_url', 'e_mail']);
    expect(result[0].full_name).toBe('spreadsheet-sql-private001');
    expect(result[0].full_url).toBe(
      'https://spreadsheet-sql-private001.example.com'
    );
  });
});
