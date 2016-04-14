export interface SpreadsheetResponseWorksheet {
  id: {
    $t: string;
  },
  updated: {
    $t: string;
  },
  category: [{
    schema: string;
    term: string;
  }],
  title: {
    type: string;
    $t: string;
  },
  content: {
    type: string;
    $t: string;
  },
  link: [{
    rel: string;
    type: string;
    href: string;
  }];
  gs$colCount: {
    $t: string;
  },
  gs$rowCount: {
    $t: string
  }
}
