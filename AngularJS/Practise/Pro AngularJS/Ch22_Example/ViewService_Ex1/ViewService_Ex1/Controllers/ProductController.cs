using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ViewService_Ex1.Models;

namespace ViewService_Ex1.Controllers
{
    public class ProductController : ApiController
    {
        Product[] products = new Product[]
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
            return products;
        }

        public IHttpActionResult GetProduct(int id)
        {
            var product = products.FirstOrDefault((p) => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        
    }
}
