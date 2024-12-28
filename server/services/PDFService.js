import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import fs from "fs/promises";
import path from "path";
import moment from "moment-timezone";

Handlebars.registerHelper("multiply", function (a, b) {
  return a * b;
});

Handlebars.registerHelper("toLowerCase", function (str) {
  return str.toLowerCase();
});

Handlebars.registerHelper("multiply", function (a, b) {
  return a * b;
});

Handlebars.registerHelper("subtract", function (a, b) {
  return a - b;
});

Handlebars.registerHelper("sum", function (items, prop) {
  return items.reduce((total, item) => total + (item[prop] || 0), 0);
});

Handlebars.registerHelper("formatDate", function (datetime, format) {
  return moment(datetime).format(format);
});

export async function generateInvoicePDF(data, templatePath) {
  const template = await fs.readFile(templatePath, "utf8");
  const compiledTemplate = Handlebars.compile(template);
  const html = compiledTemplate(data);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfPath = path.join(import.meta.dirname, "temp.pdf");

  const pdf = await page.pdf({
    format: "A4",
    path: pdfPath,
    margin: { top: "20px", bottom: "20px", left: "10px", right: "10px" },
    displayHeaderFooter: true,
    headerTemplate: '<div style="width: 100%; font-size: 10px;"></div>',
    footerTemplate:
      '<div style="width: 100%; text-align: center; font-size: 10px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
  });

  await browser.close();
  return { pdf, pdfPath };
}
