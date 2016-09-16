app.controller('DashboardCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', function($scope, $http, $filter,$modal, MyService) {
$scope.entrar4=function(item,$timeout){
  $scope.item.id=MyService.data.identificador;
  $scope.operacionesCcp={};

 $http.get('http://localhost:1340/regasistencia/').then(function (resp) {
              $scope.registros = resp.data.results;

            });

 $http.get('http://localhost:1340/socio/').then(function (resp) {
              $scope.socios = resp.data.results;

            });






  
};
 $scope.filter = '';


   
	}]);