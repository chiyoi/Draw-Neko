import { error, json } from 'itty-router'

import { Environments } from '../common/env'

export const onRequestGet: PagesFunction<Environments> = async ({ env, params }) => {
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

export const onRequestDelete: PagesFunction<Environments> = async ({ env, params }) => {
  const { id } = params
  const { nekos } = env
  if (typeof id !== 'string') return error(400)
  const key = decodeURIComponent(id)
  await nekos.delete(key)
  return json({ deleted: key })
}
