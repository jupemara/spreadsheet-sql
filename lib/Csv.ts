export class Csv {
  constructor(private readonly raw: string) {}
  public toJson(): {[k: string]: string | number}[] {
    const headers = this.headers();
    return this.lows().map(low => {
      const filled = this.fillWithNull(low, headers.length);
      let record = {};
      headers.forEach((header, idx) => {
        if (filled[idx] === '') {
          record[header] = null;
          return;
        }
        record[header] = filled[idx];
      });
      return record;
    });
  }
  private headers(): string[] {
    return this.raw.split('\n')[0].split(',').map(header => {
      return this.trimDoubleQuote(header);
    });
  }
  private lows(): string[][] {
    const [, ...lines] = this.raw.split('\n');
    if (!lines.length) {
      return [];
    }
    return lines.map(line => {
      const columns = line.split(',');
      return columns.map(column => this.trimDoubleQuote(column));
    });
  }
  private fillWithNull(array: string[], length: number): string[] {
    if (array.length >= length) {
      return array;
    }
    let filled = new Array(length).fill(null);
    array.forEach((v, idx) => filled[idx] = v);
    return filled;
  }
  private trimDoubleQuote(raw: string): string {
    let trimmed = raw;
    if (!raw.startsWith('"') || !raw.endsWith('"')) {
      return raw;
    }
    if (raw.startsWith('"')) {
      trimmed = trimmed.slice(1, raw.length);
    }
    if (raw.endsWith('"')) {
      trimmed = trimmed.slice(0, -1);
    }
    return trimmed;
  }
}