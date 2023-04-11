namespace backend.Models.DTOs
{
    public class WeekDatasTypesDTO
    {

        public List<string> dates { get; set; }
        public List<double> totaldatasConsumer { get; set; }
        public List<double> totaldatasProducer { get; set; }
        public List<double> totaldatasStock { get; set; }
        public WeekDatasTypesDTO(List<string> dates, List<double> proba, List<double> totaldatasProducer, List<double> totaldatasStock)
        {
            this.dates = dates;
            this.totaldatasConsumer = proba;
            this.totaldatasProducer = totaldatasProducer;
            this.totaldatasStock = totaldatasStock;
        }

        
    }
}
