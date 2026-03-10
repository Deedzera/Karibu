# Karibu — Regras de Negócio Críticas

> **Versão:** 1.0 | **Data:** Março 2026 | **Classificação:** Operações — Governance

---

## 1. Visão Geral

As regras de negócio do Karibu foram desenhadas para prevenir os problemas mais comuns em marketplaces emergentes. São divididas em seis domínios:

1. Propostas Irreais e Dumping
2. Cancelamentos
3. Falha de Entrega do Fornecedor
4. Disputas Cliente–Fornecedor
5. Manipulação de Preços e Catálogo
6. Reputação e Exclusão de Plataforma

---

## 2. Regras de Propostas e Licitação

### RN-L01 — Proposta Abaixo do Preço Mínimo Viável

```
DEFINIÇÃO:
  Proposta < 85% do preço âncora inferior é considerada "proposta de risco".

EXEMPLO:
  Âncora inferior: 145.000 Kz
  Limiar de risco: 145.000 × 0,85 = 123.250 Kz
  Proposta de 110.000 Kz → FLAGGED

ACÇÃO AUTOMÁTICA:
  1. Proposta não é imediatamente publicada ao comprador
  2. Fornecedor recebe alerta a pedir justificação
     (ex: "Stock de liquidação", "Produto de segunda mão", etc.)
  3. Se justificação aprovada por moderador em 2h → proposta publicada
  4. Se sem justificação em 2h → proposta descartada automaticamente

PENALIZAÇÃO POR REINCIDÊNCIA:
  2.ª vez:  Aviso formal + nota no perfil
  3.ª vez:  Suspensão de 14 dias
  4.ª vez:  Banimento permanente
```

### RN-L02 — Imutabilidade da Proposta

```
Após submissão, nenhuma proposta pode ser editada.
O fornecedor pode só RETIRAR a proposta, mas:
  • A retirada é registada no histórico
  • 3 retiradas consecutivas = penalização de -5 no score
  • Retirada após comprador iniciar análise = penalização de -10
```

### RN-L03 — Limite de Propostas por Item

```
Máximo de 8 fornecedores por pedido de cotação.
Após 8, novos fornecedores vêem o item como "Lotado"
e podem activar alerta para próximo carrinho.

Justificação: Mais de 8 propostas aumenta a paralisia
de escolha do comprador e reduz qualidade média.
```

### RN-L04 — Prazo de Licitação

```
Default: 24h após fecho do carrinho
Mínimo garantido: 12h (carrinhos urgentes)
Máximo: 48h

Após expiração do prazo:
  • Propostas recebidas são apresentadas ao comprador
  • Se nenhuma proposta → produto marcado como "Sem cobertura"
    e comprador recebe reembolso de qualquer valor pago antecipadamente
```

---

## 3. Regras de Cancelamento

### RN-C01 — Cancelamento pelo COMPRADOR (antes de escolher proposta)

```
ANTES do prazo de cotação fechar:
  Cancel. gratuito → 100% de reembolso
  → Score do comprador não é afectado

DEPOIS de escolher proposta (antes de pagamento):
  Cancel. gratuito → Fornecedor notificado, nenhuma penalização
  → Se reincidente (3x/mês) → aviso; 5x/mês → revisão de conta
```

### RN-C02 — Cancelamento pelo COMPRADOR (após pagamento)

```
ANTES do fornecedor confirmar recolha do produto para o hub:
  Reembolso: 95% (taxa de processamento de 5% retida)
  Prazo de reembolso: 3–5 dias úteis

APÓS fornecedor confirmar envio ao hub:
  Cancelamento apenas disponível se:
  a) Produto ainda não chegou ao hub (possível intercepção)
     → Reembolso parcial: 85%
  b) Produto já chegou ao hub
     → Processo de disputa activado (ver RN-D)
```

### RN-C03 — Cancelamento pelo FORNECEDOR (após proposta aceite)

```
ESTA É A VIOLAÇÃO MAIS GRAVE DO LADO DO FORNECEDOR

Penalização imediata:
  • Score: -15 pontos
  • Multa: 5% do valor do pedido (debitado no próximo pagamento)
  • Inelegível para novas licitações por 30 dias

Se cancelar por motivo de força maior (documentado):
  • Multa dispensada, mas -8 no score mantido
  • Documentos exigidos: foto/certidão comprovativa

Reincidência (2+ cancels em 6 meses):
  • Suspensão mínima de 90 dias + revisão manual para retorno
```

---

## 4. Regras de Falha de Entrega

### RN-E01 — Atraso na Entrega ao Hub

```
ATRASO DE 1–24H:
  • Notificação automática ao fornecedor (push + SMS)
  • Comprador notificado da nova previsão de chegada
  • Penalização: -3 no score do fornecedor

ATRASO > 24H SEM COMUNICAÇÃO:
  • Karibu tenta contacto com fornecedor (3 tentativas em 4h)
  • Se sem resposta → Comprador recebe opção de cancelar
  • Se cancelar → reembolso total; fornecedor paga multa de 8%

ATRASO > 72H:
  • Cancelamento automático activado
  • Reembolso total ao comprador
  • Multa de 10% ao fornecedor
  • Score: -15 pontos
```

### RN-E02 — Produto Rejeitado no Hub (Não Conformidade)

```
CAUSAS COMUNS:
  • Produto diferente do descrito (modelo, cor, capacidade)
  • Produto visivelmente danificado ou em segunda mão sem declaração
  • Sem documentação de origem

PROCESSO:
  1. Hub fotografa o produto e documenta a discrepância
  2. Karibu notifica fornecedor com evidências (fotos + descrição)
  3. Fornecedor tem 24h para responder com:
     a) Concordar com rejeição → produto devolvido, pedido cancelado
     b) Contestar → entra em revisão manual por equipa Karibu

RESULTADO SE CONFIRMADA NÃO CONFORMIDADE:
  • Comprador: reembolso 100%
  • Fornecedor: -10 no score + custo de logística de devolução
```

### RN-E03 — Falha na Entrega Final ao Comprador

```
SE entregador não consegue contactar comprador em 2 tentativas:
  • Pedido retorna ao Hub em 24h
  • Comprador notificado para agendar nova tentativa
  • 2.ª tentativa gratuita (custo absorvido pela plataforma)
  • 3.ª tentativa: custo adicional de 1.200 Kz ao comprador

SE pedido permanecer no Hub > 7 dias sem levantamento:
  • Aviso formal
  • Após 14 dias: taxa de armazenamento de 500 Kz/dia
  • Após 30 dias: produto disponibilizado como stock para liqiudação
```

---

## 5. Regras de Disputas

### RN-D01 — Abertura de Disputa

```
QUEM PODE ABRIR: Qualquer comprador com pedido no status "Entregue"
PRAZO PARA ABRIR: Até 5 dias após status "Entregue"
Após 5 dias: pagamento ao fornecedor liberado automaticamente.

MOTIVOS VÁLIDOS:
  • Produto não recebido (status erróneo)
  • Produto diferente do descrito
  • Produto com defeito comprovado
  • Quantidade incorrecta

MOTIVOS NÃO ACEITES:
  • "Mudei de ideia" (cancelamento, não disputa)
  • "Encontrei mais barato" (não é fundamento)
  • Danificação claramente pós-entrega
```

### RN-D02 — Processo de Resolução

```
FASE 1 — Resolução Directa (0–24h):
  Karibu apresenta ambas as partes e espera acordo voluntário.
  Se resolvido → pagamento processado conforme acordo.

FASE 2 — Mediação Karibu (24–72h):
  Equipa Karibu analisa evidências:
  • Fotos do hub (produto verificado)
  • Fotos de entrega (foto confirmada pelo entregador)
  • Histórico de comunicação
  • Score do fornecedor

DECISÃO DA MEDIAÇÃO (opções):
  a) Favorável ao comprador → reembolso total/parcial + penalização fornecedor
  b) Favorável ao fornecedor → pagamento liberado + aviso ao comprador
  c) Resolução partilhada → reembolso parcial acordado

FASE 3 — Escalação (72h+, casos complexos):
  Revisão por equipa sénior + possível envolvimento de terceiros.
  Prazo máximo de resolução: 10 dias úteis.
```

### RN-D03 — Protecção Contra Disputas Abusivas

```
Compradores com padrão abusivo:
  • > 20% de pedidos terminam em disputa → revisão de conta
  • Disputa julgada improcedente 3x → aviso formal
  • 5 disputas improcedentes → suspensão de conta

Mecanismo anti-fraude:
  • Score de risco calculado por comprador (histórico de disputas)
  • Compradores de alto risco podem ter escrow estendido para 7 dias
```

---

## 6. Regras Anti-Manipulação de Preços e Catálogo

### RN-P01 — Manipulação do Preço Âncora

```
O preço âncora é calculado automaticamente.
Nenhum fornecedor ou admin pode alterá-lo manualmente.

Algoritmo inclui:
  • Câmbio BOA do dia (taxa oficial)
  • Média ponderada das últimas 10 transacções do mesmo produto
  • Floor price (preço mínimo absoluto de custo estimado)

Qualquer produto cujo preço âncora pareça anómalo é
flagged automaticamente para revisão em 24h.
```

### RN-P02 — Produtos Proibidos

```
Lista de categorias proibidas:
  ✗ Armas, munições e seus acessórios
  ✗ Medicamentos sem prescrição controlada
  ✗ Produtos com restrição de importação em Angola
  ✗ Produtos falsificados ou réplicas não declaradas
  ✗ Produtos de origem ilícita declarada

Processo de detecção:
  • Triagem automática por palavras-chave no catálogo
  • Verificação manual nas primeiras 5 submissions de cada fornecedor
  • Denúncia por utilizadores (botão "Reportar" em cada produto)
```

### RN-P03 — Conluio entre Fornecedores

```
Indicadores de conluio:
  • Dois fornecedores com IPs coincidentes a submeter propostas similares
  • Padrão de revezamento (A ganha, depois B, depois A)
  • Fornecedores que comunicam externamente coordenam preços

Detecção automática + revisão manual mensal.
Penalização: suspensão permanente de ambas as contas.
```

---

## 7. Regras de Score e Exclusão de Plataforma

### RN-S01 — Níveis de Score e Consequências

| Score  | Status        | Consequências                                      |
| ------ | ------------- | -------------------------------------------------- |
| 85–100 | Elite         | Acesso premium + destaque nos resultados           |
| 70–84  | Standard      | Acesso completo à plataforma                       |
| 50–69  | Em Observação | Limitação a 3 propostas/semana; sem pedidos > 300k |
| 30–49  | Suspenso      | Sem licitação por 30 dias; revisão obrigatória     |
| < 30   | Banido        | Desactivação da conta                              |

### RN-S02 — Reabilitação de Conta Suspensa

```
Para retomar actividade após suspensão:
  1. Período mínimo de espera (30 dias)
  2. Revisão de identidade (novo KYC se exigido)
  3. Declaração formal de compromisso
  4. Período probatório de 60 dias (score mínimo 60 para sair)
```

---

_Documento v1.0 | Karibu Product Team | Março 2026_
