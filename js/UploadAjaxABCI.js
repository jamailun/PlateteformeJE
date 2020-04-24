/* !UploadAjaxABCI Version 6.5 "use strict";*/var UploadAjaxABCI=function(i,e,t){this.id_form=i,this.upload_serveur=e,this.content_result_tag=t&&""!=$.trim(t)?t:"",this.iteration_form=0,this.config={},this.info={},this.info.status={},this.info.recoveryBackupConfirm={},this.config.ajaxTimeOut=500,this.config.filesExtensions=['png','jpeg','jpg','doc','docx','pdf'],this.config.filesExtensionsInput=['png'],this.config.fileSizeMax=null,this.config.customFileSelect=null,this.config.customDragAndDrop=!0,this.config.cssSubmitOn=null,this.config.cssFileSelectOn=null,this.config.imgPreviewStartAuto=!0,this.config.imgPreviewMaxSize=null,this.config.imgPreviewMaxSizeCancelAll=!1,this.config.imgPreviewMaxSizeTotal=null,this.config.imgPreviewMaxWidth=90,this.config.imgPreviewMaxHeight=60,this.config.infosRefresh=1,this.config.remainingTimeCompute=10,this.config.remainingTimeDisplayAfter=30,this.config.recoveryBackupConfirm=!1,this.config.submitWithoutFile=!0,this.config.submitWithoutFileFuncFormEnd=!1,this.config.queryFormEnd=!1,this.config.BackupFormDependency=!0,this.config.cookiePath="/",this.config.fragmentSize=4194304,this.config.browserOutdeted="Navigateur obsolète incompatible",this.config.serverFatalErrorDisplay=!0,this.config.uniqidForm=this.SHA1(this.Uniqid("UploadAjaxABCI",!0)),this.info.status.ok="Téléchargement ok",this.info.status.inProgress="Téléchargement en cours",this.info.status.stop="Arrêt",this.info.status.errorSize="Dépassement de la taille maximale autorisée.",this.info.status.errorExtension="Extension non valide.",this.info.status.errorServer="Echec du téléchargement. ",this.info.remainingTimeComputeWaiting="calcul en cours",this.info.unitsSpacing="&nbsp;",this.info.recoveryBackupConfirm.name="Récupération du fichier : ",this.info.recoveryBackupConfirm.size="\nSauvegarde en cours : ",this.info.recoveryBackupConfirm.message='\n\nCliquez sur "OK" pour compléter ce fichier ou sur "Annuler" pour réinitialiser le téléchargement.',this.info.queryEndErrorServer="Echec dans la finalisation du traitement serveur. ",this.func_SubmitForm,this.func_ImgPreviewStartAll,this.config.func_ImgPreviewLoadEach=null,this.config.func_FileSelectAllBefore=null,this.config.func_FileSelectEach=null,this.config.func_FileSelectAll=null,this.config.func_onFormSubmit=null,this.config.func_FormSubmit=null,this.config.func_FileInProgressEach=null,this.config.func_FileEndEach=null,this.config.func_FormEnd=null,this.config.func_BrowserOutdeted=null,this.params=$(["status","name","size","imgPreview","progressionG","progressionT","backup","percentage","duration","remainingTime","stop","inputFileName"]),this.formulaire=$(),this.content_result=$(),this.tab_fichiers=[],this.tab_fichiers_change=[],this.data_files=$(),this.custom_select_file=$(),this.data_nofile=$(),this.bouton_submit=$(),this.css_envoi_select_ini={},this.obj_ini={},this.obj_ini.html={},this.obj_ini.es={},this.count_files=0,this.infos_serveur=$(),this.stopAll=$(),this.requete=!0,this.win_url=window.URL||window.webkitURL,this.data_drop,this.stop_drop=!1,this.retour_infos_server,this.retour_mixte_server,this.query_end=!1,this.paramServer=function(i){var e={};return e.id_form=this.id_form,e.uniqid_form=this.config.uniqidForm,e.iteration_form=++this.iteration_form,i&&(e.input_name=i.fichier.upabciInputName,e.cook_name=i.cook_name,e.name=i.fichier.name,e.size=i.fichier.size,e.type=i.fichier.type,e.lastModified=i.fichier.lastModified,e.qte_save=i.qte_save,e.qte_upload=i.qte_upload,e.result=i.result,e.time_start=i.time_start,e.time_end=i.time_end,e.iteration=i.iteration),$.param(e,!1)},this.GetCssData=function(i){var e={},t=[];return $.each(i.split(";"),function(i,n){t=n.split(":"),2==t.length&&(e[t[0]]=t[1])}),e},this.GetCssIni=function(i,e){var t={};return"object"==typeof i?($.each(i,function(i){t[i]=void 0!=e.css(i)?e.css(i):"default"}),t):!1},this.GetTime=function(){var i=new Date;return i.getTime()},this.FormateTime=function(i,e,t){var n={};n.h=Math.floor(i/3600);var o=i%3600;n.m=Math.floor(o/60),0==n.h&&(n.s=Math.floor(o%60));var s="";return $.each(n,function(i,e){e>0&&(s+=e+t+i+t)}),s=""!=s?s.substring(0,s.length-t.length):e},this.FormateBits=function(i,e){for(var t=["","K","M","G","T","P","E","Z","Y"],n=0;i>=1024;)i/=1024,n++;i="M"==t[n]||"K"==t[n]||""==t[n]?Math.round(10*i)/10:Math.round(1e3*i)/1e3;var o=""==t[n]?"octets":"o";return i+""+e+t[n]+o},this.ReturnOctets=function(i){var e=String(i);e=e.replace(/,/,"."),e=e.replace(/\s/g,""),e=e.replace(/[oO]/,"");var t=e.substr(e.length-1,1).toLowerCase();switch(e=parseFloat(e),t){case"t":e*=1024;case"g":e*=1024;case"m":e*=1024;case"k":e*=1024}return Math.ceil(e)},this.AfficheErreur=function(i){var e="";return $.each(i,function(i,t){switch(t){case"taille":e+=n.info.status.errorSize;break;case"extension":e+=n.info.status.errorExtension;break;case"preview":e+=n.info.status.erreur_preview}}),e},this.Pourcentage=function(i,e,t){return void 0!=e&&e>0?Math.round(i/e*100)+""+t+"%":"0"+t+"%"},this.FormatIni=function(i,e){var t=i.html(),n=$.trim(t).split(" "),o=parseInt(n[0]),s=n.length,r=s>1?" ":"";n=s>1?[]:$.trim(t).split("&nbsp;"),r=n.length>1?"&nbsp;":r,r=isNaN(o)?this.info.unitsSpacing:r,this.obj_ini.html[e]=t,this.obj_ini.es[e]=r},this.QteSauvegarde=function(i){var e=this.docCookies.getItem(i),t=null!=e?decodeURIComponent(e).split("|"):null;return null!=t&&void 0!=t[1]?parseInt(t[1]):0},this.StopDrop=function(i){var i=void 0!=i&&$(i).length>0?$(i):$(document);i.on("drop dragover",function(i){i.preventDefault()})};var n=this;this.ImgPrevisualisation=function(i){var e=document.createElement("img");e.src=this.win_url.createObjectURL(i.fichier),e.onload=function(){n.win_url.revokeObjectURL(this.src);var t,o,s,r=e.width,a=e.height;if(i.img_width=r,i.img_height=a,0!=n.config.imgPreviewMaxWidth&&0!=n.config.imgPreviewMaxHeight){var c=r/n.config.imgPreviewMaxWidth,f=a/n.config.imgPreviewMaxHeight,u=Math.max(c,f);t=r/u,o=a/u,s=r>t||a>o}else 0==n.config.imgPreviewMaxWidth&&0!=n.config.imgPreviewMaxHeight?(o=n.config.imgPreviewMaxHeight,t=o*(r/a),s=a>n.config.imgPreviewMaxHeight):0!=n.config.imgPreviewMaxWidth&&0==n.config.imgPreviewMaxHeight&&(t=n.config.imgPreviewMaxWidth,o=t*(a/r),s=r>n.config.imgPreviewMaxWidth);s&&(r=t,a=o),$(e).attr({width:r,height:a}),i.obj.imgPreview.append(e),"function"==typeof n.config.func_ImgPreviewLoadEach&&n.config.func_ImgPreviewLoadEach(e,i)}},this.func_ImgPreviewStartAll=function(){0==n.config.imgPreviewStartAuto&&$.each(n.tab_fichiers_change,function(i,e){1==e.img_prev_delayed&&n.ImgPrevisualisation(e)})},this.attrData=function(i,e){var t=i.attr("configuration-upabcicss-"+e);void 0!=t&&i.css(this.GetCssData(t))},this.SetCssData=function(i,e){this.attrData(this.content_result,e),this.attrData(this.infos_serveur,e),this.attrData(i,e),i.find("*").each(function(){n.attrData($(this),e)})},this.SetCssDataAll=function(i){this.attrData(this.content_result,i),this.attrData(this.infos_serveur,i),this.attrData(this.formulaire,i),this.formulaire.find("*").each(function(){n.attrData($(this),i)}),this.CR_not_include&&this.content_result.find("*").each(function(){n.attrData($(this),i)})},this.ArretFormate=function(i){void 0!=n.tab_fichiers_change[i.data.index]?n.tab_fichiers_change[i.data.index].stop=1:void 0!=n.tab_fichiers[i.data.index]&&(n.tab_fichiers[i.data.index].stop=1),i.data.qte_save>0?(n.SetCssData(i.data.infos_html,"backup"),n.SetCssData(i.data.infos_html,"result"),n.SetCssData(i.data.infos_html,"result-stop"),n.SetCssData(i.data.infos_html,"result-partial")):(n.SetCssData(i.data.infos_html,"result"),n.SetCssData(i.data.infos_html,"result-stop")),void 0!=i.data.status&&i.data.status.html(n.info.status.stop)},this.ArreterToutAvantEnvoi=function(){n.stopAll&&n.tab_fichiers_change.length>0&&n.stopAll.off("click").one("click",function(){$.each(n.tab_fichiers_change,function(i,e){e.obj.stop&&e.obj.stop.off("click"),e.stop_all=1;var t={};t.data={},t.data.infos_html=e.infos_html,t.data.status=e.obj.status,t.data.index=i,t.data.qte_save=n.QteSauvegarde(e.cook_name),n.ArretFormate(t)})})}};UploadAjaxABCI.prototype.Start=function(){function i(i){i.stopPropagation(),i.preventDefault()}function e(){f.custom_select_file.length>0&&(1==f.config.customDragAndDrop&&f.StopDrop(),f.custom_select_file.each(function(e){$(this).off("click drop"),void 0!=f.data_files.eq(e)&&(1==f.config.customDragAndDrop&&$(this).on({drop:function(t){i(t);var n=t.originalEvent.dataTransfer.files;return n&&0!=n.length?void(0==f.stop_drop&&(f.data_drop=n,f.data_files.eq(e).change())):!1},dragover:function(e){i(e)}}),$(this).on("click",function(t){i(t),f.data_drop=void 0,f.data_files.eq(e).click()}))}))}function t(e){var t=this.name;"function"==typeof f.config.func_FileSelectAllBefore&&f.config.func_FileSelectAllBefore(e,f.tab_fichiers_change);var n=e.data.index;i(e);var o=$(),s=document.createElement("div");f.content_result.length>0&&(f.content_result.empty().append(_),f.stopAll=f.content_result.find(".UpAbci_stopAll"),o=f.content_result.find(".UpAbci_infosFile"),o.wrap(s),s=o.parent()),f.stopAll=f.stopAll.length>0?f.stopAll:f.formulaire.find(".UpAbci_stopAll"),s.empty(),b[n]=[];var r=!1;g[n]=0;var a=void 0!=f.data_drop?f.data_drop:this.files;$(a).each(function(i,e){e.upabciTypeImage=0,e.upabciErrorPreview=0,e.upabciErrorSize=0,e.upabciErrorExtension=0,e.upabciErrorUser=0,e.upabciInputName=t,e.type.match("image.*")&&(e.upabciTypeImage=1,null!=f.config.imgPreviewMaxSize&&e.size>parseInt(f.config.imgPreviewMaxSize)?(e.upabciErrorPreview=1,1==f.config.imgPreviewMaxSizeCancelAll&&(r=!0)):g[n]+=e.size),null!=f.config.fileSizeMax&&e.size>f.config.fileSizeMax&&(e.upabciErrorSize=1,e.upabciErrorUser++);var o=e.name.substr(e.name.lastIndexOf(".")+1).toLowerCase();if(f.config.filesExtensions.length>0&&-1==$.inArray(o,f.config.filesExtensions)&&(e.upabciErrorExtension=1,e.upabciErrorUser++),Array.isArray(f.config.filesExtensionsInput[t])&&f.config.filesExtensionsInput[t].length>0){var s=$.map(f.config.filesExtensionsInput[t],function(i){return i.toLowerCase()});-1==$.inArray(o,s)&&(e.upabciErrorExtension=1,-1==$.inArray(o,f.config.filesExtensions)&&e.upabciErrorUser++)}b[n].push(e)});var c=0;$.each(g,function(i,e){i!=n&&(c+=e)}),c+=g[n];var u,l=[];$.each(f.tab_fichiers_change,function(i,e){u=e.fichier.upabciInputName,u!=t&&(l[u]=Array.isArray(l[u])?l[u]:[],l[u].push(e))}),f.tab_fichiers_change=[];var h=0,m={};return $.each(b,function(i,t){t&&$.each(t,function(i,t){var n,a={},u=$(),p=$(),_=$(),d=0,g=-1,b=0,v=[],S=1==f.config.BackupFormDependency?f.id_form+""+t.upabciInputName:"",j=f.SHA1(S.toString()+t.name.toString()+t.size.toString()),C=f.QteSauvegarde(j);Array.isArray(l[t.upabciInputName])&&$.each(l[t.upabciInputName],function(i,e){j==e.cook_name&&(d=e.stop)}),o.length>0&&(p=o.clone(!0),f.params.each(function(i,e){if(_=p.find(".UpAbci_"+e),_.length>0){switch(e){case"status":u=p.find(".UpAbci_status");break;case"name":_.html(t.name);break;case"size":f.FormatIni(_,e),_.html(f.FormateBits(t.size,f.obj_ini.es[e]));break;case"imgPreview":1==t.upabciTypeImage&&(r||void 0==f.win_url||(null==f.config.imgPreviewMaxSizeTotal||c<=f.config.imgPreviewMaxSizeTotal?0==t.upabciErrorPreview?(f.SetCssData(p,"image-preview"),0==f.config.imgPreviewStartAuto?g=1:(g=0,b=1)):f.SetCssData(p,"error-img-prev"):f.SetCssDataAll("error-img-prev-total")));break;case"progressionG":_.get(0).value=C,_.get(0).max=t.size;break;case"progressionT":f.FormatIni(_,e),C>0&&_.html(f.FormateBits(C,f.obj_ini.es.progressionT));break;case"backup":f.FormatIni(_,e),C>0&&_.html(f.FormateBits(C,f.obj_ini.es.backup));break;case"percentage":f.FormatIni(_,e),_.html(f.Pourcentage(C,t.size,f.obj_ini.es.percentage));break;case"duration":f.FormatIni(_,e);break;case"remainingTime":f.FormatIni(_,e);break;case"stop":0==t.upabciErrorUser&&$(_).one("click",{infos_html:p,status:u,index:h,qte_save:C},f.ArretFormate),1==d&&$(_).click();break;case"inputFileName":_.html(t.upabciInputName)}a[e]=_}}),t.upabciErrorUser>0&&(f.SetCssData(p,"error-user"),f.SetCssData(p,"result"),f.SetCssData(p,"result-error"),u.length>0&&(1==t.upabciErrorExtension&&v.push("extension"),1==t.upabciErrorSize&&v.push("taille"),n=f.AfficheErreur(v),u.html(n))),C>0&&f.SetCssData(p,"backup")),s.append(p),h++,m={fichier:t,obj:a,infos_html:p,cook_name:j,qte_save:C,qte_save_ini:C,qte_upload:0,time_start:0,time_end:0,result:"0_0",stop:d,stop_all:0,iteration:0,img_prev_delayed:g,img_width:0,img_height:0},1==b&&f.ImgPrevisualisation(m),f.tab_fichiers_change.push(m),"function"==typeof f.config.func_FileSelectEach&&f.config.func_FileSelectEach(e,m)})}),o.length>0&&f.content_result.find(".UpAbci_infosFile").unwrap(),f.ArreterToutAvantEnvoi(),f.tab_fichiers_change.length>0&&(f.SetCssDataAll("select-file"),"function"==typeof f.config.func_FileSelectAll&&f.config.func_FileSelectAll(e,f.tab_fichiers_change)),!1}function n(){f.data_files.each(function(i){$(this).on("change",{index:i},t)}),e()}function o(){var i;f.data_files.each(function(){i=document.createElement("div"),$(this).wrap(i),i=$(this).parent(),d.push(i.html()),$(this).unwrap()})}function s(i,e){var t;f.data_files.each(function(i){t=document.createElement("div"),$(this).wrap(t),t=$(this).parent(),$(this).remove(),t.append($(d[i])),t.find('input[type="file"]').unwrap()}),f.data_files=f.formulaire.find('input[type="file"]'),i&&(f.data_files.each(function(){m&&0==f.custom_select_file.length&&$(this).css(h),$(this).prop("disabled",!0).val("")}),"function"==typeof f.config.func_FormSubmit&&f.config.func_FormSubmit(e,f.tab_fichiers)),n()}function r(i){f.stop_drop=!0,f.requete=!0,f.iteration_form=0,b=[],g={},f.tab_fichiers=f.tab_fichiers_change,f.tab_fichiers_change=[],f.count_files=0,0==f.tab_fichiers.length&&_&&f.content_result.empty().append(_),f.infos_serveur=f.formulaire.find(".UpAbci_infosServer"),f.infos_serveur=f.infos_serveur.length>0?f.infos_serveur:f.content_result.find(".UpAbci_infosServer"),f.bouton_submit=f.formulaire.find('input[type="submit"]'),f.data_nofile=f.formulaire.serializeArray(),$.each(f.tab_fichiers,function(i,e){0==e.stop&&0==e.fichier.upabciErrorUser&&f.count_files++}),f.SetCssDataAll("submit"),f.count_files>0||f.config.submitWithoutFile?(f.count_files>0&&f.SetCssDataAll("submit-file"),f.data_files.each(function(){m&&0==f.custom_select_file.length&&(f.css_envoi_select_ini.data_files=f.GetCssIni(h,$(this)))}),f.custom_select_file.each(function(){m&&f.custom_select_file.length>0&&(f.css_envoi_select_ini.custom_select_file=f.GetCssIni(h,$(this)),$(this).css(h)),$(this).prop("disabled",!0)}),f.bouton_submit.each(function(){Object.keys(p).length&&(f.css_envoi_select_ini.bouton_submit=f.GetCssIni(p,$(this)),$(this).css(p)),$(this).prop("disabled",!0)}),s(!0,i),f.Upload()):(s(!1),f.data_files.prop("disabled",!1).val(""),f.SetCssDataAll("form-end"),0==f.config.submitWithoutFile&&1==f.config.submitWithoutFileFuncFormEnd&&"function"==typeof f.config.func_FormEnd&&f.config.func_FormEnd(f.tab_fichiers))}if(this.formulaire=$(this.id_form),0==this.formulaire.length)return alert("Configuration UploadAjaxABCI : identifiant de formulaire non valide"),!1;if(""!=this.content_result_tag&&0==$(this.content_result_tag).length)return alert("UploadAjaxABCI : identifiant de renvoi des résultats non valide"),!1;if(void 0===window.FormData){var a=this.config.browserOutdeted,c=$(this.config.customFileSelect);return""!=$.trim(a)&&(this.formulaire.find('input[type="file"]').on("change",function(){return alert(a),!1}),this.formulaire.find('input[type="submit"]').on("click",function(){return alert(a),!1}),this.formulaire.find(c).on("click",function(){return alert(a),!1})),"function"==typeof this.config.func_BrowserOutdeted&&this.config.func_BrowserOutdeted(),!1}var f=this;this.data_files=this.formulaire.find('input[type="file"]'),this.custom_select_file=""!=$.trim(this.config.customFileSelect)?this.formulaire.find(this.config.customFileSelect):$(),this.content_result=$(this.content_result_tag),this.CR_not_include=!(this.formulaire.find(this.content_result).length>0);var u=this.formulaire.find('input[name="UpAbci_uniqidForm"]');u=u.length>0?u.val():"",this.config.uniqidForm=""!=$.trim(u)?u:this.config.uniqidForm;var l=this.formulaire.find('input[name="UpAbci_fragmentSize"]');if(l=l.length>0?parseInt(l.val()):void 0,l=isNaN(l)||1048576>l?this.config.fragmentSize:l,this.config.fragmentSize=l-10240,"object"==typeof this.id_form&&(this.id_form=void 0!=this.id_form.attr("id")?this.id_form.attr("id"):this.id_form.attr("class")),this.id_form="string"==typeof this.id_form?this.id_form:"",1==this.config.BackupFormDependency&&""==this.id_form)return alert("Le formulaire ne comporte pas d'id ni de classe permettant de l'identifier.\n\nCette configuration n'est pas compatible avec l'option 'config.BackupFormDependency' qui vaut actuellement true.\n\nAjoutez une classe ou un id au formulaire ou ajoutez une option de configuration pour définir config.BackupFormDependency = false.\n\nL'upload ne sera pas fonctionnel tant que le problème ne sera pas résolu."),!1;this.config.imgPreviewMaxSize=""!=$.trim(this.config.imgPreviewMaxSize)?1048576*parseInt(this.config.imgPreviewMaxSize):null,this.config.imgPreviewMaxSizeTotal=""!=$.trim(this.config.imgPreviewMaxSizeTotal)?1048576*parseInt(this.config.imgPreviewMaxSizeTotal):null,this.config.fileSizeMax=""!=$.trim(this.config.fileSizeMax)?this.ReturnOctets(this.config.fileSizeMax):null,this.config.filesExtensions=Array.isArray(this.config.filesExtensions)?$.map(this.config.filesExtensions,function(i){return i.toLowerCase()}):[];var h=""!=$.trim(this.config.cssFileSelectOn)?this.GetCssData(this.config.cssFileSelectOn):{},m=Object.keys(h).length,p=""!=$.trim(this.config.cssSubmitOn)?this.GetCssData(this.config.cssSubmitOn):{},_=$(),d=[],g={},b=[];this.content_result.length>0&&(_=this.content_result.html()),o(),n(),this.formulaire.on("submit",function(e){i(e),"function"==typeof f.config.func_onFormSubmit?(f.func_SubmitForm=function(i){r(i)},f.config.func_onFormSubmit(e,f.tab_fichiers_change)):r(e)})},UploadAjaxABCI.prototype.Upload=function(i,e,t){function n(){var i=(A.GetTime()-d.time_start-(d.iteration-1)*A.config.ajaxTimeOut)/1e3,e=(d.qte_upload-d.qte_save_ini)/i;return b-d.qte_upload-e>0}function o(i){A.stopAll&&d&&1!=d.stop_all&&A.stopAll.off("click").one("click",function(){$.each(A.tab_fichiers,function(i,e){if(e.obj.stop&&e.obj.stop.off("click"),e.stop_all=1,i>=_){var t={};t.data={},t.data.infos_html=e.infos_html,t.data.status=e.obj.status,t.data.index=i,t.data.qte_save=A.QteSauvegarde(e.cook_name),A.ArretFormate(t)}}),n()&&i.abort()})}function s(i){if(d){var e=d.obj.status?d.obj.status:$(),t=A.QteSauvegarde(S);1==d.stop?(h(t,"now"),d.obj.remainingTime&&d.obj.remainingTime.html(A.obj_ini.html.remainingTime),m(t),d.infos_html&&(t>0&&A.SetCssData(d.infos_html,"backup"),A.SetCssData(d.infos_html,"result"),A.SetCssData(d.infos_html,"result-stop"),t>0&&A.SetCssData(d.infos_html,"result-partial")),d.obj.status&&d.obj.status.html(A.info.status.stop),d.obj.stop&&d.obj.stop.off("click"),i.abort()):d.obj.stop&&d.obj.stop.off("click").one("click",function(){if(d.stop=1,n()){var o={};o.data={},o.data.infos_html=d.infos_html,o.data.status=e,o.data.index=_,o.data.qte_save=t,A.ArretFormate(o),i.abort()}})}}function r(i){var e=void 0!=i?i:v;d.obj.backup.html(A.FormateBits(e,A.obj_ini.es.backup))}function a(i){d.obj.percentage.html(A.Pourcentage(i,d.fichier.size,A.obj_ini.es.percentage))}function c(i){d.obj.progressionT.html(A.FormateBits(i,A.obj_ini.es.progressionT))}function f(i){d.obj.duration.html(A.FormateTime(i,A.obj_ini.html.duration,A.obj_ini.es.duration))}function u(i,e){var t=A.FormateTime(e,A.obj_ini.html.remainingTime,A.obj_ini.es.remainingTime);t=i>A.config.remainingTimeCompute?t:A.info.remainingTimeComputeWaiting,d.obj.remainingTime.html(t)}function l(i,e){var t=(i-d.qte_save_ini)/e;return t>0?(d.fichier.size-i)/t:0}function h(i,e){var t,n=A.GetTime(),o=(n-d.time_start)/1e3,s=n/1e3;0==j&&(t=l(i,o),t>A.config.remainingTimeDisplayAfter&&d.infos_html&&(A.SetCssData(d.infos_html,"remaining-time-after"),j=1)),0==C&&o>A.config.remainingTimeCompute&&(A.SetCssData(d.infos_html,"remaning-time-compute"),C=1),(s-d.time_end>A.config.infosRefresh||void 0!=e)&&(d.time_end=s,d.obj.backup&&(void 0!=e?r(i):r()),d.obj.percentage&&a(i),d.obj.progressionT&&c(i),d.obj.duration&&d.time_start>0&&f(o),d.obj.remainingTime&&d.time_start>0&&(t=void 0!=t?t:l(i,o),u(o,t)),"function"==typeof A.config.func_FileInProgressEach&&A.config.func_FileInProgressEach(d))}function m(i){d.obj.progressionG&&(d.obj.progressionG.get(0).value=i,d.obj.progressionG.get(0).max=d.fichier.size)}function p(i){var e=i.loaded,t=e+g;d&&(d.qte_upload=t,m(t),h(t))}var _=void 0!=i?i:0,d=this.tab_fichiers[_],g=void 0!=e?e:0,b=void 0!=t?t:this.config.fragmentSize,v=0,S=null,j=0,C=0,A=this;if(void 0==d){if(!(0==this.count_files&&this.config.submitWithoutFile||1==this.config.queryFormEnd&&this.count_files>0)||!this.requete){if(A.stop_drop=!1,this.count_files>0){this.SetCssDataAll("upload-end");var k=!1,x=this;$.each(this.tab_fichiers,function(i,e){x.docCookies.hasItem(e.cook_name)&&(k=!0)}),k&&this.SetCssDataAll("backup-end")}return this.data_files.each(function(){$(this).prop("disabled",!1),void 0!=A.css_envoi_select_ini.data_files&&$(this).css(A.css_envoi_select_ini.data_files)}),this.bouton_submit.each(function(){$(this).prop("disabled",!1),void 0!=A.css_envoi_select_ini.bouton_submit&&$(this).css(A.css_envoi_select_ini.bouton_submit)}),this.custom_select_file.each(function(){$(this).prop("disabled",!1),void 0!=A.css_envoi_select_ini.custom_select_file&&$(this).css(A.css_envoi_select_ini.custom_select_file)}),this.SetCssDataAll("form-end"),"function"==typeof this.config.func_FormEnd&&this.config.func_FormEnd(this.tab_fichiers,this.retour_infos_server,this.retour_mixte_server),!1}this.requete=!1}else{if(0==g&&(1==d.stop||d.fichier.upabciErrorUser>0))return d.obj.stop&&d.obj.stop.off("click"),this.Upload(++_),!1;d.iteration++,S=d.cook_name,0==g&&0==d.stop?(d.infos_html&&this.SetCssData(d.infos_html,"in-progress"),d.obj.status&&d.obj.status.html(this.info.status.inProgress),v=d.qte_save_ini,v>0&&(!this.config.recoveryBackupConfirm||confirm(this.info.recoveryBackupConfirm.name+""+d.fichier.name+this.info.recoveryBackupConfirm.size+this.FormateBits(v,this.obj_ini.es.backup)+this.info.recoveryBackupConfirm.message)?(g=v,b=g+this.config.fragmentSize):(v=0,d.qte_save=0,d.qte_save_ini=0,this.docCookies.removeItem(S,this.config.cookiePath))),d.time_end=0,d.time_start=this.GetTime()):v=this.QteSauvegarde(S),d.qte_save=v,d.infos_html&&v>0&&this.SetCssData(d.infos_html,"backup"),b=b>d.fichier.size?d.fichier.size:b;var F,w=d.fichier.size>this.config.fragmentSize?1:0;F=v>0&&v==g&&g==b?1:1==w?d.fichier.slice(g,b):d.fichier;var E=b==d.fichier.size?1:0}var y=new FormData;if(this.data_nofile.length>0&&$.each(this.data_nofile,function(i,e){"UpAbci_uniqidForm"!=e.name&&y.append(e.name,e.value)}),d)y.append("UpAbci_form",A.paramServer(d)),y.append("UpAbci_blobSlice",w),y.append("UpAbci_fileEnd",E),void 0!=d.join_file&&y.append("UpAbci_joinFile",d.join_file),y.append("UpAbci_fragment",F);else if(1==this.config.queryFormEnd)if(this.query_end=!0,this.tab_fichiers.length>0){$.each(this.tab_fichiers,function(i,e){y.append("UpAbci_formEnd["+i+"]",A.paramServer(e)),"undefined"!=typeof e.join_file&&y.append("UpAbci_joinFile["+i+"]",e.join_file)})}else y.append("UpAbci_formEnd[0]",A.paramServer());else y.append("UpAbci_form",A.paramServer());return $.ajax({url:this.upload_serveur,type:"POST",data:y,xhr:function(){var i=$.ajaxSettings.xhr();return i.upload&&i.upload.addEventListener("progress",p,!1),i},processData:!1,contentType:!1,dataType:"json",beforeSend:function(i){o(i),s(i)}}).done(function(i){var e=void 0!=i.upabci_resultat?i.upabci_resultat:null,t=void 0!=i.upabci_erreur?i.upabci_erreur:"",n=void 0!=i.upabci_ok?i.upabci_ok:"";if(void 0!=i.upabci_infos_server?(A.SetCssDataAll("infos-server"),A.infos_serveur.length>0&&A.infos_serveur.html(i.upabci_infos_server),A.retour_infos_server=i.upabci_infos_server):A.retour_infos_server=void 0,void 0!=i.upabci_mixte_server?A.retour_mixte_server=i.upabci_mixte_server:A.retour_mixte_server=void 0,"continu"==e&&void 0==i.upabci_stop_form)g=b,b+=A.config.fragmentSize,setTimeout(function(){A.Upload(_,g,b)},A.config.ajaxTimeOut);else{if(d){if(d.obj.stop&&d.obj.stop.off("click"),d.obj.progressionT&&d.obj.progressionT.html(A.obj_ini.html.progressionT),d.obj.remainingTime&&d.obj.remainingTime.html(A.obj_ini.html.remainingTime),"upload_ok"==e)d.result="ok_done",d.qte_save=0,d.qte_upload=d.fichier.size,d.infos_html&&(A.SetCssData(d.infos_html,"result"),A.SetCssData(d.infos_html,"result-ok")),d.obj.progressionG&&m(d.fichier.size),d.obj.percentage&&a(d.fichier.size),d.obj.status&&d.obj.status.html(A.info.status.ok+""+n),d.obj.backup&&d.obj.backup.html(A.obj_ini.html.backup);else if(A.docCookies.hasItem(S)){var o=A.QteSauvegarde(S);d.result="backup_done",d.qte_save=o,d.infos_html&&(A.SetCssData(d.infos_html,"backup"),A.SetCssData(d.infos_html,"result"),A.SetCssData(d.infos_html,"result-partial"),A.SetCssData(d.infos_html,"result-error")),d.obj.status&&d.obj.status.html(A.info.status.errorServer+""+t),h(o,"now"),d.obj.remainingTime&&d.obj.remainingTime.html(A.obj_ini.html.remainingTime),m(o)}else d.result="error_done",d.qte_save=0,d.infos_html&&(A.SetCssData(d.infos_html,"result"),A.SetCssData(d.infos_html,"result-error")),d.obj.status&&d.obj.status.html(A.info.status.errorServer+""+t),d.obj.backup&&d.obj.backup.html(A.obj_ini.html.backup);"function"==typeof A.config.func_FileEndEach&&A.config.func_FileEndEach(d,A.retour_infos_server,A.retour_mixte_server)}void 0!=i.upabci_stop_form?(0==i.upabci_stop_form&&(A.requete=!1),A.Upload(A.tab_fichiers.length)):A.Upload(++_)}}).fail(function(i){var e=void 0!=i.responseText&&A.config.serverFatalErrorDisplay===!0?i.responseText:"";if(d){if(d.obj.stop&&d.obj.stop.off("click"),d.obj.progressionT&&d.obj.progressionT.html(A.obj_ini.html.progressionT),d.obj.remainingTime&&d.obj.remainingTime.html(A.obj_ini.html.remainingTime),A.docCookies.hasItem(S)){var t=A.QteSauvegarde(S);d.result="backup_fail",d.qte_save=t,d.infos_html&&1!=d.stop&&(A.SetCssData(d.infos_html,"backup"),A.SetCssData(d.infos_html,"result"),A.SetCssData(d.infos_html,"result-partial"),A.SetCssData(d.infos_html,"result-error")),d.obj.status&&1!=d.stop&&d.obj.status.html(A.info.status.errorServer+""+e),h(t,"now"),d.obj.remainingTime&&d.obj.remainingTime.html(A.obj_ini.html.remainingTime),m(t)}else d.result="error_fail",d.qte_save=0,d.infos_html&&1!=d.stop&&(A.SetCssData(d.infos_html,"result"),A.SetCssData(d.infos_html,"result-error")),d.obj.backup&&1!=d.stop&&d.obj.backup.html(A.obj_ini.html.backup),d.obj.status&&1!=d.stop&&d.obj.status.html(A.info.status.errorServer+""+e);"function"==typeof A.config.func_FileEndEach&&A.config.func_FileEndEach(d,A.retour_infos_server,A.retour_mixte_server)}else 1==A.query_end&&(A.retour_infos_server=A.info.queryEndErrorServer+""+e,A.SetCssDataAll("infos-server"),A.infos_serveur.length>0&&A.infos_serveur.html(A.info.queryEndErrorServer+""+e));A.Upload(++_)}),!1},UploadAjaxABCI.prototype.Uniqid=function(i,e){"undefined"==typeof i&&(i="");var t,n=function(i,e){return i=parseInt(i,10).toString(16),e<i.length?i.slice(i.length-e):e>i.length?Array(1+(e-i.length)).join("0")+i:i};return this.php_js||(this.php_js={}),this.php_js.uniqidSeed||(this.php_js.uniqidSeed=Math.floor(123456789*Math.random())),this.php_js.uniqidSeed++,t=i,t+=n(parseInt((new Date).getTime()/1e3,10),8),t+=n(this.php_js.uniqidSeed,5),e&&(t+=(10*Math.random()).toFixed(8).toString()),t},UploadAjaxABCI.prototype.SHA1=function(i){function e(i,e){var t=i<<e|i>>>32-e;return t}function t(i){var e,t,n="";for(e=7;e>=0;e--)t=i>>>4*e&15,n+=t.toString(16);return n}function n(i){i=i.replace(/\r\n/g,"\n");for(var e="",t=0;t<i.length;t++){var n=i.charCodeAt(t);128>n?e+=String.fromCharCode(n):n>127&&2048>n?(e+=String.fromCharCode(n>>6|192),e+=String.fromCharCode(63&n|128)):(e+=String.fromCharCode(n>>12|224),e+=String.fromCharCode(n>>6&63|128),e+=String.fromCharCode(63&n|128))}return e}var o,s,r,a,c,f,u,l,h,m=new Array(80),p=1732584193,_=4023233417,d=2562383102,g=271733878,b=3285377520;i=n(i);var v=i.length,S=new Array;for(s=0;v-3>s;s+=4)r=i.charCodeAt(s)<<24|i.charCodeAt(s+1)<<16|i.charCodeAt(s+2)<<8|i.charCodeAt(s+3),S.push(r);switch(v%4){case 0:s=2147483648;break;case 1:s=i.charCodeAt(v-1)<<24|8388608;break;case 2:s=i.charCodeAt(v-2)<<24|i.charCodeAt(v-1)<<16|32768;break;case 3:s=i.charCodeAt(v-3)<<24|i.charCodeAt(v-2)<<16|i.charCodeAt(v-1)<<8|128}for(S.push(s);S.length%16!=14;)S.push(0);for(S.push(v>>>29),S.push(v<<3&4294967295),o=0;o<S.length;o+=16){for(s=0;16>s;s++)m[s]=S[o+s];for(s=16;79>=s;s++)m[s]=e(m[s-3]^m[s-8]^m[s-14]^m[s-16],1);for(a=p,c=_,f=d,u=g,l=b,s=0;19>=s;s++)h=e(a,5)+(c&f|~c&u)+l+m[s]+1518500249&4294967295,l=u,u=f,f=e(c,30),c=a,a=h;for(s=20;39>=s;s++)h=e(a,5)+(c^f^u)+l+m[s]+1859775393&4294967295,l=u,u=f,f=e(c,30),c=a,a=h;for(s=40;59>=s;s++)h=e(a,5)+(c&f|c&u|f&u)+l+m[s]+2400959708&4294967295,l=u,u=f,f=e(c,30),c=a,a=h;for(s=60;79>=s;s++)h=e(a,5)+(c^f^u)+l+m[s]+3395469782&4294967295,l=u,u=f,f=e(c,30),c=a,a=h;p=p+a&4294967295,_=_+c&4294967295,d=d+f&4294967295,g=g+u&4294967295,b=b+l&4294967295}var h=t(p)+t(_)+t(d)+t(g)+t(b);return h.toLowerCase()},UploadAjaxABCI.prototype.docCookies={getItem:function(i){return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(i).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null},setItem:function(i,e,t,n,o,s){if(!i||/^(?:expires|max\-age|path|domain|secure)$/i.test(i))return!1;var r="";if(t)switch(t.constructor){case Number:r=t===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+t;break;case String:r="; expires="+t;break;case Date:r="; expires="+t.toUTCString()}return document.cookie=encodeURIComponent(i)+"="+encodeURIComponent(e)+r+(o?"; domain="+o:"")+(n?"; path="+n:"")+(s?"; secure":""),!0},removeItem:function(i,e,t){return i&&this.hasItem(i)?(document.cookie=encodeURIComponent(i)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(t?"; domain="+t:"")+(e?"; path="+e:""),!0):!1},hasItem:function(i){return new RegExp("(?:^|;\\s*)"+encodeURIComponent(i).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var i=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),e=0;e<i.length;e++)i[e]=decodeURIComponent(i[e]);return i}};