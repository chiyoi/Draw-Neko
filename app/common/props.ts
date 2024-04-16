import { ReactNode } from 'react'
import { z } from 'zod'

export type ChildrenProps = {
  children: ReactNode,
}

export const AppLinkProps = z.object({
  title: z.string(),
  description: z.string(),
  href: z.string(),
  avatar: z.object({
    src: z.string(),
    blurhash: z.string(),
  }),
})
export type AppLinkProps = z.infer<typeof AppLinkProps>
