import {routeBinder} from "..";

const Get = routeBinder('GET')
const Post = routeBinder('POST')
const Put = routeBinder('PUT')
const Patch = routeBinder('PATCH')
const Delete = routeBinder('DELETE')

export {
  Get,
  Post,
  Put,
  Patch,
  Delete
}
