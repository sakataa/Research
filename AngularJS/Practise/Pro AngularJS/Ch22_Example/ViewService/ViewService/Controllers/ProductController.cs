using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ViewService.Models;

namespace ViewService.Controllers
{
    public class ProductController : ApiController
    {
        readonly IEnumerable<Product> _products = new List<Product>
        {
            new Product { Id = 1, Name = "Tomato Soup", Category = "Groceries", Price = 1 },
            new Product { Id = 2, Name = "Yo-yo", Category = "Toys", Price = 3.75M },
            new Product { Id = 3, Name = "Hammer", Category = "Hardware", Price = 16.99M },
            new Product { Id = 4, Name = "Apples", Category = "Fruit", Price = 1.20M },
            new Product { Id = 5, Name = "Bananas", Category = "Fruit", Price = 2.42M },
            new Product { Id = 6, Name = "Pears", Category = "Fruit", Price = 2.02M },
            new Product { Id = 7, Name = "Tuna", Category = "Fish", Price = 20.45M },
            new Product { Id = 8, Name = "Salmon", Category = "Fish", Price = 17.93M },
            new Product { Id = 9, Name = "Trout", Category = "Fish", Price = 12.93M }
        };
        public IEnumerable<Product> GetProducts()
        {
            return _products;
        }

        public IHttpActionResult GetProduct(int id)
        {
            var product = _products.FirstOrDefault((p) => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        public IHttpActionResult PostProduct(Product product)
        {
            product.Id = _products.Max(p => p.Id) + 1;
            _products.ToList().Add(product);

            var uri = new Uri(Url.Link(
                             "DefaultApi",
                             new { id = product.Id }));
            return Created(uri, product);
        }

        public IHttpActionResult PutProduct(int id, Product product)
        {
            if (ModelState.IsValid && id == product.Id)
            {
                Product productToUpdate = _products.FirstOrDefault(p => p.Id == id);
                productToUpdate = product;
                return Ok(productToUpdate);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        public IHttpActionResult DeleteProduct(int id, Product product)
        {
            Product productToDelete = _products.FirstOrDefault(p => p.Id == id);
            _products.ToList().Remove(productToDelete);
            return Ok(productToDelete);
        }
    }
}
