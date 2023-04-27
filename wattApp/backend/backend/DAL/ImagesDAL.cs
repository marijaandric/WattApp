
using backend.BAL;
using backend.Context;
using backend.DAL.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.DAL
{

    public class ImagesDAL : IImagesDAL
    {
        private readonly AppDbContext _context;

        public ImagesDAL(AppDbContext context)
        {
            _context = context;
        }

        public List<Images> GetImages()
        {
            return _context.Images.ToList();
        }

        public Images GetImage(int imageId)
        {
            return _context.Images.FirstOrDefault(i => i.Id == imageId);
        }

        public Images AddImage(Images image)
        {
            _context.Images.Add(image);
            _context.SaveChanges();
            return image;
        }

        public void UpdateImage(Images image)
        {
            _context.Entry(image).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteImage(int imageId)
        {
            var image = GetImage(imageId);
            if (image != null)
            {
                _context.Images.Remove(image);
                _context.SaveChanges();
            }
        }

        public bool ImageExists(int id)
        {
            return _context.Images.Any(e => e.Id == id);
        }
    }

}
