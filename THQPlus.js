async function THQPlus() {
   var inv;
   const tc = ['Loopy Lane','Punchline Place','Silly Street','Goofy Speedway'],
         dk = ['Barnacle Boulevard','Lighthouse Lane','Seaweed Street','Sellbot HQ'],
         dg = ['Elm Street','Maple Street','Oak Street'],
         mm = ['Alto Avenue','Baritone Boulevard','Tenor Terrace'],
         br = ['Polar Place','Sleet Street','Walrus Way','Lawbot HQ'],
         dd = ['Lullaby Lane','Pajama Place','Cashbot HQ'],
         cd = ['Bossbot HQ'];
   const bb = ['Flunky','Pencil Pusher','Yesman','Micro\x03manager','Downsizer','Head Hunter','Corporate Raider','The Big Cheese','Chief Executive Officer'],
         lb = ['Bottom Feeder','Bloodsucker','Double Talker','Ambulance Chaser','Back Stabber','Spin Doctor','Legal Eagle','Big Wig','Chief Justice'],
         cb = ['Short Change','Penny Pincher','Tightwad','Bean Counter','Number Cruncher','Money Bags','Loan Shark','Robber Baron','Chief Financial Officer'],
         sb = ['Cold Caller','Telemarketer','Name Dropper','Glad Hander','Mover & Shaker','Two-Face','The Mingler','Mr. Hollywood','Vice President'];

   updateTHQg(); setInterval(updateTHQg,5000);

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
         const street = g.childNodes[1]; streetv=street.innerText.split(" (")[0];
         const district = g.childNodes[2]; districtv=district.innerText.split("\n")[0];
         if (neighborhood(streetv)) {street.innerHTML=streetv+' <i>('+neighborhood(streetv)+')</i>'}
         if (inv[districtv]) {
            const [cogsKilled,cogsTotal] = inv[districtv].progress.split('/'); const cogsLeft=cogsTotal-cogsKilled;  
            district.innerHTML=districtv+'<br><b><i>Invasion: '+inv[districtv].type.replace("o\x03","o")+' ('+cogType(inv[districtv].type)+')</i></b>';
         }
      });
   }  

   function cogType(cog) {
      if (bb.includes(cog)) {return 'Bbot'} 
      else if (lb.includes(cog)) {return 'Lbot'} 
      else if (cb.includes(cog)) {return 'Cbot'} 
      else if (sb.includes(cog)) {return 'Sbot'} 
      else {return 'Unknown Cog Type'}
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
