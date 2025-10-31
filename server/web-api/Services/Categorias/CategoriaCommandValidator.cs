using FluentValidation;

namespace NoteKeeper.WebApi.Services.Categorias;

public class CategoriaCommandValidator : AbstractValidator<BaseCategoriaCommand>
{
    public CategoriaCommandValidator()
    {
        RuleFor(x => x.Titulo)
            .NotEmpty().WithMessage("O título é obrigatório")
            .MinimumLength(3).WithMessage("O título deve conter no mínimo 3 caracteres")
            .MaximumLength(30).WithMessage("O título deve conter no máximo 30 caracteres");
    }
}
