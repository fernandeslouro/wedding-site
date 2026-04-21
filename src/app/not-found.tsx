import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-shell">
      <div className="not-found-card">
        <p className="eyebrow">404</p>
        <h1>Página não encontrada</h1>
        <p>
          A página que procuras não está disponível. Volta ao início para
          continuar a explorar o site.
        </p>
        <Link className="button button-primary" href="/pt">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
