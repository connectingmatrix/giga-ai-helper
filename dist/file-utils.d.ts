import { BinaryFileLike, MimeFileLike } from './types';
export declare function getExtensionFromMimeType(file: MimeFileLike, mimeExtensionMap?: Record<string, string>): string;
export declare function extractTextFromFile(file: BinaryFileLike): Promise<string>;
export declare function validateFiles<T extends MimeFileLike>(files: T[], allowedMimeTypes?: string[], allowedExtensions?: string[]): void;
//# sourceMappingURL=file-utils.d.ts.map