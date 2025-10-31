namespace NoteKeeper.WebApi.Services.Auth;

public record AutenticarUsuarioCommand(string Email, string Senha);

public record RegistrarUsuarioCommand(string NomeCompleto, string Email, string Senha, string ConfirmarSenha);

public record SairCommand(Guid UsuarioId);