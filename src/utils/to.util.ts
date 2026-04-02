export default function fromFlatFormDataObjectToJSObject<T = any>(obj: Record<string, string>): T {
  const jsObj: Record<any, any> = {};

  for(let path in obj) {
    const keys: string[] = path.split(".");
    const formDataValue: any = obj[path];

    if(keys.length === 1) {
      jsObj[path] = parseValue(obj[path]);
    } else {
      createShapeAndAddValue(keys, jsObj, formDataValue);
    }
  }

  return jsObj;
};

function createShapeAndAddValue(keys: string[], jsObj: Record<any, any>, formDataValue: any) {
  for(let index: number = 0; index < keys.length - 1; index++) {
    const key: string = keys[index];

    if(!Object.hasOwn(jsObj, key)) {
      jsObj[key] = {};
    }

    jsObj = jsObj[key];
  }

  jsObj[keys[keys.length - 1]] = parseValue(formDataValue);
};

function parseValue(value: string): any {
  if(isStrArray(value)) {
    return JSON.parse(value);
  } else if(isStrFloat(value)) {
    return parseFloat(value);
  } else if(isStrInteger(value)) {
    return parseInt(value); 
  }

  return value;
};

function isStrFloat(value: string): boolean {
  return /^[-]?[0-9]*?[.][0-9]+$/.test(value);
};

function isStrInteger(value: string): boolean {
  return /^[-]?[0-9]+$/.test(value);
};

function isStrArray(value: string): boolean {
  return value[0] === "[" && value[value.length - 1] === "]";
};
