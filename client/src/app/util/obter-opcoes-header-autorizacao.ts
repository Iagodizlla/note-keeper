import { AccessTokenModel } from '../components/auth/auth.models';

export function obterOpcoesHeaderAutorizacao(accessToken?: AccessTokenModel) {
  if (!accessToken) throw new Error('O token de acesso não foi informado.');

  return {
    headers: {
      Authorization: 'Bearer ' + accessToken.chave,
    },
  };
}