const {Csv} = require('./Csv');

test('Csv.toJson when number of columns is same with number of headers', () => {
  const input = `"a","b","c"
"1","2","3"`,
    expected = [
      {
        a: '1',
        b: '2',
        c: '3',
      },
    ];
  expect(new Csv(input).toJson()).toEqual(expected);
});

test('Csv.toJson when number of columns is more than number of headers, it ignores extra columns', () => {
  const input = `"a"
"1","extra"`,
    expected = [
      {
        a: '1',
      },
    ];
  expect(new Csv(input).toJson()).toEqual(expected);
});

test('Csv.toJson when number of columns is less than number of headers, it fills with null', () => {
  const input = `"a","b"
"1"`,
    expected = [
      {
        a: '1',
        b: null,
      },
    ];
  expect(new Csv(input).toJson()).toEqual(expected);
});

test(`Csv.toJson when each property doesn't quoted by ", it uses directly`, () => {
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
  expect(new Csv(input).toJson()).toEqual(expected);
});

test('Csv.toJson when some of the columns include " as value it doesn\'t trim "', () => {
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
  expect(new Csv(input).toJson()).toEqual(expected);
});
