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
  var METAL_LOOKS=[
    ["1 (1).png","1 (2).png","1 (3).png"],
    ["2 (1).png","2 (2).png","2 (3).png"],
    ["3-1.png","3-2.png","3-3.png"],
    ["4 (1).png","4 (2).png"],
    ["5 (1).png","5 (2).png"],
    ["6 (1).png","6 (2).png","6 (3).png"],
    ["7 (1).png","7 (2).png","7 (3).png"],
    ["8 (1).png","8 (2).png","8 (3).png"]
  ];
  var carouselIndexes=METAL_LOOKS.map(function(){return 0});
  var viewer=document.getElementById("imageViewer"),viewerStage=document.getElementById("viewerStage"),viewerImage=document.getElementById("viewerImage"),viewerScale=1,viewerX=0,viewerY=0,viewerTrigger=null,viewerPointers=new Map(),pinchDistance=0,pinchScale=1;
  function lookSrc(file){return encodeURI("meijia/jin/"+file)}
  function preloadLook(groupIndex,itemIndex){var image=new Image();image.src=lookSrc(METAL_LOOKS[groupIndex][itemIndex])}
  function applyViewerTransform(){
    if(!viewerImage){return}
    viewerImage.style.transform="translate3d("+viewerX+"px,"+viewerY+"px,0) scale("+viewerScale+")";
    viewerStage.classList.toggle("is-zoomed",viewerScale>1.01);
  }
  function resetViewer(){viewerScale=1;viewerX=0;viewerY=0;applyViewerTransform()}
  function zoomViewer(nextScale,clientX,clientY){
    var oldScale=viewerScale,newScale=Math.max(1,Math.min(4,nextScale));
    if(newScale===oldScale){return}
    if(clientX!==undefined&&clientY!==undefined){
      var rect=viewerStage.getBoundingClientRect(),pointX=clientX-rect.left-rect.width/2,pointY=clientY-rect.top-rect.height/2,ratio=newScale/oldScale;
      viewerX=pointX-(pointX-viewerX)*ratio;viewerY=pointY-(pointY-viewerY)*ratio;
    }
    viewerScale=newScale;if(viewerScale===1){viewerX=0;viewerY=0}applyViewerTransform();
  }
  function openViewer(image){
    if(!viewer){return}
    viewerTrigger=image.closest(".carousel-open")||image;viewerImage.src=image.currentSrc||image.src;viewerImage.alt=image.alt;resetViewer();viewer.hidden=false;document.body.classList.add("image-viewer-open");
    requestAnimationFrame(function(){viewer.classList.add("open");viewerStage.focus()});
  }
  function closeViewer(){
    if(!viewer||viewer.hidden){return}
    viewer.classList.remove("open");document.body.classList.remove("image-viewer-open");viewerPointers.clear();
    setTimeout(function(){viewer.hidden=true;viewerImage.src="data:,";if(viewerTrigger){viewerTrigger.focus()}},220);
  }
  if(viewer){
    document.getElementById("viewerClose").addEventListener("click",closeViewer);
    document.getElementById("viewerReset").addEventListener("click",resetViewer);
    document.getElementById("viewerZoomIn").addEventListener("click",function(){zoomViewer(viewerScale+.5)});
    document.getElementById("viewerZoomOut").addEventListener("click",function(){zoomViewer(viewerScale-.5)});
    viewerStage.addEventListener("dblclick",function(event){zoomViewer(viewerScale>1.01?1:2.25,event.clientX,event.clientY)});
    viewerStage.addEventListener("wheel",function(event){event.preventDefault();zoomViewer(viewerScale+(event.deltaY<0 ? .35 : -.35),event.clientX,event.clientY)},{passive:false});
    viewerStage.addEventListener("pointerdown",function(event){viewerPointers.set(event.pointerId,{x:event.clientX,y:event.clientY});viewerStage.setPointerCapture(event.pointerId);viewerStage.classList.add("is-dragging");if(viewerPointers.size===2){var points=Array.from(viewerPointers.values());pinchDistance=Math.hypot(points[0].x-points[1].x,points[0].y-points[1].y);pinchScale=viewerScale}});
    viewerStage.addEventListener("pointermove",function(event){
      var previous=viewerPointers.get(event.pointerId);if(!previous){return}viewerPointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
      if(viewerPointers.size===2&&pinchDistance>0){var points=Array.from(viewerPointers.values()),distance=Math.hypot(points[0].x-points[1].x,points[0].y-points[1].y);zoomViewer(pinchScale*(distance/pinchDistance));}
      else if(viewerScale>1.01){viewerX+=event.clientX-previous.x;viewerY+=event.clientY-previous.y;applyViewerTransform()}
    });
    function releaseViewerPointer(event){viewerPointers.delete(event.pointerId);if(viewerPointers.size<2){pinchDistance=0;pinchScale=viewerScale}if(viewerPointers.size===0){viewerStage.classList.remove("is-dragging")}}
    viewerStage.addEventListener("pointerup",releaseViewerPointer);viewerStage.addEventListener("pointercancel",releaseViewerPointer);
    document.addEventListener("keydown",function(event){if(viewer.hidden){return}if(event.key==="Escape"){closeViewer()}else if(event.key==="+"||event.key==="="){zoomViewer(viewerScale+.5)}else if(event.key==="-"){zoomViewer(viewerScale-.5)}else if(event.key==="0"){resetViewer()}});
  }
  function updateCarousel(groupIndex,nextIndex,direction){
    var files=METAL_LOOKS[groupIndex],index=(nextIndex+files.length)%files.length,card=document.querySelector('[data-carousel="'+groupIndex+'"]');
    if(!card){return}
    carouselIndexes[groupIndex]=index;
    var image=card.querySelector(".carousel-image"),dots=card.querySelectorAll(".carousel-dot");
    image.classList.remove("slide-from-left","slide-from-right");void image.offsetWidth;
    image.src=lookSrc(files[index]);image.alt="金系美甲第 "+(groupIndex+1)+" 组，第 "+(index+1)+" 款";
    image.classList.add(direction<0?"slide-from-left":"slide-from-right");
    dots.forEach(function(dot,dotIndex){dot.classList.toggle("active",dotIndex===index)});
    preloadLook(groupIndex,(index+1)%files.length);
  }
  function renderMetalCarousels(){
    var stack=document.getElementById("carouselStack");stack.innerHTML="";
    METAL_LOOKS.forEach(function(files,groupIndex){
      carouselIndexes[groupIndex]=0;
      var article=document.createElement("article");article.className="carousel-group";article.dataset.carousel=groupIndex;
      var number=String(groupIndex+1).padStart(2,"0");
      article.innerHTML='<div class="carousel-group-head"><span>LOOK '+number+'</span><i></i><small>共 '+files.length+' 款</small></div>'+
        '<div class="carousel-frame"><button class="carousel-open" type="button" aria-label="放大查看第 '+(groupIndex+1)+' 组美甲图片"><img class="carousel-image" src="'+lookSrc(files[0])+'" alt="金系美甲第 '+(groupIndex+1)+' 组，第 1 款" loading="lazy" decoding="async"></button>'+
        '<div class="carousel-vignette"></div><div class="carousel-caption"><strong class="carousel-price">￥680</strong></div>'+
        '<button class="carousel-arrow prev" type="button" aria-label="查看上一款"><img src="assets/icons/chevron-left.svg" alt=""></button>'+
        '<button class="carousel-arrow next" type="button" aria-label="查看下一款"><img src="assets/icons/chevron-right.svg" alt=""></button>'+
        '<div class="carousel-progress">'+files.map(function(_,index){return '<span class="carousel-dot'+(index===0?' active':'')+'"></span>'}).join('')+'</div></div>'+
        '<p class="carousel-hint">左右滑动切换 · 点击图片放大查看</p>';
      article.querySelector(".prev").addEventListener("click",function(){updateCarousel(groupIndex,carouselIndexes[groupIndex]-1,-1)});
      article.querySelector(".next").addEventListener("click",function(){updateCarousel(groupIndex,carouselIndexes[groupIndex]+1,1)});
      var frame=article.querySelector(".carousel-frame"),openButton=article.querySelector(".carousel-open"),startX=0,startY=0,tracking=false,suppressOpen=false;
      frame.addEventListener("pointerdown",function(event){if(event.target.closest(".carousel-arrow")){return}tracking=true;suppressOpen=false;startX=event.clientX;startY=event.clientY});
      frame.addEventListener("pointermove",function(event){if(tracking&&!suppressOpen&&Math.hypot(event.clientX-startX,event.clientY-startY)>10){suppressOpen=true;frame.setPointerCapture(event.pointerId)}});
      frame.addEventListener("pointerup",function(event){if(!tracking){return}tracking=false;var dx=event.clientX-startX,dy=event.clientY-startY;if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)){suppressOpen=true;updateCarousel(groupIndex,carouselIndexes[groupIndex]+(dx<0?1:-1),dx<0?1:-1)}});
      frame.addEventListener("pointercancel",function(){tracking=false;suppressOpen=true});
      openButton.addEventListener("click",function(event){if(suppressOpen){event.preventDefault();suppressOpen=false;return}openViewer(openButton.querySelector(".carousel-image"))});
      stack.appendChild(article);preloadLook(groupIndex,files.length>1?1:0);
    });
  }
  var pickedYear=1990,pickedMonth=7,now=new Date().getFullYear();
  if(document.getElementById("yearPicker")){
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
  function reset(){document.body.classList.remove("result-mode");document.getElementById("result").classList.remove("show");setTimeout(function(){document.getElementById("formPanel").scrollIntoView({behavior:"smooth",block:"start"})},80)}
  document.getElementById("go").addEventListener("click",render);
  document.getElementById("resultBack").addEventListener("click",reset);
  document.getElementById("again").addEventListener("click",reset);
  }
  if(document.getElementById("guideRail")){
  var guideRail=document.getElementById("guideRail"),conceptDisc=document.getElementById("conceptDisc"),discTimer;
  var guideViews={
    fortune:{kicker:"五行运势",main:"顺势",sub:"知强弱 · 取平衡",background:"rgba(68,57,45,.84)",panel:"fortunePanel"},
    natal:{kicker:"本命推演",main:"本命",sub:"出生年份 · 月份",background:"rgba(35,44,36,.82)",panel:"formPanel"},
    styles:{kicker:"五行款式",main:"五色",sub:"木 · 火 · 土 · 金 · 水",background:"rgba(112,82,52,.82)",panel:"stylesPanel"}
  };
  function showView(view,shouldScroll){
    var data=guideViews[view],button=document.querySelector('[data-view="'+view+'"]');
    document.querySelectorAll(".guide-tag").forEach(function(item){var active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-current",active?"true":"false")});
    guideRail.style.setProperty("--active-index",button.dataset.index);
    document.querySelectorAll(".content-panel").forEach(function(panel){panel.hidden=panel.id!==data.panel});
    clearTimeout(discTimer);conceptDisc.classList.add("is-changing");
    discTimer=setTimeout(function(){
      document.getElementById("discKicker").textContent=data.kicker;
      document.getElementById("discMain").textContent=data.main;
      document.getElementById("discSub").textContent=data.sub;
      conceptDisc.style.background=data.background;
      conceptDisc.classList.remove("is-changing");
    },170);
    if(shouldScroll!==false){setTimeout(function(){document.getElementById(data.panel).scrollIntoView({behavior:"smooth",block:"start"})},260)}
  }
  document.querySelectorAll(".guide-tag").forEach(function(button){button.addEventListener("click",function(){showView(button.dataset.view,true)})});
  document.querySelector(".guide-tag.active").setAttribute("aria-current","true");
  }
  document.querySelectorAll(".element-choice").forEach(function(button){button.addEventListener("click",function(){
    var element=button.dataset.element,isMetal=element==="金";
    document.querySelectorAll(".element-choice").forEach(function(item){var active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-selected",active?"true":"false")});
    document.getElementById("stylesEmpty").hidden=isMetal;
    document.getElementById("metalShowcase").hidden=!isMetal;
    if(isMetal){renderMetalCarousels();setTimeout(function(){document.getElementById("metalShowcase").scrollIntoView({behavior:"smooth",block:"start"})},140)}else{
      var empty=document.getElementById("stylesEmpty");empty.querySelector("span").textContent=element+" · ELEMENT LOOKS";empty.querySelector("p").textContent=element+"系款式正在整理中，先为你保留这份期待。";
    }
  })});
})();
