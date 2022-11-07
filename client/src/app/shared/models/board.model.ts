import { List } from "./list.model";

export class Board {
  _id: string;
  createdBy: string;
  "name": string;
  "description": string;
  "lists": List[];
  "createdDate": string;
  "updatedAt": string;
  "__v": number


  constructor(id: string, name: string, desc: string, lists: List[]) {
    this._id = id;
    this.name = name;
    this.description = desc;
    this.lists = lists;
  }
}
