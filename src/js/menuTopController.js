
(function() {
    var app = angular.module("geonorge-header");

    app.controller("menuTopController", [
        "$scope", "$http",
        function($scope, $http) {
            $scope.trustSrc = function (src) {
                return $sce.trustAsResourceUrl(src);
            }

            function handleSuccess(respons) {
                var menuItems = respons.data;
                $scope.menuItems = menuItems;
            }

            function handleError() {
                $scope.getMenuError = true;
            }

            $scope.getMenuData = function getMenuData() {
                var menuService = GeonorgeOptions.baseUrl + "/api/menu" + "?omitLinks=1";
                var request = $http({
                    method: "GET",
                    url: menuService,
                    headers: {
                        'Content-Type': "application/json; charset=utf-8",
                        'accept': "*/*"
                    },
                    data: {}
                });

                return request.then(handleSuccess, handleError);
            };
        }
    ]);
}());