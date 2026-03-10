# Karibu — Estratégia Mestre de Produto

> **Versão:** 1.0 | **Data:** Março 2026 | **Consultor:** Product Strategy Senior

---

## 1. Resumo Executivo

O Karibu opera na intersecção de três mercados: **comércio transfronteiriço**, **logística regional** e **fintech de confiança** — num dos corredores comerciais mais subdesenvolvidos da África Austral: Namíbia → Angola.

O modelo é estruturalmente defensável porque resolve problemas que não são simples de copiar:

| Problema                         | Solução Karibu             | Vantagem Competitiva               |
| -------------------------------- | -------------------------- | ---------------------------------- |
| Desconfiança no pagamento        | Sistema de Escrow          | Reputação + operação de hub física |
| Volatilidade cambial             | Preço âncora em tempo real | Integração com câmbio oficial BOA  |
| Logística sem rastreio           | Hub-and-Spoke regional     | Contratos com hubs físicos         |
| Informalidade dos intermediários | Leilão reverso formalizado | Network effect de fornecedores     |

---

## 2. Fase de Lançamento — Rede Logística Regional

### 2.1 As 8 Províncias da Fase 1

```
FASE 1 — REDE INICIAL (2026)

  ROTA TRONCAL (entrada do país):
  Namíbia → [HUB PRIMÁRIO LUBANGO]

  DISTRIBUIÇÃO REGIONAL:
  Lubango ─────→ Namibe        (260 km — EN280)
  Lubango ─────→ Cunene/Ondjiva (230 km — EN280+ EN120)
  Lubango ─────→ Huambo        (320 km — EN180)
  Huambo  ─────→ Bié/Kuito     (180 km — EN180)
  Luanda  ─────→ Benguela      (530 km — EN100 / aéreo)
  Benguela ────→ Lobito / Sumbe (120–280 km — costa)

POSICIONAMENTO DE HUBS:
  Hub Primário:    Lubango (entrada da Namíbia)
  Hub Secundário:  Luanda (maior mercado consumidor)
  Hub de Apoio:    Benguela, Huambo, Namibe, Cunene, Bié, Sumbe
```

### 2.2 Critérios para Selecção de Hub Parceiro

```
CRITÉRIOS OBRIGATÓRIOS:
  ✅ Espaço mínimo de 50m² para armazenamento seguro
  ✅ Presença de responsável nos horários de recepção (08:00–17:00)
  ✅ Cobertura de rede mínima 3G para actualização de status em app
  ✅ Localização identificável por GPS e ponto de referência físico

CRITÉRIOS PREFERENCIAIS:
  ⭐ Empresa já registada formalmente (contribuinte activo)
  ⭐ Histórico de operações logísticas ou comerciais
  ⭐ Acesso a viatura para última milha (parceria)
```

### 2.3 Estratégia de Carrinhos por Fase

```
MESES 1–3 (Validação):
  2 carrinhos/mês: Lubango ↔ Windhoek
  Foco: testar o processo, treinar hubs, validar escrow

MESES 4–6 (Expansão):
  + Luanda ↔ Windhoek (via Lubango)
  + Huambo ligado ao Hub Lubango
  Meta: 50 pedidos/mês

MESES 7–12 (Consolidação):
  Todas as 8 províncias operacionais
  Meta: 200 pedidos/mês, NPS > 70
```

---

## 3. Considerações para Mercados Emergentes

### 3.1 Baixa Conectividade

```
ESTRATÉGIA OFFLINE-FIRST:

  a) Aplicação Progressive Web App (PWA)
     • Funciona como app sem instalar da Play Store
     • Elimina barreira de espaço de armazenamento no telemóvel
     • Atualizações automáticas sem re-download

  b) Service Worker Cache
     • Páginas críticas cacheadas para leitura offline
     • Formulários submetidos entram em fila offline
     • Sincronização automática ao recuperar ligação

  c) SMS como canal de fallback garantido
     • Qualquer notificação crítica tem versão SMS
     • SMS não depende de dados móveis ou WiFi
     • Funciona em redes 2G/EDGE (presença em 99% do território)

  d) API de dados comprimidos
     • Respostas JSON mínimas (sem campos redundantes)
     • Imagens servidas em WebP com qualidade adaptativa
     • Modo "low data" detecta automaticamente rede lenta
```

### 3.2 Pagamentos Digitais Limitados

```
ESTRATÉGIA MULTI-MÉTODO:

  ENTRADA (Comprador):
    • Multicaixa Express (principal — cobertura nacional)
    • ATM com referência bancária
    • Transferência bancária (BFA, BIC, BAI, BNA, Atlântico)
    • Unitel Money / M-Kesh (para utilizadores sem conta bancária)
    • Pagamento em Hub físico (para utilizadores sem acesso digital)

  SAÍDA (Fornecedor):
    • Transferência bancária (prazo: 2–5 dias úteis)
    • Multicaixa Express
    • Levantamento em Hub (para montantes < 150.000 Kz)

  ESCROW:
    • Conta segregada em banco angolano regulado
    • Relatório mensal de reconciliação disponível
    • Jamais misturado com capital operacional da empresa
```

### 3.3 Construção de Confiança Digital

```
PROBLEMA: Angolanos têm baixa confiança em plataformas digitais
devido a histórico de fraudes e golpes online.

ESTRATÉGIA EM CAMADAS:

  CAMADA 1 — Tangibilidade:
    • Hub físico é um ponto de contacto real, visitável
    • Equipa de suporte com número de telefone angolano local
    • Presença nas redes sociais com respostas humanas reais

  CAMADA 2 — Transparência:
    • Escrow explicado de forma simples e visual em todo o fluxo
    • "Como funciona" accessible em 3 cliques de qualquer página
    • Termos em português claro (sem linguagem jurídica)

  CAMADA 3 — Prova Social Localizada:
    • Avaliações com nome, cidade e foto real do comprador
    • Contador de pedidos entregues na homepage
    • "Última compra em Lubango: há 2 horas"

  CAMADA 4 — Presença Comunitária:
    • Grupos de WhatsApp por cidade (geridos pela Karibu)
    • Embaixadores locais: utilizadores de confiança que
      esclarecem dúvidas da comunidade em troca de benefícios
    • Eventos físicos de "experiência do hub" nos primeiros meses
```

### 3.4 Logística Urbana Informal

```
PROBLEMA: Entrega de última milha em Angola é complexa porque:
  • Endereços formais inexistentes em muitas áreas
  • GPS impreciso em bairros periféricos
  • Alta rotatividade de entregadores informais

SOLUÇÃO KARIBU:

  a) Pontos de Referência Obrigatórios
     Entregadores registam 3 pontos de referência visuais:
     (ex: "Em frente ao Banco BIC, segundo portão azul, casa amarela")
     + coordenadas GPS + foto da fachada

  b) Confirmação Fotográfica de Entrega
     Entregador tira foto do produto entregue em mãos do comprador.
     Geotagged. Obrigatório para liberar pagamento.

  c) Rede de Pontos de Levantamento
     Parcerias com lojas, farmácias e estabelecimentos
     de zona para funcionar como pontos de levantamento.
     Útil para quem não tem endereço formal estável.

  d) Opção de Recolha no Hub
     Sempre disponível. Gratuita. Elimina completamente
     o problema de entrega em zonas difíceis.
```

---

## 4. Escalabilidade do Modelo

### 4.1 Novas Províncias em Angola (Fase 2 e 3)

```
CRITÉRIOS PARA ACTIVAÇÃO DE NOVA PROVÍNCIA:
  1. ≥ 10 fornecedores registados e verificados na área
  2. Hub parceiro operacional identificado e treinado
  3. Conectividade 3G em > 70% da área urbana da capital provincial
  4. ≥ 50 utilizadores pré-registados (lista de espera)

FASE 2 (2027) — CANDIDATAS PRIORITÁRIAS:
  • Malanje (corredor Luanda–Malanje activo)
  • Cabinda (mercado isolado com elevada procura)
  • Uige (fronteira com Congo — nova rota potencial)

FASE 3 (2028) — EXPANSÃO COMPLETA:
  • Cobertura das 18 províncias angolanas
  • Rede de hubs próprios nas capitais provinciais
```

### 4.2 Novas Rotas Internacionais

```
PIPELINE DE EXPANSÃO DE ROTAS:

CURTO PRAZO (2026–2027):
  Angola ↔ África do Sul (via Johannesburgo)
    Motivação: maior volume de importações; hub Jo'burg já maduro
    Desafio: câmbio ZAR/KZ; regulação aduaneira diferente

  Angola ↔ China (parceria com agente de consolidação em Guangzhou)
    Motivação: electrónica, têxtil e construção a custos muito inferiores
    Desafio: tempo de trânsito (30–45 dias); necessidade de pré-pagamento

MÉDIO PRAZO (2027–2028):
  Angola ↔ Portugal / Europa
    Motivação: produtos de qualidade europeia; diáspora angolana
  Angola ↔ Dubai (Emirados)
    Motivação: electrónica; produtos de luxo

MODELO DE EXPANSÃO DE ROTA:
  1. Validação de demanda: sondagem a utilizadores activos
  2. Parceiro logístico identificado no país de origem
  3. Piloto com 1 carrinho/mês durante 3 meses
  4. Expansão se NPS > 65 e margem operacional positiva
```

### 4.3 Escalabilidade de Fornecedores

```
PROBLEMA: Com muitos fornecedores, como manter qualidade?

SOLUÇÃO: Sistema de Tiers de Fornecedor

  TIER 3 — New (score < 70):
    • Verificação manual em todos os produtos
    • Limite de 3 licitações/semana
    • Hub inspeciona 100% das entregas

  TIER 2 — Verified (score 70–84):
    • Inspecção aleatória em hub (30% das entregas)
    • Limite de 10 licitações/semana
    • Acesso a analytics básicos

  TIER 1 — Elite (score ≥ 85):
    • Inspecção spot (10% das entregas)
    • Licitações ilimitadas
    • Acesso a pedidos premium
    • Dados de mercado avançados
    • Badge "Fornecedor Elite" no perfil (trust signal para compradores)

  TIER 0 — Partner (convite):
    • Fornecedores com > 500 pedidos e score > 95
    • Co-desenvolvimento de funcionalidades
    • API de integração directa com o sistema de stock
    • Comissão negociada individualmente
```

### 4.4 Escalabilidade da Plataforma Tecnológica

```
ARQUITECTURA RECOMENDADA para escala:

  BASE DE DADOS:
    • PostgreSQL com read replicas por região
    • Tabelas de pedidos, propostas e escrow particionadas por mês

  BACKEND:
    • API REST com rate limiting (protege de abuso)
    • Workers assíncronos para notificações (evita bloqueio de thread)
    • Sistema de filas (Redis/RabbitMQ) para SMS e notificações push

  FRONTEND:
    • PWA com Service Worker para offline
    • CDN angolano ou edge em Africa do Sul (latência reduzida)
    • Assets estáticos em S3-equivalent (ex: Cloudflare R2)

  INFRAESTRUTURA:
    • Fase 1: Servidor único managed (ex: Railway, Render)
    • Fase 2: Multi-region (Angola/SA zone em AWS ou Azure)
    • Fase 3: Microserviços para componentes de alto volume
                (notificações, escrow, catálogo separados)
```

---

## 5. Modelo de Monetização Detalhado

### 5.1 Revenue Streams

| Stream                    | Mecanismo                                | Percentagem / Valor | Fase   |
| ------------------------- | ---------------------------------------- | ------------------- | ------ |
| Comissão de Transacção    | % sobre valor da proposta aceite         | 5–7%                | Fase 1 |
| Taxa de Hub               | Por item processado no hub               | 500–1.500 Kz/item   | Fase 1 |
| Taxa de Entrega Domicílio | Serviço premium de entrega               | 2.000–5.000 Kz      | Fase 1 |
| Assinatura PRO Fornecedor | Mensalidade para acesso avançado         | 9.900 Kz/mês        | Fase 1 |
| Assinatura Enterprise     | Fornecedores de alto volume              | Negociado           | Fase 2 |
| Dados de Mercado          | Relatórios de preços e tendências        | ~30.000 Kz/mês      | Fase 2 |
| Publicidade Contextual    | Destaque de produto em carrinhos activos | CPM/CPC             | Fase 3 |
| Serviços Financeiros      | Adiantamento sobre escrow futuro         | Taxa de serviço     | Fase 3 |

### 5.2 Estrutura de Comissão Progressiva

```
Valor do Pedido        Comissão Karibu
< 50.000 Kz:           7%   (pedidos pequenos — maior % para viabilidade)
50.001–200.000 Kz:     6%   (volume médio — standard)
200.001–500.000 Kz:    5%   (volume alto — incentivo a pedidos grandes)
> 500.000 Kz:          4%   (pedidos premium — fidelização de fornecedores elite)

Fornecedores PRO têm 0.5% de desconto na comissão.
Fornecedores Elite têm 1% de desconto na comissão.
```

---

## 6. KPIs e Métricas de Sucesso

### 6.1 Métricas Operacionais (Fase 1)

```
AQUISIÇÃO:
  • CAC (Custo de Aquisição Cliente): Meta < 2.000 Kz
  • Fornecedores activos: Meta 50 em M6, 150 em M12

ACTIVATION:
  • % compradores que completam 1.º pedido em 7 dias: Meta > 40%
  • % fornecedores que ganham 1.ª proposta em 30 dias: Meta > 60%

RETENTION:
  • Repetição de compra em 90 dias: Meta > 35%
  • Churn de fornecedores PRO: Meta < 10%/mês

REVENUE:
  • GMV (Gross Merchandise Value): Meta 50M Kz em M12
  • Take rate efectivo: Meta 6% do GMV

CONFIANÇA:
  • NPS do comprador: Meta > 60
  • Taxa de disputas/pedidos: Meta < 5%
  • Taxa de entrega no prazo: Meta > 85%
```

---

## 7. Riscos e Mitigações

| Risco                                        | Probabilidade | Impacto | Mitigação                                                      |
| -------------------------------------------- | ------------- | ------- | -------------------------------------------------------------- |
| Regulação aduaneira restritiva               | Alta          | Alto    | Parceria com despachante licenciado; compliance da DAF         |
| Desvalorização do Kwanza                     | Alta          | Alto    | Preço âncora actualizado diariamente; opção de preços em USD   |
| Fornecedor dominante cria plataforma própria | Média         | Alto    | Contrato de exclusividade por 12 meses com Top 10 fornecedores |
| Fraude de identidade (fornecedor)            | Média         | Alto    | KYC presencial no hub antes de 1.ª licitação                   |
| Baixa adopção digital em províncias          | Alta          | Médio   | Embaixadores locais + canal de pedidos via WhatsApp            |
| Concorrente informal (Zap, Aximcom)          | Alta          | Médio   | Diferenciação por escrow e hub — eles não têm infraestrutura   |
| Falha de hub parceiro                        | Baixa         | Alto    | SLA contratual + hub backup na mesma cidade                    |

---

## 8. Go-To-Market — Primeiros 90 Dias

```
DIA 1–30 — Fundação:
  • Contratar Hub Manager em Lubango e Luanda
  • Lançar campanha de recrutamento de fornecedores
    (Facebook, Instagram, grupos de WhatsApp de comércio)
  • Validar processo de KYC presencial com 10 fornecedores piloto
  • Testar 1 carrinho completo (Windhoek→Lubango) com pedidos reais

DIA 31–60 — Primeiro Produto ao Vivo:
  • Abrir registo público de compradores
  • Lançar 2 carrinhos simultâneos
  • Activar sistema de escrow com moeda local
  • Recolher NPS de cada transacção completada

DIA 61–90 — Iteração e Expansão:
  • Analisar dados das primeiras 50 transacções
  • Identificar categoria de produto com maior procura
  • Expandir para Huambo e Benguela
  • Lançar Plano PRO para fornecedores com > 5 pedidos ganhos
```

---

## Índice de Documentos do Projecto

| Documento                                                      | Descrição                                            |
| -------------------------------------------------------------- | ---------------------------------------------------- |
| [karibu_notification_flow.md](karibu_notification_flow.md)     | Sistema de notificações Push/SMS em tempo real       |
| [karibu_supplier_dashboard.md](karibu_supplier_dashboard.md)   | Painel de controlo do fornecedor                     |
| [karibu_product_detail_page.md](karibu_product_detail_page.md) | Página de detalhe do produto e gatilhos de conversão |
| [karibu_business_rules.md](karibu_business_rules.md)           | Regras de negócio, disputas e anti-abuso             |
| **karibu_master_strategy.md**                                  | **Este documento — Estratégia mestre**               |

---

_Documento v1.0 | Karibu Product Team | Março 2026_
_Consultor: Product Strategy Senior — Mercados Emergentes Africanos_
