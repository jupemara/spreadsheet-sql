import {OAuth2Client} from 'google-auth-library';
import {PrivateSpreadsheet} from './PrivateSpreadsheet';

let sheet, client;

describe('PrivateSpreadsheet.query with Google Cloud service account', () => {
  beforeAll(async () => {
    client = new OAuth2Client(
      process.env.GOOGLE_API_OAUTH2_CLIENT_ID,
      process.env.GOOGLE_API_OAUTH2_CLIENT_SECRET
    );
    client.setCredentials({
      refresh_token: process.env.GOOGLE_API_OAUTH2_REFRESH_TOKEN,
    });
    sheet = new PrivateSpreadsheet(
      process.env.TEST_SPREADSHEET_KEY || '',
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
      process.env.TEST_SPREADSHEET_KEY || '',
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
