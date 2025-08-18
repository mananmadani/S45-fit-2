function haptic(p=60){if("vibrate"in navigator)navigator.vibrate(p);} // Tab navigation
function showTab(idx) {
  var tabs = document.querySelectorAll('.tab-section');
  var buttons = document.querySelectorAll('.tab-btn');
  tabs.forEach((tab,i)=>{ tab.classList.toggle("visible",i===idx); });
  buttons.forEach((btn,i)=>{ btn.classList.toggle("active",i===idx); });
  haptic([14,25]);
}
document.getElementById("tab-shrinkage").onclick=()=>showTab(0);
document.getElementById("tab-fit").onclick=()=>showTab(1);

// 1/8 round helpers
function snapEighth(v){return Math.round(v*8)/8;}
function fmtEighth(v){return snapEighth(v).toFixed(5);} // Now 5 decimals

// Shrinkage calculator (all fields optional)
document.getElementById('shrinkageForm').addEventListener('submit',function(e){
  e.preventDefault();haptic([28,35,28]);
  let r='';
  const flds=[
    {label:'Length',before:'lengthBefore',after:'lengthAfter'},
    {label:'Waist',before:'waistBefore',after:'waistAfter'},
    {label:'Thigh',before:'thighBefore',after:'thighAfter'},
    {label:'Bottom',before:'bottomBefore',after:'bottomAfter'}
  ];
  let shrinkPercents={};
  flds.forEach(f=>{
    const b=parseFloat(document.getElementById(f.before).value);
    const a=parseFloat(document.getElementById(f.after).value);
    let s=(!isNaN(b)&&!isNaN(a)&&b>0)?((b-a)/b*100).toFixed(5):''; // 5 decimals
    shrinkPercents[f.label.toLowerCase()]=s;
    r+=`
      <div>${f.label}: ${s!==''?s+'%':'-'}</div>
    `;
  });
  document.getElementById('shrinkageResults').innerHTML=r;
});

// Example Fit Converter (ensure result shows 5 decimals)
document.getElementById('fitForm').addEventListener('submit', function(e){
  e.preventDefault();
  const fitInput1 = parseFloat(document.getElementById('fitInput1').value);
  const fitInput2 = parseFloat(document.getElementById('fitInput2').value);
  let fitResult = !isNaN(fitInput1) && !isNaN(fitInput2)
      ? (fitInput1 * fitInput2).toFixed(5)
      : '';
  document.getElementById('fitResult').innerHTML = fitResult !== '' ? fitResult : '-';
});
