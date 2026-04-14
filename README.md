# PRD — Estagiário GPX

**Versão:** 1.0.0
**Autor:** Yasmim Moraes
**Data:** Abril de 2026
**Status:** Squad Operacional (IDS: 752 entidades registradas)

***

## Visão Geral

O Estagiário GPX é um squad de agentes de IA construído com AIOX que executa tarefas operacionais e repetitivas de forma autônoma. A ideia surgiu da necessidade de ter um assistente que pesquisa, redige e revisa conteúdo sem que eu precise gerenciar cada etapa manualmente.

Funciona como um estagiário virtual: recebe uma tarefa, executa o pipeline completo de pesquisa → redação → revisão e entrega o resultado pronto.

O projeto está totalmente registrado no **IDS (Intelligent Design System)**, com um total de **752 entidades** mapeadas, garantindo a integridade e rastreabilidade de todas as definições.

***

## Problema

Tarefas operacionais repetitivas (pesquisar temas, redigir e-mails, montar resumos, revisar textos) consomem tempo que poderia ser usado em decisões estratégicas. O problema não é falta de capacidade — é falta de tempo e energia para executar tudo isso com qualidade consistente.

***

## Solução

Um squad de 5 agentes especializados que trabalham em pipeline ou de forma colaborativa técnica. Cada agente tem um papel claro, limitações definidas e critérios de qualidade antes de passar a tarefa para o próximo.

```
Usuário → Max (Gerente) → Scout (Pesquisa) → Pen (Redação) → Gate (Revisão) → Entrega
                            ↑
                          Forge (Desenvolvimento)
```

***

## Usuário

Eu mesma. Por enquanto, o sistema é para uso pessoal — automatizar tarefas do dia a dia que exigem pesquisa e produção de texto.

**Casos de uso prioritários:**
- Resumos de artigos e vídeos longos
- Rascunhos de e-mails formais
- Relatórios rápidos sobre um tema
- Posts de redes sociais a partir de um briefing

***

## Agentes

### Max — Gerente

Orquestrador principal. Recebe a tarefa, interpreta o objetivo e delega para os especialistas. Não executa nada diretamente — coordena.

**Responsabilidades:**
- Entender o que foi pedido antes de agir
- Quebrar a tarefa em etapas
- Monitorar o andamento
- Consolidar e entregar o resultado final

***

### Scout — Pesquisador

Especializado em coleta e estruturação de informações. Entrega sempre um briefing padronizado nos 5 blocos: contexto, dados principais, exemplos, fontes e conclusão.

**Responsabilidades:**
- Pesquisar com fontes confiáveis e recentes
- Identificar a fonte de cada informação
- Nunca inventar dados

***

### Pen — Redator

Produz o conteúdo com base no briefing do Scout. Adapta o formato e o tom conforme o que foi solicitado. Não pesquisa, não publica — só escreve.

**Formatos suportados:**
- Resumo executivo
- E-mail
- Relatório
- Post para redes sociais

***

### Gate — Revisor

Quality gate do squad. Nada sai sem passar pelo Gate. Revisa ortografia, gramática, tom e aderência ao objetivo. Aprova ou devolve com comentários objetivos.

**Responsabilidades:**
- Verificar qualidade técnica e de conteúdo
- Declarar status de aprovação explicitamente
- Nunca reescrever do zero — devolve para o Pen se necessário

***

### Forge — Desenvolvedor

Executor técnico do squad. Transforma instruções técnicas em código funcional, lê e modifica arquivos do projeto com precisão.

**Responsabilidades:**
- Executar alterações em arquivos e diretórios
- Manter padrões de código e arquitetura
- Prover previews de implementações técnicas
- Apoiar na automação do pipeline do squad

***

## Pipeline

```yaml
receber-tarefa → pesquisar → redigir → revisar → entregar
```

Cada etapa depende da anterior. Em caso de erro, o Max é notificado e decide se reprocessa ou reporta ao usuário.

***

## Estrutura do Projeto

```
estagiario-gpx/
├── squad.yaml              # Manifesto do squad
├── README.md               # Visão geral e instruções de uso
├── agents/
│   ├── gpx-gerente.md      # Max
│   ├── gpx-pesquisador.md  # Scout
│   ├── gpx-redator.md      # Pen
│   └── gpx-revisor.md      # Gate
├── tasks/
│   ├── pesquisar-tema.md
│   ├── redigir-conteudo.md
│   └── revisar-entrega.md
├── workflows/
│   └── estagiario-workflow.yaml
├── checklists/
│   └── quality-gate.md
├── config/
│   ├── coding-standards.md
│   ├── tech-stack.md
│   └── source-tree.md
├── templates/
│   └── relatorio-template.md
└── docs/
    └── prd.md              # Este arquivo
```

***

## Critérios de Qualidade

Todo entregável passa pelo checklist do Gate antes de chegar ao usuário:

- Pesquisa com no mínimo 3 fontes confiáveis
- Nenhum dado sem fonte identificada
- Formato correto conforme solicitado
- Tom consistente do início ao fim
- Objetivo da tarefa cumprido
- Status de aprovação declarado explicitamente

***

## Roadmap

| Fase | O que entregar | Status |
|------|---------------|--------|
| 1 — Base | Estrutura do projeto, squad.yaml, README | ✅ Concluído |
| 2 — Agentes | Definição dos 4 agentes com papéis e limitações | ✅ Concluído |
| 3 — Tasks | Implementação das 3 tasks com parâmetros e critérios | ✅ Concluído |
| 4 — Workflow | Pipeline completo e quality gate | ✅ Concluído |
| 5 — Registro IDS | Mapeamento de 752 entidades | ✅ Concluído |
| 6 — Integrações | Gmail, Notion, WhatsApp | 🔜 Próximo |
| 7 — Interface | Painel web para gerenciar tarefas | 🔜 Futuro |

***

## Decisões Técnicas

**Por que AIOX?**
É o framework que estou aprendendo. O projeto é intencionalmente simples no início para focar em entender como os agentes se comunicam, como as tasks são estruturadas e como o pipeline funciona na prática.

**Por que 5 agentes e não 1?**
Cada agente com responsabilidade única é mais fácil de debugar, iterar e escalar. Se o Pen escrever mal, mexo só nele. Se o Scout trouxer fontes ruins, ajusto só ele. O Forge entra para garantir que a execução técnica também seja isolada e especializada. Separação de responsabilidades — o mesmo princípio do clean code aplicado a agentes.

**Por que começar com casos de uso simples?**
Integrações com APIs externas (Gmail, Notion) adicionam complexidade que dificulta o aprendizado. A Fase 1 a 4 é sobre entender o core do AIOX. As integrações vêm depois, quando a base estiver sólida.

***

## O que não está no escopo (por enquanto)

- Geração de imagens ou vídeos
- Automação de redes sociais (publicação direta)
- Integração com sistemas de pagamento
- Uso por múltiplos usuários
- Interface web ou mobile

***

## Notas

Este projeto é uma aplicação de aprendizado do AIOX. O objetivo não é só ter um assistente funcionando — é entender como estruturar um squad bem-feito, com agentes claros, tasks definidas e um pipeline que funciona de ponta a ponta.