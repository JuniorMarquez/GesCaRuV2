'use strict';

/* Controllers */

app
  // Flot Chart controller 
  .controller('FlotChartDemoCtrl', ['$scope', '$http','$modal','MyService','$state',function($scope,$http,$modal,MyService,$state) {
    
    $scope.openBano = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalBano.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openAlimento = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalAlimento.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openListadoAlimentos = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalListadoAlimentos.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
   $scope.openMedicamento = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalMedicamento.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

    // $scope.cargaTiposBanos = function(){
    //   $http.get('http://localhost:1340/tipoBano/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
    //     $scope.tiposBanos = resp.data.results;
    //   });
    // };
    // $scope.cargaTiposBanos()

    // $scope.cargaTiposMedicamentos = function(){
    //   $http.get('http://localhost:1340/tipoMedicamento/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
    //     $scope.tiposMedicamentos = resp.data.results;
    //   });
    // };
    // $scope.cargaTiposMedicamentos();

    // $scope.okBano = function (item) {
      
    // // $scope.items = items;
    // // $scope.selected = {
    // //   item: $scope.items[0]
    // // };
    //   // var idAnimal=MyService.data.identificador;
    //   // item.idAnimal=idAnimal;
    //   // item.idUsuario=MyService.data.idUsuario;
    //   $http.post('http://localhost:1340/bano/' ,item);       
    //   $modalInstance.close($scope.selected.item);
    // //   var pas = item._id;
    // //   $scope.banosFiltrados = $scope.banos.filter(function (bano) {  
    // //   return (bano.idAnimal == pas );
    // // });


    // };


    $scope.d = [ [1,12],[2,11],[3,12],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7] ];

    $scope.d0_1 = [ [0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7] ];

    $scope.d0_2 = [ [0,4],[1,4.5],[2,7],[3,4.5],[4,3],[5,3.5],[6,6],[7,3],[8,4],[9,3] ];

    $scope.d1_1 = [ [10, 120], [20, 70], [30, 70], [40, 60] ];

    $scope.d1_2 = [ [10, 50],  [20, 60], [30, 90],  [40, 35] ];

    $scope.d1_3 = [ [10, 80],  [20, 40], [30, 30],  [40, 20] ];

    $scope.d2 = [];

    for (var i = 0; i < 20; ++i) {
      $scope.d2.push([i, Math.sin(i)]);
    }   
if (typeof MyService.data.idUsuario==="undefined"){

  $state.go('access.signin');
}
    $scope.d3 = [ 
      { label: "iPhone5S", data: 40 }, 
      { label: "iPad Mini", data: 10 },
      { label: "iPad Mini Retina", data: 20 },
      { label: "iPhone4S", data: 12 },
      { label: "iPad Air", data: 18 }
    ];

    $scope.refreshData = function(){
      $scope.d0_1 = $scope.d0_2;
    };

    $scope.getRandomData = function() {
      var data = [],
      totalPoints = 150;
      if (data.length > 0)
        data = data.slice(1);
      while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;
        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }
        data.push(y);
      }
      // Zip the generated y values with the x values
      var res = [];
      for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
      }
      return res;
    }
 function activate() {
       $scope.filter = '';
    

    };
 //     var totalHembras=0;
 // var totalMachos=0;
 // var totalEnOrdeno=0;
 // var totalSecas=0;
 // var totalPrenadas=0;
 // var totalNoPrenadas=0;
 // var totalHembrasJovenes=0;
 // var totalVacas=0;
    $http.get('http://localhost:1340/socio/').then(function (resp) {
    $scope.socios = resp.data.results;
var numero = $scope.socios.length;
 $scope.total= numero;
 // for (var i = 0;i<$scope.animales.length;i++){
 //    // if ($scope.animales[i].sexo=='Hembra'){totalHembras=totalHembras+1;}
 //    // if ($scope.animales[i].sexo=='Hembra' &&  $scope.animales[i].estado==true && $scope.animales[i].grupo=='Vacas'){totalEnOrdeno=totalEnOrdeno+1;} 
 //    // if ($scope.animales[i].sexo=='Hembra' &&  $scope.animales[i].estado==false && $scope.animales[i].grupo=='Vacas'){totalSecas=totalSecas+1;} 
 //    // if ($scope.animales[i].sexo=='Hembra' && $scope.animales[i].prenez==true){totalPrenadas=totalPrenadas+1;} 
 //    // if ($scope.animales[i].sexo=='Hembra' &&  $scope.animales[i].prenez==false){totalNoPrenadas=totalNoPrenadas+1};
 //    // if ($scope.animales[i].sexo=='Hembra' && $scope.animales[i].grupo=='Vacas'){totalVacas=totalVacas+1;} 
 //    // if ($scope.animales[i].sexo=='Hembra' &&  $scope.animales[i].grupo!='Vacas'){totalHembrasJovenes=totalHembrasJovenes+1};
 //    // if ($scope.animales[i].sexo=='Macho'){totalMachos=totalMachos+1;} 
    
 // }
 // $scope.totalHembras=totalHembras;
 // $scope.totalMachos=totalMachos;
 // $scope.totalPrenadas=totalPrenadas;
 // $scope.totalSecas=totalSecas;
 // $scope.totalNoPrenadas=totalNoPrenadas;
 // $scope.totalEnOrdeno=totalEnOrdeno;
 // $scope.totalVacas=totalVacas;
 // $scope.totalHembrasJovenes=totalHembrasJovenes;
  });
    $http.get('http://localhost:1340/tipousuario/?idCaja='+MyService.data.idCaja).then(function (resp2) {
    $scope.grupos = resp2.data.results;
var numero2 = $scope.grupos.length;
 $scope.totalGrupos= numero2;
  });
    

    // $scope.d4 = $scope.getRandomData();

// $scope.getGraficoPrincipal =function(){
//       $http.get('http://localhost:1340/ordeno/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
//         $scope.ordenosGrafico2 = resp.data.results;
//         var cant = $scope.ordenosGrafico2.length;
//         $scope.cantidadOrdenos=$scope.ordenosGrafico2.length;
//         // $scope.ordenosGrafico2.nombre=MyService.data.animalConsultado.nombre;
//         // $scope.ordenosGrafico2.cant=cant;
//         $scope.dor=[]; 
//         $scope.suma=0;
//         $scope.promedio=0;
//         $scope.ordenosGrafico2=$scope.ordenosGrafico2.reverse();
//         if ($scope.ordenosGrafico2.length>9){
//           var e = $scope.ordenosGrafico2.length;
//           for (var i= 0; i < $scope.ordenosGrafico2.length; i++){
//             var ind = [];
//             ind[i,1]= $scope.ordenosGrafico2[i].cantidad;
//             $scope.suma = $scope.suma +  $scope.ordenosGrafico2[i].cantidad;
//             $scope.promedio=$scope.suma/$scope.ordenosGrafico2.length;
//             ind[e,0]=e;
//             e=e-1;
//             $scope.dor[i]=ind;
//             $scope.d4=$scope.dor;
//           }
//         }

//         $scope.d4=$scope.d4.reverse();
//       }); 
//     };
//     $scope.getGraficoPrincipal();    







  }]);