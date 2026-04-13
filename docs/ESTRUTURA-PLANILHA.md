# 📊 Estrutura da Planilha - Google Sheets

## Nome da Planilha
`Sistema Angelus - Lanchonete`

---

## Aba: Funcionarios

| Coluna | Campo | Tipo | Obrigatório | Exemplo |
|--------|-------|------|-------------|---------|
| A | Matricula | Número | ✅ Sim | 1001 |
| B | Nome | Texto | ✅ Sim | Maria Silva |
| C | Setor | Texto | ⚠️ Autocadastro | Enfermagem |
| D | Email | Texto | ⚠️ Autocadastro | maria@hospital.com |
| E | Telefone | Número | ⚠️ Autocadastro | 83988024149 |

> ⚠️ Colunas C, D e E podem ficar vazias inicialmente.
> O funcionário preenche na primeira compra (autocadastro).

---

## Aba: Registros

| Coluna | Campo | Tipo | Preenchimento | Exemplo |
|--------|-------|------|---------------|---------|
| A | Data/Hora | Data | Automático | 09/04/2026 14:30:00 |
| B | Matricula | Número | Automático | 1001 |
| C | Nome | Texto | Automático | Maria Silva |
| D | Setor | Texto | Automático | Enfermagem |
| E | Valor | Moeda | Automático | R$ 15,50 |
| F | Protocolo | Texto | Automático | ANG202604091430001001 |
| G | Status | Texto | Automático | E-mail enviado |

> Todos os campos são preenchidos automaticamente pelo sistema.
> NÃO edite esta aba manualmente.

---

## Observações Importantes

- O nome das abas deve ser **exatamente**: `Funcionarios` e `Registros`
- A aba Funcionarios usa nomes **sem acento**
- As matrículas devem ser **únicas**
- O telefone deve ter **DDD + número** (11 dígitos)
- Formate a coluna Matricula como **Texto simples** para evitar problemas
