// ================================================================
// Code.gs - SISTEMA LANCHONETE ANGELUS COM QR CODE
// VERSÃO 2.0 - Com Painel Diário, Relatório Impresso e Extrato
// ================================================================

// ============================================
// ROTEADOR PRINCIPAL
// ============================================
function doGet(e) {
  var page = (e && e.parameter && e.parameter.page) ? e.parameter.page : 'index';
  var matricula = (e && e.parameter && e.parameter.m) ? e.parameter.m : '';

  var template;

  switch (page) {
    case 'qrcodes':
      template = HtmlService.createTemplateFromFile('qrcodes');
      break;
    case 'painel':
      template = HtmlService.createTemplateFromFile('painel');
      break;
    case 'relatorio':
      template = HtmlService.createTemplateFromFile('relatorio');
      break;
    default:
      template = HtmlService.createTemplateFromFile('index');
      template.matriculaInicial = matricula;
      break;
  }

  return template.evaluate()
    .setTitle('Lanchonete Angelus')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getWebAppUrl() {
  return ScriptApp.getService().getUrl();
}

// ============================================
// BUSCAR FUNCIONÁRIO PELA MATRÍCULA
// ============================================
function buscarFuncionario(matricula) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Funcionarios');
    var data = sheet.getDataRange().getValues();

    for (var i = 1; i < data.length; i++) {
      if (data[i][0].toString().trim() === matricula.toString().trim()) {
        return {
          encontrado: true,
          matricula: data[i][0].toString(),
          nome: data[i][1].toString(),
          setor: data[i][2].toString(),
          email: data[i][3] ? data[i][3].toString() : '',
          telefone: data[i][4] ? data[i][4].toString() : ''
        };
      }
    }
    return { encontrado: false, mensagem: 'Matrícula não encontrada!' };
  } catch (e) {
    return { encontrado: false, mensagem: 'Erro: ' + e.message };
  }
}

// ============================================
// REGISTRAR CONSUMO + ENVIAR COMPROVANTE
// ============================================
function registrarConsumo(dados) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Registros');

    var valor = parseFloat(dados.valor.toString().replace(',', '.'));
    if (isNaN(valor) || valor <= 0) {
      return { sucesso: false, mensagem: 'Valor inválido!' };
    }

    var agora = new Date();
    var protocolo = 'ANG' + Utilities.formatDate(agora, 'America/Sao_Paulo', 'yyyyMMddHHmmss') + dados.matricula;

    sheet.appendRow([
      agora, dados.matricula, dados.nome, dados.setor, valor, protocolo, 'Registrado'
    ]);

    var ultimaLinha = sheet.getLastRow();
    sheet.getRange(ultimaLinha, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    sheet.getRange(ultimaLinha, 5).setNumberFormat('R$ #,##0.00');

    // E-MAIL
    var emailEnviado = false;
    if (dados.email && dados.email.indexOf('@') > -1) {
      try {
        enviarComprovantePorEmail({
          email: dados.email, nome: dados.nome, matricula: dados.matricula,
          setor: dados.setor, valor: valor, data: agora, protocolo: protocolo
        });
        emailEnviado = true;
        sheet.getRange(ultimaLinha, 7).setValue('E-mail enviado');
      } catch (err) {
        sheet.getRange(ultimaLinha, 7).setValue('Erro e-mail');
      }
    }

    // WHATSAPP
    var whatsappLink = '';
    if (dados.telefone && dados.telefone.toString().replace(/\D/g, '').length >= 10) {
      var tel = dados.telefone.toString().replace(/\D/g, '');
      if (tel.length === 11) tel = '55' + tel;
      if (tel.length === 10) tel = '55' + tel;
      var dataFmt = Utilities.formatDate(agora, 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm');
      var valorFmt = 'R$ ' + valor.toFixed(2).replace('.', ',');
      var msgWpp = '🍔 *COMPROVANTE - Lanchonete Angelus*\n\n'
        + '👤 *Nome:* ' + dados.nome + '\n'
        + '📋 *Matrícula:* ' + dados.matricula + '\n'
        + '🏥 *Setor:* ' + dados.setor + '\n'
        + '💰 *Valor:* ' + valorFmt + '\n'
        + '📅 *Data:* ' + dataFmt + '\n'
        + '🔖 *Protocolo:* ' + protocolo + '\n\n'
        + '⚠️ _Este valor será descontado em folha._';
      whatsappLink = 'https://wa.me/' + tel + '?text=' + encodeURIComponent(msgWpp);
    }

    return {
      sucesso: true,
      mensagem: 'Consumo registrado para ' + dados.nome + '!',
      emailEnviado: emailEnviado,
      whatsappLink: whatsappLink,
      protocolo: protocolo,
      valorFormatado: 'R$ ' + valor.toFixed(2).replace('.', ',')
    };
  } catch (e) {
    return { sucesso: false, mensagem: 'Erro: ' + e.message };
  }
}

// ============================================
// COMPROVANTE POR E-MAIL
// ============================================
function enviarComprovantePorEmail(dados) {
  var dataFmt = Utilities.formatDate(dados.data, 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm');
  var valorFmt = 'R$ ' + dados.valor.toFixed(2).replace('.', ',');

  var html = '<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;border:1px solid #ddd;border-radius:12px;overflow:hidden;">'
    + '<div style="background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:25px;text-align:center;">'
    + '<div style="font-size:40px;">🍔</div>'
    + '<h2 style="margin:8px 0 0;">Lanchonete Angelus</h2>'
    + '<p style="margin:4px 0 0;opacity:0.9;font-size:14px;">Comprovante de Consumo</p></div>'
    + '<div style="padding:25px;">'
    + '<p style="font-size:16px;">Olá, <strong>' + dados.nome + '</strong>!</p>'
    + '<p style="color:#666;margin-top:8px;">Segue seu comprovante:</p>'
    + '<table style="width:100%;border-collapse:collapse;margin:20px 0;">'
    + '<tr style="border-bottom:1px solid #eee;"><td style="padding:12px;color:#888;">📋 Matrícula</td><td style="padding:12px;font-weight:bold;text-align:right;">' + dados.matricula + '</td></tr>'
    + '<tr style="border-bottom:1px solid #eee;"><td style="padding:12px;color:#888;">🏥 Setor</td><td style="padding:12px;font-weight:bold;text-align:right;">' + dados.setor + '</td></tr>'
    + '<tr style="border-bottom:1px solid #eee;"><td style="padding:12px;color:#888;">📅 Data</td><td style="padding:12px;font-weight:bold;text-align:right;">' + dataFmt + '</td></tr>'
    + '<tr style="background:#e8f5e9;"><td style="padding:14px;color:#555;font-size:16px;">💰 Valor</td><td style="padding:14px;font-weight:bold;text-align:right;font-size:22px;color:#2e7d32;">' + valorFmt + '</td></tr>'
    + '</table>'
    + '<p style="text-align:center;color:#aaa;font-size:11px;">Protocolo: ' + dados.protocolo + '</p>'
    + '<hr style="border:none;border-top:1px solid #eee;margin:20px 0;">'
    + '<p style="text-align:center;color:#999;font-size:12px;">⚠️ Valor será descontado em folha de pagamento.</p>'
    + '</div></div>';

  GmailApp.sendEmail(dados.email, '🍔 Comprovante Angelus - ' + valorFmt,
    'Consumo de ' + valorFmt + ' em ' + dataFmt + '. Protocolo: ' + dados.protocolo,
    { htmlBody: html, name: 'Lanchonete Angelus' });
}

// ============================================
// BUSCAR TODOS OS FUNCIONÁRIOS (QR Codes)
// ============================================
function buscarTodosFuncionarios() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Funcionarios');
  var data = sheet.getDataRange().getValues();
  var lista = [];
  for (var i = 1; i < data.length; i++) {
    if (data[i][0].toString().trim() !== '') {
      lista.push({
        matricula: data[i][0].toString(),
        nome: data[i][1].toString(),
        setor: data[i][2].toString()
      });
    }
  }
  return lista;
}

// ============================================
// 🆕 BUSCAR CONSUMOS POR DATA (Painel Diário)
// ============================================
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
        var valor = parseFloat(data[i][4]) || 0;
        registros.push({
          data: Utilities.formatDate(dt, 'America/Sao_Paulo', 'dd/MM/yyyy'),
          hora: Utilities.formatDate(dt, 'America/Sao_Paulo', 'HH:mm'),
          matricula: data[i][1].toString(),
          nome: data[i][2].toString(),
          setor: data[i][3].toString(),
          valor: valor,
          valorFmt: 'R$ ' + valor.toFixed(2).replace('.', ','),
          protocolo: data[i][5] ? data[i][5].toString() : ''
        });
        totalGeral += valor;
      }
    }

    // Ordena por data/hora mais recente
    registros.sort(function(a, b) {
      return (b.data + b.hora).localeCompare(a.data + a.hora);
    });

    return {
      sucesso: true,
      registros: registros,
      totalGeral: totalGeral,
      totalRegistros: registros.length
    };
  } catch (e) {
    return { sucesso: false, mensagem: 'Erro: ' + e.message };
  }
}

// ============================================
// 🆕 BUSCAR CONSUMO INDIVIDUAL DO FUNCIONÁRIO
// ============================================
function buscarConsumoIndividual(matricula, mes, ano) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Buscar dados do funcionário
    var sheetFunc = ss.getSheetByName('Funcionarios');
    var dataFunc = sheetFunc.getDataRange().getValues();
    var funcionario = null;

    for (var i = 1; i < dataFunc.length; i++) {
      if (dataFunc[i][0].toString().trim() === matricula.toString().trim()) {
        funcionario = {
          matricula: dataFunc[i][0].toString(),
          nome: dataFunc[i][1].toString(),
          setor: dataFunc[i][2].toString(),
          email: dataFunc[i][3] ? dataFunc[i][3].toString() : '',
          telefone: dataFunc[i][4] ? dataFunc[i][4].toString() : ''
        };
        break;
      }
    }

    if (!funcionario) {
      return { sucesso: false, mensagem: 'Funcionário não encontrado!' };
    }

    // Buscar registros
    var sheetReg = ss.getSheetByName('Registros');
    var dataReg = sheetReg.getDataRange().getValues();
    var registros = [];
    var totalGeral = 0;

    for (var j = 1; j < dataReg.length; j++) {
      var dt = new Date(dataReg[j][0]);
      if (isNaN(dt.getTime())) continue;

      var mat = dataReg[j][1].toString().trim();

      if (mat === matricula.toString().trim() &&
          (dt.getMonth() + 1) == parseInt(mes) &&
          dt.getFullYear() == parseInt(ano)) {

        var valor = parseFloat(dataReg[j][4]) || 0;
        registros.push({
          data: Utilities.formatDate(dt, 'America/Sao_Paulo', 'dd/MM/yyyy'),
          hora: Utilities.formatDate(dt, 'America/Sao_Paulo', 'HH:mm'),
          valor: valor,
          valorFmt: 'R$ ' + valor.toFixed(2).replace('.', ','),
          protocolo: dataReg[j][5] ? dataReg[j][5].toString() : ''
        });
        totalGeral += valor;
      }
    }

    registros.sort(function(a, b) {
      return (a.data + a.hora).localeCompare(b.data + b.hora);
    });

    return {
      sucesso: true,
      funcionario: funcionario,
      registros: registros,
      totalGeral: totalGeral,
      totalRegistros: registros.length,
      mes: mes,
      ano: ano
    };
  } catch (e) {
    return { sucesso: false, mensagem: 'Erro: ' + e.message };
  }
}

// ============================================
// 🆕 ENVIAR EXTRATO INDIVIDUAL POR E-MAIL
// ============================================
function enviarExtratoIndividual(matricula, mes, ano) {
  try {
    var result = buscarConsumoIndividual(matricula, mes, ano);
    if (!result.sucesso) return result;

    var func = result.funcionario;
    if (!func.email || func.email.indexOf('@') === -1) {
      return { sucesso: false, mensagem: 'Funcionário não possui e-mail cadastrado!' };
    }

    var meses = ['','Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    var nomeMes = meses[parseInt(mes)] || mes;
    var totalFmt = 'R$ ' + result.totalGeral.toFixed(2).replace('.', ',');

    var html = '<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;border:1px solid #ddd;border-radius:12px;overflow:hidden;">'
      + '<div style="background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:25px;text-align:center;">'
      + '<div style="font-size:40px;">🍔</div>'
      + '<h2 style="margin:8px 0 0;">Lanchonete Angelus</h2>'
      + '<p style="margin:4px 0 0;opacity:0.9;font-size:14px;">Extrato de Consumo - ' + nomeMes + '/' + ano + '</p></div>'
      + '<div style="padding:25px;">'
      + '<p style="font-size:16px;">Olá, <strong>' + func.nome + '</strong>!</p>'
      + '<p style="color:#666;margin-top:8px;">Segue seu extrato de consumo na lanchonete:</p>'

      // Dados do funcionário
      + '<div style="background:#f5f5f5;padding:15px;border-radius:8px;margin:15px 0;">'
      + '<p style="margin:4px 0;font-size:13px;"><strong>Matrícula:</strong> ' + func.matricula + '</p>'
      + '<p style="margin:4px 0;font-size:13px;"><strong>Setor:</strong> ' + func.setor + '</p>'
      + '<p style="margin:4px 0;font-size:13px;"><strong>Período:</strong> ' + nomeMes + '/' + ano + '</p>'
      + '</div>';

    // Tabela de consumos
    if (result.registros.length > 0) {
      html += '<table style="width:100%;border-collapse:collapse;margin:15px 0;">'
        + '<tr style="background:#667eea;color:#fff;">'
        + '<th style="padding:10px;text-align:left;font-size:12px;">Data</th>'
        + '<th style="padding:10px;text-align:center;font-size:12px;">Hora</th>'
        + '<th style="padding:10px;text-align:right;font-size:12px;">Valor</th></tr>';

      for (var i = 0; i < result.registros.length; i++) {
        var r = result.registros[i];
        var bg = i % 2 === 0 ? '#f9f9f9' : '#fff';
        html += '<tr style="background:' + bg + ';border-bottom:1px solid #eee;">'
          + '<td style="padding:9px 10px;font-size:13px;">' + r.data + '</td>'
          + '<td style="padding:9px 10px;text-align:center;font-size:13px;">' + r.hora + '</td>'
          + '<td style="padding:9px 10px;text-align:right;font-size:13px;">' + r.valorFmt + '</td></tr>';
      }

      html += '<tr style="background:#e8f5e9;">'
        + '<td colspan="2" style="padding:12px;font-weight:bold;font-size:14px;">TOTAL DO MÊS</td>'
        + '<td style="padding:12px;text-align:right;font-weight:bold;font-size:18px;color:#2e7d32;">' + totalFmt + '</td></tr>'
        + '</table>';
    } else {
      html += '<p style="text-align:center;color:#888;padding:20px;">Nenhum consumo registrado neste período.</p>';
    }

    html += '<hr style="border:none;border-top:1px solid #eee;margin:20px 0;">'
      + '<p style="text-align:center;color:#999;font-size:12px;">⚠️ O valor total será descontado na folha de pagamento do mês vigente.</p>'
      + '<p style="text-align:center;color:#bbb;font-size:11px;margin-top:8px;">Em caso de dúvida, procure o setor de RH.</p>'
      + '</div></div>';

    GmailApp.sendEmail(func.email,
      '🍔 Extrato Angelus - ' + nomeMes + '/' + ano + ' - ' + totalFmt,
      'Seu extrato de consumo na Lanchonete Angelus referente a ' + nomeMes + '/' + ano + '. Total: ' + totalFmt,
      { htmlBody: html, name: 'Lanchonete Angelus - RH' });

    return { sucesso: true, mensagem: 'Extrato enviado para ' + func.email + ' (' + func.nome + ')!' };
  } catch (e) {
    return { sucesso: false, mensagem: 'Erro ao enviar: ' + e.message };
  }
}

// ============================================
// 🆕 ENVIAR EXTRATO POR WHATSAPP (gera link)
// ============================================
function gerarLinkWhatsappExtrato(matricula, mes, ano) {
  try {
    var result = buscarConsumoIndividual(matricula, mes, ano);
    if (!result.sucesso) return result;

    var func = result.funcionario;
    if (!func.telefone || func.telefone.toString().replace(/\D/g, '').length < 10) {
      return { sucesso: false, mensagem: 'Funcionário não possui telefone cadastrado!' };
    }

    var tel = func.telefone.toString().replace(/\D/g, '');
    if (tel.length === 11) tel = '55' + tel;
    if (tel.length === 10) tel = '55' + tel;

    var meses = ['','Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    var nomeMes = meses[parseInt(mes)] || mes;
    var totalFmt = 'R$ ' + result.totalGeral.toFixed(2).replace('.', ',');

    var msg = '🍔 *EXTRATO - Lanchonete Angelus*\n'
      + '📅 *Período:* ' + nomeMes + '/' + ano + '\n\n'
      + '👤 *Nome:* ' + func.nome + '\n'
      + '📋 *Matrícula:* ' + func.matricula + '\n'
      + '🏥 *Setor:* ' + func.setor + '\n\n'
      + '━━━━━━━━━━━━━━━━━━━━\n';

    for (var i = 0; i < result.registros.length; i++) {
      var r = result.registros[i];
      msg += '📌 ' + r.data + ' às ' + r.hora + ' → ' + r.valorFmt + '\n';
    }

    msg += '━━━━━━━━━━━━━━━━━━━━\n'
      + '💰 *TOTAL DO MÊS: ' + totalFmt + '*\n\n'
      + '⚠️ _Valor será descontado em folha de pagamento._';

    var link = 'https://wa.me/' + tel + '?text=' + encodeURIComponent(msg);

    return { sucesso: true, link: link };
  } catch (e) {
    return { sucesso: false, mensagem: 'Erro: ' + e.message };
  }
}

// ============================================
// RELATÓRIO MENSAL GERAL
// ============================================
function gerarRelatorioMensal(mes, ano) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Registros');
    var data = sheet.getDataRange().getValues();

    var relatorio = {};
    var totalGeral = 0;

    for (var i = 1; i < data.length; i++) {
      var dt = new Date(data[i][0]);
      if (isNaN(dt.getTime())) continue;

      if ((dt.getMonth() + 1) == parseInt(mes) && dt.getFullYear() == parseInt(ano)) {
        var mat = data[i][1].toString();
        var nome = data[i][2].toString();
        var setor = data[i][3].toString();
        var valor = parseFloat(data[i][4]) || 0;

        if (!relatorio[mat]) {
          relatorio[mat] = { matricula: mat, nome: nome, setor: setor, total: 0, qtd: 0 };
        }
        relatorio[mat].total += valor;
        relatorio[mat].qtd += 1;
        totalGeral += valor;
      }
    }

    var lista = Object.keys(relatorio).map(function(k) { return relatorio[k]; });
    lista.sort(function(a, b) { return a.nome.localeCompare(b.nome); });

    return {
      sucesso: true,
      dados: lista,
      totalGeral: totalGeral,
      totalFuncionarios: lista.length,
      mes: mes,
      ano: ano
    };
  } catch (e) {
    return { sucesso: false, mensagem: 'Erro: ' + e.message };
  }
}

// ============================================
// ENVIAR RELATÓRIO POR E-MAIL AO RH
// ============================================
function enviarRelatorioParaRH(mes, ano, emailRH) {
  try {
    var rel = gerarRelatorioMensal(mes, ano);
    if (!rel.sucesso) return rel;

    var meses = ['','Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    var nomeMes = meses[parseInt(mes)] || mes;

    var html = '<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;">'
      + '<div style="background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:25px;border-radius:12px 12px 0 0;text-align:center;">'
      + '<h2 style="margin:0;">📊 Relatório Mensal - Lanchonete Angelus</h2>'
      + '<p style="margin:5px 0 0;opacity:0.9;">' + nomeMes + ' / ' + ano + '</p></div>'
      + '<div style="padding:20px;border:1px solid #ddd;border-top:none;border-radius:0 0 12px 12px;">'
      + '<p><strong>Funcionários:</strong> ' + rel.totalFuncionarios + ' | '
      + '<strong>Total:</strong> R$ ' + rel.totalGeral.toFixed(2).replace('.',',') + '</p>'
      + '<table style="width:100%;border-collapse:collapse;margin:15px 0;">'
      + '<tr style="background:#667eea;color:#fff;">'
      + '<th style="padding:10px;text-align:left;">Mat.</th>'
      + '<th style="padding:10px;text-align:left;">Nome</th>'
      + '<th style="padding:10px;text-align:left;">Setor</th>'
      + '<th style="padding:10px;text-align:center;">Qtd</th>'
      + '<th style="padding:10px;text-align:right;">Total</th></tr>';

    for (var i = 0; i < rel.dados.length; i++) {
      var f = rel.dados[i];
      var bg = i % 2 === 0 ? '#f9f9f9' : '#fff';
      html += '<tr style="background:' + bg + ';border-bottom:1px solid #eee;">'
        + '<td style="padding:10px;">' + f.matricula + '</td>'
        + '<td style="padding:10px;">' + f.nome + '</td>'
        + '<td style="padding:10px;">' + f.setor + '</td>'
        + '<td style="padding:10px;text-align:center;">' + f.qtd + '</td>'
        + '<td style="padding:10px;text-align:right;font-weight:bold;">R$ ' + f.total.toFixed(2).replace('.',',') + '</td></tr>';
    }

    html += '<tr style="background:#667eea;color:#fff;font-weight:bold;">'
      + '<td style="padding:12px;" colspan="3">TOTAL GERAL</td>'
      + '<td style="padding:12px;text-align:center;">' + rel.dados.reduce(function(s,f){return s+f.qtd;},0) + '</td>'
      + '<td style="padding:12px;text-align:right;">R$ ' + rel.totalGeral.toFixed(2).replace('.',',') + '</td></tr>'
      + '</table></div></div>';

    GmailApp.sendEmail(emailRH, '📊 Relatório Angelus - ' + nomeMes + '/' + ano,
      'Relatório mensal da Lanchonete Angelus.',
      { htmlBody: html, name: 'Sistema Angelus' });

    return { sucesso: true, mensagem: 'Relatório enviado para ' + emailRH + '!' };
  } catch (e) {
    return { sucesso: false, mensagem: 'Erro: ' + e.message };
  }
}
  // ============================================
// 🆕 ATUALIZAR CADASTRO DO FUNCIONÁRIO
// ============================================
function atualizarCadastroFuncionario(dados) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Funcionarios');
    var data = sheet.getDataRange().getValues();

    for (var i = 1; i < data.length; i++) {
      if (data[i][0].toString().trim() === dados.matricula.toString().trim()) {
        // Atualiza Setor (coluna C = 3)
        if (dados.setor) {
          sheet.getRange(i + 1, 3).setValue(dados.setor);
        }
        // Atualiza Email (coluna D = 4)
        if (dados.email) {
          sheet.getRange(i + 1, 4).setValue(dados.email);
        }
        // Atualiza Telefone (coluna E = 5)
        if (dados.telefone) {
          sheet.getRange(i + 1, 5).setValue(dados.telefone);
        }

        return { sucesso: true, mensagem: 'Cadastro atualizado!' };
      }
    }

    return { sucesso: false, mensagem: 'Funcionário não encontrado!' };
  } catch (e) {
    return { sucesso: false, mensagem: 'Erro: ' + e.message };
  }
}
