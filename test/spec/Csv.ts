import {Csv} from '../../lib/Csv';
import test from 'ava';

test('Csv.toJson when number of columns is same with number of headers', t => {
  const input = `"a","b","c"
"1","2","3"`,
    expected = [
      {
        a: '1',
        b: '2',
        c: '3',
      },
    ];
  t.deepEqual(new Csv(input).toJson(), expected);
});

test('Csv.toJson when number of columns is more than number of headers, it ignore extra columns', t => {
  const input = `"a"
"1","extra"`,
    expected = [
      {
        a: '1',
      },
    ];
  t.deepEqual(new Csv(input).toJson(), expected);
});

test('Csv.toJson when number of columns is less than number of headers, it fills with null', t => {
  const input = `"a","b"
"1"`,
    expected = [
      {
        a: '1',
        b: null,
      },
    ];
  t.deepEqual(new Csv(input).toJson(), expected);
});

test('Csv.toJson when each property doesn\'t quoted by ", it returns directly', t => {
  const input = `"a","b",c,d
"1",2,"3",4`,
    expected = [
      {
        a: '1',
        b: '2',
        c: '3',
        d: '4',
      },
    ];
  t.deepEqual(new Csv(input).toJson(), expected);
});

test('Csv.toJson when some of the columns include " as value it doesn\'t trim "', t => {
  const input = `"a","b","c","d"
1,2",abc"abc,"abc`,
    expected = [
      {
        a: '1',
        b: '2"',
        c: 'abc"abc',
        d: '"abc',
      },
    ];
  t.deepEqual(new Csv(input).toJson(), expected);
});
