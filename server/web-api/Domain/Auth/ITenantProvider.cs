namespace NoteKeeper.WebApi.Domain.Auth;

public interface ITenantProvider
{
    Guid? UsuarioId { get; }
}