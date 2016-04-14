import * as _ from 'lodash';

export function csv2json(csv:string): Object[] {
  const headers = csv.split('\n')[0].split(',').map(header => {return _.trim(header, '"')});
  const lines = _.tail(csv.split('\n'));
  return lines.map(line => {
    let values = _.map(line.split(','), value => {return _.trim(value, '"')});
    values = values.map(value => {return value.length === 0 ? null : value;});
    return _.zipObject(headers, values);
  });
}