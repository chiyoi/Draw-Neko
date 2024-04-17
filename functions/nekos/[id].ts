import { error, json } from 'itty-router'

import { Env } from '../common/env'

export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  const { id } = params
  const { nekos } = env
  if (typeof id !== 'string') return error(400)
  const key = decodeURIComponent(id)
  const item = await nekos.get(key)
  if (item === null)
    return error(404)
  const headers = new Headers()
  item.writeHttpMetadata(headers)
  return new Response(item.body, { headers })
}

export const onRequestDelete: PagesFunction<Env> = async ({ env, params }) => {
  const { id } = params
  const { nekos } = env
  if (typeof id !== 'string') return error(400)
  const key = decodeURIComponent(id)
  await nekos.delete(key)
  return json({ deleted: key })
}
