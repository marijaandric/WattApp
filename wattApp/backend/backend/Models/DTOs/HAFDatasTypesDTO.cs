namespace backend.Models.DTOs
{
    public class HAFDatasTypesDTO
    {

        public List<string> dates { get; set; }
        public List<double> totaldatasConsumer { get; set; }
        public List<double> totaldatasProducer { get; set; }
        public List<double> totaldatasStock { get; set; }
        public HAFDatasTypesDTO(List<string> dates, List<double> proba, List<double> totaldatasProducer, List<double> totaldatasStock)
        {
            this.dates = dates;
            this.totaldatasConsumer = proba;
            this.totaldatasProducer = totaldatasProducer;
            this.totaldatasStock = totaldatasStock;
        }

        public HAFDatasTypesDTO()
        {
        }

    }
}
