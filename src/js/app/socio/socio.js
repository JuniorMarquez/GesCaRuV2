
app.controller('SocioCtrl', ['$scope', '$state','$http', '$filter', '$modal', 'MyService', 'filterFilter', 'toaster',  function($scope,  $state ,$http, $filter,$modal, MyService, filterFilter, toaster) {
 
  $scope.toaster = {
    type3: 'info',
    text3: 'El Socio ha sido borrado',
    title3: 'Información',
    type4: 'success',
    text4: 'Socio agregado con exito',
    title4: 'Exito',
    type5: 'info',
    text5: 'Socio editado con exito',
    title5: 'Información',
  };

  $scope.filter = '';
  $scope.mensajePrenez = 'Registrar / anular estado de preñéz del animal';
    
  $scope.today = function() {
    $scope.fechaNacimiento = new Date();
  };
 

  $scope.clear = function () {
    $scope.fechaNacimiento = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = 'shortDate';

$scope.selectGroup2 = function(item){  
MyService.data.luz=null; 
    MyService.data.grupo=item.grupo;
    angular.forEach($scope.groups, function(item) {
      item.selected = false;
    });
    $scope.group = item;
    $scope.filter = item.name;
    $http.get('http://192.168.1.120:1340/socio').then(function (resp) {
    $scope.items = resp.data.results;
    });
    $scope.selectItem2(MyService.data.socio);
  };
$scope.selectItem2 = function(item){  

     $http.get('http://192.168.1.120:1340/socio').then(function (resp) {
      $scope.items = resp.data.results;
    });
    var identificador =item.id;
    MyService.data.identificador = identificador;
    angular.forEach($scope.items, function(item) {
      item.selected = true;
      item.editing = false;
    });
    $scope.item = item;
    $scope.item.selected = true;
    $http.get('http://192.168.1.120:1340/socio').then(function (resp) {
      $scope.socios = resp.data.results;
    });
  };
    if (MyService.data.luz){
        $scope.items = null;
        $scope.selectGroup2(MyService.data.socio);
        MyService.data.luz=null;
        MyService.data.socio=null;
    };
  $scope.items={};
  
  $http.get('http://localhost:1340/tipousuario/?idCaja='+MyService.data.idCaja).then(function (resp) {
    $scope.groups = resp.data.results;
  });

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  $scope.pop2 = function(){
    toaster.pop($scope.toaster.type3, $scope.toaster.title3, $scope.toaster.text3);
  };
  $scope.pop3 = function(){
    toaster.pop($scope.toaster.type4, $scope.toaster.title4, $scope.toaster.text4);
  };
  $scope.pop4 = function(){
    toaster.pop($scope.toaster.type5, $scope.toaster.title5, $scope.toaster.text5);
  };
  $scope.pop6 = function(){
    if ($scope.item.prenez == true){
      toaster.pop($scope.toaster.type6, $scope.toaster.title6, $scope.toaster.text6);
      }
    if ($scope.item.prenez == false){
      toaster.pop($scope.toaster.type7, $scope.toaster.title7, $scope.toaster.text7);
      }
  };    
  $scope.pop = function(){
    if ($scope.item.estado == true){
      toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
    }
    if ($scope.item.estado == false){
      toaster.pop($scope.toaster.type2, $scope.toaster.title2, $scope.toaster.text2);
    }
  };

  $scope.openConfirm = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirm.html',
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
        $scope.item = null;  
        $scope.pop2();
        
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openBano = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
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
  $scope.validadorCuentaAhorro=function (item){


     $http.get('http://localhost:1340/cuent/?idCaja='+MyService.data.idCaja).then(function (resp) {
    $scope.cuentas = resp.data.results;
        var validadorCuenta='false';
    for (var i= 0; i < $scope.cuentas.length ; i++){
            if  ($scope.cuentas[i].idSocio==item.id){
              validadorCuenta = 'true';
              var datosCuenta=$scope.cuentas[i];
            }
          }
          if (validadorCuenta=='true'){ $scope.openCuentaAhorro(item,datosCuenta);}
          if (validadorCuenta=='false'){
            var datosCuenta=null;
           $scope.openAperturaCuentaAhorro(item);}
  });
     
        
  };
  $scope.openCuentaAhorro = function (item,datosCuenta) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalCuentaAhorro.html',
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
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openAperturaCuentaAhorro = function (item,datosCuenta) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalAperturaCuentaAhorro.html',
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
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
   $scope.openSumAlimento = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalSumAlimento.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
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
  $scope.openSumMedicamento = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalSumMedicamento.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
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

  $scope.openOperacionesCcp = function (item) {
    $scope.item.valorCcp=MyService.data.valorCcp;
    var datosCuenta=null;
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalOperacionesCcp.html',
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
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openTratamiento = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalTratamiento.html',
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
 
  $scope.openAsistencia = function (item) {
    var identificador=item.id;
    item.fechaAsistencia=new Date();
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalAsistencia.html',
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
 
  $scope.disabled = undefined;
  $scope.searchEnabled = undefined;

  $scope.enable = function() {
    $scope.disabled = false;
  };

  $scope.disable = function() {
    $scope.disabled = true;
  };

  $scope.enableSearch = function() {
    $scope.searchEnabled = true;
  }

  $scope.disableSearch = function() {
    $scope.searchEnabled = false;
  }

  $scope.clear = function() {
    $scope.person.selected = undefined;
    $scope.address.selected = undefined;
    $scope.country.selected = undefined;
  };

  $scope.createGroup = function(){
    var group = {name: 'Nuevo grupo'};          
    group.name = $scope.checkItem(group, $scope.groups, 'name');
    group.idUsuario = MyService.data.idUsuario;
    // alert("dato: "+group.idUsuario);
    $scope.groups.push(group);
  };

  $scope.checkItem = function(obj, arr, key){
    var i=0;
    angular.forEach(arr, function(item) {
      if(item[key].indexOf( obj[key] ) == 0){
        var j = item[key].replace(obj[key], '').trim();
        if(j){
          i = Math.max(i, parseInt(j)+1);
        }else{
          i = 1;
        }
      }
    });
    return obj[key] + (i ? ' '+i : '');
  };

  $scope.deleteGroup = function(item){
    $http.delete('http://localhost:1340/grupo/'+item.id , item)
    $scope.groups.splice($scope.groups.indexOf(item), 1);
  };

  $scope.selectGroup = function(item){   
    MyService.data.grupo=item.name;
    // alert(item.name);
    angular.forEach($scope.groups, function(item) {
      item.selected = false;
    });
    $scope.group = item;
    $scope.group.selected = true;
    $scope.filter = item.tipoUsuario;

    $http.get('http://localhost:1340/socio/').then(function (resp) {
      $scope.items = resp.data.results;
      $scope.item = null;  
      // $scope.item.selected = true;
    });
  };

  $scope.selectItem = function(item){    
    var identificador =item.id;
    MyService.data.identificador = identificador;
    angular.forEach($scope.items, function(item) {
      item.selected = false;
      item.editing = false;
    });
    $scope.item = item;
    $scope.item.selected = true;
    $http.get('http://localhost:1340/socio').then(function (resp) {
      $scope.socios = resp.data.results;
    });
  };

  $scope.deleteItem = function(item){
    $http.delete('http://localhost:1340/socio/'+item.id , item)
    $scope.items.splice($scope.items.indexOf(item), 1);
    $scope.item = $filter('orderBy')($scope.items, 'nombre')[0];
    if($scope.item) $scope.item.selected = true;
  };

  $scope.deleteSocio = function(socio){
    $http.delete('http://localhost:1340/socio/'+socio.id , socio)
    $scope.sociosFiltrados.splice($scope.socios.indexOf(socio), 1);
    $scope.socio = $filter('orderBy')($scope.socios, 'nombres')[0];
    if($scope.socio) $scope.socio.selected = true;
  };

  $scope.createItem = function(){
    var item = {
      avatar:'img/cow.png',
      sexo:"Hembra",
      prenez:false,
      mensajeNuevo:"Presione \"Editar\" para ingresar datos",
      fechaNacimiento:"Por ingresar",
      idUsuario: MyService.data.idUsuario
    };
    
    $scope.items.push(item);
    $scope.selectItem(item);
    $scope.item.editing = true;
    $scope.item.mensajeNuevo=null;
    $scope.item.idUsuario = MyService.data.idUsuario;
    $http.get('http://localhost:1340/grupo/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
    $scope.groups = resp.data.results;
    }); 
  };
  
  $scope.editItem = function(item){
    if(item && item.selected){
      item.editing = true;
    }
  };

  $scope.doneEditingGrupo = function(item){
    item.editing = false;
    var grupoAct= {};
    MyService.data.idenGen= item.id;
    grupoAct.name=item.name;
    grupoAct.idUsuario=item.idUsuario;
    item.id=null;
    grupoAct.selected=item.selected;
    grupoAct.editing=item.editing;
    if (MyService.data.idenGen){
      $http.put('http://localhost:1340/tipousuario/'+MyService.data.idenGen, grupoAct)
    }
    else {
      $http.post('http://localhost:1340/tipousuario/', grupoAct)
    }
    $http.get('http://localhost:1340/tipousuario/?idCaja='+MyService.data.idCaja).then(function (resp) {
      $scope.groups = resp.data.results;
    });
    $scope.items = null;
    $scope.item = null;
    $scope.socios = null;
  };

  $scope.doneEditingSocio = function(item){
    var socioAct = {};
   
    MyService.data.idenSocio=item.id;
    
    socioAct.nombres=item.nombres;
    socioAct.apellidos=item.apellidos;
    socioAct.tipoUsuario=item.tipoUsuario;
    socioAct.cedula=item.cedula;

    socioAct.nacionalidad=item.nacionalidad;
    socioAct.estadoCivil=item.estadoCivil;

    socioAct.direccion=item.direccion;
    socioAct.telefono=item.telefono;
    socioAct.correo=item.correo;
    socioAct.idCaja=MyService.data.idCaja;

    socioAct.ingresoMensual=item.ingresoMensual;
    socioAct.profesion=item.profesion;
    socioAct.gradoDeInstruccion=item.gradoDeInstruccion;
    socioAct.ocupacion=item.ocupacion;
    socioAct.origenDeIngresos=item.origenDeIngresos;

    socioAct.usuario=item.usuario;
    socioAct.pass=item.pass;
    if (MyService.data.idenSocio){
      $scope.pop4();
      $http.put('http://localhost:1340/socio/'+MyService.data.idenSocio , socioAct)
    }
    else {
      $scope.pop3();;
      $http.post('http://localhost:1340/socio/', socioAct)
    }
    $http.get('http://localhost:1340/tipousuario/?idCaja='+MyService.data.idCaja).then(function (resp) {
      $scope.groups = resp.data.results;
    });
    $http.get('http://localhost:1340/socio').then(function (resp) {
      $scope.app.states = resp.data.results;
    });
  
    item.editing = false;
  };
 
}]);
