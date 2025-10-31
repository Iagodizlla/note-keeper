using FluentResults;
using Microsoft.AspNetCore.Mvc;
using NoteKeeper.WebApi.Domain.Auth;
using NoteKeeper.WebApi.Models;
using NoteKeeper.WebApi.Services.Auth;

namespace NoteKeeper.WebApi.Controllers;

[ApiController]
[Route("auth")]
public class AutenticacaoController(AutenticacaoAppService autenticacaoService, ITenantProvider tenantProvider) : Controller
{
    [HttpPost("login")]
    public async Task<ActionResult<AccessToken>> Autenticar(AutenticarUsuarioRequest request)
    {
        var command = new AutenticarUsuarioCommand(request.Email, request.Senha);

        var result = await autenticacaoService.AutenticarAsync(command);

        if (result.IsFailed)
        {
            if (result.HasError(e => e.HasMetadataKey("TipoErro")))
            {
                var errosDeValidacao = result.Errors
                    .SelectMany(e => e.Reasons.OfType<IError>())
                    .Select(e => e.Message);

                return BadRequest(errosDeValidacao);
            }

            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        var accessKey = result.Value;

        return Ok(accessKey);
    }

    [HttpPost("registro")]
    public async Task<ActionResult<AccessToken>> Registrar(RegistrarUsuarioRequest request)
    {
        var command = new RegistrarUsuarioCommand(request.NomeCompleto, request.Email, request.Senha, request.ConfirmarSenha);

        var result = await autenticacaoService.RegistrarAsync(command);

        if (result.IsFailed)
        {
            if (result.HasError(e => e.HasMetadataKey("TipoErro")))
            {
                var errosDeValidacao = result.Errors
                    .SelectMany(e => e.Reasons.OfType<IError>())
                    .Select(e => e.Message);

                return BadRequest(errosDeValidacao);
            }

            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        var accessKey = result.Value;

        return Ok(accessKey);
    }

    [HttpPost("sair")]
    public async Task<ActionResult<AccessToken>> Sair(CancellationToken ct)
    {
        var command = new SairCommand(tenantProvider.UsuarioId.GetValueOrDefault());

        var result = await autenticacaoService.SairAsync(command, ct);

        if (result.IsFailed)
        {
            if (result.HasError(e => e.HasMetadataKey("TipoErro")))
            {
                var errosDeValidacao = result.Errors
                    .SelectMany(e => e.Reasons.OfType<IError>())
                    .Select(e => e.Message);

                return BadRequest(errosDeValidacao);
            }

            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        return NoContent();
    }
}
