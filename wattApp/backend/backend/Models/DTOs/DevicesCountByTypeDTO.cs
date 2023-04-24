namespace backend.Models.DTOs
{
    public class DevicesCountByTypeDTO
    {
        public List<string> rooms { get; set; }
        public List<int> count { get; set; }
    }
}
