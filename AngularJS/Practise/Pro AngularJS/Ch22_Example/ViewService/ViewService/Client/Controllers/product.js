angular.module("exampleApp", ["ngResource", "ngRoute", "ngAnimate"])
.constant("baseUrl", "/api/product/")
.constant("tableViewUrl", "/Client/Views/tableView.html")
.constant("editorViewUrl", "/Client/Views/editorView.html")
.factory("productsResource", function ($resource, baseUrl) {
    return $resource(baseUrl + ":Id", { Id: "@Id" },
    { create: { method: "POST" }, save: { method: "PUT" } });
})
.config(function ($routeProvider, $locationProvider, tableViewUrl, editorViewUrl) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider.when("/edit/:Id", {
        templateUrl: editorViewUrl,
        controller: "editCtrl"
    });
    $routeProvider.when("/create", {
        templateUrl: editorViewUrl,
        controller: "editCtrl"
    });
    $routeProvider.otherwise({
        templateUrl: tableViewUrl,
        controller: "tableCtrl",
        resolve: {
            data: function (productsResource) {
                return productsResource.query();
            }
        }
    });
})
.controller("defaultCtrl", function ($scope, $location, productsResource) {
    $scope.data = {};

    $scope.deleteProduct = function (product) {
        product.$delete().then(function () {
            $scope.data.products.splice($scope.data.products.indexOf(product), 1);
        });
        $location.path("/list");
    }

    $scope.createProduct = function (product) {
        new productsResource(product).$create().then(function (newProduct) {
            $scope.data.products.push(newProduct);
            $location.path("/list");
        });
    }
})
.controller("tableCtrl", function ($scope, $location, $route, data) {
    $scope.data.products = data;
    $scope.refreshProducts = function () {
        $route.reload();
    }
})
.controller("editCtrl", function ($scope, $routeParams, $location) {
    $scope.currentProduct = null;
    if ($location.path().indexOf("/edit/") == 0) {
        var id = $routeParams["Id"];
        for (var i = 0; i < $scope.data.products.length; i++) {
            if ($scope.data.products[i].Id == id) {
                $scope.currentProduct = $scope.data.products[i];
                break;
            }
        }
    }
    $scope.cancelEdit = function () {
        $scope.currentProduct = {};
        $location.path("/list");
    }
    $scope.updateProduct = function (product) {
        product.$save();
        $location.path("/list");
    }
    $scope.saveEdit = function (product) {
        if (angular.isDefined(product.Id)) {
            $scope.updateProduct(product);
        } else {
            $scope.createProduct(product);
        }
        $scope.currentProduct = {};
    }
});