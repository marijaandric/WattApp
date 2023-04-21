using backend.Models;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.BLL.Interfaces
{
    public interface IImagesBL
    {
        List<Images> GetImages();
        Images GetImage(int imageId);
        Images AddImage(Images image);
        void UpdateImage(Images image);
        void DeleteImage(int imageId);
        bool ImageExists(int id);
    }

}
