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
                var menuService = baseurl + "/api/menu" + "?omitLinks=1";
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

            switch ($.cookie("_culture")) {
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
                break;
            }

            $scope.switchCulture = function(cultureCode) {
                $.cookie("_culture", cultureCode);
                location.reload();
            }
        }
    ]);
}());