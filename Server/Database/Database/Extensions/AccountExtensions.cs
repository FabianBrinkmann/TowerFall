using Database.Models;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Utility.Hash;

namespace Database.Database.Extensions
{
	/// <summary>
	/// Provides common databaseoperations
	/// </summary>
	public static class AccountExtensions
	{
		/// <summary>
		/// Adds and Account. Doesn't catch exceptions if Username already exists
		/// </summary>
		/// <param name="account"></param>
		/// <param name="saltLength"></param>
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

		/// <summary>
		/// Checks if the provided Username already exists
		/// </summary>
		/// <param name="userName"></param>
		/// <returns></returns>
		public static bool UsernameExists( this DbSet<HashedPWAccount> dbset, string userName )
		{
			return dbset.Find( userName ) != null;
		}

		/// <summary>
		/// Checks if the provided account matches the saved account
		/// </summary>
		/// <param name="dbset"></param>
		/// <param name="account"></param>
		/// <returns></returns>
		public static bool Validate(this DbSet<HashedPWAccount> dbset, Account account )
		{
			var savedUser = dbset.Find( account.User );
			return ValidateUser( account, savedUser );
		}

		private static bool ValidateUser( Account account, HashedPWAccount savedUser )
		{
			if ( savedUser == null )
				return false;
			var salt = savedUser.Salt;
			var hash = SHA256Utility.ComputeHash( account.Password + salt );
			return hash == savedUser.Hash;
		}

		/// <summary>
		/// Checks async if the provided account matches the saved account
		/// </summary>
		/// <param name="dbset"></param>
		/// <param name="account"></param>
		/// <returns></returns>
		public static async Task<bool> ValidateAsync(this DbSet<HashedPWAccount> dbset, Account account )
		{
			var savedUser = await dbset.FindAsync( account.User );
			return ValidateUser( account, savedUser );
		}
	}
}
