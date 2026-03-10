# Karibu — Painel de Controlo do Fornecedor

> **Versão:** 1.0 | **Data:** Março 2026 | **Classificação:** Produto — UX / Operações

---

## 1. Princípios de Design do Dashboard

O painel do fornecedor é o centro de comando da sua actividade no Karibu. A lógica segue três pilares:

| Pilar                     | Implementação                                                   |
| ------------------------- | --------------------------------------------------------------- |
| **Orientação para Acção** | A view principal mostra sempre o que PRECISA de ser feito agora |
| **Contexto Competitivo**  | O fornecedor sabe sempre onde está face à concorrência          |
| **Clareza Financeira**    | Saldo, escrow retido e projecção de receita sempre visíveis     |

---

## 2. Estrutura de Navegação

```
DASHBOARD FORNECEDOR
├── Home — Visão Geral (Landing Page)
├── Carrinhos Activos
│   ├── Pedidos Disponíveis para Cotação
│   └── Histórico de Carrinhos
├── Minhas Propostas
│   ├── Em Competição (Pendentes)
│   ├── Aceites
│   └── Perdidas
├── Entregas
│   ├── Pendentes de Envio ao Hub
│   ├── Em Trânsito
│   └── Confirmadas no Hub
├── Financeiro
│   ├── Saldo Disponível
│   ├── Valores em Escrow
│   └── Histórico de Pagamentos
├── Desempenho
│   ├── Score do Fornecedor
│   ├── Análise de Preços
│   └── Posição Competitiva
└── Configurações
    ├── Perfil e Documentos
    ├── Notificações
    └── Plano de Assinatura
```

---

## 3. Home — Visão Geral

**O fornecedor deve saber em 3 segundos o que precisa de fazer.**

### 3.1 Barra de Estado Superior

```
[  João Silva  |  ★ 4.7  |  Score: 87/100  |  Plano: PRO  ]
```

### 3.2 Cards de Acção Urgente (Mobile First)

**Card A — Pedido Novo**

```
┌─────────────────────────────────────────────────────┐
│  ACÇÃO NECESSÁRIA                                   │
│                                                     │
│  iPhone 14 Pro × 2 | Carrinho Windhoek → Luanda    │
│  Prazo: 4h 23min | Concorrentes: 2/5               │
│  Âncora: 145.000 – 165.000 Kz                      │
│                                                     │
│           [ ENVIAR PROPOSTA ]                       │
└─────────────────────────────────────────────────────┘
```

**Card B — Entrega Pendente**

```
┌─────────────────────────────────────────────────────┐
│  ENVIO PENDENTE AO HUB                              │
│                                                     │
│  Samsung Galaxy S23 | Hub Karibu Luanda Norte       │
│  Prazo de chegada ao Hub: Amanhã, 18:00             │
│  Atrasos resultam em penalização no score           │
│                                                     │
│  [ CONFIRMAR ENVIO ]   [ VER INSTRUÇÕES HUB ]       │
└─────────────────────────────────────────────────────┘
```

**Card C — Proposta Aceite**

```
┌─────────────────────────────────────────────────────┐
│  PROPOSTA ACEITE!                                   │
│                                                     │
│  Televisão LG 55" × 1 | Valor em escrow: 285.000   │
│  Receberás após confirmação do comprador            │
│  Liberação prevista: 15 Mar 2026                    │
│                                                     │
│  [ VER DETALHES ]  [ CONFIRMAR ENVIO AO HUB ]       │
└─────────────────────────────────────────────────────┘
```

### 3.3 Métricas Rápidas — Mês Actual

```
┌─────────────────┬─────────────────┬─────────────────┬──────────────────┐
│  Pedidos Disp.  │  Propostas Env. │  Propostas Ac.  │  Receita do Mês  │
│       12        │       8         │       5         │   1.200.000 Kz   │
│   (+3 novos)    │  (2 em curso)   │  (Taxa: 62%)    │   (+18% vs mês)  │
└─────────────────┴─────────────────┴─────────────────┴──────────────────┘
```

### 3.4 Widget Financeiro

```
Saldo Disponível:          385.000 Kz   [ LEVANTAR ]
Em Escrow (a libertar):    920.000 Kz   [ DETALHE ]
Retido em Disputas:              0 Kz   —
Próxima Libertação:        285.000 Kz   em 15 Mar 2026
```

---

## 4. Carrinhos Activos — Pedidos para Cotação

### 4.1 Lista com Indicadores de Competição

```
FILTROS: [Todos] [Electrónica] [Automóvel] [Construção] [Moda]
ORDENAR: [Prazo] [Valor] [Concorrência]

CARRINHO: Windhoek → Luanda  |  Fecha: 14 Mar 2026 18:00

  iPhone 14 Pro × 2     145.000–165.000 Kz
  3 fornecedores | 4h para prazo
  [ENVIAR PROPOSTA]

  MacBook Air M2 × 1    280.000–310.000 Kz
  1 fornecedor | [OPORTUNIDADE - baixa concorrência]
  [ENVIAR PROPOSTA]

  PS5 × 1               195.000–220.000 Kz
  0 fornecedores | [EXCLUSIVO - nenhum concorrente!]
  [ENVIAR PROPOSTA]
```

> **Destaques visuais:**
>
> - 0 concorrentes → Badge **EXCLUSIVO** (verde)
> - 1 concorrente → Badge **OPORTUNIDADE** (azul)
> - 3+ concorrentes → Badge **COMPETITIVO** (laranja)
> - Prazo < 2h → Badge **URGENTE** com animação pulsante

### 4.2 Formulário de Proposta

```
SUBMETER PROPOSTA — iPhone 14 Pro × 2
Carrinho: Windhoek → Luanda | Prazo: 4h 23min

PREÇO
  Âncora do Mercado: 145.000 – 165.000 Kz
  Teu Preço por Unidade: [_________] Kz
  [Calculadora de Margem: Custo / Logística / Comissão Karibu 5%]

PRAZO
  Entrega ao Hub em: [__] dias após aceitação

EVIDÊNCIAS (obrigatório)
  Foto 1 — frente do produto: [UPLOAD]
  Foto 2 — caixa/embalagem:   [UPLOAD]
  Foto 3 — detalhes (opcional): [UPLOAD]
  Nota para o Comprador: [_________________________] (máx 200 char)

  [ SUBMETER PROPOSTA ]
  Propostas não podem ser alteradas após envio.
```

---

## 5. Monitorização de Propostas em Competição

```
PROPOSTA ACTIVA — iPhone 14 Pro × 2
Meu Preço: 155.000 Kz × 2  |  Entrega: 7 dias  |  Status: 2.º de 4

RANKING (anónimo — preços exactos ocultos):
  #1  Fornecedor A — Preço: ★★★★★  Prazo: ★★★★☆
  #2  [TU]         — Preço: ★★★★☆  Prazo: ★★★★★
  #3  Fornecedor C — Preço: ★★★★☆  Prazo: ★★★☆☆
  #4  Fornecedor D — Preço: ★★★☆☆  Prazo: ★★★★☆

NOTA: Preços exactos dos concorrentes são ocultados para
garantir competição justa. Ranking baseado em score composto.
```

---

## 6. Gestão de Entregas ao Hub

```
ENTREGAS PENDENTES

  URGENTE — Prazo em 24h
  Pedido #KAR-2026-0847
  Samsung Galaxy S23 Ultra × 1
  Hub Destino: Hub Karibu Luanda Norte
  Endereço: Rua das Flores, 45, Rangel
  Prazo chegada ao hub: 15 Mar 2026, 18:00
  Horário recepção: 08:00–17:00 (dias úteis)
  [ GERAR ETIQUETA ]  [ CONFIRMAR ENVIO ]  [ PEDIR AJUDA ]

  EM TRÂNSITO
  Pedido #KAR-2026-0812
  LG Smart TV 55" | DHL Angola — Ref: AO182938471
  ETA Hub: Amanhã até 14:00
  [ VER TRACKING ]
```

---

## 7. Score e Métricas de Desempenho

### 7.1 Composição do Score Karibu (0–100)

| Componente                                       | Peso | Pontuação | Tendência |
| ------------------------------------------------ | ---- | --------- | --------- |
| Taxa de Cumprimento de Prazo (entregas ao hub)   | 25%  | 92        | ↗ +3      |
| Avaliação dos Compradores (média estrelas)       | 25%  | 88        | →         |
| Conformidade de Produto (entregue = descrito)    | 20%  | 95        | ↗ +1      |
| Taxa de Disputas (disputas/pedidos)              | 15%  | 80        | ↘ -5 ⚠️   |
| Taxa de Resposta (propostas/pedidos disponíveis) | 10%  | 90        | →         |
| Tempo de Resposta (rapidez na submissão)         | 5%   | 70        | ↘ -2      |
| **TOTAL**                                        | 100% | **87**    | ↗         |

### 7.2 Limites de Acesso por Score

| Score | Acesso                                              |
| ----- | --------------------------------------------------- |
| ≥ 85  | Pedidos premium (> 500.000 Kz) + Plano PRO elegível |
| ≥ 70  | Todos os pedidos normais                            |
| < 50  | Suspensão temporária de licitação (30 dias)         |
| < 30  | Desactivação de conta — revisão manual obrigatória  |

### 7.3 Penalizações Automáticas

| Evento                                     | Impacto no Score         |
| ------------------------------------------ | ------------------------ |
| Atraso ao hub (< 24h após prazo)           | -3 pontos                |
| Atraso ao hub (> 24h após prazo)           | -8 pontos                |
| Produto não conforme na verificação do hub | -10 + disputa automática |
| Cancelamento após proposta aceite          | -15 + multa 5% do valor  |
| 3+ disputas no mesmo mês                   | -20 + revisão manual     |

### 7.4 Análise de Posição de Preços

```
CATEGORIA: Smartphones — Fevereiro 2026

  Teu preço médio:        155.000 Kz
  Média do mercado:       158.000 Kz  (estás 2% abaixo: posição saudável)
  Mínimo aceite no mês:   143.000 Kz
  Máximo aceite no mês:   172.000 Kz

  Taxa de Conversão por Categoria:
  Smartphones:       68%  Excelente
  Electrodomésticos: 45%  Médio — há oportunidade de crescer
  Acessórios:        30%  Baixo — revê preços ou fotos do produto
```

---

## 8. Planos de Assinatura

| Característica           | Gratuito | PRO (9.900 Kz/mês) | Enterprise     |
| ------------------------ | -------- | ------------------ | -------------- |
| Propostas por mês        | 5        | Ilimitadas         | Ilimitadas     |
| Acesso a pedidos premium | ✗        | ✅                 | ✅ Exclusivos  |
| Boost de visibilidade    | —        | +20%               | +40%           |
| Analytics de preços      | Básico   | Avançado           | Completo + API |
| Gestor de conta dedicado | ✗        | ✗                  | ✅             |
| SLA de suporte           | 48h      | 12h                | 2h             |

---

## 9. UX para Contexto Angola

### Modo Offline

```
• Dashboard funciona em modo de leitura com cache das últimas 48h
• Formulários de proposta podem ser redigidos offline
  e submetidos automaticamente ao recuperar ligação
• Banner "Modo Offline" sempre visível quando sem rede
```

### Optimização para Dispositivos de Baixo Custo

```
• Layout mobile-first para ecrãs 360×640 (mínimo)
• Modo "Dados Reduzidos" automático em redes 2G/EDGE
  (desactiva preview de imagens, carrega só texto)
• Bundle inicial: < 200KB
```

### Métodos de Levantamento de Pagamentos

```
• Multicaixa Express (principal)
• Transferência bancária (BFA, BIC, BAI)
• M-Kesh / Unitel Money
• Levantamento em Hub físico (mediante aprovação)
```

---

_Documento v1.0 | Karibu Product Team | Março 2026_
