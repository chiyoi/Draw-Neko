import { styled } from '@stitches/react'

export default styled('body', {
  '@media (prefers-color-scheme: light)': {
    backgroundColor: '#FEF7FB',
  },
  '@media (prefers-color-scheme: dark)': {
    backgroundColor: '#21121D',
  },
})
