export class DeviceDTO {
  constructor(
    public id: number,
    public deviceId: number,
    public userId: number,
    public deviceName: string,
    public room: string,
    public deviceType: string
  ) { }
}
