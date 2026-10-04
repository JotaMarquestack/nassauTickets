import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useGuiche } from '../hooks/useGuiche';
import SenhaAtual from '../components/SenhaAtual';
import AcoesGuiche from '../components/AcoesGuiche';
import MensagemErro from '../components/MensagemErro';

export default function GuichePage() {
  const { sessao, sair } = useAuth();
  const navigate = useNavigate();
  const guiche = useGuiche();

  function handleSair() {
    sair();
    navigate('/atendente/login', { replace: true });
  }

  return (
    <main className="atendente-guiche">
      <header className="atendente-header">
        <div>
          <strong>Guichê {sessao.guiche?.numero}</strong>
          <span> · {sessao.atendente?.nome}</span>
        </div>
        <button type="button" onClick={handleSair}>Sair</button>
      </header>

      {guiche.carregando ? (
        <p>Carregando...</p>
      ) : (
        <>
          <SenhaAtual senha={guiche.senha} />
          {guiche.aviso && <p className="atendente-aviso">{guiche.aviso}</p>}
          <MensagemErro mensagem={guiche.erro} />
          <AcoesGuiche
            senha={guiche.senha}
            ocupado={guiche.ocupado}
            onChamarProxima={guiche.chamarProxima}
            onIniciar={guiche.iniciar}
            onChamarNovamente={guiche.chamarNovamente}
            onFinalizar={guiche.finalizar}
          />
        </>
      )}
    </main>
  );
}
