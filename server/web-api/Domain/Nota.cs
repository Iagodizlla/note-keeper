namespace NoteKeeper.WebApi.Domain;

public class Nota : Entidade
{
    public string Titulo { get; set; }
    public string Conteudo { get; set; }
    public bool Arquivada { get; set; }

    public Guid CategoriaId { get; set; }
    public Categoria? Categoria { get; set; }

    protected Nota()
    {
    }

    public Nota(string titulo, string conteudo, Guid categoriaId) : this()
    {
        Titulo = titulo;
        Conteudo = conteudo;
        CategoriaId = categoriaId;
    }
}
