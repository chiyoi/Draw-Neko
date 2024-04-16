export const moe = (s: string): ColoredCharacter[] => {
  const loop = (a: any[], i: number) => () => a[i++ % a.length]
  const color = loop(['pink', 'blue', 'yellow', 'green'], 1)
  return [...s].map(c => { return { char: c, color: color() } })
}

type ColoredCharacter = {
  char: string,
  color: 'pink' | 'blue' | 'yellow' | 'green',
}
