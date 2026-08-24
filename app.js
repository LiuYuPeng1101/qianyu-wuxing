(function(){
  var STEMS="甲乙丙丁戊己庚辛壬癸", BRANCHES="子丑寅卯辰巳午未申酉戌亥", ZODIAC="鼠牛虎兔龙蛇马羊猴鸡狗猪";
  var NAYIN=[["海中金","金"],["炉中火","火"],["大林木","木"],["路旁土","土"],["剑锋金","金"],["山头火","火"],["涧下水","水"],["城头土","土"],["白蜡金","金"],["杨柳木","木"],["泉中水","水"],["屋上土","土"],["霹雳火","火"],["松柏木","木"],["长流水","水"],["沙中金","金"],["山下火","火"],["平地木","木"],["壁上土","土"],["金箔金","金"],["覆灯火","火"],["天河水","水"],["大驿土","土"],["钗钏金","金"],["桑柘木","木"],["大溪水","水"],["沙中土","土"],["天上火","火"],["石榴木","木"],["大海水","水"]];
  var ELEM={
    "木":{color:"#596b4d",soft:"#b6c2a6",title:"生长、柔韧、向上延伸的能量",note:"象征生机、创造力、贵人缘、成长突破",organ:"肝部",palette:"全系列青绿",colors:[["薄荷绿","#b7c9b1"],["抹茶绿","#8fa080"],["森林绿","#455a3e"],["橄榄绿","#73784c"],["青柠","#b8be72"],["蓝绿","#628781"]],fortunes:[["事业运","破瓶颈、招贵人"],["人际人缘与正缘桃花","让关系更柔和，也更有生长感"],["情绪与健康调理","木主肝胆"],["学业、才华提升","增强创造力与成长动力"]]},
    "火":{color:"#a64334",soft:"#e2a28d",title:"热情、活力、能量释放、口才、气场",note:"用暖意与明亮感增强行动力、表现力与个人存在感",organ:"心脏",palette:"全系列暖红系",colors:[["正红","#b83e31"],["车厘子红","#782f35"],["橘红","#cb623f"],["蜜桃粉","#e3a595"],["酒红","#65303a"],["紫红","#8f4561"],["暖橙","#d67a47"]],fortunes:[["事业运","提升曝光、增强魄力、抓住机遇"],["人际人缘与正缘桃花","增加亲和力与情感热度"],["情绪与健康调理","火主心、血脉"],["才华表现力","面试、考试、演讲时更敢表达"]]},
    "土":{color:"#a97842",soft:"#dbc8a6",title:"稳重、踏实、厚重积淀、守诺",note:"以大地色带来承托与稳定感，让能量更沉着、更有长期主义",organ:"脾胃",palette:"全系大地色系",colors:[["土黄","#b78942"],["焦糖","#a96a43"],["咖色","#6e5144"],["驼色","#a98262"],["米白","#e8dfce"],["裸杏","#d8bda1"],["陶土","#bd6446"],["暖棕","#866149"]],fortunes:[["事业运","稳固根基、增加信赖、稳平台"],["家庭人际与长久正缘","沉淀可靠、长久的关系"],["情绪与健康调理","土主脾胃"],["考试、考证、长期规划","增强定力"],["聚财守财","稳固固定资产"]]},
    "金":{color:"#a68651",soft:"#d9cfb8",title:"决断、偏财、清晰思路、提升判断力",note:"金色偏阳金，银色偏阴金；用清晰、利落的质感建立边界与秩序",organ:"肺部",palette:"金色偏阳金 · 银色偏阴金",colors:[["纯白","#f2efe6"],["奶白","#e9dfcf"],["银","#bfc1bc"],["铂金","#cbc6ba"],["香槟金","#c9aa70"],["冷灰","#979b98"],["珍珠白","#eee7da"]],fortunes:[["事业运","增强决断力、提升话语权、竞争取胜"],["人际边界与优质贵人人脉","更清楚地筛选关系与合作"],["情绪与健康调理","金主肺、呼吸道、皮肤"]]},
    "水":{color:"#374f54",soft:"#a9c1c1",title:"智慧、灵动、柔韧多变",note:"以柔克刚、洞察人心，在变化中保持流动与清醒",organ:"肾部",palette:"白色、银色",colors:[["纯黑","#202626"],["藏青","#263c48"],["深海蓝","#315260"],["墨蓝","#334a57"],["冷调炭灰","#626b6a"],["浅湖蓝","#9fbfc2"]],fortunes:[["事业运","开拓客源、提升谋略、抓住流动机遇"],["人际人缘与温柔正缘桃花","增强柔和、细腻的沟通力"],["情绪与健康调理","水主肾、精气"],["思维智慧","创作、策划、考试、谈判时更灵活"],["疏通财源","提升流动正财"]]}
  };
  var pickedYear=1990,pickedMonth=7,now=new Date().getFullYear();
  function closePickers(except){
    document.querySelectorAll(".picker.open").forEach(function(picker){
      if(picker!==except){picker.classList.remove("open");picker.querySelector(".picker-button").setAttribute("aria-expanded","false")}
    });
  }
  function buildPicker(id,values,formatter,initial,onChange){
    var picker=document.getElementById(id),button=picker.querySelector(".picker-button"),menu=picker.querySelector(".picker-menu"),valueLabel=picker.querySelector(".picker-value");
    values.forEach(function(value){
      var option=document.createElement("button");
      option.type="button";option.className="picker-option";option.setAttribute("role","option");option.dataset.value=value;option.textContent=formatter(value);
      if(value===initial){option.classList.add("selected");option.setAttribute("aria-selected","true")}
      option.addEventListener("click",function(event){
        event.stopPropagation();valueLabel.textContent=formatter(value);onChange(value);
        menu.querySelectorAll(".picker-option").forEach(function(item){var selected=item===option;item.classList.toggle("selected",selected);item.setAttribute("aria-selected",selected?"true":"false")});
        picker.classList.remove("open");button.setAttribute("aria-expanded","false");button.focus();
      });
      menu.appendChild(option);
    });
    button.addEventListener("click",function(event){
      event.stopPropagation();var opening=!picker.classList.contains("open");closePickers(picker);picker.classList.toggle("open",opening);button.setAttribute("aria-expanded",opening?"true":"false");
      if(opening){var selected=menu.querySelector(".selected");if(selected){selected.scrollIntoView({block:"center"})}}
    });
  }
  var years=[];for(var y=now;y>=1920;y--){years.push(y)}
  var months=[];for(var m=1;m<=12;m++){months.push(m)}
  buildPicker("yearPicker",years,function(v){return v+" 年"},pickedYear,function(v){pickedYear=v});
  buildPicker("monthPicker",months,function(v){return v+" 月"},pickedMonth,function(v){pickedMonth=v});
  document.addEventListener("click",function(){closePickers()});
  document.addEventListener("keydown",function(event){if(event.key==="Escape"){closePickers()}});
  function calc(year,month){var ly=month<=1?year-1:year,idx=((ly-4)%60+60)%60,pair=NAYIN[Math.floor(idx/2)];return{ly:ly,gz:STEMS[idx%10]+BRANCHES[idx%12],zodiac:ZODIAC[idx%12],nayin:pair[0],elem:pair[1]}}
  function render(){
    var r=calc(pickedYear,pickedMonth),e=ELEM[r.elem],root=document.documentElement;
    root.style.setProperty("--element",e.color);root.style.setProperty("--element-soft",e.soft);
    document.getElementById("seal").textContent=r.elem;
    document.getElementById("resultTitle").textContent=r.elem+"命 · "+e.title.split("、")[0];
    document.getElementById("resultNayin").textContent="纳音「"+r.nayin+"」· "+r.gz+"年 · 属"+r.zodiac;
    document.getElementById("resultYear").textContent=r.ly;
    document.getElementById("ganzhi").textContent=r.gz+" · "+r.zodiac;
    document.getElementById("coreTitle").textContent="【"+r.elem+"】主："+e.title;
    document.getElementById("coreNote").textContent=e.note;
    document.getElementById("organ").textContent=e.organ;
    document.getElementById("paletteLabel").textContent=e.palette;
    document.getElementById("fortuneTitle").textContent=r.elem+"属性美甲运势";
    var sw=document.getElementById("swatches");sw.innerHTML="";
    e.colors.forEach(function(c){var item=document.createElement("div");item.className="swatch";item.innerHTML='<div class="swatch-color" style="background:'+c[1]+'"></div><span class="swatch-name">'+c[0]+'</span>';sw.appendChild(item)});
    var fl=document.getElementById("fortunes");fl.innerHTML="";
    e.fortunes.forEach(function(f){var li=document.createElement("li");li.className="fortune-item";li.innerHTML='<div><strong>'+f[0]+'</strong><span>'+f[1]+'</span></div>';fl.appendChild(li)});
    document.body.classList.add("result-mode");document.getElementById("result").classList.add("show");window.scrollTo({top:0,behavior:"smooth"});
  }
  function reset(){document.body.classList.remove("result-mode");document.getElementById("result").classList.remove("show");window.scrollTo({top:0,behavior:"smooth"})}
  document.getElementById("go").addEventListener("click",render);
  document.getElementById("resultBack").addEventListener("click",reset);
  document.getElementById("again").addEventListener("click",reset);
  var guideRail=document.getElementById("guideRail"),conceptDisc=document.getElementById("conceptDisc"),discTimer;
  var guideViews={
    concept:{kicker:"五行关系",main:"相生",sub:"顺序相生 · 隔位相克",background:"rgba(45,66,47,.82)"},
    natal:{kicker:"本命推演",main:"本命",sub:"出生年份 · 月份",background:"rgba(35,44,36,.82)"},
    palette:{kicker:"美甲色谱",main:"五色",sub:"青绿 · 暖红 · 大地",background:"rgba(112,82,52,.82)"},
    fortune:{kicker:"运势方向",main:"五运",sub:"事业 · 人缘 · 健康",background:"rgba(68,57,45,.84)"}
  };
  function updateGuide(button){
    var view=button.dataset.view,data=guideViews[view];
    document.querySelectorAll(".guide-tag").forEach(function(item){var active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-current",active?"true":"false")});
    guideRail.style.setProperty("--active-index",button.dataset.index);
    clearTimeout(discTimer);conceptDisc.classList.add("is-changing");
    discTimer=setTimeout(function(){
      document.getElementById("discKicker").textContent=data.kicker;
      document.getElementById("discMain").textContent=data.main;
      document.getElementById("discSub").textContent=data.sub;
      conceptDisc.style.background=data.background;
      conceptDisc.classList.remove("is-changing");
    },170);
    if(view==="natal"){setTimeout(function(){document.getElementById("formPanel").scrollIntoView({behavior:"smooth",block:"center"})},260)}
  }
  document.querySelectorAll(".guide-tag").forEach(function(button){button.addEventListener("click",function(){updateGuide(button)})});
  document.querySelector(".guide-tag.active").setAttribute("aria-current","true");
})();



