import { json } from 'itty-router'

import { Env } from '../common/env'

export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  const { nekos } = env
  const list = (await nekos.list()).objects
    .map(x => x.key)
  return json(list)
}
