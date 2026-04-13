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
