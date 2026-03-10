# Karibu — Página de Detalhe do Produto

> **Versão:** 1.0 | **Data:** Março 2026 | **Classificação:** Produto — UX / Conversão

---

## 1. Filosofia de Design da Página

A Página de Detalhe do Produto (PDP) do Karibu não é uma página de e-commerce comum.
Ela precisa de comunicar simultaneamente:

1. **O produto** — o que é, o seu valor e qualidade
2. **A oportunidade** — urgência temporal do carrinho
3. **A confiança** — por que é seguro comprar aqui
4. **A competição** — quantos fornecedores competem e como isso beneficia o comprador

A estrutura obedece ao princípio **AIDA adaptado ao contexto de baixa confiança digital:**

```
Atenção → Interesse → Prova Social → Confiança → Acção
```

---

## 2. Estrutura Completa da Página (Mobile First)

### ZONA 1 — Header e Galeria do Produto

```
┌──────────────────────────────────────────────────────────────────┐
│  [← VOLTAR]          KARIBU           [🔔] [♡ GUARDAR]          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────┐                          │
│  │                                    │                          │
│  │         [FOTO PRINCIPAL]           │                          │
│  │                                    │                          │
│  │   ● ○ ○ ○  (4 fotos disponíveis)  │                          │
│  └────────────────────────────────────┘                          │
│                                                                  │
│  Electrónica > Smartphones > Apple                               │
│                                                                  │
│  iPhone 14 Pro Max — 256GB — Preto Profundo                      │
│  ════════════════════════════════════                            │
│                                                                  │
│  ✅ 5 fornecedores verificados disponíveis para cotação          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Elementos de confiança logo no topo:**

- Badge de fornecedores verificados é o primeiro elemento após o título
- Galeria com fotos reais do fornecedor (não stock photos)
- Breadcrumb para orientação contextual

---

### ZONA 2 — Preço Âncora e Urgência (Conversão Crítica)

Esta é a zona de maior peso para conversão. Toda a informação aqui é calculada em tempo real.

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  INTERVALO DE PREÇO ESTIMADO                                     │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │        145.000 Kz  ──●──────────────────  185.000 Kz     │  │
│  │                         (range âncora)                     │  │
│  │                                                            │  │
│  │  Como é calculado:                                         │  │
│  │  Câmbio actual 1 USD = 830 Kz | Base histórica 90 dias    │  │
│  │  + Margem logística média                                  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ─────────────────── CARRINHO ACTIVO ───────────────────────    │
│                                                                  │
│  Rota:  Windhoek → Luanda                                        │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  ⏱️  FECHA EM                                              │  │
│  │                                                            │  │
│  │      01 : 23 : 47                                          │  │
│  │      DIAS  HRS  MIN                                        │  │
│  │                                                            │  │
│  │  ⚡ 3 compradores já fizeram pedido neste carrinho         │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Próximo carrinho (previsão): daqui a 8 dias                     │
│  Se perderes este, esperarás mais tempo e o preço pode variar.   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Gatilhos psicológicos desta zona:**

- **Escassez temporal:** Cronômetro visível cria urgência real
- **Prova social:** "3 compradores já fizeram pedido" — validação de pares
- **Custo de oportunidade:** "Próximo carrinho daqui a 8 dias" — custo de não agir agora
- **Transparência do preço:** Mostrar como é calculado aumenta confiança

---

### ZONA 3 — Competição entre Fornecedores

```
┌──────────────────────────────────────────────────────────────────┐
│  FORNECEDORES DISPONÍVEIS                                        │
│                                                                  │
│  5 fornecedores verificados irão competir para te dar           │
│  o melhor preço. Tu escolhes.                                    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Carlos M.     ★ 4.9  (87 vendas)   Média: 7 dias       │   │
│  │  Maria F.      ★ 4.7  (214 vendas)  Média: 5 dias       │   │
│  │  +3 outros fornecedores verificados                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Última venda deste produto: há 3 dias   Preço obtido: 160.000  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Lógica:** Mostrar nomes e ratings reais (não anónimos) dos fornecedores disponíveis cria confiança e estimula o comprador a pedir cotação. A última venda com preço real funciona como âncora de expectativa realista.

---

### ZONA 4 — Histórico de Preços

```
┌──────────────────────────────────────────────────────────────────┐
│  HISTÓRICO DE PREÇOS                           Últimos 6 meses  │
│                                                                  │
│  185k ┤                              ●                           │
│  175k ┤           ●              ●──╯                           │
│  165k ┤       ●──╯  ●──────────╯                               │
│  155k ┤   ●──╯                                                  │
│  145k ┼─●──────────────────────────────────────────────         │
│       Out  Nov  Dez  Jan  Fev  Mar                              │
│                                                                  │
│  Melhor preço registado:  143.000 Kz (Nov 2025)                │
│  Preço médio 90 dias:     161.000 Kz                           │
│  Tendência actual:        ↗ alta moderada (+2.3% mês)          │
│                                                                  │
│  💡 Preços tendem a ser mais altos em Março.                   │
│     Comprar agora pode ser vantajoso.                           │
└──────────────────────────────────────────────────────────────────┘
```

**Elementos de conversão:**

- Gráfico de linha simples (legível em ecrãs pequenos)
- Insight automático sobre tendência ("agora é bom momento?")
- Melhor preço histórico serve como ancoragem favorável

---

### ZONA 5 — Selos de Confiança (Trust Layer)

Esta zona existe para remover barreiras psicológicas ao pagamento, especialmente em contexto de baixa confiança digital.

```
┌──────────────────────────────────────────────────────────────────┐
│  COMPRAS PROTEGIDAS NO KARIBU                                   │
│                                                                  │
│  🔒 PAGAMENTO EM ESCROW                                         │
│     O teu dinheiro fica retido em segurança.                    │
│     O fornecedor só recebe quando confirmares a entrega.        │
│     [COMO FUNCIONA →]                                           │
│                                                                  │
│  ✅ FORNECEDORES VERIFICADOS                                    │
│     Todos os fornecedores passam por verificação de identidade  │
│     e histórico comercial antes de poderem licitar.             │
│                                                                  │
│  📦 HUB FÍSICO DE CONSOLIDAÇÃO                                  │
│     O produto passa por um ponto físico Karibu antes de chegar  │
│     a ti. Verificamos tudo antes do envio.                      │
│                                                                  │
│  🔄 GARANTIA DE DEVOLUÇÃO                                       │
│     Produto com defeito? Não corresponde à descrição?           │
│     Abrimos uma disputa e protegemos o teu pagamento.           │
│                                                                  │
│  ⏱️ TEMPO MÉDIO DE ENTREGA: 6–10 dias úteis                    │
│     (após confirmação de proposta e pagamento)                  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Princípio:** Cada selo responde a uma objeção específica:

- Escrow → "E se o fornecedor fugir com o dinheiro?"
- Verificação → "Como sei que é de confiança?"
- Hub físico → "Como sei que o produto é real?"
- Devolução → "E se vier com defeito?"
- Tempo médio → "Quanto tempo vou esperar?"

---

### ZONA 6 — Detalhes do Produto

```
┌──────────────────────────────────────────────────────────────────┐
│  ESPECIFICAÇÕES                                [▼ VER TUDO]     │
│                                                                  │
│  Marca:           Apple                                         │
│  Modelo:          iPhone 14 Pro Max                             │
│  Armazenamento:   256GB                                         │
│  RAM:             6GB                                           │
│  Ecrã:            6.7" Super Retina XDR                         │
│  Câmara:          48MP principal + 12MP teleobjectiva           │
│  Bateria:         4.323 mAh                                     │
│  Sistema:         iOS 16 (actualizável)                         │
│  Garantia:        Garantia do fornecedor (especificada na prop.)│
│                                                                  │
│  Origem dos produtos:                                           │
│  Maioritariamente Namíbia (importação directa).                 │
│  Produtos verificados no Hub antes da entrega.                  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

### ZONA 7 — Avaliações de Compradores Anteriores

```
┌──────────────────────────────────────────────────────────────────┐
│  O QUE DIZEM OS COMPRADORES                                     │
│                                                                  │
│  ★★★★★ 4.8/5  (32 avaliações para este produto)               │
│                                                                  │
│  ★★★★★ "Produto igual às fotos, chegou em 7 dias."            │
│  Kuito, Bié — há 4 dias | Fornecedor: Carlos M.                 │
│                                                                  │
│  ★★★★☆ "Embrulhagem podia ser melhor, mas produto ok."         │
│  Lubango — há 12 dias | Fornecedor: Maria F.                    │
│                                                                  │
│  ★★★★★ "Melhor preço que encontrei. Repetirei."               │
│  Luanda — há 18 dias | Fornecedor: Carlos M.                    │
│                                                                  │
│                        [ VER TODAS ]                             │
└──────────────────────────────────────────────────────────────────┘
```

---

### ZONA 8 — CTA Principal (Botão de Pedido de Cotação)

Esta zona deve ser fixada no fundo do ecrã (sticky footer em mobile).

```
┌──────────────────────────────────────────────────────────────────┐
│  STICKY FOOTER — SEMPRE VISÍVEL AO FAZER SCROLL                 │
│                                                                  │
│  145.000 – 185.000 Kz                [PEDIR COTAÇÃO GRATUITA]  │
│                                                                  │
│  ⏱️ Carrinho fecha em 01d 23h 47m    Cotação não tem custo.    │
└──────────────────────────────────────────────────────────────────┘
```

**Após clicar em "Pedir Cotação":**

```
MODAL — CONFIRMAÇÃO DO PEDIDO

  O que acontece a seguir?

  1. Enviamos o teu pedido a 5 fornecedores verificados.
  2. Recebes propostas em até [PRAZO] horas.
  3. Escolhes a proposta que mais te convém.
  4. Só pagas quando esochlheres — sem compromisso agora.

  Quantidade desejada: [ 1 ] [ + ] [ - ]
  Observações (opcional): [_____________________________]

  [ CONFIRMAR PEDIDO ]   [ CANCELAR ]
```

---

## 3. Elementos Psicológicos de Conversão — Mapeamento

| Elemento da Página           | Gatilho Psicológico     | Objecção Removida                  |
| ---------------------------- | ----------------------- | ---------------------------------- |
| Cronômetro regressivo        | Escassez + Urgência     | "Posso deixar para depois"         |
| "N compradores já pediram"   | Prova Social            | "Será que isto funciona?"          |
| "Próximo carrinho em 8 dias" | Custo de Oportunidade   | "Compro depois"                    |
| Preço âncora com range       | Ancoragem de Preço      | "Será que é caro?"                 |
| Histórico + tendência        | Inteligência de Compra  | "Quando é melhor comprar?"         |
| Escrow visível e explicado   | Redução de Risco        | "E se perder o dinheiro?"          |
| Avaliações com cidade        | Prova Social Localizada | "Funciona aqui em Angola?"         |
| Hub físico mencionado        | Tangibilidade           | "Nunca vi o produto"               |
| Fotos reais dos fornecedores | Autenticidade           | "Foto de stock não é real"         |
| "Cotação gratuita" no CTA    | Baixo Comprometimento   | "Não quero pagar sem ver proposta" |

---

## 4. Variações de Estado da Página

### Estado A — Carrinho Aberto (padrão descrito acima)

### Estado B — Carrinho Fechado / Aguardando Próximo

```
  ⚠️ Este carrinho já fechou.
  Este produto estará disponível no próximo carrinho:
  Previsão: daqui a 8 dias (22 de Março)

  [ ACTIVAR ALERTA — QUERO SER NOTIFICADO ]
  Recebe um SMS/Push quando o próximo carrinho abrir.
```

### Estado C — Produto com Propostas Activas (Comprador Já Pediu)

```
  ✅ O teu pedido já foi submetido!
  3 de 5 fornecedores já enviaram propostas.
  Prazo para as restantes: 4h 12min

  [ VER PROPOSTAS RECEBIDAS ]
```

### Estado D — Produto Sem Fornecedores Ainda

```
  ⚡ Sê o primeiro a pedir!
  Ainda não há fornecedores associados a este produto.
  Se pedires cotação, notificamos fornecedores elegíveis
  e incentivamos o registo de novos.

  [ PEDIR COTAÇÃO NA MESMA ]
```

---

## 5. Optimizações para Contexto Angola

### Conectividade Reduzida

```
• Página renderiza em modo "skeleton" enquanto carrega assets
• Fotos carregadas de forma progressiva (WebP comprimido)
• Dados essenciais (preço âncora, prazo, CTA) carregam primeiro
• Gráfico de histórico de preços: versão texto como fallback
  "Preços dos últimos 6 meses: 145k, 153k, 158k, 161k, 165k, 171k"
```

### Accessibilidade e Literacia Digital

```
• Ícones sempre acompanhados de texto (sem ícones isolados)
• Linguagem simples — sem jargão (ex: "Escrow" sempre explicado)
• Botões com área mínima de toque: 48×48px
• Contraste mínimo AA para leitura em ambientes externos (sol)
```

### Partilha Via WhatsApp

```
• Botão "Partilhar no WhatsApp" na galeria de fotos
• Gera mensagem pré-formatada:
  "Vi este iPhone 14 Pro no Karibu por 145-185mil Kz!
   Ver: karibu.ao/p/[ID]"
• Actua como canal de aquisição orgânica viral
```

---

_Documento v1.0 | Karibu Product Team | Março 2026_
