export type Base64<imageType extends string = string> =
	`data:image/${imageType};base64${string}`;
