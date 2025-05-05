import { SVGPathData } from "svg-pathdata";
import Potrace from "potrace";
import opentype from "opentype.js";
import { Base64 } from "../types/core";
import {
	초성_LIST,
	중성_LIST,
	종성_LIST,
	중성ItemType,
	중성Type,
} from "./constants";

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

export const mergeSVGPathDefinitions = (paths: string[]) => {
	return paths.join(" ");
};

export const svgPathToOpentypePath = (d: string, fontHeight: number) => {
	const path = new opentype.Path();
	const commands = new SVGPathData(d).toAbs().commands;
	const flipY = (y: number) => {
		return fontHeight - y;
	};

	commands.forEach((cmd) => {
		switch (cmd.type) {
			case SVGPathData.MOVE_TO:
				path.moveTo(cmd.x, flipY(cmd.y));
				break;
			case SVGPathData.LINE_TO:
				path.lineTo(cmd.x, flipY(cmd.y));
				break;
			case SVGPathData.CURVE_TO:
				path.curveTo(
					cmd.x1,
					flipY(cmd.y1),
					cmd.x2,
					flipY(cmd.y2),
					cmd.x,
					flipY(cmd.y),
				);
				break;
			case SVGPathData.QUAD_TO:
				path.quadTo(cmd.x1, flipY(cmd.y1), cmd.x, flipY(cmd.y));
				break;
			case SVGPathData.CLOSE_PATH:
				path.close();
				break;
		}
	});

	return path;
};

/** 초성SvgStrings: { 초성: { 모음 위치: [종성이 없는 초성 SvgString, 종성이 있는 초성 SvgString]} }  */
export const generateHangulGlyphs = ({
	advanceWidth,
	fontHeight,
	초성SvgStrings,
	중성SvgStrings,
	종성SvgStrings,
}: {
	advanceWidth: number;
	fontHeight: number;
	초성SvgStrings: Record<
		(typeof 초성_LIST)[number],
		{ [T in keyof typeof 중성Type]: [string, string] }
	>;
	중성SvgStrings: Record<(typeof 중성_LIST)[number], string>;
	종성SvgStrings: Record<(typeof 종성_LIST)[number], string>;
}) => {
	const glyphs = [];
	for (let 중성Index = 0; 중성Index < 중성_LIST.length; 중성Index++) {
		for (let 종성Index = 0; 종성Index < 종성_LIST.length; 종성Index++) {
			for (let 초성Index = 0; 초성Index < 초성_LIST.length; 초성Index++) {
				const curr종성Type = 중성ItemType[중성_LIST[중성Index]];
				const [종성X초성, 종성O초성] =
					초성SvgStrings[초성_LIST[초성Index]][curr종성Type];
				const 초성 = 종성Index === 0 ? 종성X초성 : 종성O초성;

				const unicode =
					44032 + 초성Index * 21 * 28 + 중성Index * 28 + 종성Index;
				const 초성PathDefinition = 초성.match(/<path[^>]*d="([^"]+)"/)![1];
				const 중성PathDefinition = 중성SvgStrings[중성_LIST[중성Index]].match(
					/<path[^>]*d="([^"]+)"/,
				)![1];
				const 종성PathDefinition = 종성SvgStrings[종성_LIST[종성Index]].match(
					/<path[^>]*d="([^"]+)"/,
				)![1];
				const glyphSvgPathDefinition = mergeSVGPathDefinitions([
					초성PathDefinition,
					중성PathDefinition,
					종성PathDefinition,
				]);

				glyphs.push(
					new opentype.Glyph({
						name: String.fromCharCode(unicode),
						unicode: unicode,
						advanceWidth,
						path: svgPathToOpentypePath(glyphSvgPathDefinition, fontHeight),
					}),
				);
			}
		}
	}

	return glyphs;
};

export const generateGlyphs = <T extends string>({
	advanceWidth,
	fontHeight,
	svgPathStrings,
	glyphsList,
	glyphUnicodeOffset,
}: {
	advanceWidth: number;
	fontHeight: number;
	svgPathStrings: Record<T, string>;
	glyphsList: ReadonlyArray<T>;
	glyphUnicodeOffset: number;
}) => {
	const glyphs = [];

	for (
		let glyphSvgIndex = 0;
		glyphSvgIndex < glyphsList.length;
		glyphSvgIndex++
	) {
		const currGlphy = glyphsList[glyphSvgIndex];
		const unicode = glyphSvgIndex + glyphUnicodeOffset;
		const pathDefinition = svgPathStrings[currGlphy].match(
			/<path[^>]*d="([^"]+)"/,
		)![1];

		glyphs.push(
			new opentype.Glyph({
				name: String.fromCharCode(unicode),
				unicode: unicode,
				advanceWidth,
				path: svgPathToOpentypePath(pathDefinition, fontHeight),
			}),
		);
	}

	return glyphs;
};
