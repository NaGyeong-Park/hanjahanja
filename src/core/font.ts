import { SVGPathData } from "svg-pathdata";
import opentype from "opentype.js";
import {
  초성_LIST,
  중성_LIST,
  종성_LIST,
  중성ItemType,
  COMPATIBILITY_자모_LIST,
} from "./constants";
import { 중성Paths, 초성Paths } from "./types";

export const mergeSVGPathDefinitions = (paths: string[]) => {
  return paths.join(" ");
};

const getSvgPathBoxSizes = (d: string) => {
  const commands = new SVGPathData(d).toAbs().commands;

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  commands.forEach((cmd) => {
    const points = [];

    if ("x" in cmd && "y" in cmd) points.push([cmd.x, cmd.y]);
    if ("x1" in cmd && "y1" in cmd) points.push([cmd.x1, cmd.y1]);
    if ("x2" in cmd && "y2" in cmd) points.push([cmd.x2, cmd.y2]);

    points.forEach(([x, y]) => {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });
  });

  const boxWidth = maxX - minX;
  const boxHeight = maxY - minY;

  return { boxWidth, boxHeight, minX, minY, maxY, maxX };
};

export const svgPathToOpentypePath = ({
  d,
  fontHeight,
  paddingRatio,
  advanceWidth,
  baselineOffset = 0,
}: {
  d: string;
  fontHeight: number;
  paddingRatio: { x: number; y: number };
  advanceWidth?: number;
  baselineOffset?: number;
}) => {
  const path = new opentype.Path();
  const commands = new SVGPathData(d).toAbs().commands;
  const { boxHeight, boxWidth, minX, minY } = getSvgPathBoxSizes(d);

  const paddingY = fontHeight * paddingRatio.y;
  const paddingX = advanceWidth ? advanceWidth * paddingRatio.x : 0;

  const innerHeight = fontHeight - paddingY * 2;
  const innerWidth = advanceWidth ? advanceWidth - paddingX * 2 : Infinity;

  const scaleByHeight = innerHeight / boxHeight;
  const scaleByWidth = advanceWidth ? innerWidth / boxWidth : Infinity;
  const scale = Math.min(scaleByHeight, scaleByWidth);

  const scaledWidth = boxWidth * scale;
  const scaledHeight = boxHeight * scale;

  const effectiveAdvanceWidth =
    advanceWidth || scaledWidth + scaledWidth * paddingRatio.x * 2;
  const offsetX = (effectiveAdvanceWidth - scaledWidth) / 2;
  const offsetY = (fontHeight - scaledHeight) / 2 + baselineOffset;

  const transformX = (x: number) => (x - minX) * scale + offsetX;
  const transformY = (y: number) => fontHeight - ((y - minY) * scale + offsetY);

  commands.forEach((cmd) => {
    switch (cmd.type) {
      case SVGPathData.MOVE_TO:
        path.moveTo(transformX(cmd.x), transformY(cmd.y));
        break;
      case SVGPathData.LINE_TO:
        path.lineTo(transformX(cmd.x), transformY(cmd.y));
        break;
      case SVGPathData.CURVE_TO:
        path.curveTo(
          transformX(cmd.x1),
          transformY(cmd.y1),
          transformX(cmd.x2),
          transformY(cmd.y2),
          transformX(cmd.x),
          transformY(cmd.y),
        );
        break;
      case SVGPathData.QUAD_TO:
        path.quadTo(
          transformX(cmd.x1),
          transformY(cmd.y1),
          transformX(cmd.x),
          transformY(cmd.y),
        );
        break;
      case SVGPathData.CLOSE_PATH:
        path.close();
        break;
    }
  });

  return {
    path,
    width: effectiveAdvanceWidth,
  };
};

/** 초성PathStrings: { 초성: { 모음 위치: [종성이 없는 초성 SvgString, 종성이 있는 초성 SvgString]} }  */
export const generateHangulGlyphs = ({
  advanceWidth,
  fontHeight,
  초성PathStrings,
  중성PathStrings,
  종성PathStrings,
}: {
  advanceWidth: number;
  fontHeight: number;
  초성PathStrings: Record<string, 초성Paths>;
  중성PathStrings: Record<string, 중성Paths>;
  종성PathStrings: Record<string, string>;
}) => {
  const glyphs = [];
  for (let 중성Index = 0; 중성Index < 중성_LIST.length; 중성Index++) {
    for (let 종성Index = 0; 종성Index < 종성_LIST.length; 종성Index++) {
      for (let 초성Index = 0; 초성Index < 초성_LIST.length; 초성Index++) {
        const curr중성Type = 중성ItemType[중성_LIST[중성Index]];
        const unicode =
          44032 + 초성Index * 21 * 28 + 중성Index * 28 + 종성Index;
        const mergeSvgStringList = [];

        // 종성이 없는 경우
        if (종성Index === 0) {
          mergeSvgStringList.push(
            초성PathStrings[초성_LIST[초성Index]][curr중성Type][0],
          );
          mergeSvgStringList.push(중성PathStrings[중성_LIST[중성Index]][0]);
        } else {
          mergeSvgStringList.push(
            초성PathStrings[초성_LIST[초성Index]][curr중성Type][1],
          );
          mergeSvgStringList.push(중성PathStrings[중성_LIST[중성Index]][1]);
          mergeSvgStringList.push(종성PathStrings[종성_LIST[종성Index]]);
        }

        const glyphSvgPathDefinition =
          mergeSVGPathDefinitions(mergeSvgStringList);

        const { path } = svgPathToOpentypePath({
          d: glyphSvgPathDefinition,
          fontHeight,
          paddingRatio: { x: 0.05, y: 0.1 },
          advanceWidth,
        });

        glyphs.push(
          new opentype.Glyph({
            name: String.fromCharCode(unicode),
            unicode: unicode,
            advanceWidth,
            path,
          }),
        );
      }
    }
  }

  return glyphs;
};

export const generateGlyphs = <T extends string>({
  fontHeight,
  paddingRatio = { x: 0, y: 0 },
  svgPathDatas,
  glyphsList,
  glyphUnicodeOffset,
  advanceWidth,
}: {
  fontHeight: number;
  paddingRatio?: { x: number; y: number };
  svgPathDatas: Record<T, { path: string; width?: number; height?: number }>;
  glyphsList: ReadonlyArray<T>;
  glyphUnicodeOffset: number;
  advanceWidth?: number;
}) => {
  const getBaselineOffset = (char: string): number => {
    const descenderChars = ["g", "j", "p", "q", "y"];
    const superscriptChars = ["'", '"', "`"];
    const centerChars = ["~", "^", "*", "-", "=", "+"];
    const koreanSingleChars = [
      ...초성_LIST,
      ...중성_LIST,
      ...종성_LIST,
      ...COMPATIBILITY_자모_LIST,
    ];

    if (descenderChars.includes(char)) {
      return fontHeight * 0.3;
    }
    if (superscriptChars.includes(char)) {
      return -fontHeight * 0.5;
    }
    if (centerChars.includes(char) || koreanSingleChars.includes(char)) {
      return -fontHeight * 0.25;
    }
    return 0;
  };

  const glyphs = [];
  const maxPathHeight = Math.max(
    ...Object.values(svgPathDatas).map(
      (value: any) => getSvgPathBoxSizes(value.path).boxHeight,
    ),
  );
  const heightRatio = fontHeight / maxPathHeight;

  for (
    let glyphSvgIndex = 0;
    glyphSvgIndex < glyphsList.length;
    glyphSvgIndex++
  ) {
    const currGlphy = glyphsList[glyphSvgIndex];
    const unicode = glyphSvgIndex + glyphUnicodeOffset;
    const { path } = svgPathDatas[currGlphy];
    const { boxHeight } = getSvgPathBoxSizes(path);

    const baselineOffset = getBaselineOffset(currGlphy);

    const { path: glyphPath, width } = svgPathToOpentypePath({
      d: path,
      fontHeight: Math.floor(boxHeight * heightRatio),
      paddingRatio,
      advanceWidth,
      baselineOffset,
    });

    glyphs.push(
      new opentype.Glyph({
        name: String.fromCharCode(unicode),
        unicode: unicode,
        advanceWidth: advanceWidth || width,
        path: glyphPath,
      }),
    );
  }

  return glyphs;
};
