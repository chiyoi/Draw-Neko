import { EnvAPIKey } from './env'

export const AuthorizationAPIKey: (env: EnvAPIKey) => HeadersInit = env => ({
  'Authorization': `Bearer ${env.STABILITY_API_KEY}`,
})

export const ContentJSON: HeadersInit = {
  'Content-Type': 'application/json',
}

export const AcceptPNG: HeadersInit = {
  'Accept': 'image/png',
}

export const standard = (env: EnvAPIKey) => ({
  ...ContentJSON,
  ...AcceptPNG,
  ...AuthorizationAPIKey(env),
})
