(function() {
    var app = angular.module("geonorge-header");

    app.controller("menuTopController", [
        "$scope", "$http",
        function($scope, $http) {
            $scope.trustSrc = function (src) {
                return $sce.trustAsResourceUrl(src);
            }

            function handleSuccess(response) {
                var menuItems = response.data;
                $scope.menuItems = menuItems;
            }

            function handleError(response) {
                $scope.getMenuError = true;
                console.debug("Error while getting menuItems", response);
            }

            $scope.getMenuData = function getMenuData() {
                var domainUrl = "";
                if (searchOption.epiBaseUrl !== undefined)
                    domainUrl = searchOption.epiBaseUrl;
                var menuService = domainUrl + "/api/menu" + "?omitLinks=1";
                var request = $http({
                    method: "GET",
                    url: menuService,
                    headers: {
                        'Content-Type': "application/json; charset=utf-8",
                        'accept': "*/*"
                    },
                    data: {},
                    crossDomain: true
                });

                return request.then(handleSuccess, handleError);
            };

            // * Login url *
            $scope.loginUrl = '//kartkatalog.geonorge.no/AuthServices/SignIn?ReturnUrl=http%3A%2F%2Fwww.geonorge.no%2F';
            if (searchOption.loginUrl !== undefined)
                $scope.loginUrl = searchOption.loginUrl;

            // * Log out url *
            $scope.logoutUrl = '//kartkatalog.geonorge.no/AuthServices/SignOut?ReturnUrl=http%3A%2F%2Fwww.geonorge.no%2F';
            if (searchOption.logoutUrl !== undefined)
                $scope.logoutUrl = searchOption.logoutUrl;
        }]);
}());