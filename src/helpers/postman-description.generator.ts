import {getData, MetadataKeys} from "..";

export function postmanDescriptionGenerator(target: any, key?: string): string {
  return getData(MetadataKeys.Description, target, key) ?? ""
}