const pt_lang = "pt";
const eng_lang = "eng";
const menu_upper_case = true;

var lst_ids = [
  {
    id: "Home",
    func: GetHomeTitle,
  },
  {
    id: "Gallery",
    func: GetGalleryTitle,
  },
  {
    id: "Blog",
    func: GetBlogTitle,
  },
  {
    id: "About",
    func: GetAboutTitle,
  },
];

if (sessionStorage.getItem("lang") == undefined)
{
  var lang = navigator.language || navigator.userLanguage || navigator.userLang;
  if (lang != undefined && lang.search(pt_lang) > -1)
    sessionStorage.setItem("lang", pt_lang);
  else
    sessionStorage.setItem("lang", eng_lang);
}

window.inZoom = function() {
  return window.visualViewport.scale > 1;
}

window.isMobile = function() {
  if (window._ismobile_ != undefined)
    return window._ismobile_;
    
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  
  window._ismobile_ = check;
  return check;
};

document.addEventListener("DOMContentLoaded", Init);

function Init ()
{
  ChangePageSizes();
  LoadLangButton();
}

function ChangePageSizes ()
{
  if (window.isMobile())
  {
    var html = document.getElementsByTagName("html")[0];
    html.style.fontSize = "80%";
    
    var grid = document.getElementsByClassName("grid")[0];
    if (grid != undefined)
    {
      grid.style.padding = "3px";
      grid.style.gridGap = "7px";
      grid.style.paddingBottom = "3em";
    }
    var bt = document.getElementsByClassName("langicos")[0];
    if (bt != undefined)
      bt.style.top = "0.7rem";
  }
}

function LoadLangButton ()
{
  var lang = sessionStorage.getItem("lang");
  var content;
  if (lang == pt_lang)
  {
    content = '<a onclick="UseEnglish()"><img src="images/ukico.png" alt="See the website in English" title="See the website in English"></a>';
  }
  else
  {
    content = '<a onclick="UsePortuguese()"><img src="images/brico.png" alt="Veja o site em Portugu&ecirc;s" title="Veja o site em Portugu&ecirc;s"></a>';
  }
  var div_icos = document.getElementsByClassName("ico_bt")[0];
  if (div_icos != undefined)
    div_icos.innerHTML = content;
}

function RemoveClass (elem, classname)
{
  var pos = elem.className.indexOf(" " + classname);
  if (pos >= 0)
    elem.className = elem.className.slice(0, pos);
}

function GetHomeTitle ()
{
  var title = "Home";
  if (menu_upper_case)
    title = title.toUpperCase();
  return title;
}

function GetGalleryTitle ()
{
  var title = "Gallery";
  if (sessionStorage.getItem("lang") == pt_lang)
    title = "Galeria";
  if (menu_upper_case)
    title = title.toUpperCase();
  return title;
}

function GetBlogTitle ()
{
  var title = "Blog";
  if (sessionStorage.getItem("lang") == pt_lang)
    title = "Blog";
  if (menu_upper_case)
    title = title.toUpperCase();
  return title;
}

function GetAboutTitle ()
{
  var title = "About";
  if (sessionStorage.getItem("lang") == pt_lang)
    title = "Sobre";
  if (menu_upper_case)
    title = title.toUpperCase();
  return title;
}

function GetContactTitle ()
{
  var title = "Contact";
  if (sessionStorage.getItem("lang") == pt_lang)
    title = "Contato";
  if (menu_upper_case)
    title = title.toUpperCase();
  return title;
}

function GetURLParameter(sParam)
{
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) 
  {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) 
    {
      return sParameterName[1];
    }
  }
}

function UseEnglish ()
{
  sessionStorage.setItem("lang", eng_lang);
  UpdatePageTexts();
  LoadLangButton();
}

function UsePortuguese ()
{
  sessionStorage.setItem("lang", pt_lang);
  UpdatePageTexts();
  LoadLangButton();
}

function UpdatePageTexts()
{
  const l = lst_ids.length;
  for (var i = 0; i < l; ++i)
  {
    document.getElementById(lst_ids[i].id).innerHTML = lst_ids[i].func(lst_ids[i].id);
  }
}

function ResetGallery()
{
  sessionStorage.setItem("category", "All");
}