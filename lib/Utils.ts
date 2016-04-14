import * as _ from 'lodash';

export function csv2json(csv:string): Object[] {
  const headers = csv.split('\n')[0].split(',');
  const lines = _.tail(csv.split('\n'));
  return lines.map(line => {
    let values = line.split(',');
    values = values.map(value => {return value === '""' ? null : value;});
    return _.zipObject(headers, values);
  });
}