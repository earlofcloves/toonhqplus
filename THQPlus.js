async function THQPlus() {
   var inv;
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
               'Flunky':                  ["","B",1],
               'Pencil Pusher':           ["Pencil Pusher","B",2],
               'Yesman':                  ["*Yesman","B",3],
               'Micro\x03manager':        ["MicroManager","B",4],
               'Downsizer':               ["","B",5],
               'Head Hunter':             ["","B",6],
               'Corporate Raider':        ["Corp Raider","B",7],
               'The Big Cheese':          ["Big Cheese","B",8],
               'Bottom Feeder':           ["","B",1],
               'Blood\u0003sucker':       ["Blood Sucker","B",2],
               'Double Talker':           ["*Dbl Talker","B",3],
               'Ambulance Chaser':        ["Amb Chaser","B",4],
               'Back Stabber':            ["*Back Stabber","B",5],
               'Spin Doctor':             ["*Spin Doctor","B",6],
               'Legal Eagle':             ["","B",7],
               'Big Wig':                 ["*Big Wig","B",8],
               'Short Change':            ["","B",1],
               'Penny Pincher':           ["","B",2],
               'Tightwad':                ["","B",3],
               'Bean Counter':            ["","B",4],
               'Number Cruncher':         ["Nmbr Cruncher","B",5],
               'Money Bags':              ["","B",6],
               'Loan Shark':              ["","B",7],
               'Robber Baron':            ["*Robber Baron","B",8],
               'Cold Caller':             ["","B",1],
               'Tele\u0003marketer':      ["Telecommuter","B",2],
               'Name Dropper':            ["*Name Dropper","B",3],
               'Glad Hander':             ["","B",4],
               'Mover & Shaker':          ["*Mover&Shaker","B",5],
               'Two-Face':                ["","B",6],
               'The Mingler':             ["*Mingler","B",7],
               'Mr. Hollywood':           ["*Mr Hollywood","B",8],
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
   
   killAds(); setInterval(killAds,15000);
   addGroupNotify();
   updateTHQg(); setInterval(updateTHQg,5000);

   function killAds() {
      ads.forEach(ad=>{
         let e=document.getElementById(ad);
 //        if (!e) {e=document.getElementsByClassName(ad)[0]}
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

   async function updateInvasions() {
      let response;
      response = await fetch('https://api.allorigins.win/get?url='+encodeURIComponent('https://www.toontownrewritten.com/api/invasions'),{mode:"cors"});
      const jresp = await response.json();
      const contents = JSON.parse(jresp.contents);
      inv=contents.invasions;
   }

   function updateGroups() {
      const groups=document.getElementsByClassName("info-card__content");
      Array.from(groups).forEach(g=>{
         const invtype = g.childNodes[0]; invtypev=invtype.innerText;
         console.log('xxx ',invtype);
         if (invtype.includes('BUILDING')) {
            const street = g.childNodes[1]; streetv=street.innerText.split(" (")[0];
            const district = g.childNodes[2]; districtv=district.innerText.split("\n")[0];
            if (neighborhood(streetv)) {street.innerHTML=streetv+' <i>('+neighborhood(streetv)+')</i>'}
            if (inv[districtv]) {
               const [cogsKilled,cogsTotal] = inv[districtv].progress.split('/'); const cogsLeft=cogsTotal-cogsKilled;  
            // district.innerHTML=districtv+'<br><b><i>Invasion: '+inv[districtv].type.replace("o\x03","o").replace("\u0003","")+' ('+cogType(inv[districtv].type)+')</i></b>';
               district.innerHTML=districtv+'<br><b><i>invInfo(inv[districtv].type)+'</i></b>';
            // console.log(invInfo(inv[districtv].type));          
            }  
         }
      });
   }  
   
   function invInfo(cog) {
      const coginfo=lookup.cog[cog];
      if (coginfo) {
         let [dispname,type,lev]=coginfo;
         if (dispname=="") {dispname=cog}
         lev=`${lev}-${Number(lev)+4}`;
         return `Invasion ${dispname} ${lookup.cog.decode[type]} L${lev}`;
      }
      else {return `Cogtype ${cog} not found`}
   }
   
   function neighborhood(street) {
      if (tc.includes(street)) {return 'Ttown Cntrl'} 
      else if (dk.includes(street)) {return "D. Dock"} 
      else if (dg.includes(street)) {return "D. Garden"} 
      else if (mm.includes(street)) {return "M. Melodyland"} 
      else if (br.includes(street)) {return "The Brrrgh"} 
      else if (dd.includes(street)) {return "D. Dreamland"} 
      else if (cd.includes(street)) {return "Chip 'n Dale's"} 
      else {return 0}
   } 
}

THQPlus();
