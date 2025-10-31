# NoteKeeper

![imagem](https://i.imgur.com/CMXvJp9.png)

## Dependências

- Node.js >= 20.19 (client)
- .NET 8 (server)
- SQL Server 2022 (server)

## Configuração (Desenvolvimento)

### Servidor

Para executar a aplicação na pasta `server`, é necessário incluir dentro do projeto C# **NoteKeeper.WebApi** as seguintes variáveis de ambiente:

```json
{
  "SQL_CONNECTION_STRING": "Data Source=(LocalDB)\\MSSQLLocalDB;Initial Catalog=NoteKeeperDb;Integrated Security=True",
  "JWT_GENERATION_KEY": "SuaChaveSuperSecretaDe32Bytes",
  "JWT_AUDIENCE_DOMAIN": "https://localhost:4200"
}
```
A variável de ambiente pode se incluída de diversas maneiras, inclusive durante a execução do projeto pelo terminal. Para conveniência, utilizamos **UserSecrets**.

Você pode saber mais sobre a configuração do ambiente aqui: (https://learn.microsoft.com/pt-br/aspnet/core/security/app-secrets?view=aspnetcore-8.0&tabs=windows) 

Para executar, com um emulador de terminal aberto (cmd/PowerShell/bash/zsh) na pasta `server` digite:

```
dotnet run --project web-api
```

### Cliente

Com o emulador de terminal aberto na pasta `client`:

Instale as dependências do npm:

```
npm install
```

Execute a aplicação:

```
npm start
```

O cliente está configurado para se comunicar com o servidor em ambiente de desenvolvimento, configurações adicionais serão necessárias para executar a aplicação em produção.
