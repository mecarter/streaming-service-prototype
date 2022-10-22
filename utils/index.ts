export const truncateText = (str: string, numChars: number): string => {
  const words = str.split(' ')
  let wordIndex = 0
  let charCount = 0
  const wordsInTruncatedText = []

  if (words.length === 0) return ''

  while (charCount < numChars) {
    if (!words[wordIndex] || words[wordIndex].length + charCount > numChars) break

    wordsInTruncatedText.push(words[wordIndex])
    charCount += words[wordIndex].length + 1 // account for spaces
    wordIndex++
  }

  return `${wordsInTruncatedText.join(' ')}${
    wordsInTruncatedText.length < words.length ? '...' : ''
  }`
}
