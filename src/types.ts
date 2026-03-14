export type Nullable<T> = T | null | undefined;

export type JsonObject = Record<string, any>;

export type StringLike = Nullable<string>;

export type MimeFileLike = {
  mimetype?: StringLike;
  originalname?: StringLike;
};

export type BinaryFileLike = MimeFileLike & {
  buffer: Buffer;
};

export type MimeDbEntry = {
  extensions?: string[];
  compressible?: boolean;
};
