var kartKatalogenUrl = "//kartkatalog.geonorge.no";
var geonorgeBaseUrl = "www.geonorge.no";
var searchOption = {
    text: "Kartkatalogen",
    searchTitle: "Kartkatalogen",
    buttonCss: "edgesKartkatalogen",
    listCss: "left-edge-kartkatalogen",    
    queryParameter: "?text=",
    localUrl: false,
    autoComplete: true,
    url: kartKatalogenUrl + "/search",
    api: kartKatalogenUrl + "/api/search",
    shoppingCartUrl: kartKatalogenUrl + "/nedlasting",
    loginUrl: kartKatalogenUrl + "/AuthServices/SignIn?ReturnUrl=http%3A%2F%2F"+geonorgeBaseUrl+"%2F",
    hosts: "geonorge.no,kartkatalog.geonorge.no,register.geonorge.no,objektkatalog.geonorge.no,editor.geonorge.no,produktark.geonorge.no,validering.geonorge.no,159.162.102.155",
    epiBaseUrl: "//" + geonorgeBaseUrl,
    imageLogoPath: "/dist/images/geonorge_logo_350px.svg"
}