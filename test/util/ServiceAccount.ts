import * as fs from 'fs';

export async function setServiceAccountFromEnv(
  envKey: string = 'SPREADSHEET_SQL_SERVICE_ACCOUNT',
): Promise<void> {
  const contents = process.env[envKey];
  await fs.promises.writeFile('test/service-account.json', contents);
}
