import {MetadataKeys, AuthTypes} from "..";

export function NoAuth() {
  return function (target: any, key?: string) {
    let authTypeKey: string = MetadataKeys.AuthType;

    if (key) {
      authTypeKey = `${key}.${MetadataKeys.AuthType}`
    }

    Reflect.defineMetadata(authTypeKey, AuthTypes.NoAuth, target)
  }
}
