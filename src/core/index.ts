import opentype from "opentype.js";
import { BASIC_LIST, 종성_LIST, 중성_LIST, 초성_LIST } from "./constants";
import { generateGlyphs, generateHangulGlyphs } from "./font";
import {
	geBasicPathStrings,
	get종성PathStrings,
	get중성PathStrings,
	get초성1PathStrings,
	get초성2PathStrings,
} from "./image";

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
		...(await get초성1PathStrings(template.초성1)),
		...(await get초성2PathStrings(template.초성2)),
	};
	const 중성PathStrings = await get중성PathStrings(template.중성);
	const 종성PathStrings = await get종성PathStrings(template.종성);
	const basicPathStrings = await geBasicPathStrings(template.영어특수문자);

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
		svgPathStrings: {
			ㄱ: 초성PathStrings.ㄱ.VowelDown[0],
			ㄲ: 초성PathStrings.ㄲ.VowelDown[0],
			ㄳ: 종성PathStrings.ㄳ[0],
			ㄴ: 초성PathStrings.ㄴ.VowelDown[0],
			ㄵ: 종성PathStrings.ㄵ[0],
			ㄶ: 종성PathStrings.ㄶ[0],
			ㄷ: 초성PathStrings.ㄷ.VowelDown[0],
			ㄸ: 초성PathStrings.ㄸ.VowelDown[0],
			ㄹ: 초성PathStrings.ㄹ.VowelDown[0],
			ㄺ: 종성PathStrings.ㄺ[0],
			ㄻ: 종성PathStrings.ㄻ[0],
			ㄼ: 종성PathStrings.ㄼ[0],
			ㄽ: 종성PathStrings.ㄽ[0],
			ㄾ: 종성PathStrings.ㄾ[0],
			ㄿ: 종성PathStrings.ㄿ[0],
			ㅀ: 종성PathStrings.ㅀ[0],
			ㅁ: 초성PathStrings.ㅁ.VowelDown[0],
			ㅂ: 초성PathStrings.ㅂ.VowelDown[0],
			ㅃ: 초성PathStrings.ㅃ.VowelDown[0],
			ㅄ: 종성PathStrings.ㅄ[0],
			ㅅ: 초성PathStrings.ㅅ.VowelDown[0],
			ㅆ: 초성PathStrings.ㅆ.VowelDown[0],
			ㅇ: 초성PathStrings.ㅇ.VowelDown[0],
			ㅈ: 초성PathStrings.ㅈ.VowelDown[0],
			ㅉ: 초성PathStrings.ㅉ.VowelDown[0],
			ㅊ: 초성PathStrings.ㅊ.VowelDown[0],
			ㅋ: 초성PathStrings.ㅋ.VowelDown[0],
			ㅌ: 초성PathStrings.ㅌ.VowelDown[0],
			ㅍ: 초성PathStrings.ㅍ.VowelDown[0],
			ㅎ: 초성PathStrings.ㅎ.VowelDown[0],
			ㅏ: 중성PathStrings.ㅏ[0],
			ㅐ: 중성PathStrings.ㅐ[0],
			ㅑ: 중성PathStrings.ㅑ[0],
			ㅒ: 중성PathStrings.ㅒ[0],
			ㅓ: 중성PathStrings.ㅓ[0],
			ㅔ: 중성PathStrings.ㅔ[0],
			ㅕ: 중성PathStrings.ㅕ[0],
			ㅖ: 중성PathStrings.ㅖ[0],
			ㅗ: 중성PathStrings.ㅗ[0],
			ㅘ: 중성PathStrings.ㅘ[0],
			ㅙ: 중성PathStrings.ㅙ[0],
			ㅚ: 중성PathStrings.ㅚ[0],
			ㅛ: 중성PathStrings.ㅛ[0],
			ㅜ: 중성PathStrings.ㅜ[0],
			ㅝ: 중성PathStrings.ㅝ[0],
			ㅞ: 중성PathStrings.ㅞ[0],
			ㅟ: 중성PathStrings.ㅟ[0],
			ㅠ: 중성PathStrings.ㅠ[0],
			ㅡ: 중성PathStrings.ㅡ[0],
			ㅢ: 중성PathStrings.ㅢ[0],
			ㅣ: 중성PathStrings.ㅣ[0],
		},
	});
	const 초성Glyphs = generateGlyphs({
		advanceWidth: AdvanceWidth,
		fontHeight: FontHeight,
		glyphUnicodeOffset: 4352,
		glyphsList: 초성_LIST,
		svgPathStrings: Object.fromEntries(
			초성_LIST.map((초성) => [초성, 초성PathStrings[초성].VowelRight[0]]),
		) as Record<(typeof 초성_LIST)[number], string>,
		paddingRatio: { x: 0.1, y: 0.2 },
	});
	const 중성Glyphs = generateGlyphs({
		advanceWidth: AdvanceWidth,
		fontHeight: FontHeight,
		glyphUnicodeOffset: 4449,
		glyphsList: 중성_LIST,
		svgPathStrings: Object.fromEntries(
			중성_LIST.map((중성) => [중성, 중성PathStrings[중성][0]]),
		) as Record<(typeof 중성_LIST)[number], string>,
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
		svgPathStrings: Object.fromEntries(
			종성List.map((종성) => [종성, 종성PathStrings[종성][0]]),
		) as Record<Exclude<(typeof 종성_LIST)[number], "">[number], string>,
		paddingRatio: { x: 0.1, y: 0.2 },
	});

	// FIXME: path 너비에 의해 결정되기 때문에 특수문자 관련 처리 필요
	// FIXME: 영문 소문자, 특수문자 등 width 반영
	const basicGlyphs = generateGlyphs({
		advanceWidth: AdvanceWidth,
		fontHeight: FontHeight,
		glyphUnicodeOffset: 33,
		glyphsList: BASIC_LIST,
		svgPathStrings: basicPathStrings,
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
