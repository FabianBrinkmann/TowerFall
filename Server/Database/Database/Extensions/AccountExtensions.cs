﻿using Database.Models;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Utility.Hash;

namespace Database.Database.Extensions
{
	public static class AccountExtensions
	{
		public static void AddAccount( this DbSet<HashedPWAccount> dbset, Account account, int saltLength = 512 )
		{
			var salt = Salt.GenerateSalt( saltLength );
			HashedPWAccount hashedPWAccount = new HashedPWAccount
			{
				User = account.User,
				Salt = salt,
				Hash = SHA256Utility.ComputeHash( account.Password + salt )
			};
			dbset.Add( hashedPWAccount );
		}

		public static bool UsernameExists( this DbSet<HashedPWAccount> dbset, string userName )
		{
			return dbset.Find( userName ) != null;
		}

		public static bool Validate(this DbSet<HashedPWAccount> dbset, Account account )
		{
			var savedUser = dbset.Find( account.User );
			if ( savedUser == null )
				return false;
			var salt = savedUser.Salt;
			var hash = SHA256Utility.ComputeHash( account.Password + salt );
			return hash == savedUser.Hash;
		}
	}
}