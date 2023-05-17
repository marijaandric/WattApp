import { UserDTO } from "./UserDTO";

export class UserWithPowerUsageDTO {
    user: UserDTO;
    consumption: number;
    production: number;
    stock: number;
  
    constructor(user: UserDTO, consumption: number, production: number, stock: number) {
      this.user = user;
      this.consumption = consumption;
      this.production = production;
      this.stock = stock;
    }
  }