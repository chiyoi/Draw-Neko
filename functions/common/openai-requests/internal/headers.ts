import { EnvAPIKey } from './env'

export const AuthorizationAPIKey: (env: EnvAPIKey) => HeadersInit = env => ({
  Authorization: `Bearer ${env.OPENAI_API_KEY}`,
})

export const ContentJSON: HeadersInit = {
  'Content-Type': 'application/json',
}

export const standard = (env: EnvAPIKey) => ({
  ...ContentJSON,
  ...AuthorizationAPIKey(env),
})
