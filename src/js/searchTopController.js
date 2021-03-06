﻿(function () {
    const ENTER = 13;
    const UP = 38;
    const DOWN = 40;
    const SHIFT = 16;
    const TAB = 9;
    const LEFT = 37;
    const RIGHT = 39;

    var app = angular.module("geonorge-header");

    app.service('aggregatedService', ['$http', '$q', function ($http, $q) {
        var txtLang = document.getElementById('txtLang');
        var lang = '';
        if (txtLang) lang = txtLang.value;

        var methodToExecute = undefined;

        return ({
            triggerSearch: triggerSearch,
            executeMethod: executeMethod,
            performSearch: performSearch
        });


        function executeMethod(method) {
            methodToExecute = method;
        }

        function triggerSearch(value) {
            return $q(function (reject) {
                if (methodToExecute == undefined) {
                    reject();
                } else {
                    methodToExecute(value);
                }
            });
        }

        function performSearch(query, filters, limit, section) {

            function getSearchParameters(facetValue, query) {
                var facetParameters = 'facets[1]name=type&facets[1]value=' + facetValue;
                var queryParameters = 'text=' + query;
                var language = "en";
                if (cultureData.currentCulture === undefined || cultureData.currentCulture === '' || cultureData.currentCulture == 'no')
                    language = "no";

                return '?limit=5&' + facetParameters + '&' + queryParameters + '&lang=' + language;
            }

            var menuService = encodeURI(searchOption.api + getSearchParameters('dataset', query));
            var request = $http({
                method: 'GET',
                url: menuService,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'accept': '*/*'
                },
                data: {}
            });

            var menuService2 = encodeURI(searchOption.api + getSearchParameters('service', query));
            var request2 = $http({
                method: 'GET',
                url: menuService2,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'accept': '*/*'
                },
                data: {}
            });

            var menuService3 = encodeURI(searchOption.api.replace('search','articles') + '?limit=5&text=' + query);
            var request3 = $http({
                method: 'GET',
                url: menuService3,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'accept': '*/*'
                },
                data: {}
            });

            var menuService4 = encodeURI(searchOption.api + getSearchParameters('software', query));
            var request4 = $http({
                method: 'GET',
                url: menuService4,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'accept': '*/*'
                },
                data: {}
            });


            return $q.all([request, request2, request3, request4]);
        }

    }]).controller('searchTopController', [
        '$rootScope', '$scope', '$location', '$window', '$timeout', 'aggregatedService', '$sce',
        function ($rootScope, $scope, $location, $window, $timeout, aggregatedService, $sce) {
            $scope.trustSrc = function (src) {
                return $sce.trustAsResourceUrl(src);
            }

            $rootScope.trustHtml = function (html) {
                return $sce.trustAsHtml(html);
            };

            $scope.dropdownOpen = false;
            $scope.extendedSearchOpen = false;
            $scope.showFakeResults = false;
            $scope.searchString = "";
            $rootScope.selectedSearch = searchOption;
            $rootScope.searchQuery = parseLocation(window.location.search).text;
            $rootScope.activePageUrl = "//" + window.location.host + window.location.pathname + window.location.search;

            // Values based on selected language
            if (cultureData.currentCulture === undefined || cultureData.currentCulture === '' || cultureData.currentCulture == 'no') {
                $rootScope.showAllText = "Vis alle treff...";
                $rootScope.noResultsText = "Søket gir ingen treff";
                $rootScope.loadingContentText = "Henter innhold";
                $rootScope.loadingSearchResultsText = "Henter søkeresultater";
            } else if (cultureData.currentCulture == 'en') {
                $rootScope.showAllText = "Show all results...";
                $rootScope.noResultsText = "Your search did not return any data";
                $rootScope.loadingContentText = "Loading content";
                $rootScope.loadingSearchResultsText = "Loading search results";
            }

            $scope.autoCompleteResult = [];

            $scope.autoCompletePartial = '/dist/partials/_autoCompleteRow.html';
            $scope.focused = false;
            $scope.autocompleteActive = false;
            $scope.ajaxCallActive = false;
            $scope.allowBlur = true;
            $scope.viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            $scope.breakpoints = {
                xSmall: 480,
                small: 768,
                medium: 992,
                large: 1200
            };

            var select = function (e, search) {
                e.preventDefault();
                e.stopPropagation();
                $rootScope.selectedSearch = search;
                $scope.dropdownOpen = false;
                var txt = document.getElementById('txtSearch');
                txt.focus();
            };

            $scope.select = select;

            var buttonDropdownKeyDown = function (e) {
                var dropdown;
                switch (e.keyCode) {
                    case UP:
                        e.target.blur();
                        dropdown = angular.element(e.target).next();
                        dropdown.children()[dropdownOptions.length - 1].focus();
                        break;
                    case DOWN:
                        e.target.blur();
                        dropdown = angular.element(e.target).next();
                        dropdown.children()[0].focus();
                        break;
                    default:
                        return;
                }
                e.preventDefault();
                e.stopPropagation();
            };

            var dropdownKeyDown = function (e, id) {
                var toFocus;
                switch (e.keyCode) {
                    case ENTER:
                        select(e, dropdownOptions[id]);
                        return;
                    case UP:
                        var dropdown = angular.element(document.getElementById("search-dropdown"));
                        if (id === 0) { //Wrap-around
                            toFocus = dropdown.children()[dropdownOptions.length - 1];
                        } else {
                            toFocus = dropdown.children()[id - 1];
                        }
                        break;
                    case DOWN:
                        if (id >= dropdownOptions.length - 1) { //Wrap-around
                            toFocus = angular.element(document.getElementById("search-dropdown")).children()[0];
                        } else {
                            toFocus = angular.element(e.target).next()[0];
                        }
                        break;
                    default:
                        return; //Dont stop propagation/default
                }
                e.target.blur();
                toFocus.focus();
                e.preventDefault();
                e.stopPropagation();
            };

            $scope.dropdownKeyDown = dropdownKeyDown;
            $scope.buttonDropdownKeyDown = buttonDropdownKeyDown;

            $scope.onSearch = function (ev) {
                if (ev) ev.preventDefault();
                if (!$rootScope.searchQuery || $rootScope.searchQuery.length < 3) return;

                //The service tries to trigger the connected search method - if not, the fallback method is used
                var src = aggregatedService.triggerSearch($rootScope.searchQuery);
                //Specify a fallback in case aggregatedService doesn't have a method for search implemented
                src.then(fallbackRouting);
            };

            function fallbackRouting() {
                var search = $scope.selectedSearch;
                var param = '';
                if ($rootScope.searchQuery !== '') {
                    param = search.queryParameter;
                    param += $rootScope.searchQuery;
                }

                var relativeUrl = search.url + param;
                $window.location.href = relativeUrl;
            }

            $scope.preventDefault = function (ev) {

                switch (ev.keyCode) {
                    case ENTER:
                        ev.preventDefault();
                        break;
                    case SHIFT:
                        shiftKey = true;
                        break;
                    case TAB:
                        if ($scope.autoCompleteResult.length > 0) {
                            ev.preventDefault();
                        }
                        break;
                    case UP:
                    case DOWN:
                        ev.preventDefault();
                        break;
                }
            };

            var timer = null;
            $scope.autocomplete = function (ev) {
                if ($scope.focused === false) return;

                if (!$rootScope.searchQuery || $rootScope.searchQuery.length < 3) {
                    $scope.autoCompleteResult = [];
                    $scope.autocompleteActive = false;
                    $scope.ajaxCallActive = false;
                    categoryCount = null;
                    return;
                }

                switch (ev.keyCode) {
                    case ENTER:
                        if (categoryCount === null) {
                            $scope.resetAutocomplete();
                            $scope.allowBlur = true;
                            $scope.onSearch(ev);
                        } else {
                            $scope.allowBlur = false;
                            window.location = $scope.autoCompleteResult[categoryCount - 1].list[resultCount - 1].url;
                        }
                        break;
                    case SHIFT:
                        shiftKey = false;
                        break;
                    case LEFT:
                        break;
                    case UP:
                        autoCompleteMoveUp();
                        return false;
                    case RIGHT:
                        break;
                    case TAB:
                        if (!shiftKey) {
                            autoCompleteMoveDown();
                        } else {
                            autoCompleteMoveUp();
                        }
                        break;
                    case DOWN:
                        autoCompleteMoveDown();
                        return false;
                    default:
                        categoryCount = null;
                        if (timer) {
                            $timeout.cancel(timer);
                            timer = null;
                            console.debug('cancel timeout');
                        }
                        timer = $timeout(function () {
                            $scope.autocompleteActive = true;
                            console.debug('calling WS');
                            if ($rootScope.searchQuery.length > 0) {
                                $scope.ajaxCallActive = true;

                                aggregatedService.performSearch($rootScope.searchQuery, [], 5, 0).then(function (arrayOfResults) {
                                    console.debug(arrayOfResults);

                                    var response = {
                                        d: {
                                            Results: arrayOfResults
                                        }
                                    };

                                    displayAutoCompleteData(response);
                                });

                            }
                        }, 300);
                        return;
                }
            };

            function displayAutoCompleteData(response) {
                $scope.ajaxCallActive = false;
                $scope.autoCompleteResult = [];
                if (response.d) {
                    var list = [];

                    if (response.d.NumberOfHitsTotal === 0) {
                        $scope.autoCompleteResult = [];
                        return;
                    }

                    list = response.d.Results;

                    for (var x = 0; x < list.length; x++) {
                        var item = {};
                        var curr = list[x];
                        if (curr.data == null || curr.data.Results.length === 0) continue;
                        var showAllUrl = getUrlParameters(curr.data.Results[0].Type);
                        var searchQuery = showAllUrl.length && showAllUrl.indexOf("?") > -1 ? '&text=' + $rootScope.searchQuery : '?text=' + $rootScope.searchQuery;

                        item.showAllUrl = showAllUrl + searchQuery;
                        item.list = [];

                        for (var y = 0; y < curr.data.Results.length; y++) {
                            var currResult = curr.data.Results[y];

                            item.title = getType(currResult.Type);

                            item.list.push({
                                externalId: curr.SectionName + '_' + curr.Section + '_' + y,
                                id: y,
                                typeId: curr.Section,
                                title: currResult.Title,
                                url: currResult.ShowDetailsUrl
                            });
                        }
                        $scope.autoCompleteResult.push(item);
                        console.debug(item);
                    }

                }
            }

            function getType(type) {
                if (cultureData.currentCulture === undefined || cultureData.currentCulture == '' || cultureData.currentCulture == 'no') {
                    switch (type) {
                        case "dataset":
                            return "Datasett";
                        case "servicelayer":
                            return "Tjenestelag";
                        case "service":
                            return "Tjenester";
                        case "dimensionGroup":
                            return "Datapakker";
                        case "software":
                            return "Applikasjon";
                        case "StandardPage":
                            return "Artikler";
                        case "NewsPage":
                            return "Artikler";
                        default:
                    }
                } else if (cultureData.currentCulture == 'en') {
                    switch (type) {
                        case "dataset":
                            return "Dataset";
                        case "servicelayer":
                            return "Service layer";
                        case "service":
                            return "Service";
                        case "dimensionGroup":
                            return "Data package";
                        case "software":
                            return "Application";
                        case "StandardPage":
                            return "Articles";
                        case "NewsPage":
                            return "Articles";
                        default:
                    }
                }
            }

            function getUrlParameters(type) {
                var baseUrl = searchOption.url;
                switch (type) {
                    case "dataset":
                        return baseUrl + "?Facets%5B0%5D.name=type&Facets%5B0%5D.value=dataset";
                    case "servicelayer":
                        return baseUrl + "?Facets%5B0%5D.name=type&Facets%5B0%5D.value=service&Facets%5B1%5D.name=type&Facets%5B1%5D.value=servicelayer";
                    case "service":
                        return baseUrl + "?Facets%5B0%5D.name=type&Facets%5B0%5D.value=service&Facets%5B1%5D.name=type&Facets%5B1%5D.value=servicelayer";
                    case "dimensionGroup":
                        return baseUrl;
                    case "StandardPage":
                        return baseUrl + "?facet=articles";
                    case "NewsPage":
                        return baseUrl + "?facet=articles";
                    case "software":
                        return baseUrl + "?Facets%5B0%5D.name=type&Facets%5B0%5D.value=software";
                    default:
                }
            }

            var categoryCount = null;
            var resultCount = null;
            var shiftKey = false;

            function autoCompleteMoveUp() {

                if (resultCount > 0 && categoryCount == 1) {
                    resultCount--;
                    if (resultCount === 0) categoryCount = null;
                }

                if (resultCount == 1 && categoryCount > 1) {
                    categoryCount--;
                    resultCount = $scope.autoCompleteResult[categoryCount - 1].list.length;
                }



                if (categoryCount > 1 & resultCount > 1) {
                    resultCount--;
                }

                setHighlightedRow();
            }

            function autoCompleteMoveDown() {
                if (categoryCount === null) {
                    categoryCount = 1;
                    resultCount = 1;
                } else {
                    if (categoryCount == $scope.autoCompleteResult.length) {
                        if ($scope.autoCompleteResult[categoryCount - 1].list.length > resultCount) {
                            resultCount++;
                        }
                    }
                    if (categoryCount < $scope.autoCompleteResult.length) {
                        if ($scope.autoCompleteResult[categoryCount - 1].list.length > resultCount) {
                            resultCount++;
                        } else {
                            categoryCount++;
                            resultCount = 1;
                        }
                    }
                }
                setHighlightedRow();

            }

            function setHighlightedRow() {
                for (var x = 0; x < $scope.autoCompleteResult.length; x++) {
                    var curr = $scope.autoCompleteResult[x];
                    if (x == categoryCount - 1) {
                        for (var y = 0; y < curr.list.length; y++) {
                            var innerItem = curr.list[y];
                            if (y == resultCount - 1) {
                                innerItem.highlight = true;
                            } else {
                                innerItem.highlight = false;
                            }
                        }

                    } else {
                        for (var z = 0; z < curr.list.length; z++) {

                            curr.list[z].highlight = false;
                        }
                    }
                }
                console.debug('categoryCount ' + categoryCount);
                console.debug('resultCount ' + resultCount);
            }

            $scope.mouseOver = function (val, category, index) {
                console.debug(category);
                console.debug(index);
                $scope.allowBlur = val;
                resultCount = index + 1;
                categoryCount = category + 1;
                setHighlightedRow();
            };
            $scope.mouseOut = function (val) {
                $scope.allowBlur = val;
            };

            $scope.resetAutocomplete = function () {
                $scope.focused = false;
                $scope.autocompleteActive = false;
                $scope.ajaxCallActive = false;
                $scope.autoCompleteResult = [];
            };

            $scope.setFocus = function (ev) {
                $scope.focused = true;
                angular.element(ev.target).on('blur', function () {
                    $timeout(function () {
                        if ($scope.allowBlur) {
                            $scope.resetAutocomplete();
                            console.debug($scope.focused);
                            angular.element(ev.target).on('blur', null);
                        }
                    }, true);
                });
            };
            angular.element(document).ready(function () {
                aggregatedService.triggerSearch($rootScope.searchQuery);
            });
        }
    ]);
}());

var parseLocation = function (location) {
    var pairs = location.substring(1).split("&");
    var obj = {};
    var pair;
    var i;

    for (i in pairs) {
        if (pairs[i] === "") continue;

        pair = pairs[i].split("=");
        obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }

    return obj;
};