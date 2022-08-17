import {PublicSpreadsheet} from './PublicSpreadsheet';

let sheet;

describe('PublicSpreadsheet.query', () => {
  beforeAll(() => {
    sheet = new PublicSpreadsheet(
      '14aayP76anHyRJyeVcTBJMTvqwyPeWZFFBpGffhko9HU',
      'test'
    );
  });

  test('query = "SELECT * WHERE A = "spreadsheet-sql-public001"", it returns one result', async () => {
    const result = await sheet.query(
      'SELECT * WHERE A = "spreadsheet-sql-public001"'
    );
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('spreadsheet-sql-public001');
    expect(result[0].url).toBe('https://spreadsheet-sql-public001.example.com');
  });

  test('query = "SELECT * WHERE A = "no-existence-user"", it returns empty Array', async () => {
    const result = await sheet.query('SELECT * WHERE A = "no-existence-user"');
    expect(result.length).toBeFalsy();
  });

  test('query = "SELECT * WHERE A = "null-url-user"", it returns Array B has no value(null)', async () => {
    const result = await sheet.query('SELECT * WHERE A = "null-url-user"');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('null-url-user');
    expect(result[0].url).toBe(null);
  });
});
