// ================================================================
// Code.gs - SISTEMA LANCHONETE ANGELUS COM QR CODE
// VERSÃO 4.4 - UNIFICAÇÃO DO SISTEMA E CORREÇÃO DE SALVAMENTO DE CADASTRO
// ================================================================

function doGet(e) {
  Logger.log('=== doGet CHAMADO ===');
  
  var page = 'index';
  var matricula = '';
  var atendente = 'false';
  
  if (e && e.parameter) {
    Logger.log('Parâmetros recebidos:', e.parameter);
    page = e.parameter.page ? e.parameter.page : 'index';
    matricula = e.parameter.m ? e.parameter.m : '';
    atendente = e.parameter.atendente ? e.parameter.atendente : 'false';
  }

  var template;

  // ROTEAMENTO OFICIAL DO SISTEMA
  if (page === 'qrcodes') {
    template = HtmlService.createTemplateFromFile('qrcodes');
  } else if (page === 'painel') {
    template = HtmlService.createTemplateFromFile('painel');
  } else if (page === 'relatorio') {
    template = HtmlService.createTemplateFromFile('relatorio');
  } else {
    template = HtmlService.createTemplateFromFile('index');
    template.matriculaInicial = matricula;
    template.atendenteInicial = atendente;
  }

  return template.evaluate()
    .setTitle('Lanchonete Angelus')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getWebAppUrl() {
  return ScriptApp.getService().getUrl();
}

function buscarFuncionario(matricula) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Funcionarios');
    if (!sheet) return { encontrado: false, message: 'Aba de funcionários não encontrada!' };
    
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      var matAtual = data[i][0].toString().trim();
      if (matAtual === matricula.toString().trim()) {
        return {
          encontrado: true,
          matricula: data[i][0].toString(),
          nome: data[i][1] ? data[i][1].toString() : '',
          setor: data[i][2] ? data[i][2].toString() : '',
          email: data[i][3] ? data[i][3].toString().trim() : '',
          telefone: data[i][4] ? data[i][4].toString().trim() : ''
        };
      }
    }
    return { encontrado: false, mensagem: 'Matrícula não encontrada!' };
  } catch (e) {
    Logger.log('Erro buscarFuncionario: ' + e.message);
    return { encontrado: false, mensagem: 'Erro: ' + e.message };
  }
}

// ================================================================
// REGISTRAR CONSUMO (MOTOR DO BALCÃO - ALINHAMENTO DAS COLUNAS)
// ================================================================
function registrarConsumo(dados) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Registros');
    if (!sheet) return { sucesso: false, mensagem: 'Aba Registros não configurada!' };

    var matricula  = dados.matricula ? dados.matricula.toString().trim() : '';
    var nome       = dados.nome      ? dados.nome.toString().trim()      : '';
    var setor      = dados.setor     ? dados.setor.toString().trim()     : '';
    var emailRaw   = dados.email     ? dados.email.toString().trim()     : '';
    var telefone   = dados.telefone  ? dados.telefone.toString().trim()  : '';
    var valor      = parseFloat(dados.valor.toString().replace(',', '.'));

    if (isNaN(valor) || valor <= 0) {
      return { sucesso: false, mensagem: 'Valor inválido: ' + dados.valor };
    }

    var agora     = new Date();
    var protocolo = 'ANG' + Utilities.formatDate(agora, 'America/Sao_Paulo', 'yyyyMMddHHmmss') + matricula;
    var valorFmt  = 'R$ ' + valor.toFixed(2).replace('.', ',');

    sheet.appendRow([agora, matricula, nome, setor, protocolo, valor, 'Registrado']);
    
    var ultimaLinha = sheet.getLastRow();
    sheet.getRange(ultimaLinha, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    sheet.getRange(ultimaLinha, 6).setNumberFormat('R$ #,##0.00');

    var emailEnviado   = false;
    var emailStatus    = 'Sem e-mail';
    var emailValido    = emailRaw.length > 5 && emailRaw.indexOf('@') > 0;

    if (emailValido) {
      try {
        var dataFmt = Utilities.formatDate(agora, 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm');
        var htmlBody = '<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;border:1px solid #ddd;border-radius:12px;overflow:hidden;">'
          + '<div style="background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:25px;text-align:center;">'
          + '<div style="font-size:40px;">🍔</div>'
          + '<h2 style="margin:8px 0 0;">Lanchonete Angelus</h2>'
          + '<p style="margin:4px 0 0;opacity:0.9;font-size:14px;">Comprovante de Consumo</p></div>'
          + '<div style="padding:25px;">'
          + '<p style="font-size:16px;">Olá, <strong>' + nome + '</strong>!</p>'
          + '<p style="color:#666;margin-top:8px;">Segue seu comprovante:</p>'
          + '<table style="width:100%;border-collapse:collapse;margin:20px 0;">'
          + '<tr style="border-bottom:1px solid #eee;"><td style="padding:12px;color:#888;">📋 Matrícula</td><td style="padding:12px;font-weight:bold;text-align:right;">' + matricula + '</td></tr>'
          + '<tr style="border-bottom:1px solid #eee;"><td style="padding:12px;color:#888;">🏥 Setor</td><td style="padding:12px;font-weight:bold;text-align:right;">' + setor + '</td></tr>'
          + '<tr style="border-bottom:1px solid #eee;"><td style="padding:12px;color:#888;">📅 Data</td><td style="padding:12px;font-weight:bold;text-align:right;">' + dataFmt + '</td></tr>'
          + '<tr style="background:#e8f5e9;"><td style="padding:14px;color:#555;font-size:16px;">💰 Valor</td><td style="padding:14px;font-weight:bold;text-align:right;font-size:22px;color:#2e7d32;">' + valorFmt + '</td></tr>'
          + '</table>'
          + '<p style="text-align:center;color:#aaa;font-size:11px;">Protocolo: ' + protocolo + '</p>'
          + '</div></div>';

        GmailApp.sendEmail(emailRaw, '🍔 Comprovante Angelus - ' + valorFmt, '', { htmlBody: htmlBody, name: 'Lanchonete Angelus' });
        emailEnviado = true;
        emailStatus  = 'E-mail enviado';
      } catch (errEmail) {
        emailStatus = 'Erro: ' + errEmail.message;
      }
    }

    sheet.getRange(ultimaLinha, 7).setValue(emailStatus);
    return { sucesso: true, protocolo: protocolo, valorFormatado: valorFmt, emailEnviado: emailEnviado };
  } catch (e) {
    return { sucesso: false, transform: e.message };
  }
}

function buscarTodosFuncionarios() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Funcionarios');
    var data = sheet.getDataRange().getValues();
    var lista = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][0].toString().trim() !== '') {
        lista.push({ matricula: data[i][0].toString(), nome: data[i][1].toString(), setor: data[i][2].toString() });
      }
    }
    return lista;
  } catch (e) { return []; }
}

function buscarConsumosPorData(dataInicio, dataFim) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Registros');
    var data = sheet.getDataRange().getValues();
    var di = new Date(dataInicio + 'T00:00:00');
    var df = new Date(dataFim + 'T23:59:59');
    var registros = [];
    var totalGeral = 0;

    for (var i = 1; i < data.length; i++) {
      var dt = new Date(data[i][0]);
      if (isNaN(dt.getTime())) continue;
      if (dt >= di && dt <= df) {
        var valor = parseFloat(data[i][5]) || 0;
        registros.push({
          data: Utilities.formatDate(dt, 'America/Sao_Paulo', 'dd/MM/yyyy'),
          hora: Utilities.formatDate(dt, 'America/Sao_Paulo', 'HH:mm'),
          matricula: data[i][1].toString(),
          nome: data[i][2].toString(),
          setor: data[i][3].toString(),
          valorFmt: 'R$ ' + valor.toFixed(2).replace('.', ','),
          protocolo: data[i][4] || ''
        });
        totalGeral += valor;
      }
    }
    return { sucesso: true, registros: registros, totalGeral: totalGeral };
  } catch (e) { return { sucesso: false, mensagem: e.message }; }
}

// ================================================================
// FUNÇÃO ADICIONADA: ATUALIZAR CADASTRO (ALINHADA À PLANILHA REAL)
// ================================================================
function atualizarCadastroFuncionario(dados) {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Funcionarios');
    if (!sheet) return { sucesso: false, mensagem: 'Aba Funcionarios não localizada!' };
    
    var data  = sheet.getDataRange().getValues();

    for (var i = 1; i < data.length; i++) {
      if (data[i][0].toString().trim() === dados.matricula.toString().trim()) {
        
        // Alinhamento exato: Coluna 3 para Setor, 4 para E-mail, 5 para Telefone
        if (dados.setor)    sheet.getRange(i + 1, 3).setValue(dados.setor.toString().trim());
        if (dados.email)    sheet.getRange(i + 1, 4).setValue(dados.email.toString().trim());
        if (dados.telefone) sheet.getRange(i + 1, 5).setValue(dados.telefone.toString().trim());
        
        SpreadsheetApp.flush(); // Salva na planilha na hora
        
        // Retorna a confirmação para destravar a tela piscando do celular
        return { sucesso: true, mensagem: 'Cadastro atualizado com sucesso!' };
      }
    }
    return { sucesso: false, mensagem: 'Funcionário não localizado.' };
  } catch (e) {
    return { sucesso: false, mensagem: 'Erro: ' + e.message };
  }
}

// ================================================================
// GATILHOS EXATOS REQUISITADOS PELO SEU RELATORIO.HTML ORIGINAL
// ================================================================

function gerarRelatorioMensal(mes, ano) {
  try {
    var r = buscarConsumosPorData("2020-01-01", "2030-12-31");
    if (!r.sucesso) return r;

    var filtrados = r.registros.filter(function(x) {
      var p = x.data.split('/');
      return parseInt(p[1]) == parseInt(mes) && parseInt(p[2]) == parseInt(ano);
    });

    var mapa = {};
    var totalGeral = 0;
    
    filtrados.forEach(function(x) {
      var v = parseFloat(x.valorFmt.replace('R$ ', '').replace('.', '').replace(',', '.'));
      if (!mapa[x.matricula]) {
        mapa[x.matricula] = { matricula: x.matricula, nome: x.nome, setor: x.setor, qtd: 0, total: 0 };
      }
      mapa[x.matricula].qtd++;
      mapa[x.matricula].total += v;
      totalGeral += v;
    });

    return {
      sucesso: true,
      mes: mes,
      ano: ano,
      totalFuncionarios: Object.keys(mapa).length,
      totalGeral: totalGeral,
      dados: Object.values(mapa)
    };
  } catch (e) { return { sucesso: false, mensagem: e.message }; }
}

function enviarRelatorioParaRH(mes, ano, emailDestino) {
  try {
    var r = gerarRelatorioMensal(mes, ano);
    if (!r.sucesso) return r;
    if (r.dados.length === 0) return { sucesso: false, mensagem: "Não há registros neste período para compor o e-mail." };

    var htmlBody = '<div style="font-family:Arial,sans-serif;max-width:600px;border:1px solid #ddd;padding:20px;border-radius:12px;">'
                 + '<h2 style="color:#764ba2;">📋 Fechamento Mensal Consolidado - Lanchonete Angelus</h2>'
                 + '<p><b>Referência:</b> ' + mes + '/' + ano + '</p>'
                 + '<p><b>Total de Funcionários Ativos:</b> ' + r.totalFuncionarios + '</p>'
                 + '<p><b>Total Acumulado no Mês:</b> <span style="color:#2e7d32;font-weight:bold;">R$ ' + r.totalGeral.toFixed(2).replace('.', ',') + '</span></p>'
                 + '<table style="width:100%;border-collapse:collapse;margin-top:15px;font-size:13px;">'
                 + '<thead style="background:#667eea;color:#fff;"><tr><th style="padding:8px;text-align:left;">Matrícula</th><th style="padding:8px;text-align:left;">Nome</th><th style="padding:8px;text-align:center;">Qtd</th><th style="padding:8px;text-align:right;">Subtotal</th></tr></thead><tbody>';

    r.dados.forEach(function(f) {
      htmlBody += '<tr style="border-bottom:1px solid #eee;"><td style="padding:8px;color:#555;">' + f.matricula + '</td><td style="padding:8px;"><b>' + f.nome + '</b> <span style="font-size:11px;color:#94a3b8;">(' + f.setor + ')</span></td><td style="padding:8px;text-align:center;">' + f.qtd + '</td><td style="padding:8px;text-align:right;font-weight:bold;color:#2e7d32;">R$ ' + f.total.toFixed(2).replace('.', ',') + '</td></tr>';
    });

    htmlBody += '</tbody></table></div>';

    GmailApp.sendEmail(emailDestino, "📋 Fechamento Geral Lanchonete Angelus - " + mes + "/" + ano, "", { htmlBody: htmlBody, name: "Lanchonete Angelus" });
    return { sucesso: true, mensagem: "Relatório unificado enviado com sucesso para: " + emailDestino };
  } catch (e) { return { sucesso: false, mensagem: e.message }; }
}

function buscarConsumoIndividual(matricula, mes, ano) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetFunc = ss.getSheetByName('Funcionarios');
    var dataFunc = sheetFunc.getDataRange().getValues();
    var funcionario = null;

    for (var i = 1; i < dataFunc.length; i++) {
      if (dataFunc[i][0].toString().trim() === matricula.toString().trim()) {
        funcionario = {
          matricula: dataFunc[i][0].toString(),
          nome: dataFunc[i][1].toString(),
          setor: dataFunc[i][2].toString(),
          email: dataFunc[i][3] ? dataFunc[i][3].toString().trim() : '',
          telefone: dataFunc[i][4] ? dataFunc[i][4].toString().trim() : ''
        };
        break;
      }
    }
    if (!funcionario) return { sucesso: false, mensagem: 'Matrícula não cadastrada no RH!' };

    var sheetReg = ss.getSheetByName('Registros');
    var dataReg = sheetReg.getDataRange().getValues();
    var registros = [];
    var totalGeral = 0;

    for (var j = 1; j < dataReg.length; j++) {
      var dt = new Date(dataReg[j][0]);
      if (isNaN(dt.getTime())) continue;
      
      var dataFmt = Utilities.formatDate(dt, 'America/Sao_Paulo', 'dd/MM/yyyy');
      var partesData = dataFmt.split("/");
      var mReg = parseInt(partesData[1]);
      var aReg = parseInt(partesData[2]);
      
      if (dataReg[j][1].toString().trim() === matricula.toString().trim() && mReg == parseInt(mes) && aReg == parseInt(ano)) {
        var valor = parseFloat(dataReg[j][5]) || 0;
        totalGeral += valor;
        registros.push({
          data: dataFmt,
          hora: Utilities.formatDate(dt, 'America/Sao_Paulo', 'HH:mm'),
          valorFmt: 'R$ ' + valor.toFixed(2).replace('.', ','),
          protocolo: dataReg[j][4] || ''
        });
      }
    }
    return { sucesso: true, funcionario: funcionario, registros: registros, totalGeral: totalGeral, totalRegistros: registros.length, mes: mes, ano: ano };
  } catch (e) { return { sucesso: false, mensagem: e.message }; }
}

function enviarExtratoIndividual(matricula, mes, ano) {
  try {
    var r = buscarConsumoIndividual(matricula, mes, ano);
    if (!r.sucesso) return r;
    if (!r.funcionario.email) return { sucesso: false, mensagem: "Funcionário não possui e-mail cadastrado na planilha." };
    if (r.registros.length === 0) return { sucesso: false, mensagem: "Não há consumos para enviar o extrato." };

    var htmlBody = '<div style="font-family:Arial,sans-serif;max-width:500px;border:1px solid #ddd;padding:20px;border-radius:12px;">'
                 + '<h2 style="color:#667eea;">🍔 Extrato de Consumo Individual</h2>'
                 + '<p>Olá, <b>' + r.funcionario.nome + '</b>!</p>'
                 + '<p>Segue o detalhamento dos seus gastos na Lanchonete Angelus referente ao período de ' + mes + '/' + ano + ':</p>'
                 + '<div style="background:#f9f9f9;padding:12px;border-radius:8px;margin:10px 0;font-size:14px;"><b>Total Acumulado a ser Descontado:</b> <span style="color:#b91c1c;font-weight:bold;">R$ ' + r.totalGeral.toFixed(2).replace('.', ',') + '</span></div>'
                 + '<table style="width:100%;border-collapse:collapse;font-size:13px;"><thead><tr style="background:#475569;color:#fff;"><th style="padding:6px;text-align:left;">Data / Hora</th><th style="padding:6px;text-align:right;">Valor</th></tr></thead><tbody>';

    r.registros.forEach(function(reg) {
      htmlBody += '<tr style="border-bottom:1px solid #eee;"><td style="padding:6px;">' + reg.data + ' - ' + reg.hora + '</td><td style="padding:6px;text-align:right;font-weight:bold;color:#b91c1c;">' + reg.valorFmt + '</td></tr>';
    });

    htmlBody += '</tbody></table></div>';

    GmailApp.sendEmail(r.funcionario.email, "🍔 Seu Extrato de Consumo - Lanchonete Angelus (" + mes + "/" + ano + ")", "", { htmlBody: htmlBody, name: "Lanchonete Angelus" });
    return { sucesso: true, mensagem: "Extrato enviado com sucesso para: " + r.funcionario.email };
  } catch (e) { return { sucesso: false, mensagem: e.message }; }
}

function gerarLinkWhatsappExtrato(matricula, mes, ano) {
  try {
    var r = buscarConsumoIndividual(matricula, mes, ano);
    if (!r.sucesso) return r;
    if (!r.funcionario.telefone) return { sucesso: false, mensagem: "Telefone do colaborador não foi localizado." };

    var texto = '🍔 *EXTRATO INDIVIDUAL - LANCHONETE ANGELUS*\n\n'
              + '👤 *Nome:* ' + r.funcionario.nome + '\n'
              + '🔢 *Matrícula:* ' + r.funcionario.matricula + '\n'
              + '📅 *Mês de Referência:* ' + mes + '/' + ano + '\n'
              + '💰 *Total Acumulado:* R$ ' + r.totalGeral.toFixed(2).replace('.', ',');

    var fone = r.funcionario.telefone.replace(/\D/g, '');
    if (!fone.startsWith('55')) fone = '55' + fone;

    var linkFmt = 'https://api.whatsapp.com/send?phone=' + fone + '&text=' + encodeURIComponent(texto);
    return { sucesso: true, link: linkFmt };
  } catch (e) { return { sucesso: false, mensagem: e.message }; }
}

/**
 * Gera o relatório mensal sintético agrupado por funcionário
 * (Criado para a Josy do RH lançar direto na folha de pagamento)
 */
function obterRelatorioSintetico(mes, ano) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetRegistros = ss.getSheetByName("Registros");
  var dadosRegistros = sheetRegistros.getDataRange().getValues();
  
  // Dicionário para acumular os valores por matrícula
  // Estrutura: { "1012": { nome: "Funcionário A", valor: 250.00 } }
  var acumulador = {};
  
  // Ignora o cabeçalho (i = 1)
  for (var i = 1; i < dadosRegistros.length; i++) {
    var linha = dadosRegistros[i];
    var dataHora = new Date(linha[0]);
    var status = linha[6]; // Coluna G
    
    // Valida se o registro é do mês/ano selecionado e se não está cancelado
    if (dataHora.getMonth() === parseInt(mes) && 
        dataHora.getFullYear() === parseInt(ano) && 
        status !== "Cancelado") {
      
      var matricula = linha[1]; // Coluna B
      var nome = linha[2];      // Coluna C
      var valor = parseFloat(linha[5]) || 0; // Coluna F
      
      if (!acumulador[matricula]) {
        acumulador[matricula] = {
          nome: nome,
          matricula: matricula,
          totalGasto: 0
        };
      }
      
      acumulador[matricula].totalGasto += valor;
    }
  }
  
  // Converte o objeto acumulador em uma lista (Array) para podermos ordenar
  var listaSintetica = [];
  for (var chave in acumulador) {
    listaSintetica.push(acumulador[chave]);
  }
  
  // Regra de Ouro da Josy: Ordenar em Ordem Alfabética pelo Nome do Funcionário
  listaSintetica.sort(function(a, b) {
    return a.nome.localeCompare(b.nome);
  });
  
  return listaSintetica;
}