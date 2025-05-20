import opentype from "opentype.js";
import {
	BASIC_LIST,
	TEMPLATE_1,
	TEMPLATE_2,
	TEMPLATE_3,
	TEMPLATE_4,
	TEMPLATE_5,
	종성_LIST,
	중성_LIST,
	초성_LIST,
} from "./constants";
import { generateGlyphs, generateHangulGlyphs } from "./font";
import { getPathStrings } from "./image";

export const generateFont = async (template: {
	초성1: HTMLImageElement;
	초성2: HTMLImageElement;
	중성: HTMLImageElement;
	종성: HTMLImageElement;
	영어특수문자: HTMLImageElement;
}) => {
	const TEMPLATE_GRID_RATIO = Math.floor((5 / 6) * 100) / 100;
	const FontHeight = 2048;
	const AdvanceWidth = FontHeight * TEMPLATE_GRID_RATIO;

	const 초성PathStrings = {
		...(
			await getPathStrings({
				templateImage: template.초성1,
				templateGlyphGrid: TEMPLATE_1,
				glyphType: "초성",
			})
		).paths,
		...(
			await getPathStrings({
				templateImage: template.초성2,
				templateGlyphGrid: TEMPLATE_2,
				glyphType: "초성",
			})
		).paths,
	};
	const { paths: 중성PathStrings } = await getPathStrings({
		templateImage: template.중성,
		templateGlyphGrid: TEMPLATE_3,
		glyphType: "중성",
	});
	const { paths: 종성PathStrings } = await getPathStrings({
		templateImage: template.종성,
		templateGlyphGrid: TEMPLATE_4,
		glyphType: "DEFAULT",
	});
	const {
		paths: basicPathStrings,
		width: basicGlyphWidth,
		height: basicGlyphHeight,
	} = await getPathStrings({
		templateImage: template.영어특수문자,
		templateGlyphGrid: TEMPLATE_5,
		glyphType: "DEFAULT",
	});

	const notdefGlyph = new opentype.Glyph({
		name: ".notdef",
		advanceWidth: 1000,
		path: new opentype.Path(),
	});

	const 한글Glyphs = generateHangulGlyphs({
		advanceWidth: AdvanceWidth,
		fontHeight: FontHeight,
		초성PathStrings,
		중성PathStrings,
		종성PathStrings,
	});

	const compatibility자모Glyphs = generateGlyphs({
		advanceWidth: AdvanceWidth,
		fontHeight: FontHeight,
		glyphUnicodeOffset: 12593,
		glyphsList: [
			"ㄱ",
			"ㄲ",
			"ㄳ",
			"ㄴ",
			"ㄵ",
			"ㄶ",
			"ㄷ",
			"ㄸ",
			"ㄹ",
			"ㄺ",
			"ㄻ",
			"ㄼ",
			"ㄽ",
			"ㄾ",
			"ㄿ",
			"ㅀ",
			"ㅁ",
			"ㅂ",
			"ㅃ",
			"ㅄ",
			"ㅅ",
			"ㅆ",
			"ㅇ",
			"ㅈ",
			"ㅉ",
			"ㅊ",
			"ㅋ",
			"ㅌ",
			"ㅍ",
			"ㅎ",
			"ㅏ",
			"ㅐ",
			"ㅑ",
			"ㅒ",
			"ㅓ",
			"ㅔ",
			"ㅕ",
			"ㅖ",
			"ㅗ",
			"ㅘ",
			"ㅙ",
			"ㅚ",
			"ㅛ",
			"ㅜ",
			"ㅝ",
			"ㅞ",
			"ㅟ",
			"ㅠ",
			"ㅡ",
			"ㅢ",
			"ㅣ",
		],
		svgPathDatas: {
			ㄱ: { path: 초성PathStrings.ㄱ.VowelDown[0] },
			ㄲ: { path: 초성PathStrings.ㄲ.VowelDown[0] },
			ㄳ: { path: 종성PathStrings.ㄳ },
			ㄴ: { path: 초성PathStrings.ㄴ.VowelDown[0] },
			ㄵ: { path: 종성PathStrings.ㄵ },
			ㄶ: { path: 종성PathStrings.ㄶ },
			ㄷ: { path: 초성PathStrings.ㄷ.VowelDown[0] },
			ㄸ: { path: 초성PathStrings.ㄸ.VowelDown[0] },
			ㄹ: { path: 초성PathStrings.ㄹ.VowelDown[0] },
			ㄺ: { path: 종성PathStrings.ㄺ },
			ㄻ: { path: 종성PathStrings.ㄻ },
			ㄼ: { path: 종성PathStrings.ㄼ },
			ㄽ: { path: 종성PathStrings.ㄽ },
			ㄾ: { path: 종성PathStrings.ㄾ },
			ㄿ: { path: 종성PathStrings.ㄿ },
			ㅀ: { path: 종성PathStrings.ㅀ },
			ㅁ: { path: 초성PathStrings.ㅁ.VowelDown[0] },
			ㅂ: { path: 초성PathStrings.ㅂ.VowelDown[0] },
			ㅃ: { path: 초성PathStrings.ㅃ.VowelDown[0] },
			ㅄ: { path: 종성PathStrings.ㅄ },
			ㅅ: { path: 초성PathStrings.ㅅ.VowelDown[0] },
			ㅆ: { path: 초성PathStrings.ㅆ.VowelDown[0] },
			ㅇ: { path: 초성PathStrings.ㅇ.VowelDown[0] },
			ㅈ: { path: 초성PathStrings.ㅈ.VowelDown[0] },
			ㅉ: { path: 초성PathStrings.ㅉ.VowelDown[0] },
			ㅊ: { path: 초성PathStrings.ㅊ.VowelDown[0] },
			ㅋ: { path: 초성PathStrings.ㅋ.VowelDown[0] },
			ㅌ: { path: 초성PathStrings.ㅌ.VowelDown[0] },
			ㅍ: { path: 초성PathStrings.ㅍ.VowelDown[0] },
			ㅎ: { path: 초성PathStrings.ㅎ.VowelDown[0] },
			ㅏ: { path: 중성PathStrings.ㅏ[0] },
			ㅐ: { path: 중성PathStrings.ㅐ[0] },
			ㅑ: { path: 중성PathStrings.ㅑ[0] },
			ㅒ: { path: 중성PathStrings.ㅒ[0] },
			ㅓ: { path: 중성PathStrings.ㅓ[0] },
			ㅔ: { path: 중성PathStrings.ㅔ[0] },
			ㅕ: { path: 중성PathStrings.ㅕ[0] },
			ㅖ: { path: 중성PathStrings.ㅖ[0] },
			ㅗ: { path: 중성PathStrings.ㅗ[0] },
			ㅘ: { path: 중성PathStrings.ㅘ[0] },
			ㅙ: { path: 중성PathStrings.ㅙ[0] },
			ㅚ: { path: 중성PathStrings.ㅚ[0] },
			ㅛ: { path: 중성PathStrings.ㅛ[0] },
			ㅜ: { path: 중성PathStrings.ㅜ[0] },
			ㅝ: { path: 중성PathStrings.ㅝ[0] },
			ㅞ: { path: 중성PathStrings.ㅞ[0] },
			ㅟ: { path: 중성PathStrings.ㅟ[0] },
			ㅠ: { path: 중성PathStrings.ㅠ[0] },
			ㅡ: { path: 중성PathStrings.ㅡ[0] },
			ㅢ: { path: 중성PathStrings.ㅢ[0] },
			ㅣ: { path: 중성PathStrings.ㅣ[0] },
		},
	});
	const 초성Glyphs = generateGlyphs({
		advanceWidth: AdvanceWidth,
		fontHeight: FontHeight,
		glyphUnicodeOffset: 4352,
		glyphsList: 초성_LIST,
		svgPathDatas: Object.fromEntries(
			초성_LIST.map((초성) => [
				초성,
				{ path: 초성PathStrings[초성].VowelRight[0] },
			]),
		) as Record<(typeof 초성_LIST)[number], { path: string }>,
		paddingRatio: { x: 0.1, y: 0.2 },
	});
	const 중성Glyphs = generateGlyphs({
		advanceWidth: AdvanceWidth,
		fontHeight: FontHeight,
		glyphUnicodeOffset: 4449,
		glyphsList: 중성_LIST,
		svgPathDatas: Object.fromEntries(
			중성_LIST.map((중성) => [중성, { path: 중성PathStrings[중성][0] }]),
		) as Record<(typeof 중성_LIST)[number], { path: string }>,
		paddingRatio: { x: 0.1, y: 0.1 },
	});

	const 종성List = 종성_LIST.slice(1) as Exclude<
		(typeof 종성_LIST)[number],
		""
	>[];
	const 종성Glyphs = generateGlyphs({
		advanceWidth: AdvanceWidth,
		fontHeight: FontHeight,
		glyphUnicodeOffset: 4520,
		glyphsList: 종성List,
		svgPathDatas: Object.fromEntries(
			종성List.map((종성) => [종성, { path: 종성PathStrings[종성] }]),
		) as Record<
			Exclude<(typeof 종성_LIST)[number], "">[number],
			{ path: string }
		>,
		paddingRatio: { x: 0.1, y: 0.2 },
	});

	// FIXME: path 너비에 의해 결정되기 때문에 특수문자 관련 처리 필요
	// FIXME: 영문 소문자, 특수문자 등 width 반영
	const basicSvgPathDatas = Object.fromEntries(
		Object.keys(basicPathStrings).map((key) => [
			key,
			{
				path: basicPathStrings[key],
				width: basicGlyphWidth,
				height: basicGlyphHeight,
			},
		]),
	) as Record<
		(typeof BASIC_LIST)[number][number],
		{ path: string; width: number; height: number }
	>;

	const basicGlyphs = generateGlyphs({
		advanceWidth: AdvanceWidth,
		fontHeight: FontHeight,
		glyphUnicodeOffset: 33,
		glyphsList: BASIC_LIST,
		svgPathDatas: basicSvgPathDatas,
		paddingRatio: { x: 0.1, y: 0.2 },
	});

	const font = new opentype.Font({
		familyName: "hanja-font",
		styleName: "Medium",
		unitsPerEm: AdvanceWidth,
		glyphs: [
			notdefGlyph,
			...초성Glyphs,
			...중성Glyphs,
			...종성Glyphs,
			...한글Glyphs,
			...compatibility자모Glyphs,
			...basicGlyphs,
		],

		ascender: 2048,
		descender: -0,
	});

	return font;
};
