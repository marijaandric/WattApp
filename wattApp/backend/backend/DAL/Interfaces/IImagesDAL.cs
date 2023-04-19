using backend.Models;

namespace backend.DAL.Interfaces
{
    public interface IImagesDAL
    {
        public List<Images> GetImages();
        public Images GetImage(int imageId);
        public void AddImage(Images image);
        public void UpdateImage(Images image);
        public void DeleteImage(int imageId);
        public bool ImageExists(int imageId);
    }
}
