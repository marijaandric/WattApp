namespace backend.Models.DTOs
{
    public class WeekDatasDTO
    {
        public List<string> dates { get; set; }
        public List<double> datas { get; set; }

        public WeekDatasDTO(List<string> dates, List<double> datas)
        {
            this.dates = dates;
            this.datas = datas;
        }
    }
}
