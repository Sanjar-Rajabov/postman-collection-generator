import * as fs from "fs";
import {getMetadata, hasMetadata} from "reflect-metadata/no-conflict";
import {
  postmanAuthGenerator,
  postmanUrlGenerator,
  postmanBodyGenerator,
  postmanHeaderGenerator,
  postmanResponseGenerator,
  postmanDescriptionGenerator,
  splitCamelCase, ucfirst,
  getData,
  MetadataKeys,
  PostmanModel
} from "./";

export class Postman {
  static async generate(controllersPath: string, collection: any) {
    const paths = fs.readdirSync(controllersPath)

    for (let path of paths) {
      let f = fs.lstatSync(controllersPath + path)
      if (f.isFile()) {

        let items = await import(`.${controllersPath.replace('src/', '') + path}`)

        for (let key in items) {
          let controller = items[key]

          if (!hasMetadata(MetadataKeys.PostmanFolder, controller)) {
            continue
          }


          let folder: { name: string, item: any[], auth: any, description: string } = {
            name: ucfirst(getMetadata(MetadataKeys.PostmanFolder, controller)),
            item: [],
            auth: postmanAuthGenerator(controller),
            description: postmanDescriptionGenerator(controller)
          }

          let properties = Object.getOwnPropertyNames(controller)

          for (let name of properties) {
            let property = controller[name]

            if (property instanceof Function && hasMetadata(`${name}.${MetadataKeys.Method}`, controller)) {
              let request = {
                method: this.getMethod(controller, name),
                header: postmanHeaderGenerator(controller, name),
                url: postmanUrlGenerator(controller, name, collection.name),
                auth: postmanAuthGenerator(controller, name),
                body: postmanBodyGenerator(controller, name),
                description: postmanDescriptionGenerator(controller, name)
              }
              folder.item.push({
                name: ucfirst(splitCamelCase(name)),
                request: request,
                response: postmanResponseGenerator(controller, name, request)
              })
            }
          }

          collection.item.push(folder)
        }
      } else if (f.isDirectory()) {
        let folder: PostmanModel = {
          name: ucfirst(path),
          item: []
        }
        await Postman.generate(`${controllersPath}${path}/`, folder)

        collection.item.push(folder)
      }
    }
  }

  private static getMethod(target: any, key: string) {
    return getData(MetadataKeys.Method, target, key).toUpperCase()
  }

}
