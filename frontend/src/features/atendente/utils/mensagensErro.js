export function mensagemDeErro(err) {
  if (err?.offline) {
    return 'Não foi possível conectar ao servidor. Tente novamente.';
  }
  if (err?.status === 401) {
    return 'Usuário ou senha inválidos, ou sessão expirada.';
  }
  if (err?.status === 409) {
    return err.message || 'Esta ação não é permitida para a senha atual.';
  }
  if (err?.status >= 500) {
    return 'Sistema temporariamente indisponível. Tente em instantes.';
  }
  return err?.message || 'Ocorreu um erro inesperado.';
}
