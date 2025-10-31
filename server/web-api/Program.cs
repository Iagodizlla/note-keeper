using FluentValidation;
using Microsoft.EntityFrameworkCore;
using NoteKeeper.WebApi.Config;
using NoteKeeper.WebApi.Orm;
using NoteKeeper.WebApi.Services.Auth;
using NoteKeeper.WebApi.Services.Categorias;
using NoteKeeper.WebApi.Services.Notas;

namespace NoteKeeper.WebApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Injeção de Dependências
        builder.Services.AddIdentityProviderConfig(builder.Configuration);

        builder.Services.AddScoped<CategoriaAppService>();
        builder.Services.AddScoped<NotaAppService>();
        builder.Services.AddScoped<AutenticacaoAppService>();

        builder.Services.AddCamadaInfraestruturaOrm(builder.Configuration);

        builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly);

        builder.Services.AddSwaggerConfig();

        builder.Services.AddControllers();

        var app = builder.Build();

        // Migrações do EntityFramework
        if (app.Environment.IsDevelopment())
        {
            var scope = app.Services.CreateScope();

            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            dbContext.Database.Migrate();
        }

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseCors(policy =>
            {
                policy
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        }

        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
