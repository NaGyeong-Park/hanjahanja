export type Base64<imageType extends string = string> =
  `data:image/${imageType};base64${string}`;

export interface 초성Paths {
  VowelRight: string[];
  VowelDown: string[];
  VowelRightDown: string[];
  Vowelㅡ: string[];
  Vowelㅢ: string[];
}

/**
 * [종성 X, 종성 O]
 */
export type 중성Paths = [string, string];
