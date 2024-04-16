import { z } from 'zod'

import { EnvAPIKey } from './internal/env'
import { STABILITY_API_ENDPOINT } from '.'
import { standard } from './internal/headers'
import { StatusError } from 'itty-router'

export const textToImage = async (enginID: string, env: EnvAPIKey, params: TextToImageRequestParams) => {
  const endpoint = `${STABILITY_API_ENDPOINT}/generation/${enginID}/text-to-image`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: standard(env),
    body: JSON.stringify(params),
  })
  if (!response.ok)
    throw new StatusError(response.status, await response.text())
  return response.arrayBuffer()
}

const TextToImageRequestParams = z.object({
  height: z.number().int().min(128).multipleOf(64).optional(),
  width: z.number().int().min(128).multipleOf(64).optional(),
  text_prompts: z.object({
    text: z.string(),
    weight: z.number().optional(),
  }).array().min(1),
  cfg_scale: z.number().optional(),
  clip_guidance_preset: z.string().optional(),
  sampler: z.enum(['DDIM', 'DDPM', 'K_DPMPP_2M', 'K_DPMPP_2S_ANCESTRAL', 'K_DPM_2', 'K_DPM_2_ANCESTRAL', 'K_EULER', 'K_EULER_ANCESTRAL', 'K_HEUN', 'K_LMS']).optional(),
  samples: z.number().int().min(1).max(10).optional(),
  seed: z.number().int().min(0).max(4296967295).optional(),
  steps: z.number().int().min(10).max(50).optional(),
  style_preset: z.enum(['3d-model', 'analog-film', 'anime', 'cinematic', 'comic-book', 'digital-art', 'enhance', 'fantasy-art', 'isometric', 'line-art', 'low-poly', 'modeling-compound', 'neon-punk', 'origami', 'photographic', 'pixel-art', 'tile-texture']).optional(),
  extras: z.any().optional(),
})

type TextToImageRequestParams = z.infer<typeof TextToImageRequestParams>
