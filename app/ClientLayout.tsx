'use client'
import { ThemeProvider } from 'next-themes'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Card, Container, Theme } from '@radix-ui/themes'

import { ToastProvider } from './common/toast'
import { ChildrenProps } from './common/props'
import Body from './common/Body'
import HomeLink from './common/HomeLink'

export const queryClient = new QueryClient()

export default ({ children }: ChildrenProps) => (
  <Body style={{ margin: 0 }}>
    <ThemeProvider attribute='class'>
      <Theme accentColor='pink' hasBackground={false}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <Container pt='9' px='5' size='1'>
              <Card>
                {children}
              </Card>
            </Container>
            <HomeLink title='neko03★moe' href='/' />
          </ToastProvider>
        </QueryClientProvider>
      </Theme>
    </ThemeProvider>
  </Body>
)
