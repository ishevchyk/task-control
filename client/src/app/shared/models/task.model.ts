export class Task {
  _id: string;
  "content": string;
  "listId": string;
  "createdBy": string;
  "cover": string;
  "comments": string[];
  "createdDate": string;
  "updatedAt": string;
  "__v": number

  constructor(content: string) {
    this.content = content;
  }
}
