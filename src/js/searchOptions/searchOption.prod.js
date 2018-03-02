var kartKatalogenUrl = "//kartkatalog.geonorge.no";
var searchOption = {
    text: "Kartkatalogen",
    searchTitle: "Kartkatalogen",
    buttonCss: "edgesKartkatalogen",
    listCss: "left-edge-kartkatalogen",    
    queryParameter: '?text=',
    localUrl: false,
    autoComplete: true,
    url: kartKatalogenUrl + "/search",
    api: kartKatalogenUrl + "/api/search",
    shoppingCartUrl: kartKatalogenUrl + "/nedlasting",
    loginUrl: kartKatalogenUrl + "/search?text=login",
    hosts: "geonorge.no,kartkatalog.geonorge.no,register.geonorge.no,objektkatalog.geonorge.no,editor.geonorge.no,produktark.geonorge.no,validering.geonorge.no,159.162.102.155",
    epiBaseUrl: '//www.geonorge.no',
    imageLogoPath: "/dist/images/geonorge_logo_350px.svg"
}