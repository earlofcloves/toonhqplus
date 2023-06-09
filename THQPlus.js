async function THQPlus() {
   var inv, debug=1;
   const lookup = {
            street: {
               'Loopy Lane': 'Ttown Cntrl',
               'Punchline Place': 'Ttown Cntrl',
               'Silly Street': 'Ttown Cntrl',
               'Goofy Speedway': 'Ttown Cntrl',
               'Barnacle Boulevard': "D. Dock",
               'Lighthouse Lane': "D. Dock",
               'Seaweed Street': "D. Dock",
               'Elm Street': "D. Garden",
               'Maple Street': "D. Garden",
               'Oak Street': "D. Garden",
               'Sellbot HQ': "D. Garden",
               'Alto Avenue': "M. Melodyland",
               'Baritone Boulevard': "M. Melodyland",
               'Tenor Terrace': "M. Melodyland",
               'Polar Place': "The Brrrgh", 
               'Sleet Street': "The Brrrgh",
               'Walrus Way': "The Brrrgh",
               'Lawbot HQ': "The Brrrgh",
               'Lullaby Lane': "D. Dreamland",
               'Pajama Place': "D. Dreamland",
               'Cashbot HQ': "D. Dreamland",
               'Bossbot HQ': "Chip 'n Dale's"
            },
            cog: {
               'FLUNKY':                  ["Flunky","B",1,3],
               'PENCIL PUSHER':           ["Pencil Pusher","B",2,7],
               'YESMAN':                  ["Yesman","B",3,"3G"],
               'MICROMANAGER':            ["MicroManager","B",4,9],
               'DOWNSIZER':               ["Downsizer","B",5,8],
               'HEAD HUNTER':             ["Head Hunter","B",6,11],
               'CORPORATE RAIDER':        ["Corp Raider","B",7,15],
               'THE BIG CHEESE':          ["Big Cheese","B",8,17],
               'BOTTOM FEEDER':           ["Bottom Feeder","L",1,4],
               'BLOODUSCKER':             ["Blood Sucker","L",2,7],
               'DOUBLE TALKER':           ["Dbl Talker","L",3,5],
               'AMBULANCE CHASER':        ["Amb Chaser","L",4,8],
               'BACK STABBER':            ["Back Stabber","L",5,"10G"],
               'SPIN DOCTOR':             ["Spin Doctor","L",6,10],
               'LEGAL EAGLE':             ["Legal Eagle","L",7,14],
               'BIG WIG':                 ["Big Wig","L",8,"15G"],
               'SHORT CHANGE':            ["Short Change","C",1,4],
               'PENNY PINCHER':           ["Penny Pincher","C",2,5],
               'TIGHTWAD':                ["Tightwad","C",3,6],
               'BEAN COUNTER':            ["Bean Counter","C",4,9],
               'NUMBER CRUNCHER':         ["Numb Cruncher","C",5,9],
               'MONEY BAGS':              ["Money Bags","C",6,11],
               'LOAN SHARK':              ["Loan Shark","C",7,13],
               'ROBBER BARON':            ["Robber Baron","C",8,"15G"],
               'COLD CALLER':             ["Cold Caller","S",1,3],
               'TELEMARKETER':            ["Telecommuter","S",2,5],
               'NAME DROPPER':            ["Name Dropper","S",3,"6G"],
               'GLAD HANDER':             ["Glad Hander","S",4,6],
               'MOVER & SHAKER':          ["Mover&Shaker","S",5,"10G"],
               'TWO-FACE':                ["Two-Face","S",6,12],
               'THE MINGLER':             ["Mingler","S",7,"13G"],
               'MR. HOLLYWOOD':           ["Mr Hollywood","S",8,"15G"],
               'decode': {'B':'Boss','C':"Cash","L":"Law","S":"Sell"}
            },
         };
   const tc = ['Loopy Lane','Punchline Place','Silly Street','Goofy Speedway'],
         dk = ['Barnacle Boulevard','Lighthouse Lane','Seaweed Street','Sellbot HQ'],
         dg = ['Elm Street','Maple Street','Oak Street'],
         mm = ['Alto Avenue','Baritone Boulevard','Tenor Terrace'],
         br = ['Polar Place','Sleet Street','Walrus Way','Lawbot HQ'],
         dd = ['Lullaby Lane','Pajama Place','Cashbot HQ'],
         cd = ['Bossbot HQ'];
   const bb = ['Flunky','Pencil Pusher','Yesman','Micro\x03manager','Downsizer','Head Hunter','Corporate Raider','The Big Cheese','Chief Executive Officer'],
         lb = ['Bottom Feeder','Blood\u0003sucker','Double Talker','Ambulance Chaser','Back Stabber','Spin Doctor','Legal Eagle','Big Wig','Chief Justice'],
         cb = ['Short Change','Penny Pincher','Tightwad','Bean Counter','Number Cruncher','Money Bags','Loan Shark','Robber Baron','Chief Financial Officer'],
         sb = ['Cold Caller','Tele\u0003marketer','Name Dropper','Glad Hander','Mover & Shaker','Two-Face','The Mingler','Mr. Hollywood','Vice President'];
   const ads = ["tyche_trendi_video_container","pw-oop-bottom_rail","mt-3"];
   
   THQsetup();
   
   async function THQsetup() {
      if (window.location.host!=="toonhq.org") {return}
      if (window.location.pathname.includes("groups")) {addGroupNotify()}
      await THQloop(); setInterval(THQloop,2500);
   }
   
   async function THQloop() {
      if (window.location.host!=="toonhq.org") {return}
      killAds();
      if (window.location.pathname.includes("groups")) {updateTHQg()}
      if (window.location.pathname.includes("invasions")) {updateTHQi()}
   }

   function killAds() {
      if (debug) {console.log('killads')}      
      ads.forEach(ad=>{
         let e=document.getElementById(ad);
         // if (!e) {e=document.getElementsByClassName(ad)[0]}
         if (e) {e.remove()}
      });
   }

   function addGroupNotify () {
      if (document.getElementById("gnb")) {return}
      let gnb=document.createElement('button');
      gnb.id="gnb";
      gnb.className="btn subnav__btn ml-3";
      gnb.innerText="Group Notification";
      gnb.onclick=()=>alert("Coming Soon");
      document.getElementsByClassName("d-flex")[0].appendChild(gnb);
   }

   async function updateTHQg() {
      await updateInvasions(); 
      updateGroups();
   }

   async function updateTHQi() {
      if (debug) {console.log("update invasions")}      
      const invs=document.getElementsByClassName("info-card__content");
      Array.from(invs).forEach(i=>{
         //let cog = i.childNodes[0];
         //cog.innerText=invInfo(cog.innerText);
         //cog.style.fontsize="12px";
         const distnode=i.getElementsByTagName("P")[0], dist=distnode.innerText.split("\n");
         let distname=dist[2]; if (!distname) {distname=dist[0]}
         let [cogname,cogtype,coglvl,avgattack] = getCogInfo(i.childNodes[0].innerText); 
         distnode.innerHTML=`<b>${cogtype}<br>Level ${coglvl}, AvgAttack ${avgattack}</b><br>${distname}`;
         i.parentElement.style.height="150px";
      });
   }
   
   async function updateInvasions() {
      if (debug) {console.log('updinvforg')}      
      let response;
      response = await fetch('https://api.allorigins.win/get?url='+encodeURIComponent('https://www.toontownrewritten.com/api/invasions'),{mode:"cors"});
      const jresp = await response.json();
      const contents = JSON.parse(jresp.contents);
      inv=contents.invasions;
   }

   function updateGroups() {
      const groups=document.getElementsByClassName("info-card__content");
      if (debug) {console.log("update groups")}
      Array.from(groups).forEach(g=>{
         const invtype = g.childNodes[0], invtypev=invtype.innerText;
         const street = g.childNodes[1], streetv=street.innerText.split(" (")[0];
         const district = g.childNodes[2], districtv=district.innerText.split("\n")[0];
         if (neighborhood(streetv)) {street.innerHTML=streetv+' <i>'+neighborhood(streetv)+'</i>'}
         if (inv[districtv] && invtypev.includes('BUILDING')) {
            //const [cogsKilled,cogsTotal] = inv[districtv].progress.split('/'); const cogsLeft=cogsTotal-cogsKilled; 
            //district.innerHTML=`${districtv}<br><b><i>Invasion ${-Info(inv[districtv].type)}</i></b>`;    
            //console.log("groupcoginfo");console.log(district);console.log(districtv);console.log(inv[districtv]);console.log(inv[districtv].type);
            //console.log("cogtyp: ",inv[districtv].type);
            let [cogname,cogtype,coglvl,avgattack] = getCogInfo(inv[districtv].type); 
            district.innerHTML=`${districtv}<br><b>${cogname} Invasion<br><i>Level ${coglvl}, AvgAttack ${avgattack}</i></b>`;   
            g.parentElement.style.height="140px";
         }
      });
   }  
   
   function invInfo(cog) {
      const coginfo=lookup.cog[decodeCogname(cog)];
      if (debug) {console.log(decodeCogname(cog))}
      if (coginfo) {
         let [dispname,type,lev,gattack]=coginfo;
         if (dispname=="") {dispname=cog}
         lev=`${lev}-${Number(lev)+4}`;
         if (gattack) {gattack="*"} else {gattack=""}
         return `${dispname} ${lookup.cog.decode[type]} L${lev}${gattack}`;
      }
      else {return cog}
   }
   
   function getCogInfo(cog) {
      const cogname=cog.replace(/\x03/g,"").replace(/\u0003/g,"");
      const cognameuc=cogname.toUpperCase();
      if (!lookup.cog[cognameuc]) {return [cog,"?",""]}
      let [cogshortname,cogtype,coglevel,avgattack]=lookup.cog[cognameuc];
      coglevel=`${coglevel}-${Number(coglevel)+4}`;
      return [cogname,lookup.cog.decode[cogtype]+"bot",coglevel,avgattack];
   }   
   
   function neighborhood(street) {
      const n=lookup.street[street];
      if (n) {return `(${n})`} else {return 0}
   }
   
   function decodeCogname(name) {
      name=name.replace(/\x03/g,"");
      name=name.replace(/\u0003/g,"");
      return name.toUpperCase();
   }

}
   
THQPlus();
