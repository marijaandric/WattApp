using backend.BAL;
using backend.BLL.Interfaces;
using backend.DAL;
using backend.DAL.Interfaces;
using backend.Helpers;
using backend.Models;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.BLL
{
    public class ImagesBL : IImagesBL
    {
        private readonly IImagesDAL _imagesDAL;

        public ImagesBL(IImagesDAL imagesDAL)
        {
            _imagesDAL = imagesDAL;
        }

        public List<Images> GetImages()
        {
            return _imagesDAL.GetImages();
        }

        public Images GetImage(int imageId)
        {
            return _imagesDAL.GetImage(imageId);
        }

        public Images AddImage(Images image)
        {
            return _imagesDAL.AddImage(image);
        }

        public void UpdateImage(Images image)
        {
            _imagesDAL.UpdateImage(image);
        }

        public void DeleteImage(int imageId)
        {
            _imagesDAL.DeleteImage(imageId);
        }

        public bool ImageExists(int id)
        {
            return _imagesDAL.ImageExists(id);
        }
    }

}
