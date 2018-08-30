using Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Database.Database.EntityConfiguration
{
	public class AccountConfiguration : IEntityTypeConfiguration<HashedPWAccount>
	{
		/// <summary>
		/// Builds the Database relations and columns for type HashedPWAccount
		/// </summary>
		/// <param name="builder"></param>
		public void Configure( EntityTypeBuilder<HashedPWAccount> builder )
		{
			builder.HasKey( account => account.User );
			builder.Property( a => a.Hash ).HasColumnName( "HashedPassword" );
			builder.Ignore( a => a.Password );
		}
	}
}
