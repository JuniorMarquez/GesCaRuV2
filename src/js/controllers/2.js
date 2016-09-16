  
$scope.tbOptions3 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
$scope.consultaCcp=function(item,$timeout){
var identificador = item.propietario.id;
// alert("dato"+identificador);
 $http.get('http://localhost:1340/operacionesCcp/?id_socio='+identificador).then(function (resp) {
      $scope.operacionesCcp = resp.data.results;
    });
     setTimeout(function() {var totalCcp = 0;
      for (var i= 0; i < $scope.operacionesCcp.length ; i++){
            totalCcp = totalCcp+parseInt($scope.operacionesCcp[i].cantidad);
          }
    $scope.item.totalCcp=totalCcp;}, 500);
    

};
$scope.entrar=function(item,$timeout){
  $scope.item.id=MyService.data.identificador;
  $scope.operacionesCuentaAhorro={};
 


// alert("item" +item.id);
 $http.get('http://localhost:1340/opcuah/?idSocio='+item.id).then(function (resp) {
              $scope.operacionesCuentaAhorro = resp.data.results;
               
              // alert("tamaño: "+$scope.operacionesCuentaAhorro.length);
            });



 
 for (var i= 0; i < $scope.operacionesCuentaAhorro.length ; i++){
                if ($scope.operacionesCuentaAhorro[i].tipoOperacion=="retiro"){
                  $scope.tabla[i].fecha=$scope.operacionesCuentaAhorro[i].createdAt;
                  $scope.tabla[i].descripcion="Retiro cta. ahorro";
                  $scope.tabla[i].ingreso="";
                  $scope.tabla[i].egreso=$scope.operacionesCuentaAhorro[i].monto;
                } 
                else {
                  $scope.tabla[i].fecha=$scope.operacionesCuentaAhorro[i].createdAt;
                  $scope.tabla[i].descripcion="Deposito cta. ahorro";
                  $scope.tabla[i].ingreso=$scope.operacionesCuentaAhorro[i].monto;
                  $scope.tabla[i].egreso="";
                } 
         // $scope.tbOptions3.aaData = $scope.tabla;
              };

setTimeout(function() {
  // alert("tamaño t: "+$scope.operacionesCuentaAhorro.length);

               $scope.tbOptions3.data = $scope.operacionesCuentaAhorro;
                  $scope.tbOptions3.aoColumns=[
          { mData: 'createdAt' },
          { mData: 'monto' },
          { mData: 'idSocio' },
          { mData: 'tipoOperacion' }                              
          ];
        }, 200);




  
};

/*$scope.tbOptions3.data = $scope.tabla;
         $scope.tbOptions3.aaData = $scope.tabla;*/
     $scope.limpiar = function (item){
    
      $scope.item.cuenta="";
    };
  $scope.consultaCuentas = function (item){
    $scope.item.cuenta="";
       $http.get('http://localhost:1340/cuent/?idSocio='+item.socio.id).then(function (resp2) {
    $scope.cuentas = resp2.data.results;

       });
    };
     $scope.registrarDeposito = function (item){
      item.tipoOperacion="deposito";
      var registro={};
      registro.monto=item.monto;
      registro.idSocio=item.socio.id;
      registro.idCuenta=item.cuenta.id;
      registro.tipoOperacion="deposito";
         $http.post('http://localhost:1340/opcuah/', registro);
           $modalInstance.close();
    };

    $scope.registrarTraspaso=function(item){
      var operacion={};
      operacion.id_socio=item.acreedor.id;
      operacion.tipoOperacion='traspaso';
      operacion.precioCcp=MyService.data.valorCcp;
      operacion.cantidad=item.cantidad;
      operacion.monto=item.monto;
      var operacion2={};
      operacion2.id_socio=item.propietario.id;
      operacion2.tipoOperacion='traspaso';
      operacion2.precioCcp=MyService.data.valorCcp;
      operacion2.cantidad=item.cantidad*(-1);
      operacion2.monto=item.cantidad*;
      $http.post('http://localhost:1340/operacionesccp/' ,operacion);
        $http.post('http://localhost:1340/operacionesccp/' ,operacion2);
            $modalInstance.close();
    };
    $scope.registrarCompra=function(item){
     var operacion={};
      operacion.id_socio=item.propietario.id;
      operacion.tipoOperacion='compra';


      operacion.precioCcp=MyService.data.valorCcp;
      operacion.cantidad=item.cantidad;
      operacion.monto=item.cantidad*MyService.data.valorCcp;

        $http.post('http://localhost:1340/operacionesccp/' ,operacion);
      
      $modalInstance.close();
    };




    $scope.registrarRetiro = function (item){
      item.tipoOperacion="retiro";
      var registro={};
      registro.monto=item.monto;
      registro.idSocio=item.socio.id;
      registro.idCuenta=item.cuenta.id;
      registro.tipoOperacion="retiro";
         $http.post('http://localhost:1340/opcuah/', registro);
           $modalInstance.close();
    };

    // $scope.item={};
    // $scope.items = items;
    // $scope.selected = {
    //   item: $scope.items[0]
    // };
     // alert("dato: "+MyService.data.valorCcp);
    $http.get('http://localhost:1340/socio/').then(function (resp) {
   $scope.socios = resp.data.results;

  });