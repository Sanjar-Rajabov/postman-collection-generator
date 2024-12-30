import {MetadataKeys} from "..";

export function Folder(name: string, prefix?: string | null) {
  return function (target: any) {
    Reflect.defineMetadata(MetadataKeys.PostmanFolder, name, target)
    Reflect.defineMetadata(MetadataKeys.Prefix, prefix === undefined ? name.toLowerCase() : prefix, target)
  }
}
