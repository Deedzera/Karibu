# Karibu — Sistema de Notificações em Tempo Real

> **Versão:** 1.0 | **Data:** Março 2026 | **Classificação:** Produto — Experiência do Utilizador

---

## 1. Visão Geral e Princípios de Design

O sistema de notificações do Karibu é uma camada crítica de engagement e operações. Num contexto de baixa confiança digital e conectividade intermitente (Angola), as notificações devem ser:

| Princípio         | Descrição                                                             |
| ----------------- | --------------------------------------------------------------------- |
| **Redundante**    | Cada evento crítico usa dois canais (Push + SMS)                      |
| **Assíncrono**    | Mensagens são enfileiradas e entregues quando há conectividade        |
| **Contextual**    | O conteúdo da mensagem adapta-se ao perfil (Comprador vs. Fornecedor) |
| **Frugal**        | Mínimo de notificações, máximo de valor — evitar fadiga               |
| **Offline-first** | SMS como canal de fallback garantido                                  |

### Canais de Entrega

```
CANAL PRIMÁRIO:    Push Notification (App Mobile / PWA)
CANAL SECUNDÁRIO:  SMS (fallback automático se Push falhar em 5 min)
CANAL TERCIÁRIO:   WhatsApp Business API (para mensagens ricas: fotos, links)
CANAL INTERNO:     Feed de Notificações In-App (persist. histórica)
```

---

## 2. Taxonomia de Notificações

### Níveis de Prioridade

| Nível              | Cor      | Descrição                                      | Canal                            |
| ------------------ | -------- | ---------------------------------------------- | -------------------------------- |
| 🔴 **CRÍTICA**     | Vermelho | Requer ação imediata. Bloqueante para operação | Push + SMS simultâneos           |
| 🟠 **URGENTE**     | Laranja  | Prazo em risco. Ação necessária em < 2h        | Push + SMS se não lida em 30 min |
| 🟡 **IMPORTANTE**  | Amarelo  | Actualização relevante. Sem urgência imediata  | Push                             |
| 🟢 **INFORMATIVA** | Verde    | Status update. Sem acção necessária            | In-App Feed                      |

---

## 3. Eventos e Notificações — Perspectiva do COMPRADOR

### 3.1 Ciclo de Vida do Carrinho de Importação

#### EVT-C01: Novo Carrinho Aberto (Rota de Interesse)

```
GATILHO:    Sistema abre novo Carrinho para rota que o utilizador já comprou antes
PRIORIDADE: 🟡 IMPORTANTE
CANAL:      Push

PUSH:
"🛒 Novo Carrinho Aberto!"
"A rota Windhoek → Luanda está a aceitar pedidos.
 Fechar em: 48h. Garante o teu lugar."
[CTA: VER CARRINHO]
```

#### EVT-C02: Carrinho a Fechar — 24 Horas

```
GATILHO:    24h antes do fecho do carrinho onde o utilizador tem itens
PRIORIDADE: 🟠 URGENTE
CANAL:      Push + SMS (se não lida em 30 min)

PUSH:
"⏰ Último dia! Carrinho fecha amanhã."
"Tens [N] item(s) guardados no Carrinho Windhoek → Luanda.
 Confirma o teu pedido antes de perder o lugar."
[CTA: CONFIRMAR PEDIDO]

SMS:
"KARIBU: Carrinho Windhoek→Luanda fecha em 24h.
Confirma os teus pedidos: karibu.ao/cart/[ID]"
```

#### EVT-C03: Carrinho a Fechar — 2 Horas (Urgência Máxima)

```
GATILHO:    2h antes do fecho. Pedido ainda não confirmado
PRIORIDADE: 🔴 CRÍTICA
CANAL:      Push + SMS simultâneos

PUSH:
"🚨 2 HORAS para o Carrinho fechar!"
"Ainda não confirmaste o teu pedido.
 Após o fecho, não há como fazer alterações."
[CTA: CONFIRMAR AGORA]

SMS:
"KARIBU URGENTE: Carrinho fecha em 2h!
Confirma agora: karibu.ao/c/[ID] ou liga 900-XXX-XXX"
```

#### EVT-C04: Carrinho Fechado — Licitação Iniciada

```
GATILHO:    Carrinho encerra formalmente. Licitação começa
PRIORIDADE: 🟡 IMPORTANTE
CANAL:      Push

PUSH:
"✅ Pedido Confirmado! Fornecedores a preparar propostas."
"O teu pedido entrou. Os fornecedores têm até [DATA] para enviar
 as suas propostas. Vais receber um alerta quando chegarem."
```

---

### 3.2 Ciclo de Vida da Cotação / Proposta

#### EVT-C05: Primeira Proposta Recebida

```
GATILHO:    Primeiro fornecedor envia proposta para o pedido do comprador
PRIORIDADE: 🟠 URGENTE
CANAL:      Push + SMS

PUSH:
"💡 Proposta Recebida!"
"[Nome do Fornecedor] enviou uma proposta para o teu [Nome do Produto].
 Preço: [X] Kz | Entrega: [N] dias. Vê mais detalhes."
[CTA: VER PROPOSTA]

SMS:
"KARIBU: Tens uma proposta para [Produto].
[Fornecedor]: [X]Kz, entrega [N]dias.
Ver: karibu.ao/p/[ID]"
```

#### EVT-C06: Múltiplas Propostas — Melhor Negócio Disponível

```
GATILHO:    3 ou mais propostas recebidas, ou prazo de licitação a fechar em 4h
PRIORIDADE: 🟠 URGENTE
CANAL:      Push

PUSH:
"🏆 [N] Propostas recebidas! Melhor preço: [X] Kz"
"Compara todas as propostas e escolhe a que mais te convém.
 Prazo para decidir: [TEMPO RESTANTE]"
[CTA: COMPARAR PROPOSTAS]
```

#### EVT-C07: Prazo de Escolha a Expirar

```
GATILHO:    6h antes do prazo limite para o comprador escolher uma proposta
PRIORIDADE: 🔴 CRÍTICA
CANAL:      Push + SMS

PUSH:
"⚠️ Só tens 6h para escolher!"
"Se não escolheres uma proposta a tempo, o teu pedido é cancelado
 e o valor devolvido. Não percas!"
[CTA: ESCOLHER AGORA]

SMS:
"KARIBU: Prazo a terminar em 6h para escolher proposta.
Acede: karibu.ao/p/[ID]"
```

---

### 3.3 Ciclo de Pagamento e Escrow

#### EVT-C08: Confirmação de Pagamento (Escrow)

```
GATILHO:    Pagamento processado com sucesso. Valor em escrow
PRIORIDADE: 🟡 IMPORTANTE
CANAL:      Push + SMS

PUSH:
"🔒 Pagamento Seguro Confirmado"
"[X] Kz estão protegidos em escrow Karibu.
 O fornecedor só recebe após a tua confirmação de entrega."

SMS:
"KARIBU: Pagamento [X]Kz confirmado e protegido.
Ref: [REF]. Guarda este número."
```

#### EVT-C09: Falha de Pagamento

```
GATILHO:    Pagamento rejeitado ou timeout
PRIORIDADE: 🔴 CRÍTICA
CANAL:      Push + SMS

PUSH:
"❌ Pagamento não processado"
"O teu pagamento não foi concluído. O teu pedido está reservado
 por mais 2h. Tenta novamente."
[CTA: REPETIR PAGAMENTO]
```

---

### 3.4 Ciclo Logístico — Consolidação no Hub

#### EVT-C10: Item Chegou ao Hub

```
GATILHO:    Hub regista chegada de um item do pedido do comprador
PRIORIDADE: 🟡 IMPORTANTE
CANAL:      Push

PUSH:
"📦 Item chegou ao Depósito!"
"[Nome do Produto] chegou ao Hub de [Cidade].
 [X] de [N] itens recebidos. Aguardamos os restantes."
[CTA: ACOMPANHAR PEDIDO]
```

#### EVT-C11: Pedido Completamente Consolidado

```
GATILHO:    Último item do pedido chegou ao hub. Pronto para entrega
PRIORIDADE: 🟠 URGENTE
CANAL:      Push + SMS

PUSH:
"🎉 Todos os teus itens chegaram!"
"O teu pedido está completo no Hub de [Cidade].
 Escolhe: Levantar no Hub ou Entrega ao Domicílio."
[CTA: AGENDAR ENTREGA]

SMS:
"KARIBU: Pedido [REF] completo no Hub [Cidade].
Agenda a entrega: karibu.ao/d/[ID]
Prazo levantamento: [DATA]"
```

#### EVT-C12: Entrega Saiu para Distribuição

```
GATILHO:    Agente de entrega recolheu o pedido para entrega ao domicílio
PRIORIDADE: 🟡 IMPORTANTE
CANAL:      Push + SMS

PUSH:
"🚚 A tua encomenda está a caminho!"
"O entregador [Nome] está a dirigir-se para ti.
 Tempo estimado: [N] minutos. Fica atento ao teu telemóvel."

SMS:
"KARIBU: Entrega a caminho!
Entregador: [Nome], Tel: [NUMERO]
Ver localização: karibu.ao/track/[ID]"
```

#### EVT-C13: Entrega Concluída — Solicitação de Confirmação

```
GATILHO:    Entregador marca status como "Entregue"
PRIORIDADE: 🔴 CRÍTICA
CANAL:      Push + SMS

PUSH:
"✅ Entrega Concluída — Confirma a Recepção"
"O entregador marcou a entrega como concluída.
 Confirma que recebeste os teus produtos para liberar o pagamento ao fornecedor.
 ⚠️ Após 72h, a confirmação é automática."
[CTA: CONFIRMAR RECEPÇÃO]

SMS:
"KARIBU: Confirma a tua entrega [REF] em:
karibu.ao/confirm/[ID]
Sem acção em 72h = confirmação automática."
```

---

### 3.5 Notificações de Disputas

#### EVT-C14: Disputa Aberta com Sucesso

```
PRIORIDADE: 🟡 IMPORTANTE | CANAL: Push

"🔍 Disputa Registada — Ref. [ID]"
"A tua reclamação foi recebida. A equipa Karibu irá analisar
 o caso em até 48h úteis. O pagamento permanece retido."
```

#### EVT-C15: Disputa Resolvida

```
PRIORIDADE: 🟠 URGENTE | CANAL: Push + SMS
"⚖️ Disputa Resolvida a teu favor" OU "⚖️ Decisão da Disputa Disponível"
```

---

## 4. Eventos e Notificações — Perspectiva do FORNECEDOR

### 4.1 Gestão de Licitações (Janela de Tempo Crítica)

#### EVT-F01: Novo Pedido de Cotação Disponível

```
GATILHO:    Comprador cria pedido para item onde fornecedor está associado
PRIORIDADE: 🔴 CRÍTICA
CANAL:      Push + SMS simultâneos

PUSH:
"💼 NOVO PEDIDO! Age agora."
"Pedido de [Nome do Produto] × [Qtd] disponível no Carrinho
 [Rota]. Tens [TEMPO] para enviar a tua proposta.
 [N] fornecedores já foram notificados."
[CTA: ENVIAR PROPOSTA]

SMS:
"KARIBU FORNECEDOR: Novo pedido [Produto]×[Qtd].
Prazo proposta: [HORA]. Submete: karibu.ao/bid/[ID]"
```

#### EVT-F02: Lembrete — 4 Horas para Prazo da Proposta

```
GATILHO:    4h antes do prazo de licitação. Fornecedor ainda não enviou proposta
PRIORIDADE: 🔴 CRÍTICA
CANAL:      Push + SMS

PUSH:
"⚠️ 4h para enviar proposta!"
"[N] fornecedor(es) concorrente(s) já submeteram propostas.
 Não percas este pedido: [Produto] × [Qtd]"
[CTA: SUBMETER AGORA]

SMS:
"KARIBU: 4h para proposta [Produto].
[N] concorrentes já submeteram. karibu.ao/bid/[ID]"
```

#### EVT-F03: Proposta Enviada com Sucesso

```
PRIORIDADE: 🟡 IMPORTANTE | CANAL: Push

"✅ Proposta Enviada!"
"A tua proposta de [X] Kz para [Produto] foi submetida.
 O comprador tomará uma decisão até [DATA/HORA]."
```

#### EVT-F04: Proposta Aceite — Pedido Ganho

```
GATILHO:    Comprador selecciona a proposta do fornecedor
PRIORIDADE: 🔴 CRÍTICA
CANAL:      Push + SMS simultâneos

PUSH:
"🏆 PROPOSTA ACEITE! Prepara o envio."
"O comprador aceitou a tua proposta para [Produto] × [Qtd].
 Valor em escrow: [X] Kz. Prazo de envio ao Hub: [DATA]
 ⚠️ Não cumprires o prazo tem penalização."
[CTA: VER INSTRUÇÕES DE ENVIO]

SMS:
"KARIBU: Proposta ACEITE para [Produto]!
Envia ao Hub até [DATA]. Ver: karibu.ao/order/[ID]"
```

#### EVT-F05: Proposta Rejeitada

```
PRIORIDADE: 🟢 INFORMATIVA | CANAL: Push (In-App)

"Proposta não seleccionada para [Produto]"
"O comprador escolheu outra proposta desta vez.
 Analisa o que podes melhorar no teu próximo lance."
[CTA: VER ANÁLISE DE PREÇOS]
```

---

### 4.2 Gestão de Entregas ao Hub

#### EVT-F06: Prazo de Entrega ao Hub a Aproximar-se

```
GATILHO:    48h antes do prazo de envio ao hub
PRIORIDADE: 🟠 URGENTE | CANAL: Push + SMS

PUSH:
"📦 Lembra-te: Envio ao Hub em 48h"
"Pedido [Produto] × [Qtd] deve chegar ao Hub [Cidade]
 até [DATA]. Já enviaste?"
[CTA: CONFIRMAR ENVIO]
```

#### EVT-F07: Hub Confirmou Recepção do Produto

```
PRIORIDADE: 🟡 IMPORTANTE | CANAL: Push

"✅ Hub recebeu o teu produto!"
"O Hub de [Cidade] confirmou a recepção de [Produto].
 O processo de verificação e etiquetagem começou."
```

#### EVT-F08: Problema de Verificação no Hub

```
GATILHO:    Hub identifica discrepância no produto recebido
PRIORIDADE: 🔴 CRÍTICA | CANAL: Push + SMS

PUSH:
"🚨 ATENÇÃO: Problema na Verificação do Hub"
"O Hub de [Cidade] identificou um problema em [Produto]:
 [DESCRIÇÃO DO PROBLEMA]. Contacta-nos em 4h."
[CTA: CONTACTAR SUPORTE]
```

---

### 4.3 Pagamentos ao Fornecedor

#### EVT-F09: Pagamento Liberado para Conta

```
GATILHO:    Comprador confirma recepção OU 72h após status "Entregue"
PRIORIDADE: 🟡 IMPORTANTE | CANAL: Push + SMS

PUSH:
"💰 Pagamento Liberado!"
"[X] Kz foram transferidos para a tua conta.
 Ref: [REF]. Disponível em [PRAZO BANCÁRIO]."

SMS:
"KARIBU: Pagamento [X]Kz liberado. Ref:[REF].
Disponivel em [N]dias uteis."
```

#### EVT-F10: Disputa Aberta pelo Comprador

```
PRIORIDADE: 🔴 CRÍTICA | CANAL: Push + SMS

"🚨 Disputa Aberta — Pagamento Retido"
"O comprador abriu uma disputa sobre [Produto].
 O pagamento está retido. Acede para responder em 24h."
```

---

## 5. Mapa de Timing — Resumo Operacional

```
EVENTO                              TIMING              CANAIS
──────────────────────────────────────────────────────────────────
Carrinho aberto (rota interesse)    Imediato            Push
Carrinho fecha em 24h               T-24h               Push → SMS +30min
Carrinho fecha em 2h                T-2h                Push + SMS
Pedido confirmado                   Imediato            Push
1ª proposta recebida                Imediato            Push + SMS
N propostas / melhor preço          3+ propostas / T-4h Push
Prazo escolha em 6h                 T-6h                Push + SMS
Pagamento escrow confirmado         Imediato            Push + SMS
Item chegou ao hub                  Imediato check-in   Push
Pedido consolidado                  Último item         Push + SMS
Entrega saiu para distribuição      Imediato            Push + SMS
Confirmação de entrega              Imediato            Push + SMS
Pagamento liberado fornecedor       Confirmação/72h     Push + SMS

FORNECEDOR
Novo pedido cotação                 Imediato            Push + SMS
4h para prazo proposta              T-4h                Push + SMS
Proposta aceite                     Imediato            Push + SMS
48h para entrega hub                T-48h               Push + SMS
Hub recebeu produto                 Imediato            Push
Pagamento liberado                  Conf/72h            Push + SMS
Disputa aberta                      Imediato            Push + SMS
```

---

## 6. Regras de Supressão e Anti-Fadiga

```
REGRA 1 — Quietude Nocturna:
  01:00–06:00: Bloquear Push não crítico
  SMS críticos (pagamento, disputa): Sempre permitidos

REGRA 2 — Consolidação:
  Múltiplos itens chegando ao hub no mesmo dia?
  → 1 push consolidado: "3 itens chegaram hoje ao Hub"

REGRA 3 — Máximo Diário:
  Push informativas: máx. 3/dia por utilizador
  SMS: máx. 2/dia por utilizador (salvo críticos)

REGRA 4 — Fallback Inteligente:
  Push não lida em [N] min → SMS automático
  Tempos de fallback:
    CRÍTICA: 5 min
    URGENTE: 30 min
    IMPORTANTE: 2h

REGRA 5 — Opt-out Granular:
  Utilizador pode desactivar por categoria:
  ✓ Actualizações de preços
  ✓ Carrinho aberto (nova rota)
  ✗ Pagamentos (obrigatório — não desactivável)
  ✗ Disputas (obrigatório)
```

---

## 7. Especificações Técnicas para Contexto Angola/África

### Gestão de Conectividade

```
SMS PROVIDER:       Unitel API + Movicel API (redundância dupla)
PUSH PROVIDER:      Firebase Cloud Messaging (FCM)
FALLBACK LOGIC:     Fila assíncrona com retry exponential backoff
OFFLINE QUEUE:      Mensagens retidas por até 72h (exceto expiradas)
```

### Formato de SMS Optimizado

```
Max 160 caracteres (1 SMS)
Sem acentos em SMS (compatibilidade GSM básico)
Link encurtado sempre (karibu.ao/[ID])
Número de suporte incluído em mensagens críticas
```

### Templates de SMS sem Acentos (Para Envio Real)

```
"KARIBU: Carrinho Windhoek-Luanda fecha em 2h!
Confirma agora: karibu.ao/c/ABC123 ou liga 900XXX"

"KARIBU: Proposta ACEITE para [Produto]!
Envia ao Hub ate [DATA]. Ver: karibu.ao/o/ABC123"
```

---

_Documento v1.0 | Karibu Product Team | Março 2026_
