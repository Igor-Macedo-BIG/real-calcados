export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black text-white py-4 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">Real <span className="text-red-400">Calçados</span></h1>
        </div>
      </header>
      <section className="flex items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent mb-4 animate-pulse">Bem-vindo à Real Calçados</h1>
          <p className="text-xl text-gray-300 mb-8">Sua loja de calçados de qualidade, com estilo futurista e preços acessíveis.</p>
          <a href="#about" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition inline-block font-semibold shadow-lg">Saiba Mais</a>
        </div>
      </section>
      <section id="about" className="py-16 px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">Sobre a Real Calçados</h2>
          <p className="text-lg text-gray-300 mb-4">
            A Real Calçados é uma empresa dedicada a oferecer calçados de alta qualidade para toda a família.
            Com anos de experiência no mercado, nos especializamos em conforto, estilo e durabilidade, atendendo clientes de médio e baixo padrão com preços justos.
          </p>
          <p className="text-lg text-gray-300">
            Venha nos visitar e descubra nossa ampla variedade de produtos, desde tênis esportivos até sapatos sociais, com um design futurista e acessível.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="/proposta" className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-2 rounded-lg hover:from-red-700 hover:to-red-900 transition inline-block font-semibold">Veja Nossa Proposta Comercial</a>
            <a href="/lojas" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-900 transition inline-block font-semibold">Gerenciar Lojas</a>
          </div>
        </div>
      </section>
      <footer className="bg-black text-white py-8 px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p>&copy; 2026 Real Calçados. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
