import Potrace from "potrace";

export const convertImageToSvgString = (imgFile: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const allowedFileTypes = ["image/png", "image/jpeg"];

		if (!allowedFileTypes.includes(imgFile.type)) {
			return reject(
				"이미지 확장자가 올바르지 않습니다. png 혹은 jpeg로 입력해주세요.",
			);
		}

		const reader = new FileReader();

		const trace = new Potrace.Potrace();
		reader.onload = (event) => {
			const result = event.target?.result;
			if (typeof result !== "string") {
				return reject("이미지 파일을 읽을 수 없습니다.");
			}

			trace.loadImage(result, (err) => {
				if (err) {
					console.error(err);
					return reject("SVG 변환 중 오류가 발생했습니다.");
				}

				console.log(trace.getSVG());
				// <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" version="1.1">

				resolve(
					// NOTE: types 패키지 타입 정의가 잘못되어있음
					trace.getPathTag(
						undefined as unknown as string,
						undefined as unknown as number,
					),
				);
			});
		};

		reader.onerror = () => {
			reject("파일을 읽는 중 오류가 발생했습니다.");
		};

		reader.readAsDataURL(imgFile);
	});
};
