export function StudioOnboarding() {
  return (
    <main className="not-found-shell">
      <div className="not-found-card studio-card">
        <p className="eyebrow">Sanity Studio</p>
        <h1>Configuração em falta</h1>
        <p>
          Para ativar o CMS, adiciona `NEXT_PUBLIC_SANITY_PROJECT_ID` e
          `NEXT_PUBLIC_SANITY_DATASET` no ficheiro `.env.local`. A estrutura dos
          schemas já está pronta; falta apenas ligar o projeto Sanity.
        </p>
        <p>
          Depois disso, a área `/studio` ficará disponível para editar serviços,
          portefólio, locais, testemunhos e definições globais.
        </p>
      </div>
    </main>
  );
}
