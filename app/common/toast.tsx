import { createContext, useCallback, useContext, useState } from 'react'
import { styled, keyframes } from '@stitches/react'
import { Flex, IconButton } from '@radix-ui/themes'
import { Cross2Icon } from '@radix-ui/react-icons'
import * as Toast from '@radix-ui/react-toast'

import { FontNotoSansMono } from './fonts'
import { useMounted } from './hooks'
import { ChildrenProps } from './props'

const VIEWPORT_MARGIN = 30

const ToastContext = createContext((content: string) => { })
export const useToast = () => useContext(ToastContext)
export const ToastProvider = ({ children }: ChildrenProps) => {
  const [content, setContent] = useState('')
  const [open, setOpen] = useState(false)
  const toast = useCallback((title: string) => {
    setContent(title)
    setOpen(true)
  }, [])
  return useMounted() && (
    <ToastContext.Provider value={toast}>
      {children}
      <Toast.Provider swipeDirection='right' duration={2000}>
        <ToastRoot open={open} onOpenChange={setOpen} style={{
          backgroundColor: 'var(--accent-3)',
          borderColor: 'var(--accent-5)',
          borderStyle: 'solid',
          borderWidth: 1,
          borderRadius: 1000,
          listStyleType: 'none',
        }}>
          <Flex align='center' style={{
            marginLeft: 30,
            marginRight: 10,
            marginTop: 5,
            marginBlock: 5,
          }}>
            <Toast.Title style={{ ...FontNotoSansMono }}>{content}</Toast.Title>
            <Toast.Close asChild style={{
              gridArea: 'action',
            }}>
              <IconButton ml='3' variant='soft' radius='full'>
                <Cross2Icon />
              </IconButton>
            </Toast.Close>
          </Flex>
        </ToastRoot>
        <Toast.Viewport style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          margin: VIEWPORT_MARGIN,
          display: 'flex',
        }} />
      </Toast.Provider>
    </ToastContext.Provider>
  )
}

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_MARGIN}px))` },
  to: { transform: 'translateX(0)' },
})

const slideOut = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_MARGIN}px))` },
})

const swipeOut = keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_MARGIN}px))` },
})

const ToastRoot = styled(Toast.Root, {
  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideOut} 150ms ease-out`,
  },
  '&[data-swipe="move"]': {
    transform: 'translateX(var(--radix-toast-swipe-move-x))',
  },
  '&[data-swipe="cancel"]': {
    transform: 'translateX(0)',
    transition: 'transform 200ms ease-out',
  },
  '&[data-swipe="end"]': {
    animation: `${swipeOut} 100ms ease-out`,
  },
})
