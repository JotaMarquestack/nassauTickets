export default function AcoesGuiche({
  senha, ocupado,
  onChamarProxima, onIniciar, onChamarNovamente, onFinalizar,
}) {
  // Sem senha ativa: a única ação possível é chamar a próxima
  if (!senha) {
    return (
      <div className="atendente-acoes">
        <button type="button" onClick={onChamarProxima} disabled={ocupado}>
          Chamar próxima senha
        </button>
      </div>
    );
  }

  if (senha.estado === 'EM_ATENDIMENTO') {
    return (
      <div className="atendente-acoes">
        <button type="button" onClick={onFinalizar} disabled={ocupado}>
          Finalizar atendimento
        </button>
      </div>
    );
  }

  // CHAMADA ou CHAMADA_NOVAMENTE
  return (
    <div className="atendente-acoes">
      <button type="button" onClick={onIniciar} disabled={ocupado}>
        Iniciar atendimento
      </button>
      <button type="button" onClick={onChamarNovamente} disabled={ocupado}>
        Chamar novamente
      </button>
    </div>
  );
}
