import { Env } from './common/env'

export const onRequest: PagesFunction<Env> = async ({ env }) => {
  return new Response("Pong!")
}
