export class DeviceDTO {
  constructor(
    public id: number,
    public userId: number,
    public deviceName: string,
    public deviceModel: string,
    public room: string,
    public deviceType: string,
    public isActive: boolean,
    public allowOperatorControll: boolean,
    public allowOperatorVisibility: boolean
  ) { }
}
