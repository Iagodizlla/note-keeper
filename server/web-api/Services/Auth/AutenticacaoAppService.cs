using FluentResults;
using Microsoft.AspNetCore.Identity;
using NoteKeeper.WebApi.Domain.Auth;
using NoteKeeper.WebApi.Orm;

namespace NoteKeeper.WebApi.Services.Auth;

public class AutenticacaoAppService(
    AppDbContext dbContext,
    AccessTokenProvider accessTokenProvider,
    UserManager<Usuario> userManager
)
{
    public async Task<Result<AccessToken>> RegistrarAsync(RegistrarUsuarioCommand command)
    {
        if (!command.Senha.Equals(command.ConfirmarSenha))
            return Result.Fail(ResultadosErro.RequisicaoInvalidaErro("A confirmação de senha falhou."));

        var usuario = new Usuario
        {
            FullName = command.NomeCompleto,
            UserName = command.Email,
            Email = command.Email
        };

        var usuarioResult = await userManager.CreateAsync(usuario, command.Senha);

        if (!usuarioResult.Succeeded)
        {
            var erros = usuarioResult.Errors.Select(err =>
            {
                return err.Code switch
                {
                    "DuplicateUserName" => "Já existe um usuário com esse nome.",
                    "DuplicateEmail" => "Já existe um usuário com esse e-mail.",
                    "PasswordTooShort" => "A senha é muito curta.",
                    "PasswordRequiresNonAlphanumeric" => "A senha deve conter pelo menos um caractere especial.",
                    "PasswordRequiresDigit" => "A senha deve conter pelo menos um número.",
                    "PasswordRequiresUpper" => "A senha deve conter pelo menos uma letra maiúscula.",
                    "PasswordRequiresLower" => "A senha deve conter pelo menos uma letra minúscula.",
                    _ => err.Description
                };
            });

            return Result.Fail(ResultadosErro.RequisicaoInvalidaErro(erros));
        }

        var accessToken = accessTokenProvider.GerarAccessToken(usuario);

        if (accessToken is null)
            return Result.Fail(ResultadosErro.ExcecaoInternaErro(new Exception("Falha ao gerar token de acesso.")));

        return Result.Ok(accessToken);
    }

    public async Task<Result<AccessToken>> AutenticarAsync(AutenticarUsuarioCommand command)
    {
        var usuarioEncontrado = await userManager.FindByEmailAsync(command.Email);

        if (usuarioEncontrado is null)
            return Result.Fail(ResultadosErro.RegistroNaoEncontradoErro("Não foi possível encontrar o usuário requisitado."));

        var credenciaisValidas = await userManager.CheckPasswordAsync(
            usuarioEncontrado,
            command.Senha
        );

        if (!credenciaisValidas)
            return Result.Fail(ResultadosErro.RequisicaoInvalidaErro("Login ou senha incorretos."));

        var accessToken = accessTokenProvider.GerarAccessToken(usuarioEncontrado);

        return Result.Ok(accessToken);
    }

    public async Task<Result> SairAsync(SairCommand command, CancellationToken ct)
    {
        var usuarioEncontrado = dbContext.Users.Find(command.UsuarioId);

        if (usuarioEncontrado is null)
            return Result.Fail(ResultadosErro.RegistroNaoEncontradoErro("Não foi possível encontrar o usuário requisitado."));

        usuarioEncontrado.AccessTokenVersionId = Guid.NewGuid();

        await dbContext.SaveChangesAsync(ct);

        return Result.Ok();
    }
}
