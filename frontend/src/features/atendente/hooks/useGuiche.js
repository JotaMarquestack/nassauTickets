import { useCallback, useEffect, useRef, useState } from 'react';
import * as service from '../services/atendenteService';
import { mensagemDeErro } from '../utils/mensagensErro';

export function useGuiche() {
  const [senha, setSenha] = useState(null); // senha ativa ou null
  const [carregando, setCarregando] = useState(true);
  const [ocupado, setOcupado] = useState(false); // ação em andamento
  const [erro, setErro] = useState(null);
  const [aviso, setAviso] = useState(null);
  const emAndamento = useRef(false);

  // Recupera a senha ativa se o atendente recarregar a página (F5)
  useEffect(() => {
    let ativo = true;
    service
      .buscarAtual()
      .then((atual) => ativo && setSenha(atual ?? null))
      .catch((e) => ativo && setErro(mensagemDeErro(e)))
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, []);

  const executar = useCallback(async (acao) => {
    if (emAndamento.current) return; // bloqueia clique duplo
    emAndamento.current = true;
    setOcupado(true);
    setErro(null);
    setAviso(null);
    try {
      await acao();
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      emAndamento.current = false;
      setOcupado(false);
    }
  }, []);

  const chamarProxima = () =>
    executar(async () => {
      const nova = await service.chamarProxima();
      setSenha(nova ?? null);
      if (!nova) setAviso('Nenhuma senha aguardando no momento.');
    });

  const iniciar = () =>
    executar(async () => {
      setSenha(await service.iniciar(senha.id));
    });

  const chamarNovamente = () =>
    executar(async () => {
      const atualizada = await service.chamarNovamente(senha.id);
      if (atualizada?.estado === 'NAO_COMPARECEU') {
        setSenha(null);
        setAviso('Senha encerrada: cliente não compareceu.');
      } else {
        setSenha(atualizada);
      }
    });

  const finalizar = () =>
    executar(async () => {
      await service.finalizar(senha.id);
      setSenha(null);
      setAviso('Atendimento finalizado.');
    });

  return {
    senha, carregando, ocupado, erro, aviso,
    chamarProxima, iniciar, chamarNovamente, finalizar,
  };
}
