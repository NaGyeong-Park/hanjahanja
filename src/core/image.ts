import { Base64, 중성Paths, 초성Paths } from "./types";
import Potrace from "potrace";
import { 중성Type } from "./constants";

export const convertImageToSvgString = (base64: Base64): Promise<string> => {
  return new Promise((resolve, reject) => {
    const trace = new Potrace.Potrace();
    trace.loadImage(base64, (err) => {
      if (err) {
        console.error(err);
        return reject("SVG 변환 중 오류가 발생했습니다.");
      }

      resolve(
        // NOTE: types 패키지 타입 정의가 잘못되어있음
        trace.getPathTag(
          undefined as unknown as string,
          undefined as unknown as number,
        ),
      );
    });
  });
};

const parseSvgPathString = (svgString: string) => {
  return svgString.match(/<path[^>]*d="([^"]+)"/)?.[1] ?? null;
};

const blobToBase64 = (blob: Blob): Promise<Base64> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as Base64);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

export const sliceImage = async ({
  image,
  rows,
  cols,
}: {
  image: ImageBitmap;
  rows: number;
  cols: number;
}) => {
  const sliceWidth = image.width / cols;
  const sliceHeight = image.height / rows;
  const canvas = new OffscreenCanvas(sliceWidth, sliceHeight);
  const ctx = canvas.getContext("2d");
  const slices: Base64[][] = new Array(rows)
    .fill(0)
    .map(() => new Array(cols).fill(""));

  if (!ctx) {
    throw new Error("Unexpected Error: invalid ctx");
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ctx.clearRect(0, 0, sliceWidth, sliceHeight);
      ctx.drawImage(
        image,
        x * sliceWidth,
        y * sliceHeight,
        sliceWidth,
        sliceHeight,
        0,
        0,
        sliceWidth,
        sliceHeight,
      );
      const blob = await canvas.convertToBlob();
      const base64 = (await blobToBase64(blob)) as Base64;
      slices[y][x] = base64;
    }
  }

  return { images: slices, width: sliceWidth, height: sliceHeight };
};

const generate초성PathType = (
  rowGlyphStrs: (string | null)[],
  rowImages: (string | null)[],
) => {
  if (rowGlyphStrs[0] === null) {
    return {};
  }

  return {
    [rowGlyphStrs[0]]: {
      [중성Type.VowelRight]: [rowImages[0], rowImages[1]],
      [중성Type.VowelDown]: [rowImages[2], rowImages[3]],
      [중성Type.VowelRightDown]: [rowImages[4], rowImages[7]],
      [중성Type.Vowelㅡ]: [rowImages[5], rowImages[3]],
      [중성Type.Vowelㅢ]: [rowImages[6], rowImages[7]],
    },
  };
};

const generate중성PathType = (
  rowGlyphStrs: (string | null)[],
  rowImages: (string | null)[],
) => {
  const result: Record<string, 중성Paths> = {};
  rowGlyphStrs.forEach((str, index) => {
    if (index % 2 === 1 || str === null) return;
    result[str] = [rowImages[index]!, rowImages[index + 1]!];
  });
  return result;
};

const generateDefaultPathType = (
  rowGlyphStrs: (string | null)[],
  rowImages: (string | null)[],
) => {
  const result: Record<string, string> = {};
  rowGlyphStrs.forEach((str, index) => {
    if (str === null) return;
    result[str] = rowImages[index]!;
  });
  return result;
};
type PathType<T extends "초성" | "중성" | "DEFAULT"> = T extends "초성"
  ? 초성Paths
  : T extends "중성"
    ? 중성Paths
    : string;

/**
 * 초성 템플릿: 한 행은 모두 같은 초성, 중성, 종성에 따라 모양이 다름
 *
 * 중성 템플릿: 한 행의 2개는 같은 중성, 종성에 따라 모양이 다름
 */
export const getPathStrings = async <T extends "초성" | "중성" | "DEFAULT">({
  templateImage,
  templateGlyphGrid,
  glyphType,
}: {
  templateImage: ImageBitmap;
  templateGlyphGrid: (string | null)[][];
  glyphType: T;
}): Promise<{
  paths: Record<string, PathType<T>>;
  width: number;
  height: number;
}> => {
  const rows = templateGlyphGrid.length;
  const cols = templateGlyphGrid[0].length;
  const {
    images: sliceImages,
    width,
    height,
  } = await sliceImage({
    image: templateImage,
    rows,
    cols,
  });

  const generateFn =
    glyphType === "초성"
      ? generate초성PathType
      : glyphType === "중성"
        ? generate중성PathType
        : generateDefaultPathType;

  let paths = {};
  for (let index = 0; index < templateGlyphGrid.length; index++) {
    const rowGlyphs = templateGlyphGrid[index];
    const svgStrs = await Promise.all(
      sliceImages[index].map((image) => convertImageToSvgString(image)),
    );
    const pathStrs = await Promise.all(svgStrs.map(parseSvgPathString));
    paths = { ...paths, ...generateFn(rowGlyphs, pathStrs) };
  }

  return { paths, width, height };
};
