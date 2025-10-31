namespace NoteKeeper.WebApi.Models;

public record AutenticarUsuarioRequest(string Email, string Senha);

public record RegistrarUsuarioRequest(string NomeCompleto, string Email, string Senha, string ConfirmarSenha);

public record SairRequest();