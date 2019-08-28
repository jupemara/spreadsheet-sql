import test from 'ava';
import {PublicSpreadsheet} from '../../lib/PublicSpreadsheet';

test.beforeEach(t => {
  t.context = {
    spreadsheet: new PublicSpreadsheet('14aayP76anHyRJyeVcTBJMTvqwyPeWZFFBpGffhko9HU', 'test')
  };
});

test('PublicSpreadsheet.query with query = "SELECT * WHERE A = "spreadsheet-sql-public001"", it returns one result', async t => {
  const result = await t.context['spreadsheet'].query('SELECT * WHERE A = "spreadsheet-sql-public001"');
  t.is(result.length, 1);
  t.is(result[0].name, 'spreadsheet-sql-public001');
  t.is(result[0].url, 'https://spreadsheet-sql-public001.example.com');
});

test('PublicSpreadsheet.query with query = "SELECT * WHERE A = "no-existence-user"", it returns empty Array', async t => {
  const result = await t.context['spreadsheet'].query('SELECT * WHERE A = "no-existence-user"');
  t.falsy(result.length);
});

test('PublicSpreadsheet.query with query = "SELECT * WHERE A = "null-url-user"", it returns Array B has no value(null)', async t => {
  const result = await t.context['spreadsheet'].query('SELECT * WHERE A = "null-url-user"');
  t.is(result.length, 1);
  t.is(result[0].name, 'null-url-user');
  t.is(result[0].url, null);
});
