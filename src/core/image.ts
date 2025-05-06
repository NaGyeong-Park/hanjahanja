import { Base64 } from "./types";
import Potrace from "potrace";
import {
	BASIC_LIST,
	종성_LIST,
	중성_LIST,
	중성Type,
	초성_LIST,
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

const getSvgPathString = (svgString: string) => {
	return svgString.match(/<path[^>]*d="([^"]+)"/)![1];
};

export const sliceImage = ({
	image,
	rows,
	cols,
}: {
	image: HTMLImageElement;
	rows: number;
	cols: number;
}): Base64[] => {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	const slices: Base64[] = [];
	const sliceWidth = image.width / cols;
	const sliceHeight = image.height / rows;
	canvas.width = sliceWidth;
	canvas.height = sliceHeight;

	if (!ctx) {
		// TODO: Error
		return [];
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
			slices.push(canvas.toDataURL() as Base64);
		}
	}

	return slices;
};

export const get초성1PathStrings = async (image: HTMLImageElement) => {
	const imgStrings: Record<
		string,
		Record<keyof typeof 중성Type, string[]>
	> = {};
	const gridImages = await Promise.all(
		sliceImage({
			image,
			rows: 12,
			cols: 8,
		}).map(async (imgStr) => {
			const svgString = await convertImageToSvgString(imgStr);
			return getSvgPathString(svgString);
		}),
	);
	[...초성_LIST.slice(0, 12)].forEach((초성, index) => {
		const images = gridImages.slice(index * 8, index * 8 + 8);
		const value = {
			[중성Type.VowelRight]: [images[0], images[1]],
			[중성Type.VowelDown]: [images[2], images[3]],
			[중성Type.VowelRightDown]: [images[4], images[7]],
			[중성Type.Vowelㅡ]: [images[5], images[3]],
			[중성Type.Vowelㅢ]: [images[6], images[7]],
		};

		imgStrings[초성] = value;
	});

	return imgStrings as Record<
		Extract<
			(typeof 초성_LIST)[number],
			| "ㄱ"
			| "ㄲ"
			| "ㄴ"
			| "ㄷ"
			| "ㄸ"
			| "ㄹ"
			| "ㅁ"
			| "ㅂ"
			| "ㅃ"
			| "ㅅ"
			| "ㅆ"
			| "ㅇ"
		>,
		Record<keyof typeof 중성Type, [string, string]>
	>;
};

export const get초성2PathStrings = async (image: HTMLImageElement) => {
	const imgStrings: Record<
		string,
		Record<keyof typeof 중성Type, string[]>
	> = {};
	const gridImages = await Promise.all(
		sliceImage({
			image,
			rows: 7,
			cols: 8,
		}).map(async (imgStr) => {
			const svgString = await convertImageToSvgString(imgStr);
			return getSvgPathString(svgString);
		}),
	);
	[...초성_LIST.slice(12)].forEach((초성, index) => {
		const images = gridImages.slice(index * 8, index * 8 + 8);
		const value = {
			[중성Type.VowelRight]: [images[0], images[1]],
			[중성Type.VowelDown]: [images[2], images[3]],
			[중성Type.VowelRightDown]: [images[4], images[7]],
			[중성Type.Vowelㅡ]: [images[5], images[3]],
			[중성Type.Vowelㅢ]: [images[6], images[7]],
		};
		imgStrings[초성] = value;
	});

	return imgStrings as Record<
		Extract<
			(typeof 초성_LIST)[number],
			"ㅈ" | "ㅉ" | "ㅊ" | "ㅋ" | "ㅌ" | "ㅍ" | "ㅎ"
		>,
		Record<keyof typeof 중성Type, [string, string]>
	>;
};
export const get중성PathStrings = async (image: HTMLImageElement) => {
	const IMG_TEMPLATE_중성 = [
		"ㅏ",
		"ㅏ",
		"ㅐ",
		"ㅐ",
		"ㅑ",
		"ㅑ",
		"ㅒ",
		"ㅒ",
		null,
		null,
		"ㅓ",
		"ㅓ",
		"ㅔ",
		"ㅔ",
		"ㅕ",
		"ㅕ",
		"ㅖ",
		"ㅖ",
		null,
		null,
		"ㅗ",
		"ㅗ",
		"ㅘ",
		"ㅘ",
		"ㅙ",
		"ㅙ",
		"ㅚ",
		"ㅚ",
		null,
		null,
		"ㅛ",
		"ㅛ",
		"ㅜ",
		"ㅜ",
		"ㅝ",
		"ㅝ",
		"ㅞ",
		"ㅞ",
		"ㅟ",
		"ㅟ",
		"ㅠ",
		"ㅠ",
		"ㅡ",
		"ㅡ",
		"ㅢ",
		"ㅢ",
		"ㅣ",
		"ㅣ",
		null,
		null,
	];

	const imgStrings: Record<string, string[]> = {};
	const gridImages = await Promise.all(
		sliceImage({
			image,
			rows: 5,
			cols: 10,
		}).map(async (imgStr) => {
			const svgString = await convertImageToSvgString(imgStr);
			return getSvgPathString(svgString);
		}),
	);

	IMG_TEMPLATE_중성.forEach((중성, index) => {
		if (중성 === null) return;
		if (imgStrings[중성]) {
			imgStrings[중성].push(gridImages[index]);
		} else {
			imgStrings[중성] = [gridImages[index]];
		}
	});

	return imgStrings as Record<(typeof 중성_LIST)[number], [string, string]>;
};
export const get종성PathStrings = async (image: HTMLImageElement) => {
	const IMG_TEMPLATE_종성 = [
		"ㄱ",
		"ㄲ",
		"ㄳ",
		"ㄴ",
		"ㄵ",
		"ㄶ",
		"ㄷ",
		null,
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
		"ㅄ",
		"ㅅ",
		"ㅆ",
		"ㅇ",
		null,
		null,
		"ㅈ",
		"ㅊ",
		"ㅋ",
		"ㅌ",
		"ㅍ",
		"ㅎ",
		null,
		null,
	];

	const imgStrings: Record<string, string[]> = {};
	const gridImages = await Promise.all(
		sliceImage({
			image,
			rows: 4,
			cols: 8,
		}).map(async (imgStr) => {
			const svgString = await convertImageToSvgString(imgStr);
			return getSvgPathString(svgString);
		}),
	);

	IMG_TEMPLATE_종성.forEach((종성, index) => {
		if (종성 === null) return;

		imgStrings[종성] = [gridImages[index]];
	});

	return imgStrings as Record<(typeof 종성_LIST)[number], [string]>;
};

export const geBasicPathStrings = async (image: HTMLImageElement) => {
	const imgStrings: Record<string, string> = {};
	const gridImages = await Promise.all(
		sliceImage({
			image,
			rows: 12,
			cols: 8,
		}).map(async (imgStr) => {
			const svgString = await convertImageToSvgString(imgStr);
			return getSvgPathString(svgString);
		}),
	);

	BASIC_LIST.forEach((basic, index) => {
		imgStrings[basic] = gridImages[index];
	});

	return imgStrings as Record<(typeof BASIC_LIST)[number], string>;
};
