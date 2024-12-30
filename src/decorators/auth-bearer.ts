import {MetadataKeys, AuthTypes} from "..";

export function AuthBearer(bearerToken: string = '{{token}}') {
  return function (target: any, key?: string) {
    let authTypeKey: string = MetadataKeys.AuthType
    let authTokenKey: string = MetadataKeys.AuthToken

    if (key) {
      authTypeKey = `${key}.${MetadataKeys.AuthType}`
      authTokenKey = `${key}.${MetadataKeys.AuthToken}`
    }

    Reflect.defineMetadata(authTypeKey, AuthTypes.Bearer, target)
    Reflect.defineMetadata(authTokenKey, bearerToken, target)
  }
}
