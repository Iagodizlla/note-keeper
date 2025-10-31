using NoteKeeper.WebApi.Services.Categorias;

namespace NoteKeeper.WebApi.Models;

public abstract record BaseCategoriaRequest(string Titulo);

public record CadastrarCategoriaRequest(string Titulo) : BaseCategoriaRequest(Titulo);
public record CadastrarCategoriaResponse(Guid Id);

public record EditarCategoriaRequest(string Titulo) : BaseCategoriaRequest(Titulo);
public record EditarCategoriaResponse(string Titulo);

public record ExcluirCategoriaRequest(Guid Id);
public record ExcluirCategoriaResponse();

public record SelecionarCategoriasRequest();
public record SelecionarCategoriasResponse(IReadOnlyList<CategoriaDto> Registros);

public record SelecionarCategoriaPorIdRequest(Guid Id);
public record SelecionarCategoriaPorIdResponse(Guid Id, string Titulo);