# 📂 Estrutura da Planilha - Google Sheets

## Nome da Planilha
A planilha deve ser nomeada como: `Sistema Angelus - Lanchonete`

---

## Aba: `Funcionarios`

<table style="width:100%; border-collapse: collapse; border: 1px solid #ddd; font-family: sans-serif; font-size: 14px;">
  <thead style="background-color: #f2f2f2;">
    <tr>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: center;">Coluna</th>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Campo</th>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Descrição / Uso</th>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Exemplo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold;">A</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Matrícula</td>
      <td style="border: 1px solid #ddd; padding: 10px;"><strong>ID Único</strong>. Coluna de busca principal. Deve ser texto ou número sem espaços.</td>
      <td style="border: 1px solid #ddd; padding: 10px;">1001</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold;">B</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Nome</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Nome completo do funcionário.</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Maria Silva</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold;">C</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Setor</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Setor do hospital. Lida pelo RH ou preenchida pelo Autocadastro.</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Enfermagem</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold;">D</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Email</td>
      <td style="border: 1px solid #ddd; padding: 10px;">E-mail para recebimento de comprovantes. Lida pelo RH ou preenchida pelo Autocadastro.</td>
      <td style="border: 1px solid #ddd; padding: 10px;">maria@hospital.com</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold;">E</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Telefone</td>
      <td style="border: 1px solid #ddd; padding: 10px;">WhatsApp com DDD (apenas números). Lida pelo RH ou preenchida pelo Autocadastro.</td>
      <td style="border: 1px solid #ddd; padding: 10px;">83988024149</td>
    </tr>
  </tbody>
</table>

<p style="font-size: 13px; color: #666; margin-top: 10px;">⚠️ <em>As colunas C, D e E podem ficar vazias inicialmente. O funcionário as preenche na primeira compra (Autocadastro).</em></p>

---

## Aba: `Registros`

<table style="width:100%; border-collapse: collapse; border: 1px solid #ddd; font-family: sans-serif; font-size: 14px;">
  <thead style="background-color: #f2f2f2;">
    <tr>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: center;">Coluna</th>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Campo</th>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Descrição / Uso</th>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Exemplo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold;">A</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Data/Hora</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Data e horário exatos da transação (fuso horário America/Sao_Paulo).</td>
      <td style="border: 1px solid #ddd; padding: 10px;">09/04/2026 14:30:00</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold;">B</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Matrícula</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Matrícula do funcionário que consumiu.</td>
      <td style="border: 1px solid #ddd; padding: 10px;">1001</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold;">C</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Nome</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Nome do funcionário.</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Maria Silva</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold;">D</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Setor</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Setor do funcionário no momento da compra.</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Enfermagem</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold;">E</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Protocolo</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Protocolo único e irrepetível da transação.</td>
      <td style="border: 1px solid #ddd; padding: 10px;">ANG202604091430001001</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold;">F</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Valor</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Valor total consumido (formato moeda R$).</td>
      <td style="border: 1px solid #ddd; padding: 10px;">R$ 15,50</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold;">G</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Status</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Status do envio do comprovante de e-mail.</td>
      <td style="border: 1px solid #ddd; padding: 10px;">E-mail enviado</td>
    </tr>
  </tbody>
</table>

<p style="font-size: 13px; color: #666; margin-top: 10px;">✅ <em>Todos os campos são preenchidos automaticamente pelo sistema. NÃO edite esta aba manualmente.</em></p>

---

## ⚠️ Regra de Ouro da Blindagem
Não altere a ordem das colunas e não insira colunas extras entre elas. O motor do servidor (`Code.gs`) grava e lê dados baseando-se exatamente nestes índices de coluna. Alterar a ordem quebrará o salvamento de cadastro e desalinhada o faturamento do RH.

---

## Observações Importantes
* O nome das abas deve ser exatamente: **`Funcionarios`** e **`Registros`**
* A aba `Funcionarios` usa nomes sem acento
* As matrículas devem ser únicas
* Formate a coluna `Telefone` como Texto simples na planilha para evitar que o Google Sheets remova o zero inicial do DDD ou formate como número científico.
