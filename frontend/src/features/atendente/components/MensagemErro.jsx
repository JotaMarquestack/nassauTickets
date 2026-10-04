export default function MensagemErro({ mensagem }) {
  if (!mensagem) return null;
  return (
    <p className="atendente-erro" role="alert">
      {mensagem}
    </p>
  );
}
