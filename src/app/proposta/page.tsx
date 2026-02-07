export default function Proposta() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black text-white py-4 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">Real <span className="text-red-400">Calçados</span></h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-8 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent mb-6">
            Proposta Comercial: Gestão Estratégica de Marketing Digital
          </h1>
          <p className="text-xl text-gray-300">
            Transforme a presença digital da Real Calçados no Instagram com estratégia, padronização e crescimento consistente.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">O Que Oferecemos</h2>
          <p className="text-lg text-gray-300 mb-4">
            Prestação de serviços de Gestão Estratégica de Marketing Digital para a rede de lojas físicas da Real Calçados, com foco na padronização, organização e crescimento dos perfis de Instagram das 20 unidades iniciais.
          </p>
          <p className="text-lg text-gray-300">
            Atuamos como Head de Marketing Digital terceirizado, garantindo consistência, autoridade de marca e melhor aproveitamento do Instagram como canal de vendas.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">Objetivos Principais</h2>
          <ul className="list-disc list-inside text-lg text-gray-300 space-y-2">
            <li>Organizar e padronizar a presença digital das lojas no Instagram</li>
            <li>Fortalecer a percepção de marca da Real Calçados como referência regional</li>
            <li>Criar um fluxo organizado de conteúdo entre as lojas</li>
            <li>Utilizar stories e tráfego pago como alavancas de vendas</li>
            <li>Reduzir improviso e descentralização na comunicação digital</li>
            <li>Garantir consistência visual, estratégica e operacional em escala</li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">Escopo dos Serviços</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Estratégia e Direção</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Definição de posicionamento digital</li>
                <li>• Planejamento estratégico mensal</li>
                <li>• Tom de voz e prioridades</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Padronização</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Padrão visual para Reels, Feed e Destaques</li>
                <li>• Regras de aplicação</li>
                <li>• Setup inicial dos 20 perfis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Conteúdo e Publicação</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Diretrizes para produção</li>
                <li>• Curadoria e seleção</li>
                <li>• Publicação padronizada</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Gestão e Análise</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Gestão de Stories e Grupo</li>
                <li>• Reuniões de alinhamento</li>
                <li>• Relatórios mensais</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            *Não inclui criação de artes, edição de vídeos, atendimento a DMs ou gravação de conteúdo.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">Por Que Escolher Esta Proposta?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Consistência</h3>
              <p className="text-gray-300">Padronização completa da identidade digital em todas as unidades.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Crescimento</h3>
              <p className="text-gray-300">Estratégia focada em vendas e fortalecimento de marca.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Eficiência</h3>
              <p className="text-gray-300">Gestão terceirizada que reduz custos operacionais.</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">Pronto para Transformar Sua Presença Digital?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Entre em contato para discutir detalhes e iniciar a implementação.
          </p>
          <a href="mailto:contato@realcalcados.com" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-900 transition inline-block font-semibold text-lg shadow-lg">
            Solicitar Proposta Completa
          </a>
        </section>
      </main>
      <footer className="bg-black text-white py-8 px-8 border-t border-gray-800 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p>&copy; 2026 Real Calçados. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}