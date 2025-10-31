using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NoteKeeper.WebApi.Domain;
using NoteKeeper.WebApi.Domain.Auth;

namespace NoteKeeper.WebApi.Orm;

public class AppDbContext(DbContextOptions options, ITenantProvider? tenantProvider = null) 
    : IdentityDbContext<Usuario, Cargo, Guid>(options)
{
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Nota> Notas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        if (tenantProvider is not null)
        {
            modelBuilder.Entity<Categoria>().HasQueryFilter(x => x.UsuarioId == tenantProvider.UsuarioId);
            modelBuilder.Entity<Nota>().HasQueryFilter(x => x.UsuarioId == tenantProvider.UsuarioId);
        }

        modelBuilder.Entity<Categoria>()
            .HasOne(c => c.Usuario)
            .WithMany()
            .HasForeignKey(c => c.UsuarioId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Nota>()
            .HasOne(n => n.Categoria)
            .WithMany(c => c.Notas)
            .HasForeignKey(n => n.CategoriaId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Nota>()
            .HasOne(n => n.Usuario)
            .WithMany()
            .HasForeignKey(n => n.UsuarioId)
            .OnDelete(DeleteBehavior.NoAction);

        base.OnModelCreating(modelBuilder);
    }
}
