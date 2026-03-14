import { StringLike } from './types';
export declare function toSlug(input: string, maxLength?: number): string;
export declare function normalizeTagName(input: string, maxLength?: number): string | null;
export declare function uniqueTags(values: string[], maxTags?: number, maxTagLength?: number): string[];
export declare function normalizeUnique(values: Array<StringLike>): string[];
//# sourceMappingURL=tag-utils.d.ts.map