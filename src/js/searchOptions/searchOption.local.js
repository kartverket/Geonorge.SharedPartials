var kartKatalogenUrl = "//kartkatalog.dev.geonorge.no";
var geonorgeBaseUrl = "localhost:61381";
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
    hosts: "localhost,geonorge.epidemo.no,geonorge.local,kartkatalog.dev.geonorge.no",
    epiBaseUrl: geonorgeBaseUrl,
    imageLogoPath: "/dist/images/geonorge_logo_350px_dev.svg"
}