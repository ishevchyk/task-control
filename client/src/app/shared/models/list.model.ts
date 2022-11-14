export class List {
  _id: string;
  cover: string;
  name: string;
  "tasks": Object[];
  "boardId": string;
  "createdBy": string;
  "createdDate": string;
  "updatedAt": string;
  "__v": number

  constructor(name: string, cover: string) {
    this.name = name;
    this.cover = cover;
  }
}
