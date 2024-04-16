import { Ai } from '@cloudflare/ai'

export type Environments = {
  OPENAI_API_KEY: string,
  STABILITY_API_KEY: string,
  // AI: Ai,
  nekos: R2Bucket,
  test: R2Bucket,
}
