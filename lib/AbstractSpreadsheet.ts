export abstract class AbstractSpreadSheet {
  protected spreadsheetKey: string;
  protected worksheetName: string;
  abstract query(query:string): Promise<Object>;
}
