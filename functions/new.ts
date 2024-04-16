import { z } from 'zod'
import { error, json } from 'itty-router'

import { Environments } from './common/env'
import { createChatCompletion } from './common/openai-requests'
import { textToImage } from './common/stability-requests'

const engineID = 'stable-diffusion-v1-6'

export const onRequestPost: PagesFunction<Environments> = async ({ request, env }) => {
  const { nekos } = env
  const { traits } = NekoNewRequest.parse(await request.json())
  const prompt = await revise(env, `A cute anime cat girl, here is her traits: ${traits}`)
  if (prompt === null) return error(500, 'Revise prompt failed.')
  const image = await textToImage(engineID, env, {
    text_prompts: [{ text: prompt }],
    width: 1024,
    height: 1024,
  })
  const key = `${new Date().toISOString()}.png`
  await nekos.put(key, image)
  return json({
    link: `/nekos/${encodeURIComponent(key)}`,
  })
}

const NekoNewRequest = z.object({
  traits: z.string(),
})

const revise = async (env: Environments, prompt: string) => {
  const response = await createChatCompletion(env, {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are an image generation assistant. You will be provided some prompt and you should revise it for image generation, featuring cute anime style. Notice you should only reply with the revised prompt.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  })
  return response.choices[0].message.content
}
