const ROTULOS = {
  CHAMADA: 'Chamada',
  CHAMADA_NOVAMENTE: 'Chamada novamente',
  EM_ATENDIMENTO: 'Em atendimento',
};

export default function SenhaAtual({ senha }) {
  if (!senha) {
    return (
      <section className="atendente-senha">
        <p>Nenhuma senha em atendimento.</p>
      </section>
    );
  }
  // Mostra SOMENTE a senha ativa. Nunca renderize a fila nem a próxima.
  return (
    <section className="atendente-senha" aria-live="polite">
      <span>{senha.tipo}</span>
      <strong className="atendente-senha-numero">{senha.numero}</strong>
      <span>{ROTULOS[senha.estado] ?? senha.estado}</span>
    </section>
  );
}
