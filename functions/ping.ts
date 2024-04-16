import { Environments } from './common/env'

export const onRequest: PagesFunction<Environments> = async ({ env }) => {
  return new Response("Pong!")
}
