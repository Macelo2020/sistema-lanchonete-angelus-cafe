<div align="center">

# 🍔 Sistema de Controle de Consumo - Lanchonete Angelus

### Sistema completo com QR Code para controle de consumo de funcionários em lanchonetes hospitalares

[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white)](#)
[![Google Sheets](https://img.shields.io/badge/Google%20Sheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white)](#)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)

![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)
![Versão](https://img.shields.io/badge/Versão-2.0-blue?style=for-the-badge)
![Licença](https://img.shields.io/badge/Licença-MIT-yellow?style=for-the-badge)

---

**🐸 Desenvolvido por Blue Frog Technology**

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Problema Resolvido](#-problema-resolvido)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura do Sistema](#-arquitetura-do-sistema)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Como Instalar](#-como-instalar)
- [Como Usar](#-como-usar)
- [Estrutura da Planilha](#-estrutura-da-planilha)
- [Fluxo de Funcionamento](#-fluxo-de-funcionamento)
- [Solução de Problemas](#-solução-de-problemas)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Autor](#-autor)

---

## 📖 Sobre o Projeto

Sistema web completo desenvolvido com **Google Apps Script** para controlar o consumo de funcionários de um hospital em uma lanchonete interna.

O sistema utiliza **QR Codes individuais** para identificação, eliminando **100% dos erros** de preenchimento manual que existiam com o Google Forms anterior.

### Principais Diferenciais

- 🚫 **Zero digitação de nome** → Nome vem automático do sistema
- 📱 **QR Code individual** → Impossível trocar funcionário
- 📧 **Comprovante automático** → E-mail e WhatsApp
- 📊 **Relatório em 1 clique** → Pronto para o RH imprimir
- 👤 **Autocadastro** → Funcionário completa dados na 1ª compra

---

## 🎯 Problema Resolvido

| ❌ Antes (Google Forms) | ✅ Depois (Sistema Angelus) |
|---|---|
| Funcionário digitava o nome errado | Nome vem automático da base do RH |
| Matrícula podia ser de outro | QR Code individual e validado |
| RH perdia tempo corrigindo dados | Dados chegam 100% corretos |
| Sem comprovante para o funcionário | Comprovante por e-mail e WhatsApp |
| Relatório manual demorado | Relatório automático em 1 clique |
| Sem controle em tempo real | Painel diário com atualização automática |

---

## ✨ Funcionalidades

### 📱 Registro de Consumo (Atendente)
- ✅ Leitura de QR Code do funcionário
- ✅ Identificação automática (nome, matrícula, setor)
- ✅ Autocadastro na primeira compra (setor, e-mail, WhatsApp)
- ✅ Registro do valor consumido
- ✅ Protocolo único por transação
- ✅ Comprovante por e-mail automático
- ✅ Comprovante por WhatsApp

### 📊 Painel Diário (RH)
- ✅ Acompanhamento em tempo real
- ✅ Filtro por período
- ✅ Atualização automática a cada 60 segundos
- ✅ Cards com totais (registros, funcionários, valor)
- ✅ Tabela detalhada com todos os consumos

### 📋 Relatório Mensal (RH)
- ✅ Relatório consolidado por mês/ano
- ✅ Totais por funcionário
- ✅ Formatado para impressão
- ✅ Envio por e-mail para o RH

### 👤 Extrato Individual (RH)
- ✅ Busca por funcionário específico
- ✅ Detalhamento dia a dia
- ✅ Envio por e-mail ao funcionário
- ✅ Envio por WhatsApp
- ✅ Impressão individual

### 📱 Gerador de QR Codes
- ✅ Geração automática para todos os funcionários
- ✅ Busca/filtro por nome ou matrícula
- ✅ Impressão individual ou em lote
- ✅ Formato de cartão para crachá

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| **Google Apps Script** | Backend (servidor) |
| **Google Sheets** | Banco de dados |
| **HTML5 / CSS3** | Interface do usuário |
| **JavaScript** | Lógica do frontend |
| **Gmail API** | Envio de e-mails |
| **QR Server API** | Geração de QR Codes |
| **WhatsApp Web API** | Envio de comprovantes |

---

## 🏗️ Arquitetura do Sistema

┌─────────────┐ ┌──────────────────┐ ┌──────────────┐
│ NAVEGADOR │────▶│ Google Apps │────▶│ Google │
│ (Frontend) │◀────│ Script (Backend) │◀────│ Sheets (BD) │
└─────────────┘ └──────────────────┘ └──────────────┘
│
├──▶ Gmail (e-mails)
├──▶ QR Server (QR Codes)
└──▶ WhatsApp (comprovantes)


---

## 📁 Estrutura de Arquivos

📁 sistema-lanchonete-angelus/
├── 📄 README.md
├── 📄 LICENSE
├── 📁 src/
│ ├── 📄 Code.gs # Backend completo
│ ├── 📄 index.html # Registro de consumo
│ ├── 📄 painel.html # Painel diário (RH)
│ ├── 📄 relatorio.html # Relatório + extrato (RH)
│ └── 📄 qrcodes.html # Gerador de QR Codes
└── 📁 docs/
├── 📄 ESTRUTURA-PLANILHA.md
└── 📄 CHECKLIST.md


---

## 🚀 Como Instalar

### Pré-requisitos
- Conta Google (Gmail)
- Acesso ao Google Sheets e Google Apps Script

### Passo 1: Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie: **"Sistema Angelus - Lanchonete"**
3. Aba **`Funcionarios`**: Matricula | Nome | Setor | Email | Telefone
4. Aba **`Registros`**: Data/Hora | Matricula | Nome | Setor | Valor | Protocolo | Status

> 📖 Veja detalhes em [docs/ESTRUTURA-PLANILHA.md](docs/ESTRUTURA-PLANILHA.md)

### Passo 2: Criar o Apps Script

1. Na planilha → **Extensões → Apps Script**
2. Crie os 5 arquivos copiando da pasta `src/`
3. Salve todos

### Passo 3: Autorizar e Publicar

1. Selecione `doGet` → **▶ Executar** → Autorize permissões
2. **Implantar → Nova implantação → App da Web**
3. Executar como: Eu | Acesso: Qualquer pessoa
4. Copie a URL gerada

### Passo 4: Atualizar Links de Navegação

Nos arquivos HTML, substitua os links de navegação pela sua URL.

> 📖 Veja o checklist completo em [docs/CHECKLIST.md](docs/CHECKLIST.md)

---

## 📖 Como Usar

### 🍔 Atendente da Lanchonete

Escaneie o QR Code do funcionário
Verifique o nome na tela
Digite o valor consumido
Clique em "Registrar Consumo"
Envie comprovante por WhatsApp (opcional)


### 📊 Setor de RH


Painel Diário → sua-url/exec?page=painel
Acompanhe consumos em tempo real

Relatório Mensal → sua-url/exec?page=relatorio
Selecione mês/ano → Gere → Imprima ou envie por e-mail

Extrato Individual → mesma página, aba "Extrato Individual"
Digite matrícula → Busque → Envie ao funcionário


---

## 🗄️ Estrutura da Planilha

### Aba: Funcionarios
| Matricula | Nome | Setor | Email | Telefone |
|-----------|------|-------|-------|----------|
| 1001 | Maria Silva | Enfermagem | maria@hospital.com | 83988024149 |

### Aba: Registros
| Data/Hora | Matricula | Nome | Setor | Valor | Protocolo | Status |
|-----------|-----------|------|-------|-------|-----------|--------|
| *(automático)* | | | | | | |

---

## 🔄 Fluxo de Funcionamento

FUNCIONÁRIO → Apresenta QR Code
↓
ATENDENTE → Escaneia com celular/tablet
↓
SISTEMA → Identifica automaticamente
↓
1ª VEZ? → SIM → Autocadastro (setor, e-mail, WhatsApp)
↓
ATENDENTE → Digita apenas o valor
↓
SISTEMA → Registra na planilha
→ Envia comprovante por e-mail
→ Gera link WhatsApp
→ Gera protocolo único
↓
FINAL DO MÊS → RH gera relatório em 1 clique
→ Imprime para desconto em folha
→ Envia extrato individual se solicitado


---

## 🔧 Solução de Problemas

| Problema | Solução |
|----------|---------|
| Matrícula não encontrada | Verifique aba Funcionarios |
| E-mail não chega | Limite ~100/dia na conta gratuita |
| QR Code não abre | Use "Gerenciar implantações" ao atualizar |
| Página em branco | Reexecute a autorização |
| "is not a function" | Reimplante com "Nova versão" |

---

## 🤝 Contribuindo

1. Faça um **Fork** do projeto
2. Crie uma **branch** (`git checkout -b feature/NovaFeature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona feature'`)
4. **Push** (`git push origin feature/NovaFeature`)
5. Abra um **Pull Request**

### 💡 Ideias para contribuições futuras
- [ ] Limite diário de gastos por funcionário
- [ ] Dashboard com gráficos (Chart.js)
- [ ] Notificação automática ao atingir limite
- [ ] Cardápio digital integrado
- [ ] Múltiplas lanchonetes
- [ ] App nativo (Android/iOS)
- [ ] Integração com sistema de ponto

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👨‍💻 Autor

<div align="center">

### 🐸 Blue Frog Technology

Desenvolvido como solução real para controle de consumo em lanchonete hospitalar.

⭐ **Se este projeto te ajudou, deixe uma estrela!**

---

*Feito com ❤️ para hospitais e empresas*

</div>




