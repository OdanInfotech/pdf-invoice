'use strict';

const { margins } = require("pdfkit/js/page");

var u = (s => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(s, { get: (t, e) => (typeof require < "u" ? require : t)[e] }) : s)(function (s) { if (typeof require < "u") return require.apply(this, arguments); throw Error('Dynamic require of "' + s + '" is not supported') }); var m = (s, t) => () => (t || s((t = { exports: {} }).exports, t), t.exports); var d = m((w, f) => { var I = { calcItemTotal: function (s) { let t = s.price || 0, e = s.quantity || 1; return (t * e).toFixed(2) }, calcSubTotal: function (s) { if (s.length === 0) return 0; let t = 0; return s.forEach(e => { t += Number(this.calcItemTotal(e)); }), t.toFixed(2) }, calcTax: function (s) { if (s.length === 0) return 0; let t = 0; return s.forEach(e => { let c = e.price, a = e.quantity, o = e.tax || 0; t += c * a * o / 100; }), t.toFixed(2) }, calcFinalTotal: function (s) { if (s.length === 0) return 0; let t = Number(this.calcSubTotal(s)), e = Number(this.calcTax(s)); return (t + e).toFixed(2) } }; f.exports = I; }); var g = m((C, y) => { var T = { string: { invoice: "I N V O I C E", refNumber: "Ref no", date: "Date", billTo: "Bill To", item: "Item", quantity: "Qty", price: "Price", tax: "Tax", total: "Total", subTotal: "Subtotal", deliveryFee: "Delivery Fee", paymentMethod: "Payment Method", discountAmount: "Discount Amount", totalTax: "Total Tax" } }; y.exports = T; }); var v = u("fs"), k = u("path"), q = u("pdfmake"), r = d(), S = g(), p = class {
    payload; company; invoice; customer; items; currency; path; qr; note; date; config; constructor(t, e = S) { this.payload = t, this.company = t.company, this.customer = t.customer, this.invoice = t.invoice, this.items = t.items, this.qr = t.qr, this.note = t.note, this.currency = this.invoice.currency || "$", this.path = k.resolve(this.invoice.path) || "./invoice.pdf", this.date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric" }), this.config = e; } async create() { let t = new q(this.fonts()), e = { pageSize: "A4", orientation: "portrait", pageMargins: [40, 15, 40, 40], info: this.docMeta(), content: this.content(), defaultStyle: this.docStyle(), styles: this.docTypo() }; return new Promise((c, a) => { let o = t.createPdfKitDocument(e), l = v.createWriteStream(this.path); o.pipe(l), o.on("end", () => c(this.path)), o.on("error", i => a(i)), o.end(); }) } fonts() { let t = { Helvetica: { normal: "Helvetica", bold: "Helvetica-Bold", italics: "Helvetica-Oblique", bolditalics: "Helvetica-BoldOblique" }, Times: { normal: "Times-Roman", bold: "Times-Bold", italics: "Times-Italic", bolditalics: "Times-BoldItalic" }, Courier: { normal: "Courier", bold: "Courier-Bold", italics: "Courier-Oblique", bolditalics: "Courier-BoldOblique" } }, e = this.config?.font || null; return e && Object.keys(e).length > 0 && Object.assign(t, e), t } docMeta() { return { title: "Invoice - #" + this.invoice.number, author: this.company.name, subject: "Invoice - " + this.customer.name, keywords: "invoice" } } docStyle() { let t = { font: "Helvetica", fontSize: this.config?.style?.fontSize || 10, lineHeight: 1.8, bold: !1, color: "#000000", columnGap: 30 }, e = this.config.style || null; return e && Object.keys(e).length > 0 && (t = { ...t, ...e }), t } docTypo() { return { h1: { fontSize: 18, bold: !0 }, h2: { fontSize: 16, bold: !0 }, h3: { fontSize: 14, bold: !0 }, text: { fontSize: this.config?.style?.fontSize || 10, bold: !1 }, textBold: { fontSize: this.config?.style?.fontSize || 10, bold: !0 } } } content() {
      let t = [],
        b = { columns: [{ width: "65%", stack: [], style: "text" }, { width: "35%", stack: [], style: "text" }] },
        e = { columns: [{ width: "30%", stack: [], style: "text" },{ width: "35%", stack: [], style: "text" }, { width: "35%", stack: [], style: "text" }] }; if (this.company.logo) { if (!this.company.logo.startsWith("<svg")) throw new Error("Only SVG logo are supported."); e.columns[0].stack.unshift({ svg: this.company.logo, margin: [0, 65, 0, 0] }), e.columns[1].stack.push({ text: this.company.name, style: "h3", margin: [0, 25, 0, 0] }); } else e.columns[1].stack.unshift({ text: this.company.name, style: "h2" }); this.company.phone && e.columns[1].stack.push({ text: this.company.phone, style: "text" }),this.company.email && e.columns[1].stack.push({ text: this.company.email, style: "text" }), this.company.address && e.columns[1].stack.push({ columns: [{ margin: [0, 0, 0, 20], stack: [{ text: this.company.address }], style: "text" }] }), this.invoice.label ? e.columns[1].stack.unshift({ text: this.invoice.label, style: "h1" }) : e.columns[2].stack.unshift({ text: this.config.string.invoice || "I N V O I C E", style: "h1", margin: [0, 25, 0, 0]}); let c = this.config.string.refNumber || "Ref no :"; e.columns[2].stack.push({ text: c + ": #" + (this.invoice.number || 1), style: "textBold" }); let a = this.config.string.date; e.columns[2].stack.push({ text: a + ": " + (this.invoice.date || this.date), style: "textBold" }); e.columns[2].stack.push({ columns: [{ width: 300, margin: [0, 15, 0, 0], stack: [{ text: this.config.string.billTo, style: "h2" }], style: "text" }] }); this.customer.name && e.columns[2].stack.push({ text: this.customer.name, style: "textBold" }), this.customer.company && e.columns[2].stack.push({ text: this.customer.company, style: "text" }), this.customer.phone && e.columns[2].stack.push({ text: this.customer.phone, style: "text" }); t.push(e); let m = {
        margin: [0, 10, 0, 0],fontSize:7, lineHeight: 1.1,borderColor:'#111111', table: {
            widths: [110, 30, 70, 80], headerRows: 1, lineHeight: 1.1,borderColor:'#000000',body: [[`
 ${this.config.string.item}`,`
 ${this.config.string.quantity}`,`
 ${this.config.string.price}`,`
 ${this.config.string.total}`]]},
            layout: {
                hLineWidth: function(i, node) {
                  return 0.5;
                },
                vLineWidth: function(i, node) {
                  return 0.5;
                },
                hLineColor: function(i, node) {
                  return '#282828';
                },
                vLineColor: function(i, node) {
                  return '#282828';
                }
              }
        }; this.items.length > 0 && this.items.forEach(n => {
            let b = r.calcItemTotal(n); m.table.body.push([`
 ${n.name}`,`
 ${n.quantity}`,`
 ${this.currency}${n.price}`,`
 ${this.currency}${b}`]);}),b.columns[0].stack.push(m);let x={margin:[-20,0,100,0],columns:[
    {width:"*",stack:[" "],style:"text"},{width:150,fontSize:7,lineHeight:1.5,style:"textBold",layout: {
        hLineWidth: function(i, node) {
          return 0.5;
        },
        vLineWidth: function(i, node) {
          return 0.5;
        },
        hLineColor: function(i, node) {
          return '#282828'; 
        },
        vLineColor: function(i, node) {
          return '#282828'; 
        }
      },table:{widths:[80,"*"],headerRows:1,lineHeight:1.5,body:[[`
 ${this.config.string.subTotal}`,`
 ${this.currency}${r.calcSubTotal(this.items)}`],[`
 ${this.config.string.deliveryFee}`,`
 ${this.currency}${r.calcDeliveryFee(this.items)}`],[`
 ${this.config.string.paymentMethod}`,`
 ${r.calcPaymentMethod(this.invoice)}`],[`
 ${this.config.string.discountAmount}`,`
 ${this.currency}${r.calcDiscountAmount(this.items)}`],[`
 ${this.config.string.total}`,`
 ${this.currency}${r.calcFinalTotal(this.items)}`]],
            }
            }],
        }; b.columns[1].stack.push(x),t.push(b); if(this.payload.qr){let n={margin:[0,50,0,0],qr:this.payload.qr.data,fit:this.payload.qr.width||"50"};t.push(n);}if(this.payload.note){let n={margin:[0,this.payload.qr?20:50,0,0],fontSize: 7,text:this.payload.note,italics:!0};t.push(n);}return t}};

exports.PDFInvoice = p;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=invoice.js.map