'use client'
import { AspectRatio, Avatar, Box, Button, Flex, Heading, Separator, Text, TextArea } from '@radix-ui/themes'

import { FontHachiMaruPop, FontNotoSansMono } from './common/fonts'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { ResponseError } from './common/errors'
import { z } from 'zod'

export default () => {
  const [traits, setTraits] = useState('')
  const [image, setImage] = useState<string>()
  const { mutate, error, isIdle, isError, isSuccess } = useMutation({
    mutationFn: async () => {
      const response = await fetch('/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ traits })
      })
      if (!response.ok) throw ResponseError(response.status)
      const { link } = NekoNewResponse.parse(await response.json())
      setImage(link)
    }
  })

  if (isError) return (
    <>
      <Text as='div'>Something bad happened, refresh the page might help.</Text>
      <Text mt='3' as='div'>Error message: {error.message}</Text>
    </>
  )
  return (
    <>
      <Heading style={FontNotoSansMono}>Draw Neko</Heading>
      <Text mt='3' as='div' size='1' color='gray'>
        How do you want your cat girl be like?
      </Text>
      <TextArea mt='3' placeholder='She has long hair...' value={traits} onChange={e => (
        setTraits(e.target.value)
      )} style={FontNotoSansMono} />
      <Flex mt='3' align='center' justify='end'>
        <Button variant='soft' disabled={!isIdle && !isSuccess} onClick={() => mutate()} style={FontNotoSansMono}>
          Draw!
        </Button>
      </Flex>
      <Separator mt='3' size='4' />
      {image !== undefined && (
        <Box mt='3' style={{ height: '100%', width: '100%' }}>
          <AspectRatio ratio={1 / 1}>
            <Avatar src={image} fallback={
              <Text color='pink' style={FontHachiMaruPop}>
                猫さん逃げた。
              </Text>
            } style={{
              width: '100%',
              height: '100%',
            }} />
          </AspectRatio>
        </Box>
      )}
      {!isIdle && !isSuccess && (
        <Text mt='3' as='div' color='pink' style={FontHachiMaruPop}>Drawing...</Text>
      )}
    </>
  )
}

const NekoNewResponse = z.object({
  link: z.string(),
})
