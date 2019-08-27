import * as lodash from 'lodash';

export function csv2json(csv:string): {[k: string]: string | number}[] {
  const headers = csv.split('\n')[0].split(',').map(header => {return lodash.trim(header, '"')});
  const lines = lodash.tail(csv.split('\n'));
  return lines.map(line => {
    let values = lodash.map(line.split(','), value => {return lodash.trim(value, '"')});
    values = values.map(value => {return value.length === 0 ? null : value;});
    return lodash.zipObject(headers, values);
  });
}
