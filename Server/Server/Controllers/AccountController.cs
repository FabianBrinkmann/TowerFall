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
using Entities.Models;
using Utility.Hash;
using Database.Database.Extensions;

namespace Server.Controllers
{
	[Route( "api/v1" )]
	[ApiController]
	public class AccountController : ControllerBase
	{
		private readonly TowerfallContext _context;
		private readonly int SALT_LENGTH = 512;

		public AccountController( TowerfallContext context )
		{
			_context = context;

		}

		// GET: api/Account
		[HttpGet]
		public IEnumerable<HashedPWAccount> GetAccounts()
		{
			return _context.Accounts;
		}

		[Route( "login" )]
		[HttpPost]
		public async Task<IActionResult> Login( [FromBody] Account account )
		{
			if ( !_context.Accounts.Validate( account ) )
				return Unauthorized();
			return Ok(); //TODO return token
		}

		[Route( "register" )]
		[HttpPost]
		public async Task<IActionResult> Register( [FromBody] Account account )
		{
			//TODO Registerfunktion
			if ( !_context.Accounts.UsernameExists( account.User ) )
				_context.Accounts.AddAccount( account, SALT_LENGTH );
			await _context.SaveChangesAsync();
			return Ok(); 
			//TODO return token
			//TODO validate
		}
	}
}