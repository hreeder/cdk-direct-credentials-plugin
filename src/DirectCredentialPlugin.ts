import { Plugin, PluginHost } from 'aws-cdk/lib/api/plugin'
import { DirectCredentialProviderSource } from './DirectCredentialSource'

export class DirectCredentialPlugin implements Plugin {
  public readonly version = '1'

  public init (host: PluginHost): void {
    host.registerCredentialProviderSource(new DirectCredentialProviderSource())
  }
}
