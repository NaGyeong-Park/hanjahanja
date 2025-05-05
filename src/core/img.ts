import { Base64 } from "../types/core";

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
