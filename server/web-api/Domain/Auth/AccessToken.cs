namespace NoteKeeper.WebApi.Domain.Auth;

public record AccessToken(
    string Chave,
    DateTime Expiracao,
    UsuarioAutenticado UsuarioAutenticado
);