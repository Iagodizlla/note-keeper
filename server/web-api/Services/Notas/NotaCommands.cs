using NoteKeeper.WebApi.Services.Categorias;

namespace NoteKeeper.WebApi.Services.Notas;

public abstract record BaseNotaCommand(string Titulo, string Conteudo, Guid CategoriaId);

public record CadastrarNotaCommand(string Titulo, string Conteudo, Guid CategoriaId) : BaseNotaCommand(Titulo, Conteudo, CategoriaId);
public record CadastrarNotaResult(Guid Id);

public record EditarNotaCommand(Guid Id, string Titulo, string Conteudo, Guid CategoriaId) : BaseNotaCommand(Titulo, Conteudo, CategoriaId);
public record EditarNotaResult(string Titulo, string Conteudo, Guid CategoriaId);

public record ExcluirNotaCommand(Guid Id);
public record ExcluirNotaResult();

public record SelecionarNotasQuery();
public record SelecionarNotasResult(IReadOnlyList<NotaDto> Registros);
public record NotaDto(Guid Id, string Titulo, string Conteudo, string Categoria);

public record SelecionarNotaPorIdQuery(Guid Id);
public record SelecionarNotaPorIdResult(Guid Id, string Titulo, string Conteudo, CategoriaDto Categoria);