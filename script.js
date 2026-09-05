const deliveryData=[
  {label:"DLV 1×24 Jam",value:1200,color:"#0808f5",className:"blue"},
  {label:"DLV 2×24 Jam",value:0,color:"#f4e600",className:"yellow"},
  {label:"DLV >2×24 Jam",value:0,color:"#f49a00",className:"orange"},
  {label:"CANCEL",value:23,color:"#ed1111",className:"red"},
  {label:"OPEN",value:0,color:"#999",className:"gray"}
];

const deliveryDetails=[
  {mobil:"A8322CN",jenis:"CD_ENGKEL_BOX_KECIL",kode:"D015",driver:"JAKA",jam:"08:02:43",rpp:"21118052",open:2,terkirim:28,cancel:1},
  {mobil:"B9249VCF",jenis:"L_300",kode:"D058",driver:"SOPIAN",jam:"08:03:26",rpp:"21118064",open:1,terkirim:9,cancel:0},
  {mobil:"B9254VCF",jenis:"CD_ENGKEL_BOX_KECIL",kode:"D057",driver:"JEFRIANUS BESA",jam:"08:07:51",rpp:"21118041",open:0,terkirim:19,cancel:0},
  {mobil:"B9273VCF",jenis:"CD_ENGKEL_BOX_KECIL",kode:"D056",driver:"A. YOGI",jam:"07:59:54",rpp:"21118056",open:0,terkirim:32,cancel:1},
  {mobil:"B9308VCF",jenis:"GRANDMAX_BV",kode:"D045",driver:"M IRFAN",jam:"10:01:01",rpp:"21118006",open:0,terkirim:50,cancel:0},
  {mobil:"B9310VCF",jenis:"GRANDMAX_BV",kode:"D046",driver:"MAULANA",jam:"08:45:29",rpp:"21118007",open:0,terkirim:59,cancel:1},
  {mobil:"B9312VCF",jenis:"L_300",kode:"D009",driver:"MUHAEMIN",jam:"08:31:50",rpp:"21117994",open:0,terkirim:42,cancel:0},
  {mobil:"B9413VDB",jenis:"CD_ENGKEL_BOX_KECIL",kode:"D060",driver:"YANTO MISA",jam:"18:23:50",rpp:"21118786",open:0,terkirim:8,cancel:0},
  {mobil:"B9688VCC",jenis:"CD_ENGKEL_FE71",kode:"D003",driver:"MUHAMMAD ALFI HASA",jam:"08:04:54",rpp:"21118042",open:0,terkirim:18,cancel:0},
  {mobil:"B9690VCC",jenis:"CD_ENGKEL_FE71",kode:"",driver:"RENAL RAMADHAN",jam:"08:17:20",rpp:"21118001",open:0,terkirim:32,cancel:3},
  {mobil:"B9893VCE",jenis:"CD_ENGKEL_BOX_KECIL",kode:"D011",driver:"SIGIT JULIANTO",jam:"08:04:14",rpp:"21118054",open:0,terkirim:19,cancel:0},
  {mobil:"B9899VCE",jenis:"CD_ENGKEL_BOX_KECIL",kode:"D070",driver:"SAJIDI",jam:"08:22:02",rpp:"21117999",open:0,terkirim:46,cancel:1},
  {mobil:"B9901VCE",jenis:"CD_ENGKEL_BOX_KECIL",kode:"D004",driver:"PATRISIUS KLAU",jam:"08:03:28",rpp:"21118062",open:0,terkirim:7,cancel:0},
  {mobil:"B9916BCV",jenis:"CD_ENGKEL_FE71",kode:"D016",driver:"ARYO S",jam:"08:02:14",rpp:"21118061",open:0,terkirim:30,cancel:0},
  {mobil:"B9964VCC",jenis:"CD_ENGKEL_FE71",kode:"D065",driver:"A NASUTION",jam:"15:07:35",rpp:"21117892",open:0,terkirim:7,cancel:0},
  {mobil:"B9970VCC",jenis:"CD_ENGKEL_FE71",kode:"D007",driver:"MARLON F LEDE",jam:"10:50:31",rpp:"21118049",open:0,terkirim:18,cancel:1}
];

const numberFormat=new Intl.NumberFormat("id-ID");
const startDate=document.getElementById("startDate");
const endDate=document.getElementById("endDate");

const customerNames=["NADINE GROSIR M3","TOKO SUMBER MAKMUR","CV CAHAYA ABADI","TOKO BERKAH JAYA","UD MITRA SEJAHTERA"];
function createInvoiceRecords(){
  const records=[];
  deliveryDetails.forEach((row,rowIndex)=>{
    ["open","terkirim","cancel"].forEach(status=>{
      for(let i=0;i<row[status];i++){
        const customer=customerNames[(rowIndex+i)%customerNames.length];
        records.push({mobil:row.mobil,status,kodeDriver:row.kode||"-",namaDriver:row.driver,noRpp:row.rpp,tglLhv:"03/07/2026",noInv:`IG${String(1144392+rowIndex*100+i).padStart(7,"0")}`,channel:"113-RT - RETAIL LAF",kodeCust:String(2164119+rowIndex*10+i),namaCust:customer,alamatCust:"AREA CIKUPA, TANGERANG",qtyInvoice:status==="cancel"?20:1+(i%24),nilaiInvoice:status==="cancel"?1240000:75000+(i%12)*50000,typeInvoice:status==="cancel"?"RETUR":"PENJUALAN",typePembayaran:"KREDIT",pembayaran:status==="terkirim"?75000+(i%12)*50000:0,scanDropping:"scan",keteranganDelivery:status==="terkirim"?"TERKIRIM":status.toUpperCase(),alasan:status==="cancel"?"AD-TOKO TIDAK OR CANCEL":status==="open"?"DALAM PROSES":"-",statusFaktur:status==="terkirim"?"DELIVERED":status.toUpperCase(),alasanGagal:status==="cancel"?"AD-TOKO TIDAK ORDER":"-"});
      }
    });
  });
  return records;
}
const invoiceRecords=createInvoiceRecords();

function formatDate(value){return new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(new Date(value+"T00:00:00"))}

function renderDashboard(){
  const total=deliveryData.reduce((sum,item)=>sum+item.value,0);
  const maximum=Math.max(...deliveryData.map(item=>item.value),1);
  document.getElementById("yAxis").innerHTML=[1200,1000,800,600,400,200,0].map(value=>`<span>${numberFormat.format(value)}</span>`).join("");
  document.getElementById("bars").innerHTML=deliveryData.map(item=>`<div class="bar-item"><span class="bar-value">${numberFormat.format(item.value)}</span><div class="bar" style="height:${item.value===0?1:(item.value/maximum)*100}%;background:${item.color}"></div></div>`).join("");
  document.getElementById("legend").innerHTML=deliveryData.map(item=>`<span><i style="background:${item.color}"></i>${item.label}</span>`).join("");
  const statusItems=deliveryData.map(item=>`<div class="percentage-item ${item.className}">% ${item.label.toUpperCase()}: <span>${total?((item.value/total)*100).toFixed(2):"0.00"}%</span></div>`);
  document.getElementById("percentageRow").innerHTML=`<div>${statusItems[0]}${statusItems[3]}</div><div>${statusItems[1]}${statusItems[4]}</div><div>${statusItems[2]}</div>`;
}

function renderTable(){
  const totals={open:0,terkirim:0,cancel:0};
  document.getElementById("deliveryTableBody").innerHTML=deliveryDetails.map(row=>{
    totals.open+=row.open;totals.terkirim+=row.terkirim;totals.cancel+=row.cancel;
    const total=row.open+row.terkirim+row.cancel;
    const statusCell=(status,value)=>value?`<button class="status-link ${status}" data-status="${status}" data-mobil="${row.mobil}">${value}</button>`:`<span class="empty-status">0</span>`;
    return `<tr><td>${row.mobil}</td><td>${row.jenis}</td><td>${row.kode||"(blank)"}</td><td>${row.driver}</td><td>${row.jam}</td><td>${row.rpp}</td><td>${statusCell("open",row.open)}</td><td>${statusCell("terkirim",row.terkirim)}</td><td>${statusCell("cancel",row.cancel)}</td><td><b>${total}</b></td></tr>`;
  }).join("");
  const grandTotal=totals.open+totals.terkirim+totals.cancel;
  document.getElementById("deliveryTableFoot").innerHTML=`<tr><td colspan="6">Grand Total</td><td>${totals.open}</td><td>${totals.terkirim}</td><td>${totals.cancel}</td><td>${grandTotal}</td></tr>`;
  document.getElementById("tableDate").textContent=formatDate(startDate.value);
}

function formatMoney(value){return numberFormat.format(value)}
function showInvoices(status,mobil){
  const rows=invoiceRecords.filter(item=>item.status===status&&item.mobil===mobil);
  const labels={open:"OPEN",terkirim:"TERKIRIM",cancel:"CANCEL"};
  document.getElementById("invoiceTitle").textContent=`Daftar Faktur ${labels[status]}`;
  document.getElementById("invoiceSubtitle").textContent=`No. Mobil: ${mobil} • Status: ${labels[status]}`;
  document.getElementById("invoiceCount").textContent=`${rows.length} faktur`;
  document.getElementById("invoiceTableBody").innerHTML=rows.length?rows.map(item=>`<tr><td>${item.kodeDriver}</td><td>${item.namaDriver}</td><td>${item.noRpp}</td><td>${item.tglLhv}</td><td>${item.noInv}</td><td>${item.channel}</td><td>${item.kodeCust}</td><td>${item.namaCust}</td><td>${item.alamatCust}</td><td>${item.qtyInvoice}</td><td>${formatMoney(item.nilaiInvoice)}</td><td>${item.typeInvoice}</td><td>${item.typePembayaran}</td><td>${formatMoney(item.pembayaran)}</td><td>${item.scanDropping}</td><td>${item.keteranganDelivery}</td><td>${item.alasan}</td><td>${item.statusFaktur}</td><td>${item.alasanGagal}</td></tr>`).join(""):`<tr class="empty-invoices"><td colspan="19">Tidak ada faktur dengan status ${labels[status]}.</td></tr>`;
  document.getElementById("invoiceModal").hidden=false;
  document.getElementById("closeInvoice").focus();
}
function closeInvoice(){document.getElementById("invoiceModal").hidden=true}

const detailSection=document.getElementById("detailSection");
const detailButton=document.getElementById("detailButton");
function setDetail(open){detailSection.hidden=!open;detailButton.setAttribute("aria-expanded",String(open));if(open){renderTable();document.body.style.overflow="hidden";document.getElementById("closeDetail").focus()}else{document.body.style.overflow=""}}
detailButton.addEventListener("click",()=>setDetail(detailSection.hidden));
document.getElementById("deliveryTableBody").addEventListener("click",event=>{
  const button=event.target.closest(".status-link");
  if(button)showInvoices(button.dataset.status,button.dataset.mobil);
});
document.getElementById("closeDetail").addEventListener("click",()=>setDetail(false));
document.getElementById("modalBackdrop").addEventListener("click",()=>setDetail(false));
document.getElementById("closeInvoice").addEventListener("click",closeInvoice);
document.getElementById("backToDetail").addEventListener("click",closeInvoice);
document.getElementById("invoiceBackdrop").addEventListener("click",closeInvoice);
document.addEventListener("keydown",event=>{if(event.key==="Escape"){if(!document.getElementById("invoiceModal").hidden)closeInvoice();else if(!detailSection.hidden)setDetail(false)}});
startDate.addEventListener("change",()=>{endDate.min=startDate.value;renderDashboard();if(!detailSection.hidden)renderTable()});
endDate.addEventListener("change",()=>{startDate.max=endDate.value;renderDashboard()});
document.getElementById("refreshButton").addEventListener("click",function(){this.classList.add("is-refreshing");setTimeout(()=>{this.classList.remove("is-refreshing");renderDashboard();if(!detailSection.hidden)renderTable()},650)});
renderDashboard();
