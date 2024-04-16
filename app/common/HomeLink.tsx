import React from 'react'
import Link from 'next/link'
import { Flex, Heading, IconButton, Text } from '@radix-ui/themes'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { styled } from '@stitches/react'

import { moe } from './moe'
import { FontHachiMaruPop } from './fonts'

export default ({ title, href }: Props) => (
  <Flex gap='3' align='center' style={{
    position: 'fixed',
    left: 5,
    top: 5,
  }}>
    <Link href={href} style={{ textDecoration: 'none' }}>
      <HomeLinkFlex m='auto' p='1' gap='3' justify='center' align='center' style={{
        borderRadius: 5,
      }}>
        <Heading>
          {moe(title).map((c, i) => (
            <Text key={i} size={c.char === '★' ? '1' : '6'} style={{
              ...FontHachiMaruPop,
              color: `var(--${c.color}-a8)`,
            }}>
              {c.char}
            </Text>
          ))}
        </Heading>
      </HomeLinkFlex>
    </Link>
    <Link href='https://github.com/chiyoi'>
      <IconButton radius='full' variant='soft'>
        <GitHubLogoIcon />
      </IconButton>
    </Link>
  </Flex>
)

const HomeLinkFlex = styled(Flex, {
  backgroundColor: 'var(--accent-a3)',
  '&:hover': {
    backgroundColor: 'var(--accent-a4)',
  },
  '&:active': {
    backgroundColor: 'var(--accent-a5)',
  },
})

type Props = {
  title: string,
  href: string,
}
