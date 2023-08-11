const puppeteer = require("puppeteer");
const fs = require('fs');

(async () => {
  // Pega a opção escolhida para gerar o PDF, por padrão é url
  let type = process.argv.slice(2)[0] || 'url';

  // Cria uma instância do navegador
  const navegador = await puppeteer.launch();

  // Cria uma nova página
  const pagina = await navegador.newPage();

  if (type === 'url') {
    // URL para gerar o PDF
    const site_url =
      "https://www.bannerbear.com/blog/how-to-download-images-from-a-website-using-puppeteer/";

    // Abrir a URL na página atual
    await pagina.goto(site_url, { waitUntil: "networkidle0" });
  } else if (type === 'file') {
    // Local do arquivo para gerar o PDF
    const html = fs.readFileSync('sample.html', 'utf-8');
    await pagina.setContent(html, { waitUntil: "domcontentloaded" });
  } else {
    console.log(new Error(`HTML source "${type}" is unknow.`));
    await navegador.close();
    return;
  }


  // Para refletir o CSS usado ao invés do formato print
  await pagina.emulateMediaType("screen");

  // Baixar o PDF
  const pdf = await pagina.pdf({
    path: "resultado.pdf",
    margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
    printBackground: true,
    format: "A4",
  });

  // Fecha a instância do navegador
  await navegador.close();
})();
