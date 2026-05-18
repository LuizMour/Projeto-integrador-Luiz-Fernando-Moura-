 🌍 Painel de Controle ESG - Agenda 2030

Um simulador interativo de gestão de sustentabilidade focado na indústria de mineração e siderurgia, desenvolvido como Projeto Integrador. O objetivo do painel é ajudar empresas (inspirado nas diretrizes da ArcelorMittal) a monitorar e atingir as metas dos Objetivos de Desenvolvimento Sustentável (ODS) da ONU.

🎯 Sobre o Projeto

Este projeto consiste em uma aplicação web multi-seção do tipo *Dashboard* onde o usuário assume o papel de Gestor de Sustentabilidade. Através de uma interface limpa e gamificada, é possível registrar e acompanhar o impacto ambiental da operação em três frentes principais:

*   💧 Água (ODS 6):Redução e recirculação de recursos hídricos.
*   🏭 Combustíveis Fósseis (ODS 13):Substituição e redução de emissões.
*   🌳 Reflorestamento (ODS 15):Recuperação de áreas degradadas.

✨ Funcionalidades (Regras de Negócio Aplicadas)

1.  **Listagem de Iniciativas:** Exibição dinâmica de todas as ações sustentáveis registradas no painel.
2.  **Filtros Interativos:** Capacidade de isolar os registros por categoria (Água, Fóssil ou Floresta) para facilitar a análise de dados.
3.  **Cadastro com Validação:** Formulário para registrar novas ações, com validação via HTML5 e JavaScript para garantir que volumes negativos ou nulos não sejam inseridos.
4.  **Persistência de Dados (LocalStorage):** O sistema salva automaticamente todos os registros e pontuações no navegador do usuário, garantindo que nada se perca ao fechar ou recarregar a página.
5.  **Gamificação (XP):** Para engajar o usuário, o sistema recompensa interações:
    *   *+10 XP* ao cadastrar uma nova iniciativa válida.
    *   *+1 XP* a cada utilização do sistema de filtros.

 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as bases do desenvolvimento web moderno, sem o uso de frameworks externos:

*   **HTML5:** Estrutura semântica do projeto.
*   **CSS3:** Estilização responsiva utilizando CSS Grid, Flexbox e variáveis (`:root`) para padronização de cores e identidade visual.
*   **JavaScript (ES6+):** Lógica da aplicação, manipulação do DOM (`document.getElementById`, `addEventListener`), métodos de array avançados (`.filter()`, `.forEach()`) e consumo do `window.localStorage`.

 🚀 Como Executar o Projeto


