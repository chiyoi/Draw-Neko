import { error } from 'itty-router'
import { Env } from './common/env'

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { assets } = env
  const item = await assets.get('/Icons/draw-neko.png')
  if (item === null) return error(404)
  const headers = new Headers()
  item.writeHttpMetadata(headers)
  return new Response(item.body, { headers })
}
