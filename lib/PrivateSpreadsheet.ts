import { BaseSpreadsheet } from './BaseSpreadSheet';
import { AuthClient } from 'google-auth-library/build/src/auth/authclient';

export class PrivateSpreadsheet extends BaseSpreadsheet {
  constructor(
    spreadsheetKey: string,
    worksheetName: string,
    private readonly authCleint: AuthClient,
  ) {
    super(spreadsheetKey, worksheetName);
  }

  protected request(
    url: string,
    params: { [k: string]: string | number },
  ): Promise<{ data: any }> {
    return this.authCleint.request({ url, params });
  }
}
