using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoteKeeper.WebApi.Models;
using NoteKeeper.WebApi.Services.Notas;

namespace NoteKeeper.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("notas")]
public class NotaController(NotaAppService notaService) : Controller
{
    [HttpPost]
    public async Task<ActionResult<CadastrarNotaResponse>> Cadastrar(
        CadastrarNotaRequest request,
        CancellationToken cancellationToken
    )
    {
        var command = new CadastrarNotaCommand(request.Titulo, request.Conteudo, request.CategoriaId);

        var result = await notaService.InserirAsync(command, cancellationToken);

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

        var response = new CadastrarNotaResponse(result.Value.Id);

        return Created(string.Empty, response);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<EditarNotaResponse>> Editar(Guid id, EditarNotaRequest request, CancellationToken cancellationToken)
    {
        var command = new EditarNotaCommand(id, request.Titulo, request.Conteudo, request.CategoriaId);

        var result = await notaService.EditarAsync(command, cancellationToken);

        if (result.IsFailed)
            return BadRequest();

        var response = new EditarNotaResponse(result.Value.Titulo, result.Value.Conteudo, result.Value.CategoriaId);

        return Ok(response);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Excluir(Guid id, CancellationToken cancellationToken)
    {
        var command = new ExcluirNotaCommand(id);

        var result = await notaService.ExcluirAsync(command, cancellationToken);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }

    [HttpGet]
    public async Task<ActionResult<SelecionarNotasResponse>> SelecionarRegistros(
        [FromQuery] SelecionarNotasRequest? request,
        CancellationToken cancellationToken
    )
    {
        var query = new SelecionarNotasQuery();

        var result = await notaService.SelecionarTodosAsync(query, cancellationToken);

        if (result.IsFailed)
            return BadRequest();

        var response = new SelecionarNotasResponse(result.Value.Registros);

        return Ok(response);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<SelecionarNotaPorIdResponse>> SelecionarRegistroPorId(Guid id, CancellationToken cancellationToken)
    {
        var query = new SelecionarNotaPorIdQuery(id);

        var result = await notaService.SelecionarPorIdAsync(query, cancellationToken);

        if (result.IsFailed)
            return NotFound(id);

        var response = new SelecionarNotaPorIdResponse(
            result.Value.Id,
            result.Value.Titulo,
            result.Value.Conteudo,
            result.Value.Categoria
        );

        return Ok(response);
    }
}
