var kartKatalogenUrl = {
    local: "//kartkatalog.dev.geonorge.no",
    test: "//kartkatalog.test.geonorge.no",
    prod: "//kartkatalog.geonorge.no"
};
var geonorgeBaseUrl = { 
    local: "localhost:61381",
    test: "www.test.geonorge.no",
    prod: "www.geonorge.no"
};
var searchOptions = {
    local: {
        text: "Kartkatalogen",
        searchTitle: "Kartkatalogen",
        buttonCss: "edgesKartkatalogen",
        listCss: "left-edge-kartkatalogen",    
        queryParameter: "?text=",
        localUrl: false,
        autoComplete: true,
        url: kartKatalogenUrl.local + "/search",
        api: kartKatalogenUrl.local + "/api/search",
        shoppingCartUrl: kartKatalogenUrl.local + "/nedlasting",
        loginUrl: kartKatalogenUrl.local + "/AuthServices/SignIn?ReturnUrl=http%3A%2F%2F"+geonorgeBaseUrl.local+"%2F",
        logoutUrl: kartKatalogenUrl.local + "/AuthServices/SignOut?ReturnUrl=http%3A%2F%2F"+geonorgeBaseUrl.local+"%2F",
        hosts: "localhost,geonorge.epidemo.no,geonorge.local,kartkatalog.dev.geonorge.no",
        epiBaseUrl: geonorgeBaseUrl.local,
        imageLogoPath: "/dist/images/geonorge_logo_350px_dev.svg"
    },
    dev: {
        text: "Kartkatalogen",
        searchTitle: "Kartkatalogen",
        buttonCss: "edgesKartkatalogen",
        listCss: "left-edge-kartkatalogen",    
        queryParameter: "?text=",
        localUrl: false,
        autoComplete: true,
        url: kartKatalogenUrl.local + "/search",
        api: kartKatalogenUrl.local + "/api/search",
        shoppingCartUrl: kartKatalogenUrl.local + "/nedlasting",
        loginUrl: kartKatalogenUrl.local + "/AuthServices/SignIn?ReturnUrl=http%3A%2F%2F"+geonorgeBaseUrl.local+"%2F",
        logoutUrl: kartKatalogenUrl.local + "/AuthServices/SignOut?ReturnUrl=http%3A%2F%2F"+geonorgeBaseUrl.local+"%2F",
        hosts: "localhost,geonorge.epidemo.no,geonorge.local,kartkatalog.dev.geonorge.no",
        epiBaseUrl: geonorgeBaseUrl.local,
        imageLogoPath: "/dist/images/geonorge_logo_350px_dev.svg"
    },
    test: {
        text: "Kartkatalogen",
        searchTitle: "Kartkatalogen",
        buttonCss: "edgesKartkatalogen",
        listCss: "left-edge-kartkatalogen",    
        queryParameter: "?text=",
        localUrl: false,
        autoComplete: true,
        url: kartKatalogenUrl.test + "/search",
        api: kartKatalogenUrl.test + "/api/search",
        shoppingCartUrl: kartKatalogenUrl.test + "/nedlasting",
        loginUrl: kartKatalogenUrl.test + "/AuthServices/SignIn?ReturnUrl=http%3A%2F%2F"+geonorgeBaseUrl.test+"%2F",
        logoutUrl: kartKatalogenUrl.test + "/AuthServices/SignOut?ReturnUrl=http%3A%2F%2F"+geonorgeBaseUrl.test+"%2F",
        hosts: "test.geonorge.no,kartkatalog.test.geonorge.no,register.test.geonorge.no,objektkatalog.test.geonorge.no,editor.test.geonorge.no,produktark.test.geonorge.no,validering.test.geonorge.no,159.162.102.155,kartkatalog.dev.geonorge.no,register.dev.geonorge.no,objektkatalog.dev.geonorge.no,editor.dev.geonorge.no,produktark.dev.geonorge.no,validering.dev.geonorge.no,159.162.102.155,kartkatalog.dev.geonorge.no,register.dev.geonorge.no,objektkatalog.dev.geonorge.no,editor.dev.geonorge.no,produktark.dev.geonorge.no,validering.dev.geonorge.no,159.162.102.155",
        epiBaseUrl: "//" + geonorgeBaseUrl.test,
        imageLogoPath: "/dist/images/geonorge_logo_350px_test.svg"
    },
    prod: {
        text: "Kartkatalogen",
        searchTitle: "Kartkatalogen",
        buttonCss: "edgesKartkatalogen",
        listCss: "left-edge-kartkatalogen",    
        queryParameter: "?text=",
        localUrl: false,
        autoComplete: true,
        url: kartKatalogenUrl.prod + "/search",
        api: kartKatalogenUrl.prod + "/api/search",
        shoppingCartUrl: kartKatalogenUrl.prod + "/nedlasting",
        loginUrl: kartKatalogenUrl.prod + "/AuthServices/SignIn?ReturnUrl=http%3A%2F%2F"+geonorgeBaseUrl.prod+"%2F",
        logoutUrl: kartKatalogenUrl.prod + "/AuthServices/SignOut?ReturnUrl=http%3A%2F%2F"+geonorgeBaseUrl.prod+"%2F",
        hosts: "geonorge.no,kartkatalog.geonorge.no,register.geonorge.no,objektkatalog.geonorge.no,editor.geonorge.no,produktark.geonorge.no,validering.geonorge.no,159.162.102.155",
        epiBaseUrl: "//" + geonorgeBaseUrl.prod,
        imageLogoPath: "/dist/images/geonorge_logo_350px.svg"
    }
};

var searchOption = searchOptions.prod;
var applicationEnvironment = applicationEnvironment || "";
if (applicationEnvironment !== "") {
	var searchOption = searchOptions[applicationEnvironment];
}

searchOption.supportsLogin = (searchOption.supportsLogin !== undefined) ? searchOption.supportsLogin : true;
searchOption.supportsCulture = (searchOption.supportsCulture !== undefined) ? searchOption.supportsCulture : true;
