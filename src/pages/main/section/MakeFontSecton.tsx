import { ChangeEvent, useRef, useState } from "react";
import { generateFont } from "../../../core";
import { styled } from "@linaria/react";
import { Font, load } from "opentype.js";
import { colors } from "../../../constants/colors";

const Template = {
	초성1: "초성1",
	초성2: "초성2",
	중성: "중성",
	종성: "종성",
	영어특수문자: "영어특수문자",
} as const;

const TemplateInput = [
	{ label: "초성1", key: Template.초성1 },
	{ label: "초성2", key: Template.초성2 },
	{ label: "중성", key: Template.중성 },
	{ label: "종성", key: Template.종성 },
	{ label: "영어특수문자", key: Template.영어특수문자 },
];

const canSubmitTemplate = (
	templates: Record<keyof typeof Template, HTMLImageElement | null>,
): templates is Record<keyof typeof Template, HTMLImageElement> => {
	return Object.values(templates).every(
		(value): value is HTMLImageElement => value !== null,
	);
};

export function MakeFontSecton() {
	const [templates, setTemplates] = useState<
		Record<keyof typeof Template, HTMLImageElement | null>
	>({ 초성1: null, 초성2: null, 중성: null, 종성: null, 영어특수문자: null });
	const canSubmit = Object.values(templates).every((img) => img != null);
	const fontRef = useRef<Font>(null);
	const [loading, setLoading] = useState(false);

	const handleClickMakeFontButton = async () => {
		try {
			if (canSubmitTemplate(templates)) {
				setLoading(true);
				const font = await generateFont(templates);
				fontRef.current = font;
				font.download();
				alert("다운로드 완료!");
			}
		} catch (error) {
			console.error(error);
			alert(
				"다운로드에 실패하였습니다. 다시 시도하거나 개발자에게 문의해주세요.",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Section>
			<TitleWrapper>
				<H3>작성한 템플릿을 업로드해주세요</H3>
				<a href="./손글씨_템플릿.zip" download>
					<Button style={{ backgroundColor: colors.darkBrown }}>
						템플릿 다운로드
					</Button>
				</a>
			</TitleWrapper>
			<TemplateUploaderContainer>
				{TemplateInput.map(({ label, key }) => (
					<TemplateWrapper>
						<PreviewWrapper
							className={templates[key] !== null ? "uploaded" : undefined}
						>
							{templates[key] !== null && (
								<PreviewImgWrapper
									dangerouslySetInnerHTML={{ __html: templates[key].outerHTML }}
								/>
							)}
						</PreviewWrapper>
						<ImageFileInput
							label={`${label} ${templates[key] === null ? "올리기" : "다시 올리기"}`}
							onUpload={(imgElem) => {
								setTemplates((prev) => ({ ...prev, [key]: imgElem }));
							}}
						/>
					</TemplateWrapper>
				))}
				<TemplateWrapper>
					<InfoWrapper>
						{TemplateInput.map(({ label, key }) => (
							<Info>
								{templates[key] !== null ? <CheckIcon /> : <UnCheckIcon />}
								<p>{label}</p>
							</Info>
						))}
						<MakeFontButton
							title={canSubmit ? "폰트 다운받기" : "템플릿을 모두 올려주세요"}
							disabled={!canSubmit || loading}
							onClick={handleClickMakeFontButton}
							className={loading ? "loading" : undefined}
						>
							폰트로 만들기
						</MakeFontButton>
					</InfoWrapper>
				</TemplateWrapper>
			</TemplateUploaderContainer>
		</Section>
	);
}

function ImageFileInput({
	label,
	onUpload,
}: {
	label: string;
	onUpload: (value: HTMLImageElement) => void;
}) {
	const imageInput = useRef<HTMLInputElement>(null);
	const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			const img = new Image();

			img.onload = async () => {
				onUpload(img);
			};
			img.src = reader.result as string;
		};
		reader.readAsDataURL(file);
	};

	return (
		<>
			<input
				type="file"
				accept="image/png,image/jpeg"
				onChange={handleImageChange}
				ref={imageInput}
				style={{ display: "none" }}
			/>
			<Button onClick={() => imageInput.current?.click()}>{label}</Button>
		</>
	);
}

const TemplateWrapper = styled.div`
	overflow: auto;
	width: 50%;
	padding: 30px;
`;

const Section = styled.section`
	margin: 80px 0;
`;

const TemplateUploaderContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	text-align: center;
	width: 100%;
`;

const PreviewWrapper = styled.div`
	height: 500px;
	border: 4px dashed ${colors.green};
	border-radius: 12px;
	margin-bottom: 16px;

	&.uploaded {
		border-style: solid;
	}
`;

const PreviewImgWrapper = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;

const H3 = styled.h3`
	font-weight: 600;
	color: ${colors.darkBrown};
	font-size: 36px;
`;

const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 30px;
	gap: 36px;
	height: 100%;
	border: 4px solid ${colors.green};
	border-radius: 12px;

	font-size: 30px;
	color: ${colors.darkBrown};
`;

const Info = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

function UnCheckIcon() {
	return (
		<svg
			height="30px"
			version="1.1"
			viewBox="0 0 18 18"
			width="30px"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title />
			<desc />
			<defs />
			<g
				fill="none"
				fill-rule="evenodd"
				id="Page-1"
				stroke="none"
				stroke-width="1"
			>
				<g
					fill={colors.darkBrown}
					id="Core"
					transform="translate(-3.000000, -87.000000)"
				>
					<g
						id="check-box-outline-blank"
						transform="translate(3.000000, 87.000000)"
					>
						<path
							d="M16,2 L16,16 L2,16 L2,2 L16,2 L16,2 Z M16,0 L2,0 C0.9,0 0,0.9 0,2 L0,16 C0,17.1 0.9,18 2,18 L16,18 C17.1,18 18,17.1 18,16 L18,2 C18,0.9 17.1,0 16,0 L16,0 L16,0 Z"
							id="Shape"
						/>
					</g>
				</g>
			</g>
		</svg>
	);
}

function CheckIcon() {
	return (
		<svg
			height="30px"
			version="1.1"
			viewBox="0 0 18 18"
			width="30px"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title />
			<desc />
			<defs />
			<g
				fill="none"
				fill-rule="evenodd"
				id="Page-1"
				stroke="none"
				stroke-width="1"
			>
				<g
					fill={colors.darkBrown}
					id="Core"
					transform="translate(-465.000000, -45.000000)"
				>
					<g id="check-box" transform="translate(465.000000, 45.000000)">
						<path
							d="M16,0 L2,0 C0.9,0 0,0.9 0,2 L0,16 C0,17.1 0.9,18 2,18 L16,18 C17.1,18 18,17.1 18,16 L18,2 C18,0.9 17.1,0 16,0 L16,0 Z M7,14 L2,9 L3.4,7.6 L7,11.2 L14.6,3.6 L16,5 L7,14 L7,14 Z"
							id="Shape"
						/>
					</g>
				</g>
			</g>
		</svg>
	);
}

const Button = styled.button`
	background-color: ${colors.green};
	cursor: pointer;
	border: none;
	border-radius: 12px;
	padding: 8px 12px;
	color: white;
	font-size: 20px;

	&:hover {
		opacity: 0.8;
	}
`;

const MakeFontButton = styled.button`
	background-color: ${colors.darkBrown};
	cursor: pointer;
	border: none;
	border-radius: 12px;
	padding: 12px 18px;
	color: white;
	font-size: 32px;

	&:hover:not(:disabled) {
		opacity: 0.8;
	}

	&:disabled {
		opacity: 0.2;
		cursor: not-allowed;
	}

	&.loading {
		cursor: wait;
	}
`;

const TitleWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	padding: 30px;
`;
