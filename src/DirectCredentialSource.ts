import { CredentialProviderSource as CdkCredentialProviderSource, Mode } from 'aws-cdk/lib/api/plugin'
import * as aws from 'aws-sdk'
import { fromIni } from '@aws-sdk/credential-providers'
import { STSClient, GetCallerIdentityCommand } from '@aws-sdk/client-sts'

export class DirectCredentialProviderSource implements CdkCredentialProviderSource {
  name: string

  constructor () {
    this.name = 'cdk-direct-credentials-plugin'
  }

  public async isAvailable (): Promise<boolean> {
    return true
  }

  public async canProvideCredentials (accountId: string): Promise<boolean> {
    const client = new STSClient({ credentials: fromIni() })
    const callerIdentity = await client.send(new GetCallerIdentityCommand({}))
    return callerIdentity.Account === accountId
  }

  public async getProvider (accountId: string, mode: Mode): Promise<aws.Credentials> {
    const credentials = await fromIni()()
    return new aws.Credentials(
      credentials.accessKeyId,
      credentials.secretAccessKey,
      credentials.sessionToken
    )
  }
}
