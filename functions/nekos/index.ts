import { json } from 'itty-router'

import { Environments } from '../common/env'

export const onRequestGet: PagesFunction<Environments> = async ({ env, params }) => {
  const { nekos } = env
  const list = (await nekos.list()).objects
    .map(x => x.key)
  return json(list)
}
