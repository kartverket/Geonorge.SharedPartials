var kartKatalogenUrl={local:"//kartkatalog.dev.geonorge.no",test:"//kartkatalog.test.geonorge.no",prod:"//kartkatalog.geonorge.no"},geonorgeBaseUrl={local:"localhost:61381",test:"www.test.geonorge.no",prod:"www.geonorge.no"},searchOptions={local:{text:"Kartkatalogen",searchTitle:"Kartkatalogen",buttonCss:"edgesKartkatalogen",listCss:"left-edge-kartkatalogen",queryParameter:"?text=",localUrl:!1,autoComplete:!0,url:kartKatalogenUrl.local+"/search",api:kartKatalogenUrl.local+"/api/search",shoppingCartUrl:kartKatalogenUrl.local+"/nedlasting",loginUrl:kartKatalogenUrl.local+"/AuthServices/SignIn?ReturnUrl=http%3A%2F%2F"+geonorgeBaseUrl.local+"%2F",logoutUrl:kartKatalogenUrl.local+"/AuthServices/SignOut?ReturnUrl=http%3A%2F%2F"+geonorgeBaseUrl.local+"%2F",hosts:"localhost,geonorge.epidemo.no,geonorge.local,kartkatalog.dev.geonorge.no",epiBaseUrl:geonorgeBaseUrl.local,imageLogoPath:"/dist/images/geonorge_logo_350px_dev.svg"},test:{text:"Kartkatalogen",searchTitle:"Kartkatalogen",buttonCss:"edgesKartkatalogen",listCss:"left-edge-kartkatalogen",queryParameter:"?text=",localUrl:!1,autoComplete:!0,url:kartKatalogenUrl.test+"/search",api:kartKatalogenUrl.test+"/api/search",shoppingCartUrl:kartKatalogenUrl.test+"/nedlasting",loginUrl:kartKatalogenUrl.test+"/AuthServices/SignIn?ReturnUrl=http%3A%2F%2F"+geonorgeBaseUrl.test+"%2F",logoutUrl:kartKatalogenUrl.test+"/AuthServices/SignOut?ReturnUrl=http%3A%2F%2F"+geonorgeBaseUrl.test+"%2F",hosts:"test.geonorge.no,kartkatalog.test.geonorge.no,register.test.geonorge.no,objektkatalog.test.geonorge.no,editor.test.geonorge.no,produktark.test.geonorge.no,validering.test.geonorge.no,159.162.102.155,kartkatalog.dev.geonorge.no,register.dev.geonorge.no,objektkatalog.dev.geonorge.no,editor.dev.geonorge.no,produktark.dev.geonorge.no,validering.dev.geonorge.no,159.162.102.155,kartkatalog.dev.geonorge.no,register.dev.geonorge.no,objektkatalog.dev.geonorge.no,editor.dev.geonorge.no,produktark.dev.geonorge.no,validering.dev.geonorge.no,159.162.102.155",epiBaseUrl:"//"+geonorgeBaseUrl.test,imageLogoPath:"/dist/images/geonorge_logo_350px_test.svg"},prod:{text:"Kartkatalogen",searchTitle:"Kartkatalogen",buttonCss:"edgesKartkatalogen",listCss:"left-edge-kartkatalogen",queryParameter:"?text=",localUrl:!1,autoComplete:!0,url:kartKatalogenUrl.prod+"/search",api:kartKatalogenUrl.prod+"/api/search",shoppingCartUrl:kartKatalogenUrl.prod+"/nedlasting",loginUrl:kartKatalogenUrl.prod+"/AuthServices/SignIn?ReturnUrl=http%3A%2F%2F"+geonorgeBaseUrl.prod+"%2F",logoutUrl:kartKatalogenUrl.prod+"/AuthServices/SignOut?ReturnUrl=http%3A%2F%2F"+geonorgeBaseUrl.prod+"%2F",hosts:"geonorge.no,kartkatalog.geonorge.no,register.geonorge.no,objektkatalog.geonorge.no,editor.geonorge.no,produktark.geonorge.no,validering.geonorge.no,159.162.102.155",epiBaseUrl:"//"+geonorgeBaseUrl.prod,imageLogoPath:"/dist/images/geonorge_logo_350px.svg"}},searchOption=searchOptions.prod,applicationEnvironment=applicationEnvironment||"";if(""!==applicationEnvironment)var searchOption=searchOptions[applicationEnvironment];
angular.module("geonorge-header",["ui.bootstrap"]);
!function(){var e=angular.module("geonorge-header");e.controller("baseController",["$scope","$http",function(e,o){switch(e.langCode=Cookies.get("_culture"),e.localizedText={search:{en:"Search",no:"Søk"},menu:{en:"Menu",no:"Meny"},login:{en:"Login",no:"Logg inn"},logout:{en:"Log out",no:"Logg ut"}},e.langCode){case"en":e.cultureSwitchName="Norsk",e.cultureSwitchCode="no",cultureData&&(e.cultureSwitchUrl=cultureData.friendlyUrlNO);break;default:e.cultureSwitchName="English",e.cultureSwitchCode="en",cultureData&&(e.cultureSwitchUrl=cultureData.friendlyUrlEN)}e.switchCulture=function(e){document.cookie="_culture="+e+"; path=/;domain=.geonorge.no"},e.imageLogoPath="",void 0!==searchOption.imageLogoPath&&(e.imageLogoPath=searchOption.imageLogoPath),e.loggedIn=Cookies.get("_loggedIn")}])}();
!function(){var n=angular.module("geonorge-header");n.controller("menuTopController",["$scope","$http",function(n,e){function o(e){var o=e.data;n.menuItems=o}function r(){n.getMenuError=!0}n.trustSrc=function(n){return $sce.trustAsResourceUrl(n)},n.getMenuData=function(){var n="";void 0!==searchOption.epiBaseUrl&&(n=searchOption.epiBaseUrl);var t=n+"/api/menu?omitLinks=1",a=e({method:"GET",url:t,headers:{"Content-Type":"application/json; charset=utf-8",accept:"*/*"},data:{},crossDomain:!0});return a.then(o,r)},n.loginUrl="//kartkatalog.geonorge.no/login",void 0!==searchOption.loginUrl&&(n.loginUrl=searchOption.loginUrl)}])}();
!function(){var e=angular.module("geonorge-header");e.service("aggregatedService",["$http","$q",function(e,t){function a(e){u=e}function o(e){return t(function(t){void 0==u?t():u(e)})}function r(a,o,r,n){function l(e,t){var a="facets[1]name=type&facets[1]value="+e,o="text="+t;return"?limit=5&"+a+"&"+o}var u=encodeURI(searchOption.api+l("dataset",a)),c=e({method:"GET",url:u,headers:{"Content-Type":"application/json; charset=utf-8",accept:"*/*"},data:{}}),s=encodeURI(searchOption.api+l("servicelayer",a)),i=e({method:"GET",url:s,headers:{"Content-Type":"application/json; charset=utf-8",accept:"*/*"},data:{}}),p=encodeURI(searchOption.api+l("service",a)),d=e({method:"GET",url:p,headers:{"Content-Type":"application/json; charset=utf-8",accept:"*/*"},data:{}}),h=encodeURI(searchOption.api+l("dimensionGroup",a)),g=e({method:"GET",url:h,headers:{"Content-Type":"application/json; charset=utf-8",accept:"*/*"},data:{}});return t.all([g,c,d,i])}var n=document.getElementById("txtLang"),l="";n&&(l=n.value);var u=void 0;return{triggerSearch:o,executeMethod:a,performSearch:r}}]).controller("searchTopController",["$rootScope","$scope","$location","$window","$timeout","aggregatedService","$sce",function(e,t,a,o,r,n,l){function u(){var a=t.selectedSearch,r="";""!==e.searchQuery&&(r=a.queryParameter,r+=e.searchQuery);var n=a.url+r;o.location.href=n}function c(e){if(t.ajaxCallActive=!1,t.autoCompleteResult=[],e.d){var a=[];if(0===e.d.NumberOfHitsTotal)return void(t.autoCompleteResult=[]);a=e.d.Results;for(var o=0;o<a.length;o++){var r={},n=a[o];if(0!==n.data.Results.length){r.type=n.Section,r.title=n.SectionName,r.list=[];for(var l=0;l<n.data.Results.length;l++){var u=n.data.Results[l];r.title=s(u.Type),r.url=searchOption.url,r.list.push({externalId:n.SectionName+"_"+n.Section+"_"+l,id:l,typeId:n.Section,title:u.Title,url:u.ShowDetailsUrl})}t.autoCompleteResult.push(r),console.log(r)}}}}function s(e){switch(e){case"dataset":return"Datasett";case"servicelayer":return"Tjenestelag";case"service":return"Tjenester";case"dimensionGroup":return"Datapakker"}}function i(){w>0&&1==v&&(w--,0===w&&(v=null)),1==w&&v>1&&(v--,w=t.autoCompleteResult[v-1].list.length),v>1&w>1&&w--,d()}function p(){null===v?(v=1,w=1):(v==t.autoCompleteResult.length&&t.autoCompleteResult[v-1].list.length>w&&w++,v<t.autoCompleteResult.length&&(t.autoCompleteResult[v-1].list.length>w?w++:(v++,w=1))),d()}function d(){for(var e=0;e<t.autoCompleteResult.length;e++){var a=t.autoCompleteResult[e];if(e==v-1)for(var o=0;o<a.list.length;o++){var r=a.list[o];o==w-1?r.highlight=!0:r.highlight=!1}else for(var n=0;n<a.list.length;n++)a.list[n].highlight=!1}console.log("categoryCount "+v),console.log("resultCount "+w)}t.trustSrc=function(e){return l.trustAsResourceUrl(e)},e.trustHtml=function(e){return l.trustAsHtml(e)},t.dropdownOpen=!1,t.extendedSearchOpen=!1,t.showFakeResults=!1,t.searchString="",e.selectedSearch=searchOption,e.searchQuery="",t.autoCompleteResult=[],t.autoCompletePartial=searchOption.epiBaseUrl+"/KartverketSharedMenu/Scripts/geonorge/partials/_autoCompleteRow.html",t.focused=!1,t.autocompleteActive=!1,t.ajaxCallActive=!1,t.allowBlur=!0,t.viewport={width:window.innerWidth,height:window.innerHeight},t.breakpoints={xSmall:480,small:768,medium:992,large:1200};var h=function(a,o){a.preventDefault(),a.stopPropagation(),e.selectedSearch=o,t.dropdownOpen=!1;var r=document.getElementById("txtSearch");r.focus()};t.select=h;var g=function(e){var t;switch(e.keyCode){case 38:e.target.blur(),t=angular.element(e.target).next(),t.children()[dropdownOptions.length-1].focus();break;case 40:e.target.blur(),t=angular.element(e.target).next(),t.children()[0].focus();break;default:return}e.preventDefault(),e.stopPropagation()},f=function(e,t){var a;switch(e.keyCode){case 13:return void h(e,dropdownOptions[t]);case 38:var o=angular.element(document.getElementById("search-dropdown"));a=0===t?o.children()[dropdownOptions.length-1]:o.children()[t-1];break;case 40:a=t>=dropdownOptions.length-1?angular.element(document.getElementById("search-dropdown")).children()[0]:angular.element(e.target).next()[0];break;default:return}e.target.blur(),a.focus(),e.preventDefault(),e.stopPropagation()};t.dropdownKeyDown=f,t.buttonDropdownKeyDown=g,t.onSearch=function(t){if(t&&t.preventDefault(),!(e.searchQuery.length<3)){var a=n.triggerSearch(e.searchQuery);a.then(u)}},t.preventDefault=function(e){switch(e.keyCode){case 13:e.preventDefault();break;case 16:C=!0;break;case 9:t.autoCompleteResult.length>0&&e.preventDefault();break;case 38:case 40:e.preventDefault()}};var m=null;t.autocomplete=function(a){if(t.focused!==!1){if(e.searchQuery.length<3)return t.autoCompleteResult=[],t.autocompleteActive=!1,t.ajaxCallActive=!1,void(v=null);switch(a.keyCode){case 13:null===v?(t.resetAutocomplete(),t.allowBlur=!0,t.onSearch(a)):(t.allowBlur=!1,window.location=t.autoCompleteResult[v-1].list[w-1].url);break;case 16:C=!1;break;case 37:break;case 38:return i(),!1;case 39:break;case 9:C?i():p();break;case 40:return p(),!1;default:return v=null,m&&(r.cancel(m),m=null,console.log("cancel timeout")),void(m=r(function(){t.autocompleteActive=!0,console.log("calling WS"),e.searchQuery.length>0&&(t.ajaxCallActive=!0,n.performSearch(e.searchQuery,[],5,0).then(function(e){console.log(e);var t={d:{Results:e}};c(t)}))},300))}}};var v=null,w=null,C=!1;t.mouseOver=function(e,a,o){console.log(a),console.log(o),t.allowBlur=e,w=o+1,v=a+1,d()},t.mouseOut=function(e){t.allowBlur=e},t.resetAutocomplete=function(){t.focused=!1,t.autocompleteActive=!1,t.ajaxCallActive=!1,t.autoCompleteResult=[]},t.setFocus=function(e){t.focused=!0,console.log(t.focused),angular.element(e.target).on("blur",function(){r(function(){t.allowBlur&&(t.resetAutocomplete(),console.log(t.focused),angular.element(e.target).on("blur",null))},!0)})},angular.element(document).ready(function(){n.triggerSearch(e.searchQuery)})}])}();
//# sourceMappingURL=maps/main.js.map