using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoteKeeper.WebApi.Models;
using NoteKeeper.WebApi.Services.Categorias;

namespace NoteKeeper.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("categorias")]
public class CategoriaController(CategoriaAppService categoriaService) : Controller
{
    [HttpPost]
    public async Task<ActionResult<CadastrarCategoriaResponse>> Cadastrar(
          CadastrarCategoriaRequest request,
          CancellationToken cancellationToken
      )
    {
        var command = new CadastrarCategoriaCommand(request.Titulo);

        var result = await categoriaService.InserirAsync(command, cancellationToken);

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

        var response = new CadastrarCategoriaResponse(result.Value.Id);

        return Created(string.Empty, response);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<EditarCategoriaResponse>> Editar(Guid id, EditarCategoriaRequest request, CancellationToken cancellationToken)
    {
        var command = new EditarCategoriaCommand(id, request.Titulo);

        var result = await categoriaService.EditarAsync(command, cancellationToken);

        if (result.IsFailed)
            return BadRequest();

        var response = new EditarCategoriaResponse(result.Value.Titulo);

        return Ok(response);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Excluir(Guid id, CancellationToken cancellationToken)
    {
        var command = new ExcluirCategoriaCommand(id);

        var result = await categoriaService.ExcluirAsync(command, cancellationToken);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }

    [HttpGet]
    public async Task<ActionResult<SelecionarCategoriasResponse>> SelecionarRegistros(
        [FromQuery] SelecionarCategoriasRequest? request,
        CancellationToken cancellationToken
    )
    {
        var query = new SelecionarCategoriasQuery();

        var result = await categoriaService.SelecionarTodosAsync(query, cancellationToken);

        if (result.IsFailed)
            return BadRequest();

        var response = new SelecionarCategoriasResponse(result.Value.Registros);

        return Ok(response);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<SelecionarCategoriaPorIdResponse>> SelecionarRegistroPorId(Guid id, CancellationToken cancellationToken)
    {
        var query = new SelecionarCategoriaPorIdQuery(id);

        var result = await categoriaService.SelecionarPorIdAsync(query, cancellationToken);

        if (result.IsFailed)
            return NotFound(id);

        var response = new SelecionarCategoriaPorIdResponse(result.Value.Id, result.Value.Titulo);

        return Ok(response);
    }
}
