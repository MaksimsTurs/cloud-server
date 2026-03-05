export const isUndefined = (something: any): something is undefined => something === undefined;

export const isNull = (something: any): something is null => something === null;

export const isStrEmpty = (something: string): boolean => !something.length;
