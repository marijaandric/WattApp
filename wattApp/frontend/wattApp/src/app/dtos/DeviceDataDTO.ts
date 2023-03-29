export class DeviceDataDTO {
  constructor(
    public id: number,
    public deviceId: number,
    public day: number,
    public month: number,
    public year: number,
    public time: string,
    public powerUsage: number
  ) { }
}
