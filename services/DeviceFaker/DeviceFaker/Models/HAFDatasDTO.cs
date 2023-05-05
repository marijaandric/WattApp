namespace DeviceFaker.Models
{
    public class HAFDatasDTO
    {
        public List<string> dates { get; set; }
        public List<double> datas { get; set; }

        public HAFDatasDTO(List<string> dates, List<double> datas)
        {
            this.dates = dates;
            this.datas = datas;
        }

        public HAFDatasDTO()
        {
        }

    }
}
