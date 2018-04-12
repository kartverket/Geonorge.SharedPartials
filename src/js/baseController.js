(function() {
    var app = angular.module("geonorge-header");

    app.controller("baseController", [
        "$scope", "$http",
        function($scope, $http) {       
            // * Language *     
            if (typeof(Cookies) !== 'undefined'){
                $scope.langCode = Cookies.get("_culture");                
            } else {
                $scope.langCode = "no";
            }
            $scope.localizedText = {
                search: {
                    en: "Search",
                    no: "Søk"
                },
                menu: {
                    en: "Menu",
                    no: "Meny"
                },
                login: {
                    en: "Login",
                    no: "Logg inn"
                },
                logout: {
                    en: "Log out",
                    no: "Logg ut"
                }
            }            
            switch ($scope.langCode) {
                case "en":
                    $scope.cultureSwitchName = "Norsk";
                    $scope.cultureSwitchCode = "no";
                    if (cultureData)
                        $scope.cultureSwitchUrl = cultureData.friendlyUrlNO;
                    break;
                default:
                    $scope.cultureSwitchName = "English";
                    $scope.cultureSwitchCode = "en";
                    if (cultureData)
                        $scope.cultureSwitchUrl = cultureData.friendlyUrlEN;
            }
            $scope.switchCulture = function(cultureCode) {
                document.cookie = "_culture=" + cultureCode + "; path=/;domain=.geonorge.no";
            }

            // * Shopping cart url *
            $scope.shoppingCartUrl = "//kartkatalog.geonorge.no/nedlasting";
            if (searchOption.shoppingCartUrl !== undefined)
                $scope.shoppingCartUrl = searchOption.shoppingCartUrl;
            
            // * Logo *
            $scope.imageLogoPath = "";
            if (searchOption.imageLogoPath !== undefined)
                $scope.imageLogoPath = searchOption.imageLogoPath;

            // * Login *
            if (typeof(Cookies) !== 'undefined')
                $scope.loggedIn = Cookies.get("_loggedIn");
            if (searchOption.loggedIn !== undefined)
                $scope.loggedIn = searchOption.loggedIn;
        }
    ]);
}());