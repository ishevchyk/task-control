export class List {
  _id: string;
  "name": string;
  "tasks": Object[];
  "boardId": string;
  "createdBy": string;
  "createdDate": string;
  "updatedAt": string;
  "__v": number

  constructor(name: string) {
    this.name = name;
  }
}
