var kartKatalogenUrl = "//kartkatalog.dev.geonorge.no";
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
    hosts: "localhost,geonorge.epidemo.no,geonorge.local,kartkatalog.dev.geonorge.no",
    epiBaseUrl: 'localhost:61381',
    imageLogoPath: "/dist/images/geonorge_logo_350px_dev.svg"
}