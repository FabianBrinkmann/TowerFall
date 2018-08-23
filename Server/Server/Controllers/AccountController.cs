using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Database.Database;
using Database.Models;
using Microsoft.Extensions.DependencyInjection;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly TowerfallContext _context;

        public AccountController(TowerfallContext context)
        {
            _context = context;
            
        }

        // GET: api/Account
        [HttpGet]
        public IEnumerable<HashedPWAccount> GetAccounts()
        {
            return _context.Accounts;
        }

        
    }
}