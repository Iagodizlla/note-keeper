using Microsoft.AspNetCore.Identity;

namespace NoteKeeper.WebApi.Domain.Auth;

public class Usuario : IdentityUser<Guid>
{
    public string FullName { get; set; }
    public Guid AccessTokenVersionId { get; set; } = Guid.Empty;

    public Usuario()
    {
        Id = Guid.NewGuid();
        EmailConfirmed = true;
    }
}

public class Cargo : IdentityRole<Guid>;

public record UsuarioAutenticado(
    Guid Id,
    string NomeCompleto,
    string Email
);
