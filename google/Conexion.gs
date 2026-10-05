// Crear desde Extensiones > Apps Script en la NUEVA hoja de invitaciones físicas.
// Ejecuta configurar una sola vez antes de implementar como aplicación web.
function configurar(){
 const sheet=SpreadsheetApp.getActiveSpreadsheet();
 const props=PropertiesService.getScriptProperties();
 props.setProperty('SHEET_ID',sheet.getId());
 if(!props.getProperty('RSVP_KEY'))props.setProperty('RSVP_KEY',Utilities.getUuid()+Utilities.getUuid());
 const tab=sheet.getSheets()[0];props.setProperty('TAB_ID',String(tab.getSheetId()));
 if(tab.getLastRow()===0)tab.appendRow(['Fecha de respuesta','ID de invitación','Invitado o familia','¿Asistirá?','Personas confirmadas','Nombres de los invitados','Restricciones alimentarias','Contacto']);
}
function doPost(e){const lock=LockService.getScriptLock();let locked=false;try{
 const props=PropertiesService.getScriptProperties();const d=JSON.parse(e.postData.contents);
 if(!props.getProperty('RSVP_KEY')||d.key!==props.getProperty('RSVP_KEY'))return json({ok:false});
 if(!/^[a-zA-Z0-9_-]{8,100}$/.test(d.id)||typeof d.name!=='string'||!d.name.trim()||d.name.length>120||!Number.isInteger(d.capacity)||d.capacity<1||d.capacity>100||!Number.isInteger(d.count)||d.count<0||d.count>d.capacity||!['Sí','No'].includes(d.attending)||(d.attending==='No'&&d.count!==0)||(d.attending==='Sí'&&d.count<1))return json({ok:false});
 for(const pair of [['guests',1000],['dietary',500],['contact',160]])if(typeof d[pair[0]]!=='string'||d[pair[0]].length>pair[1])return json({ok:false});
 locked=lock.tryLock(20000);if(!locked)return json({ok:false});
 const tab=SpreadsheetApp.openById(props.getProperty('SHEET_ID')).getSheets().find(s=>String(s.getSheetId())===props.getProperty('TAB_ID'));if(!tab)return json({ok:false});
 const last=tab.getLastRow();const ids=last>1?tab.getRange(2,2,last-1,1).getValues().map(r=>r[0]):[];const i=ids.indexOf(d.id);const row=[new Date(),d.id,safe(d.name),d.attending,d.count,safe(d.guests),safe(d.dietary),safe(d.contact)];
 tab.getRange(i>=0?i+2:last+1,1,1,8).setValues([row]);SpreadsheetApp.flush();return json({ok:true});
 }catch{return json({ok:false});}finally{if(locked)lock.releaseLock();}}
function safe(s){return /^[=+@\-\t\r]/.test(s)?"'"+s:s;}
function json(data){return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);}
