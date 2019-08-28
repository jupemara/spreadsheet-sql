import {BaseSpreadsheet} from './BaseSpreadSheet';
import {OAuth2Client} from 'google-auth-library';

export class PrivateSpreadsheet extends BaseSpreadsheet {

  private readonly oauthClient: OAuth2Client;

  constructor(
    spreadsheetKey: string,
    worksheetName: string,
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly redirectUrn: string,
    private readonly refreshToken?: string
  ) {
    super(spreadsheetKey, worksheetName);
    const oauthClient = new OAuth2Client(this.clientId, this.clientSecret, this.redirectUrn);
    if (!!this.refreshToken) {
      oauthClient.setCredentials({
        refresh_token: this.refreshToken
      });
    }
    this.oauthClient = oauthClient;
  }

  protected request(
    url: string,
    params: {[k: string]: string | number}
  ): Promise<{data: any}> {
    return this.oauthClient.request({url, params});
  }
}
