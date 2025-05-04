import { ChangeEvent, useRef, useState } from "react";
import { convertImageToSvgString } from "./core";

function App() {
	const [svgData, setSvgData] = useState<string | null>();
	const imageInput = useRef<HTMLInputElement>(null);
	const [svgDatas, setSvgDatas] = useState<string[]>([]);

	const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || !event.target.files[0]) {
			return;
		}
		try {
			const svg = await convertImageToSvgString(event.target.files[0]);
			setSvgData(
				`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" version="1.1">${svg}</svg>`,
			);
			setSvgDatas((prev) => [...prev, svg]);
		} catch (error) {
			alert(error);
		}
	};
	return (
		<main>
			<h2>한자한자</h2>
			<input
				type="file"
				accept="image/png,image/jpeg"
				onChange={handleImageChange}
				ref={imageInput}
				style={{ display: "none" }}
			/>
			<button onClick={() => imageInput.current?.click()}>
				PNG 혹은 JPEG 이미지 업로드
			</button>
			{svgData && <div dangerouslySetInnerHTML={{ __html: svgData }} />}
			<div
				dangerouslySetInnerHTML={{
					__html: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" version="1.1">${svgDatas.join("")}</svg>`,
				}}
			/>
		</main>
	);
}

export default App;
