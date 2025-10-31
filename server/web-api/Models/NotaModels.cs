using NoteKeeper.WebApi.Services.Categorias;
using NoteKeeper.WebApi.Services.Notas;

namespace NoteKeeper.WebApi.Models;

public abstract record BaseNotaRequest(string Titulo, string Conteudo, Guid CategoriaId);

public record CadastrarNotaRequest(string Titulo, string Conteudo, Guid CategoriaId) : BaseNotaRequest(Titulo, Conteudo, CategoriaId);
public record CadastrarNotaResponse(Guid Id);

public record EditarNotaRequest(string Titulo, string Conteudo, Guid CategoriaId) : BaseNotaRequest(Titulo, Conteudo, CategoriaId);
public record EditarNotaResponse(string Titulo, string Conteudo, Guid CategoriaId);

public record ExcluirNotaRequest(Guid Id);
public record ExcluirNotaResponse();

public record SelecionarNotasRequest();
public record SelecionarNotasResponse(IReadOnlyList<NotaDto> Registros);

public record SelecionarNotaPorIdRequest(Guid Id);
public record SelecionarNotaPorIdResponse(Guid Id, string Titulo, string Conteudo, CategoriaDto Categoria);