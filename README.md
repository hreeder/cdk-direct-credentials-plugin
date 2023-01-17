# CDK Direct Credentials Plugin

This plugin serves as a way to skip CDK's credential resolution step in favour of using whatever the JavaScript SDK picks up as your environment's default. This way, it hooks in to defining your AWS profile in the standard manners, using `AWS_PROFILE` / `AWS_DEFAULT_PROFILE` etc.

## Installation
Install with `npm install cdk-direct-credentials-plugin`.

Once installed, open your project's `cdk.json` and add the plugin at the root level:
```json
"plugin": [
  "cdk-direct-credentials-plugin"
],
```

## Usage
Once added to `cdk.json`, ensure your AWS credentials are current in your usual manner.

The plugin exposes your current AWS profile's credentials to CDK. It performs a check to STS using the GetCallerIdentity call to determine if it can provide credentials for the requested account id. If the current session is not in the requested account, it won't proceed.
