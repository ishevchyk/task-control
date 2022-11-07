export class User {
  constructor(
    public id: string,
    public email: string,
    public username: string,
    public firstname: string,
    public lastname: string,
    public token: string,
  ) {}
}
