import OpenAI from 'openai'

import { OPENAI_API_ENDPOINT } from '.'
import { EnvAPIKey } from './internal/env'
import { standard } from './internal/headers'
import { StatusError } from 'itty-router'

export const createChatCompletion = async (env: EnvAPIKey, params: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming): Promise<OpenAI.Chat.Completions.ChatCompletion> => {
  const endpoint = `${OPENAI_API_ENDPOINT}/chat/completions`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: standard(env),
    body: JSON.stringify(params),
  })
  if (!response.ok)
    throw new StatusError(response.status, await response.text())
  return response.json()
}
