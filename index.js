const puppeteer = require("puppeteer");

(async () => {
  // Cria uma instância do navegador
  const navegador = await puppeteer.launch();

  // Cria uma nova página
  const pagina = await navegador.newPage();

  // URL para gerar o PDF
  const site_url =
    "https://www.bannerbear.com/blog/how-to-download-images-from-a-website-using-puppeteer/";

  // Abrir a URL na página atual
  await pagina.goto(site_url, { waitUntil: "networkidle0" });

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
