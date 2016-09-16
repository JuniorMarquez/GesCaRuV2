'use strict';
app.controller('graficoAnimalCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', function($scope, $http, $filter,$modal, MyService,filterFilter) {
}]);

app.controller('IndexController', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig,dato,datosSolicitud) {
$scope.date = moment();
}]);

app.controller('creditoCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig) {
    // $scope.getGrafico =function(){
    //   $scope.nombre=MyService.data.animalConsultado.nombre;
    //   $http.get('http://localhost:1340/ordeno/?idAnimal='+MyService.data.animalConsultado.id).then(function (resp) {
    //     $scope.ordenosGrafico = resp.data.results;
    //     var cant = $scope.ordenosGrafico.length;
    //     $scope.ordenosGrafico.nombre=MyService.data.animalConsultado.nombre;
    //     $scope.ordenosGrafico.cant=cant;
    //     $scope.d=[]; 
    //     $scope.suma=0;
    //     $scope.promedio=0;
    //     $scope.ordenosGrafico=$scope.ordenosGrafico.reverse();
    //     if ($scope.ordenosGrafico.length>9){
    //       var e = 10;
    //       for (var i= 0; i < 10; i++){
    //         var ind = [];
    //         ind[i,1]= $scope.ordenosGrafico[i].cantidad;
    //         $scope.suma = $scope.suma +  $scope.ordenosGrafico[i].cantidad;
    //         $scope.promedio=$scope.suma/10;
    //         ind[e,0]=e;
    //         e=e-1;
    //         $scope.d[i]=ind;
    //         $scope.d3=$scope.d;
    //       }
    //     }
    //     var reverso =$scope.d3.reverse();
    //     $scope.d3=reverso;
    //   }); 
    // };
    // $scope.getGrafico();    


    $scope.today = function() {
      $scope.fechaInicio = new Date();
    };
    // $scope.today();

    $scope.clear = function () {
      $scope.fechaFin = null;
    };


    // Disable weekend selection
    // $scope.disabled = function(date, mode) {
    //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    // };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };
     $scope.open2 = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened2 = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = 'MM/dd/yyyy';
    $scope.tbOptions = {
    filterText: ''};
    $scope.filter = '';
      $scope.tbOptions = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    $scope.filter = '';
      $scope.tbOptions2 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
     $scope.tbOptions3 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    $scope.tbOptions4 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    $scope.tbOptions5 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };

    $scope.calculoNuevo=function(item){
        $scope.item.intereses=((($scope.item.solicitado)*($scope.item.tasaInteres)/100)*($scope.item.numeroMeses*30))/360;
    };
    $scope.getSolicitudes = function () {
      $scope.solicitudes=null;
      $http.get('http://localhost:1340/credito/').then(function (resp) {
        $scope.solicitudes = resp.data.results;
        var bandera="";
        var bandera2="";
        $scope.solicitudes2=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        var conversations = $scope.solicitudes;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;

        if ($scope.solicitudes && $scope.solicitudes.length > 0){
          for (var i=0;i < $scope.solicitudes.length;i++){
            var conversationDate1 =  $scope.solicitudes[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
            if (conversationDate >= start_date && conversationDate <= end_date){
              result.push($scope.solicitudes[i]);
            }
            $scope.solicitudes2=result;
          }
        }
        var identif=0;
        for (var i  = 0; i<$scope.solicitudes2.length;i++){
          bandera = $scope.solicitudes2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.solicitudes2[i].createdAtFormateada=bandera2;
          identif=$scope.solicitudes2[i].id;  
          $scope.solicitudes2[i].accion="<button onclick=\"angular.element(this).scope().openAprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Aprobar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
   $scope.solicitudes2[i].accion2="<button onclick=\"angular.element(this).scope().openNegar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Negar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        


        }
        $scope.solicitudes2=$scope.solicitudes2.reverse();
        $scope.tbOptions.data = $scope.solicitudes2;
        $scope.tbOptions.aoColumns=[
          { mData: 'createdAtFormateada' },
            { mData: 'numero' }  ,
          { mData: 'numeroDeCcp' }  ,
            { mData: 'montoSolicitado' }  ,
                { mData: 'numeroMeses' }   ,
          { mData: 'estado' },
           { mData: 'accion' },
               { mData: 'accion2' }
              // { defaultContent: "<button onclick=\"angular.element(this).scope().openSolicitud($(this).parents('tr').data())\">Abrir!</button>" }                         
          ];




      });
    };
$scope.carga=function(){
// $(document).ready(function() {
//     // var table = $('#tabla').DataTable( {

//     //     "columnDefs": [ {
//     //         "targets": -1,
//     //         "data": null,
//     //         "defaultContent": "<button>Click!</button>"
//     //     } ]
//     // } );
 
//     $('#dataTable tbody').on( 'click', 'button', function () {
//         // var data = table.row( $(this).parents('tr') ).data();
//         alert( "'s salary is: " );
//     } );
// } );


};
$scope.carga();


$scope.sumaFecha = function(dias, fecha)
{
 fecha= new Date(fecha);
 fecha.setDate(fecha.getDate()+parseInt(dias));

 $scope.item.fechaVencimiento=fecha;
 return (fecha);
 }



    $scope.item=[];

$scope.openAprobacion = function (iden,timeout) {

    var item=[];
  var dato="";
 
  var datosCuenta="";
  $http.get('http://localhost:1340/credito/'+iden).success(function(respuesta){
                // if ($scope.email=== 'undefined'){$scope.mensaje="usuario no registrado"}
                     // if (vm.dato !== vm.login.usuario){vm.login.mensaje="usuario no registrado"}
    $scope.credito = respuesta;
        //alert("fecha lequidacion: "+respuesta.createdAt);
    $scope.item.fechaLiquidacion=respuesta.createdAt;
    $scope.item.numeroMeses=respuesta.numeroMeses;
     $scope.item.montoSolicitado=respuesta.montoSolicitado;
     $scope.item.montoIntereses=respuesta.montoIntereses;
     $scope.item.montoCuota=respuesta.montoCuota;
     $scope.item.montoTotalAPagar=respuesta.montoTotalAPagar;
     $scope.item.equivalente=respuesta.equivalente;
     $scope.item.fiadorUno=respuesta.fiadorUno;
    $scope.item.fiadorDos=respuesta.fiadorDos;
    $scope.item.estado=respuesta.estado;
    $scope.item.fiadorUno=respuesta.estado;
$scope.item.numero=respuesta.numero;
$scope.item.proposito=respuesta.proposito;
$scope.item.tasaInteres=respuesta.tasaInteres;
$scope.item.precioCcp=respuesta.precioCcp;
$scope.item.tipoDeCredito=respuesta.tipoDeCredito;           
  });
  setTimeout(function() {
  var dias=0;
  dias=($scope.item.numeroMeses*30);
var fecha = $scope.item.fechaLiquidacion;
  $scope.sumaFecha(dias,fecha);
  //alert("hey"+$scope.item.fechaVencimiento);
item=$scope.item;
 // alert(""+item.fechaVencimiento);
 
    
datosCuenta=$scope.item;

$scope.item.datosCuenta=datosCuenta;
  // alert ("hola"+item.fechaLiquidacion);

  }, 300);


setTimeout(function() {  var modalInstance = $modal.open({
    templateUrl: 'modalAprobacion.html',
    controller: 'ModalInstanceCtrl',
    size: 'lg',
    resolve: {

           dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
     // $log.info('Modal dismissed at: ' + new Date());
    });}, 300);
  };







$scope.openNegar = function (iden,timeout) {

    var item=[];
  var dato="";
 
  var datosCuenta="";
  $http.get('http://localhost:1340/credito/'+iden).success(function(respuesta){
                // if ($scope.email=== 'undefined'){$scope.mensaje="usuario no registrado"}
                     // if (vm.dato !== vm.login.usuario){vm.login.mensaje="usuario no registrado"}
    $scope.credito = respuesta;
        //alert("fecha lequidacion: "+respuesta.createdAt);
    $scope.item.fechaLiquidacion=respuesta.createdAt;
    $scope.item.numeroMeses=respuesta.numeroMeses;
     $scope.item.montoSolicitado=respuesta.montoSolicitado;
     $scope.item.montoIntereses=respuesta.montoIntereses;
     $scope.item.montoCuota=respuesta.montoCuota;
     $scope.item.montoTotalAPagar=respuesta.montoTotalAPagar;
     $scope.item.equivalente=respuesta.equivalente;
     $scope.item.fiadorUno=respuesta.fiadorUno;
    $scope.item.fiadorDos=respuesta.fiadorDos;
    $scope.item.estado=respuesta.estado;
    $scope.item.fiadorUno=respuesta.estado;
$scope.item.numero=respuesta.numero;
$scope.item.proposito=respuesta.proposito;
$scope.item.tasaInteres=respuesta.tasaInteres;
$scope.item.precioCcp=respuesta.precioCcp;
$scope.item.tipoDeCredito=respuesta.tipoDeCredito;           
  });
  setTimeout(function() {
  var dias=0;
  dias=($scope.item.numeroMeses*30);
var fecha = $scope.item.fechaLiquidacion;
  $scope.sumaFecha(dias,fecha);
  //alert("hey"+$scope.item.fechaVencimiento);
item=$scope.item;
 // alert(""+item.fechaVencimiento);
 
    
datosCuenta=$scope.item;

$scope.item.datosCuenta=datosCuenta;
  // alert ("hola"+item.fechaLiquidacion);

  }, 300);


setTimeout(function() {  var modalInstance = $modal.open({
    templateUrl: 'modalNegar.html',
    controller: 'ModalInstanceCtrl',
    size: 'sm',
    resolve: {

           dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
     // $log.info('Modal dismissed at: ' + new Date());
    });}, 300);
  };









    $scope.getSolicitudes();
    // $scope.getTratamientos = function () {
    //   $scope.tratamientos=null;
    //   $http.get('http://localhost:1340/tratamiento/?idAnimal='+MyService.data.animalConsultado.id).then(function (resp) {
    //     $scope.tratamientos = resp.data.results;
    //     var bandera="";
    //     var bandera2="";
    //     $scope.tratamientos2=[];
    //     var date = new Date();
    //     var mes = date.getMonth();
    //     var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //     var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    //     var result = [];
    //     $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
    //     $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
    //     var conversations = $scope.tratamientos;
    //     var start_date =  Date.parse(firstDay);
    //     var end_date = Date.parse(lastDay);
    //     end_date=end_date+86400000;

    //     if ($scope.tratamientos && $scope.tratamientos.length > 0){
    //       for (var i=0;i < $scope.tratamientos.length;i++){
    //         var conversationDate1 =  $scope.tratamientos[i].createdAt;
    //         var conversationDate=Date.parse(conversationDate1);
    //         if (conversationDate >= start_date && conversationDate <= end_date){
    //           result.push($scope.tratamientos[i]);
    //         }
    //         $scope.tratamientos2=result;
    //       }
    //     }
    //     for (var i  = 0; i<$scope.tratamientos2.length;i++){
    //       bandera = $scope.tratamientos2[i].createdAt;
    //       bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
    //       $scope.tratamientos2[i].createdAtFormateada=bandera2;
    //     }
    //     $scope.tratamientos2=$scope.tratamientos2.reverse();
    //     $scope.tbOptions5.data = $scope.tratamientos2;
    //     $scope.tbOptions5.aoColumns=[
    //       { mData: 'createdAtFormateada' },
    //       { mData: 'descripcion' },
    //       { mData: 'observaciones' },

    //       ];
    //   });
    // };

    // $scope.getTratamientos();
 
    // $scope.getBanos = function () {
    //   $scope.banos=null;
    //   $http.get('http://localhost:1340/sumbano/?idAnimal='+MyService.data.animalConsultado.id).then(function (resp) {
    //     $scope.banos = resp.data.results;
    //     var bandera="";
    //     var bandera2="";
    //     $scope.banos2=[];
    //     var date = new Date();
    //     var mes = date.getMonth();
    //     var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //     var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    //     var result = [];
    //     var conversations = $scope.banos;
    //     var start_date =  Date.parse(firstDay);
    //     var end_date = Date.parse(lastDay);
    //     end_date=end_date+86400000;

    //     if ($scope.banos && $scope.banos.length > 0){
    //       for (var i=0;i < $scope.banos.length;i++){
    //         var conversationDate1 =  $scope.banos[i].createdAt;
    //         var conversationDate=Date.parse(conversationDate1);
    //         if (conversationDate >= start_date && conversationDate <= end_date){
    //           result.push($scope.banos[i]);
    //         }
    //         $scope.banos2=result;
    //       }
    //     }
    //     for (var i  = 0; i<$scope.banos2.length;i++){
    //       bandera = $scope.banos2[i].createdAt;
    //       bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
    //       $scope.banos2[i].createdAtFormateada=bandera2;
    //     }
    //     $scope.banos2=$scope.banos2.reverse();
    //     $scope.tbOptions2.data = $scope.banos2;
    //     $scope.tbOptions2.aoColumns=[
    //       { mData: 'createdAtFormateada' },
    //       { mData: 'descripcion.descripcion' },
    //       { mData: 'descripcion.TipoBano' },
    //       { mData: 'observaciones' }                              
    //       ];
    //   });
    // };

    // $scope.getBanos();

    // $scope.getMedicamentos = function () {
    //   $scope.medicamentos=null;
    //   $http.get('http://localhost:1340/summedicamento/?idAnimal='+MyService.data.animalConsultado.id).then(function (resp) {
    //     $scope.medicamentos = resp.data.results;
    //     var bandera="";
    //     var bandera2="";
    //     $scope.medicamentos2=[];
    //     var date = new Date();
    //     var mes = date.getMonth();
    //     var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //     var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    //     var result = [];
    //     var conversations = $scope.medicamentos;
    //     var start_date =  Date.parse(firstDay);
    //     var end_date = Date.parse(lastDay);
    //     end_date=end_date+86400000;

    //     if ($scope.medicamentos && $scope.medicamentos.length > 0){
    //       for (var i=0;i < $scope.medicamentos.length;i++){
    //         var conversationDate1 =  $scope.medicamentos[i].createdAt;
    //         var conversationDate=Date.parse(conversationDate1);
    //         if (conversationDate >= start_date && conversationDate <= end_date){
    //           result.push($scope.medicamentos[i]);
    //         }
    //         $scope.medicamentos2=result;
    //       }
    //     }
    //     for (var i  = 0; i<$scope.medicamentos2.length;i++){
    //       bandera = $scope.medicamentos2[i].createdAt;
    //       bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
    //       $scope.medicamentos2[i].createdAtFormateada=bandera2;
    //     }
    //     $scope.medicamentos2=$scope.medicamentos2.reverse();
    //     $scope.tbOptions3.data = $scope.medicamentos2;
    //     $scope.tbOptions3.aoColumns=[
    //       { mData: 'createdAtFormateada' },
    //       { mData: 'medicamento.descripcion' },
    //       { mData: 'medicamento.tipoMedicamento' },
    //       { mData: 'observaciones' }                              
    //       ];
    //   });
    // };

    // $scope.getMedicamentos();

    // $scope.getSaltos = function () {
    //   $scope.saltos=null;
    //   $http.get('http://localhost:1340/salto/?idAnimal='+MyService.data.animalConsultado.id).then(function (resp) {
    //     $scope.saltos = resp.data.results;
    //     var bandera="";
    //     var bandera2="";
    //     // $scope.saltos2=[];
    //     var date = new Date();
    //     var mes = date.getMonth();
    //     var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //     var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    //     var result = [];
    //     var conversations = $scope.saltos;
    //     var start_date =  Date.parse(firstDay);
    //     var end_date = Date.parse(lastDay);
    //     end_date=end_date+86400000;

    //     if ($scope.saltos && $scope.saltos.length > 0){
    //       for (var i=0;i < $scope.saltos.length;i++){
    //         var conversationDate1 =  $scope.saltos[i].createdAt;
    //         var conversationDate=Date.parse(conversationDate1);
    //         if (conversationDate >= start_date && conversationDate <= end_date){
    //           result.push($scope.saltos[i]);
    //         }
    //         $scope.saltos2=result;
    //       }
    //     }
    //     for (var i  = 0; i<$scope.saltos2.length;i++){
    //       bandera = $scope.saltos2[i].createdAt;
    //       bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
    //       $scope.saltos2[i].createdAtFormateada=bandera2;
    //     }
    //     $scope.saltos2=$scope.saltos2.reverse();
    //     $scope.tbOptions4.data = $scope.saltos2;
    //     $scope.tbOptions4.aoColumns=[
    //       { mData: 'createdAtFormateada' },
    //       { mData: 'macho.nombre' },
    //       { mData: 'observaciones' }                              
    //       ];
    //   });
    // };

    // $scope.getSaltos();

    // $scope.getPromedio =function(){
    //   $scope.ordenosPromedio=null;
    //   $http.get('http://localhost:1340/ordeno').then(function (resp) {
    //     $scope.ordenosPromedio = resp.data.results;
    //     $scope.sumaTotal=0;
    //     $scope.promedioTotal=0;
    //     for (var i= 0; i < $scope.ordenosPromedio.length; i++){
    //       $scope.sumaTotal = $scope.sumaTotal +  $scope.ordenosPromedio[i].cantidad;
    //     } 
    //     $scope.promedioTotal=$scope.sumaTotal/($scope.ordenosPromedio.length);
    //     // alert("suma total:"+$scope.ordenosPromedio.length);
    //   }); 
    // };

    // $scope.getPromedio();

  //   $scope.getBanos2 = function () {
  //   $scope.banosSegundo=null;
  //   $http.get('http://localhost:1340/bano/?idAnimal='+MyService.data.animalConsultado.id).then(function (resp) {
  //     $scope.banosSegundo = resp.data.results;  
  //     var bandera="";
  //     var bandera2="";
  //     $scope.ordenos3=[];
  //     var result2 = [];
  //     var conversations2 = $scope.banosSegundo;
  //     var start_date2 =  Date.parse($scope.fechaInicio) ;  
  //     var end_date2 = Date.parse($scope.fechaFin);   
  //     end_date2=end_date2+86400000;
  //     if ($scope.banosSegundo && $scope.banosSegundo.length > 0){
  //       var conversationDate =0;
  //       for (var i=0;i < $scope.banosSegundo.length;i++){
  //         conversationDate=Date.parse($scope.banosSegundo[i].createdAt);
  //         if (conversationDate >= start_date2 && conversationDate <= end_date2){
  //           result2.push($scope.banosSegundo[i]);
  //         }
  //         $scope.banos2=result2;   
  //       }
  //     }
  //     for (var i  = 0; i<$scope.banos2.length;i++){
  //       bandera = $scope.banos2[i].createdAt;
  //       bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
  //       $scope.banos2[i].createdAtFormateada=bandera2;
  //       }
  //     $scope.banos2=$scope.banos2.reverse();
  //     $scope.tbOptions2.data = $scope.banos2;
  //     $scope.tbOptions2.aaData = result2;
  //   });   
  // };

  //   $scope.getSaltos2 = function () {
  //     $scope.saltosSegundo=null;
  //     $http.get('http://localhost:1340/salto/?idAnimal='+MyService.data.animalConsultado.id).then(function (resp) {
  //       $scope.saltosSegundo = resp.data.results;  
  //       var bandera="";
  //       var bandera2="";
  //       $scope.ordenos3=[];
  //       var result2 = [];
  //       var conversations2 = $scope.saltosSegundo;
  //       var start_date2 =  Date.parse($scope.fechaInicio) ;  
  //       var end_date2 = Date.parse($scope.fechaFin);   
  //       end_date2=end_date2+86400000;
  //       if ($scope.saltosSegundo && $scope.saltosSegundo.length > 0){
  //         var conversationDate =0;
  //         for (var i=0;i < $scope.saltosSegundo.length;i++){
  //           conversationDate=Date.parse($scope.saltosSegundo[i].createdAt);
  //           if (conversationDate >= start_date2 && conversationDate <= end_date2){
  //             result2.push($scope.saltosSegundo[i]);
  //           }
  //           $scope.saltos2=result2;   
  //         }
  //       }
  //       for (var i  = 0; i<$scope.saltos2.length;i++){
  //         bandera = $scope.saltos2[i].createdAt;
  //         bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
  //         $scope.saltos2[i].createdAtFormateada=bandera2;
  //         }
  //       $scope.saltos2=$scope.saltos2.reverse();
  //       $scope.tbOptions4.data = $scope.saltos2;
  //       $scope.tbOptions4.aaData = result2;
  //     });   
  //   };


  //   $scope.getMedicamentos2 = function () {
  //     $scope.medicamentosSegundo=null;
  //     $http.get('http://localhost:1340/medicamento/?idAnimal='+MyService.data.animalConsultado.id).then(function (resp) {
  //       $scope.medicamentosSegundo = resp.data.results;  
  //       var bandera="";
  //       var bandera2="";
  //       $scope.ordenos3=[];
  //       var result2 = [];
  //       var conversations2 = $scope.medicamentosSegundo;
  //       var start_date2 =  Date.parse($scope.fechaInicio) ;  
  //       var end_date2 = Date.parse($scope.fechaFin);   
  //       end_date2=end_date2+86400000;
  //       if ($scope.medicamentosSegundo && $scope.medicamentosSegundo.length > 0){
  //         var conversationDate =0;
  //         for (var i=0;i < $scope.medicamentosSegundo.length;i++){
  //           conversationDate=Date.parse($scope.medicamentosSegundo[i].createdAt);
  //           if (conversationDate >= start_date2 && conversationDate <= end_date2){
  //             result2.push($scope.medicamentosSegundo[i]);
  //           }
  //           $scope.medicamentos2=result2;   
  //         }
  //       }
  //       for (var i  = 0; i<$scope.medicamentos2.length;i++){
  //         bandera = $scope.medicamentos2[i].createdAt;
  //         bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
  //         $scope.medicamentos2[i].createdAtFormateada=bandera2;
  //         }
  //       $scope.medicamentos2=$scope.medicamentos2.reverse();
  //       $scope.tbOptions3.data = $scope.medicamentos2;
  //       $scope.tbOptions3.aaData = result2;
  //     });   
  //   };

  //   $scope.getTratamientos2 = function () {
  //     $scope.tratamientosSegundo=null;
  //     $http.get('http://localhost:1340/tratamiento/?idAnimal='+MyService.data.animalConsultado.id).then(function (resp) {
  //       $scope.tratamientosSegundo = resp.data.results;  
  //       var bandera="";
  //       var bandera2="";
  //       $scope.tratamientos2=[];
  //       var result2 = [];
  //       var conversations2 = $scope.tratamientosSegundo;
  //       var start_date2 =  Date.parse($scope.fechaInicio) ;  
  //       var end_date2 = Date.parse($scope.fechaFin);   
  //       end_date2=end_date2+86400000;
  //       if ($scope.tratamientosSegundo && $scope.tratamientosSegundo.length > 0){
  //         var conversationDate =0;
  //         for (var i=0;i < $scope.tratamientosSegundo.length;i++){
  //           conversationDate=Date.parse($scope.tratamientosSegundo[i].createdAt);
  //           if (conversationDate >= start_date2 && conversationDate <= end_date2){
  //             result2.push($scope.tratamientosSegundo[i]);
  //           }
  //           $scope.tratamientos2=result2;   
  //         }
  //       }
  //       for (var i  = 0; i<$scope.tratamientos2.length;i++){
  //         bandera = $scope.tratamientos2[i].createdAt;
  //         bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
  //         $scope.tratamientos2[i].createdAtFormateada=bandera2;
  //         }
  //       $scope.tratamientos2=$scope.tratamientos2.reverse();
  //       $scope.tbOptions5.data = $scope.tratamientos2;
  //       $scope.tbOptions5.aaData = result2;
  //     });   
  //   };

    $scope.getSolicitudes2 = function () {
    $scope.solicitudesSegundo=null;
    $http.get('http://localhost:1340/credito/').then(function (resp) {
      $scope.solicitudesSegundo = resp.data.results;  
      var bandera="";
      var bandera2="";
      $scope.ordenos3=[];
      var result2 = [];
      var conversations2 = $scope.solicitudesSegundo;
      var start_date2 =  Date.parse($scope.fechaInicio) ;  
      var end_date2 = Date.parse($scope.fechaFin);   
      end_date2=end_date2+86400000;
      if ($scope.solicitudesSegundo && $scope.solicitudesSegundo.length > 0){
        var conversationDate =0;
        for (var i=0;i < $scope.solicitudesSegundo.length;i++){
          conversationDate=Date.parse($scope.solicitudesSegundo[i].createdAt);
          if (conversationDate >= start_date2 && conversationDate <= end_date2){
            result2.push($scope.solicitudesSegundo[i]);
          }
          $scope.solicitudes2=result2;   
        }
      }


        var identif=0;
        for (var i  = 0; i<$scope.solicitudes2.length;i++){
          bandera = $scope.solicitudes2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.solicitudes2[i].createdAtFormateada=bandera2;
          identif=$scope.solicitudes2[i].id;  
          $scope.solicitudes2[i].accion="<button onclick=\"angular.element(this).scope().openAprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Aprobar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        


        }
        $scope.solicitudes2=$scope.solicitudes2.reverse();
        $scope.tbOptions.data = $scope.solicitudes2;
        // $scope.tbOptions.aoColumns=[
        //   { mData: 'createdAtFormateada' },
        //     { mData: 'numero' }  ,
        //   { mData: 'numeroDeCcp' }  ,
        //     { mData: 'montoSolicitado' }  ,
        //         { mData: 'numeroMeses' }   ,
        //   { mData: 'estado' },
        //    { mData: 'accion' }
              // { defaultContent: "<button onclick=\"angular.element(this).scope().openSolicitud($(this).parents('tr').data())\">Abrir!</button>" }                         
          // ];

      // for (var i  = 0; i<$scope.solicitudes2.length;i++){
      //   bandera = $scope.solicitudes2[i].createdAt;
      //   bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
      //   $scope.solicitudes2[i].createdAtFormateada=bandera2;
      //   }
      // $scope.solicitudes2=$scope.solicitudes2.reverse();
      // $scope.tbOptions.data = $scope.ordenos2;
      $scope.tbOptions.aaData = result2;




    }); 
    // $scope.getBanos2(); 
    // $scope.getMedicamentos2(); 
    // $scope.getSaltos2();  
    // $scope.getTratamientos2(); 
  };
}]);
