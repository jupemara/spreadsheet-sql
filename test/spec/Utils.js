'use strict';

const test = require('ava');
const Utils = require('../../lib/Utils');

test('Utils.csv2json when number of column of headers and lines are same, it returns json', t => {
  const csv = `a,b,c
1,2,3`;
  const json = Utils.csv2json(csv);
  t.deepEqual(csv.split('\n')[0].split(','), Object.keys(json[0]));
});

test('Utils.csv2json when multiple lines', t => {
  const csv = `a,b,c
1,2,3`;
  const json = Utils.csv2json(csv);
  t.deepEqual(csv.split('\n')[0].split(','), Object.keys(json[0]));
});

test('Utils.csv2json when deficit values', t => {
  const csv = `a,b,c
1,"",2`;
  const json = Utils.csv2json(csv);
  t.is(json[0].b, null);
});
