using NoteKeeper.WebApi.Domain.Auth;

namespace NoteKeeper.WebApi.Domain;

public abstract class Entidade
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CriadaEmUtc { get; set; } = DateTime.UtcNow;
    public DateTime? ExcluidaEmUtc { get; set; } = null;
    public bool Excluida { get; set; } = false;

    public Guid UsuarioId { get; set; }
    public Usuario? Usuario { get; set; }
}
