using Database.Database.EntityConfiguration;
using Database.Models;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Database.Database
{
    public partial class TowerfallContext : DbContext
    {
        public TowerfallContext(DbContextOptions<TowerfallContext> options)
            :base(options)
        {

        }
        public DbSet<HashedPWAccount> Accounts { get; set; }

        public DbSet<Character> Characters { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AccountConfiguration());
            modelBuilder.ApplyConfiguration(new CharacterConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }
}
