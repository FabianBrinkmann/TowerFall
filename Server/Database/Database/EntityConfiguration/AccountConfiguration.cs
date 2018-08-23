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
        public void Configure(EntityTypeBuilder<HashedPWAccount> builder)
        {
            builder.HasKey(account => account.User);
        }
    }
}
