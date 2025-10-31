namespace NoteKeeper.WebApi.Services.Categorias;

public abstract record BaseCategoriaCommand(string Titulo);

public record CadastrarCategoriaCommand(string Titulo) : BaseCategoriaCommand(Titulo);
public record CadastrarCategoriaResult(Guid Id);

public record EditarCategoriaCommand(Guid Id, string Titulo) : BaseCategoriaCommand(Titulo);
public record EditarCategoriaResult(string Titulo);

public record ExcluirCategoriaCommand(Guid Id);
public record ExcluirCategoriaResult();

public record SelecionarCategoriasQuery();
public record SelecionarCategoriasResult(IReadOnlyList<CategoriaDto> Registros);
public record CategoriaDto(Guid Id, string Titulo);

public record SelecionarCategoriaPorIdQuery(Guid Id);
public record SelecionarCategoriaPorIdResult(Guid Id, string Titulo);