export class UserDTO {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public token: string,
    public address: string,
    public role: string,
    public x: number,
    public y:number,
    public area:string,
    public imageId: number
  ) { }
}
