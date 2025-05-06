import { SVGPathData } from "svg-pathdata";
import opentype from "opentype.js";
import {
	초성_LIST,
	중성_LIST,
	종성_LIST,
	중성ItemType,
	중성Type,
} from "./constants";

export const mergeSVGPathDefinitions = (paths: string[]) => {
	return paths.join(" ");
};

export const svgPathToOpentypePath = ({
	d,
	fontSize,
	paddingRatio,
}: {
	d: string;
	fontSize: { x: number; y: number };
	paddingRatio: { x: number; y: number };
}) => {
	const path = new opentype.Path();
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

	const paddingX = fontSize.x * paddingRatio.x;
	const paddingY = fontSize.y * paddingRatio.y;

	const innerWidth = fontSize.x - paddingX * 2;
	const innerHeight = fontSize.y - paddingY * 2;

	const scaleX = innerWidth / boxWidth;
	const scaleY = innerHeight / boxHeight;
	const scale = Math.min(scaleX, scaleY);

	const scaledWidth = boxWidth * scale;
	const scaledHeight = boxHeight * scale;

	const offsetX = (fontSize.x - scaledWidth) / 2;
	const offsetY = (fontSize.y - scaledHeight) / 2;

	const transformX = (x: number) => (x - minX) * scale + offsetX;
	const transformY = (y: number) => fontSize.x - ((y - minY) * scale + offsetY);

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

	return path;
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
	초성PathStrings: Record<
		(typeof 초성_LIST)[number],
		{ [T in keyof typeof 중성Type]: [string, string] }
	>;
	중성PathStrings: Record<(typeof 중성_LIST)[number], [string, string]>;
	종성PathStrings: Record<(typeof 종성_LIST)[number], [string]>;
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
					mergeSvgStringList.push(종성PathStrings[종성_LIST[종성Index]][0]);
				}

				const glyphSvgPathDefinition =
					mergeSVGPathDefinitions(mergeSvgStringList);

				glyphs.push(
					new opentype.Glyph({
						name: String.fromCharCode(unicode),
						unicode: unicode,
						advanceWidth,
						path: svgPathToOpentypePath({
							d: glyphSvgPathDefinition,
							fontSize: { x: advanceWidth, y: fontHeight },
							paddingRatio: { x: 0.05, y: 0.1 },
						}),
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
	paddingRatio = { x: 0, y: 0 },
	svgPathStrings,
	glyphsList,
	glyphUnicodeOffset,
}: {
	advanceWidth: number;
	fontHeight: number;
	paddingRatio?: { x: number; y: number };
	svgPathStrings: Record<T, string>;
	glyphsList: ReadonlyArray<T>;
	glyphUnicodeOffset: number;
}) => {
	const glyphs = [];
	opentype.Glyph;
	for (
		let glyphSvgIndex = 0;
		glyphSvgIndex < glyphsList.length;
		glyphSvgIndex++
	) {
		const currGlphy = glyphsList[glyphSvgIndex];
		const unicode = glyphSvgIndex + glyphUnicodeOffset;

		glyphs.push(
			new opentype.Glyph({
				name: String.fromCharCode(unicode),
				unicode: unicode,
				advanceWidth,
				path: svgPathToOpentypePath({
					d: svgPathStrings[currGlphy],
					fontSize: { x: advanceWidth, y: fontHeight },
					paddingRatio,
				}),
			}),
		);
	}

	return glyphs;
};
