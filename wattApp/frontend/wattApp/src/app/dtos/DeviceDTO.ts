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
    public allowOperatorVisibility: boolean,
    public imageId: number,
    public power:any,
    public model:any,
    public manufacturer:any,
    public manufacturingYear:any,
    public connectedDevices: any[]
  ) { }
}
