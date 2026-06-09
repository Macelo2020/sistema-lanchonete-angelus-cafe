# 📂 Checklist de Implantação - Sistema Angelus v3.8_Premium

> Siga este checklist após criar a planilha e os scripts para garantir que o sistema Blue Frog Technology está 100% operacional para produção.

---

## 📊 Etapa 1: Planilha Banco de Dados

<table style="width:100%; border-collapse: collapse; border: 1px solid #ddd; font-family: sans-serif; font-size: 14px; margin-bottom: 20px;">
  <thead style="background-color: #f2f2f2;">
    <tr>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: center; width: 10%;">Status</th>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Aba / Ação Técnica</th>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Descrição da Verificação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Aba `Funcionarios`</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Criada com as 5 colunas exatas: <em>Matrícula, Nome, Setor, Email, Telefone</em> (docs/ESTRUTURA-PLANILHA.md).</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Aba `Registros`</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Criada com as 7 colunas exatas: <em>Data/Hora, Matrícula, Nome, Setor, Protocolo, Valor, Status</em>.</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Formatação de DDD</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Coluna <strong>Telefone (E)</strong> configurada estritamente como <strong>Texto simples</strong> para o Sheets não cortar o zero inicial do DDD.</td>
    </tr>
  </tbody>
</table>

## 📄 Etapa 2: Google Apps Script (Code.gs)

<table style="width:100%; border-collapse: collapse; border: 1px solid #ddd; font-family: sans-serif; font-size: 14px; margin-bottom: 20px;">
  <thead style="background-color: #e3f2fd;">
    <tr>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: center; width: 10%; color: #0d47a1;">Status</th>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left; color: #0d47a1;">Ação do Servidor</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;"><strong>Código Blindado</strong>. Código `Code.gs` atualizado com a versão unificada v4.4.</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;"><strong>Autorização OAuth</strong>. Função `doGet` executada uma vez dentro do editor para liberar permissões de Gmail e Sheets.</td>
    </tr>
  </tbody>
</table>

## 🌐 Etapa 3: HTMLs do Sistema

<table style="width:100%; border-collapse: collapse; border: 1px solid #ddd; font-family: sans-serif; font-size: 14px; margin-bottom: 20px;">
  <thead style="background-color: #fce4ec;">
    <tr>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: center; width: 10%; color: #880e4f;">Status</th>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left; color: #880e4f;">Aba de Interface</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Arquivos `index.html`, `painel.html`, `relatorio.html` e `qrcodes.html` criados na pasta `src/` com as tags e estilizações correspondentes.</td>
    </tr>
  </tbody>
</table>

## 🚀 Etapa 4: Publicação (App da Web)

<table style="width:100%; border-collapse: collapse; border: 1px solid #ddd; font-family: sans-serif; font-size: 14px; margin-bottom: 20px;">
  <thead style="background-color: #e8f5e9;">
    <tr>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: center; width: 10%; color: #1b5e20;">Status</th>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left; color: #1b5e20;">Configuração da Nuvem</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Acessou <strong>Implantar → Nova implantação realizada</strong>.</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Executar como: <strong>Eu (Sua conta administrador)</strong>.</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Quem pode acessar: <strong>Qualquer pessoa (Anyone)</strong> para liberar acesso aos smartphones.</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;">URL estável do App da Web copiada com sucesso.</td>
    </tr>
  </tbody>
</table>

## 🔴 Etapa 5: Atualização de Links (Passo Crítico de UX)

<p style="font-size: 13px; color: #b71c1c; margin-top: 10px; font-weight: bold;">⚠️ <em>Este passo é vital para que os menus naveguem e o botão do WhatsApp renderize sem erro 404:</em></p>

<table style="width:100%; border-collapse: collapse; border: 2px solid #b71c1c; font-family: sans-serif; font-size: 14px; margin-bottom: 20px;">
  <tbody>
    <tr>
      <td style="border: 1px solid #b71c1c; padding: 10px; text-align: center; width: 10%;">[ ]</td>
      <td style="border: 1px solid #b71c1c; padding: 10px;"><strong>index.html</strong>. Localizou a variável `var URL_SISTEMA` ou links de ancoragem e colou a URL gerada na Etapa 4.</td>
    </tr>
    <tr>
      <td style="border: 1px solid #b71c1c; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #b71c1c; padding: 10px;"><strong>painel.html</strong>. Repetiu o processo de colagem da URL estável.</td>
    </tr>
    <tr>
      <td style="border: 1px solid #b71c1c; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #b71c1c; padding: 10px;"><strong>relatorio.html</strong>. Repetiu o processo de colagem da URL estável.</td>
    </tr>
    <tr>
      <td style="border: 1px solid #b71c1c; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #b71c1c; padding: 10px;"><strong>qrcodes.html</strong>. Repetiu o processo de colagem da URL estável.</td>
    </tr>
    <tr>
      <td style="border: 1px solid #b71c1c; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #b71c1c; padding: 10px;">Salvou todas as abas e atualizou a implantação marcando obrigatoriamente como <strong>"Nova Versão"</strong>.</td>
    </tr>
  </tbody>
</table>

## 🛡️ Etapa 6: Testes de Homologação (Homologado)

<table style="width:100%; border-collapse: collapse; border: 1px solid #ddd; font-family: sans-serif; font-size: 14px; margin-bottom: 20px;">
  <thead style="background-color: #fff3e0;">
    <tr>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: center; width: 10%; color: #e65100;">Status</th>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left; color: #e65100;">Cenário de Validação Real</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;"><strong>Teste de Autocadastro:</strong> Bipou um funcionário sem cadastro completo. A tela amarela abriu, os dados foram preenchidos e, ao salvar, o botão processou o retorno sem travar em looping.</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;"><strong>Teste do WhatsApp Balcão:</strong> Confirmou um consumo e clicou no botão verde esmeralda. O WhatsApp abriu preenchido com nome, valor e protocolo.</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;"><strong>Teste de Impressão do RH:</strong> Abriu a página de fechamentos, filtrou os relatórios e realizou a impressão limpa do layout horizontal.</td>
    </tr>
  </tbody>
</table>

## 🚀 Etapa 7: Produção e Inicialização no Hospital

<table style="width:100%; border-collapse: collapse; border: 1px solid #ddd; font-family: sans-serif; font-size: 14px; margin-bottom: 20px;">
  <thead style="background-color: #ede7f6;">
    <tr>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: center; width: 10%; color: #4a148c;">Status</th>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left; color: #4a148c;">Lançamento em Produção</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Lista oficial de funcionários fornecida pelo RH importada e limpa na aba `Funcionarios`.</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Aba `Registros` limpa por completo (linhas de teste apagadas, preservando estritamente os cabeçalhos da linha 1).</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Navegador do computador ou tablet do balcão configurado e salvo nos favoritos com o link de operador: <code>.../exec?atendente=true</code>.</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">[ ]</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Cartaz informativo ou mini banner com o QR Code do link limpo (sem tags de atendente) impresso e fixado na parede da lanchonete para autoatendimento descentralizado.</td>
    </tr>
  </tbody>
</table>

---
<p style="text-align: center; font-size: 16px; font-family: sans-serif; font-weight: bold; color: #2e7d32;">Se todos os itens acima estiverem marcados, o sistema Blue Frog Technology está pronto para produção! 🚀</p>
