namespace NoteKeeper.WebApi.Domain;

public class Categoria : Entidade
{
    public string Titulo { get; set; }
    public List<Nota> Notas { get; set; } = [];

    public Categoria(string titulo)
    {
        Titulo = titulo;
    }
}