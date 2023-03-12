/* eslint-disable prettier/prettier */
export function convertEmojiToAscii(emoji: string): string {
  const codePoint = emoji.codePointAt(0).toString(16);
  return `U+${codePoint.toUpperCase()}`;
}
