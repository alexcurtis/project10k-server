// Checks If Mongoose Write Failed Because There Was A Duplicate On An Index
export function hasFailedBecauseAlreadyExists(mongooseError: { code: number }) {
    return mongooseError && mongooseError.code === 11000;
}
