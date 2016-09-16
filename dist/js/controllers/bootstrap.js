'use strict';

/* Controllers */

  // bootstrap controller
  app.controller('AccordionDemoCtrl', ['$scope', function($scope) {
    $scope.oneAtATime = true;

    $scope.groups = [
      {
        title: 'Datos de contacto',
        content: 'Dynamic group body - #1'
      },
      {
        title: 'Otra información',
        content: 'Dynamic group body - #2'
      }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];
// $scope.ok = function(){
    
//   };
    $scope.addItem = function() {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
  }])
  ; 
  app.controller('AlertDemoCtrl', ['$scope', function($scope) {
    $scope.alerts = [
      { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
      { type: 'info', msg: 'Heads up! This alert needs your attention, but it is not super important.' },
      { type: 'warning', msg: 'Warning! Best check yo self, you are not looking too good...' }
    ];

    $scope.addAlert = function() {
      $scope.alerts.push({type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }])
  ; 
  app.controller('ButtonsDemoCtrl', ['$scope', function($scope) {
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
      left: false,
      middle: true,
      right: false
    };
  }])
  ; 
  app.controller('CarouselDemoCtrl', ['$scope', function($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      slides.push({
        image: 'img/c' + slides.length + '.jpg',
        text: ['Carousel text #0','Carousel text #1','Carousel text #2','Carousel text #3'][slides.length % 4]
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }
  }])
  ; 
  app.controller('DropdownDemoCtrl', ['$scope', function($scope) {
    $scope.items = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) {
      //console.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
  }])
  ;

  app.controller('ModalInstanceCtrl', [


'$scope', '$http', '$modalInstance', 'items', 'MyService', 'dato','datosCuenta', '$filter', '$modal','filterFilter', function($scope, $http, $modalInstance, items, MyService, dato,datosCuenta,$filter,$modal,filterFilter) {
    
$scope.tbOptions3 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
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


 // $http.get('http://localhost:1340/config/').then(function (resp) {
 //   $scope.configuraciones = resp.data.results;
 //      for (var i=0;i<$scope.configuraciones.length;++i){
 //        if($scope.configuraciones[i].idCaja==MyService.data.idCaja){
 //            $scope.config=$scope.configuraciones[i];
 //            MyService.data.valorCcp=$scope.config.precioCcp;
 //           }
 //      }
 //  });
 $scope.today = function() {
    $scope.fechaAsistencia = new Date();
  };
 

  $scope.clear = function () {
    $scope.fechaAsistencia = null;
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






$scope.item={};
$scope.item.mensaje="";
$scope.item.monto=0;
$scope.dato=[];
$scope.dato = dato;
$scope.item.datosCuenta=datosCuenta;
$scope.item.nombres=dato.nombres;
$scope.item.apellidos=dato.apellidos;
$scope.item.idSocio=dato.id;

 $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 

    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [250, 500, 1000],
        pageSize: 250,
        currentPage: 1
    }; 
    $scope.setPagingData = function(data, page, pageSize){  
        var pagedData = data.splice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
           var data ;
          // $http.get('http://localhost:1340/alimento/?idUsuario='+MyService.data.idUsuario).then(function (resp2) {
          //   $scope.alimentos = resp2.data.results;
          // });
//           data = $scope.alimentos;
// $scope.setPagingData(data,page,pageSize);


        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
 
    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
  


    $scope.mensajeBorrado="Al borrar este socio, se perderá de manera definitiva toda la información referente al mismo, está seguro de querer borrarlo?";
     $scope.okOperacionesCcp = function (item) {
     
      if (item.tipoOperacion=='Compra'){
         var operacion={};
      operacion.id_socio=item.idSocio;
      operacion.tipoOperacion='compra';
      operacion.precioCcp=item.valorCcp;
      operacion.cantidad=item.cantidad;
      operacion.monto=item.monto;
        $http.post('http://localhost:1340/operacionesccp/' ,operacion);
      }
      if (item.tipoOperacion=='Traspaso'){
         var operacion={};
      operacion.id_socio=item.acreedor.id;
      operacion.tipoOperacion='traspaso';
      operacion.precioCcp=item.valorCcp;
      operacion.cantidad=item.cantidad;
      operacion.monto=item.monto;
      var operacion2={};
      operacion2.id_socio=item.idSocio;
      operacion2.tipoOperacion='traspaso';
      operacion2.precioCcp=item.valorCcp;
      operacion2.cantidad=item.cantidad*(-1);
      operacion2.monto=item.monto;
      $http.post('http://localhost:1340/operacionesccp/' ,operacion);
        $http.post('http://localhost:1340/operacionesccp/' ,operacion2);
      }
      $modalInstance.close();

       
    };

    $scope.okSalto = function (item) {
      var idAnimal=MyService.data.identificador;
      item.idAnimal=idAnimal;
      item.idUsuario=MyService.data.idUsuario;
      item.hembra=MyService.data.hembra;
      item.numero=MyService.data.numero;
      $http.post('http://localhost:1340/salto/' ,item);  
      $modalInstance.close();
     
    };
$scope.limpiar=function(item){
  $scope.item.mensaje="";
};
$scope.calculoMonto=function(item){

  var monto = 0;
  var valorCcp = MyService.data.valorCcp;
 monto = valorCcp*item.cantidad
 $scope.item.valorCcp=valorCcp;
$scope.item.monto=monto;
};
    $scope.okAperturaCuenta = function (item){

var guachiman = false;
       $http.get('http://localhost:1340/cuent/?idCaja='+MyService.data.idCaja).then(function (resp) {
      $scope.cuentas = resp.data.results;
     for (var i=0;i<$scope.cuentas.length;++i){
        if($scope.cuentas[i].numeroCuenta==item.numeroCuenta){
            guachiman=true;
           }
      }
      if (guachiman==true)
      {

        $scope.item.mensaje="Este numero de cuenta ya se encuentra asignado";
      };
      if (guachiman==false){
     
        $scope.item.mensaje="";
         item.idUsuario=MyService.data.idUsuario;
      item.idCaja= MyService.data.idCaja;
      $http.post('http://localhost:1340/cuent/' ,item); 
      $modalInstance.close();
      };

  });
     
    };
    $scope.okTratamiento = function (item) {
      var idAnimal=MyService.data.identificador;
      item.idAnimal=idAnimal;
      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://localhost:1340/tratamiento/' ,item);  
      $modalInstance.close();
      // var pas = item._id;
      // $scope.ordenosFiltrados = $scope.ordenos.filter(function (ordeno) {
      //   return (ordeno.idAnimal == pas );
      // });
    };
    $scope.okOrdeno = function (item) {
      var idAnimal=MyService.data.identificador;
      item.idAnimal=idAnimal;
      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://localhost:1340/ordeno/' ,item);  
      $modalInstance.close();
      // var pas = item._id;
      // $scope.ordenosFiltrados = $scope.ordenos.filter(function (ordeno) {
      //   return (ordeno.idAnimal == pas );
      // });
    };
    $scope.machos=[];
    $scope.cargaMachos = function(){
      // $http.get('http://localhost:1340/animal/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
      //   $scope.animales = resp.data.results;
      //   for (var i=0;i<$scope.animales.length;++i){
      //     if($scope.animales[i].sexo=='Macho'){
      //       $scope.machos.push($scope.animales[i]);
      //     }
      //   }
      // });
    };
  // $scope.cargaMachos();
    $scope.cargaTiposBanos = function(){
      // $http.get('http://localhost:1340/tipoBano/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
      //   $scope.tiposBanos = resp.data.results;
      // });
    };
    $scope.cargaTiposMedicamentos = function(){
      // $http.get('http://localhost:1340/tipoMedicamento/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
      //   $scope.tiposMedicamentos = resp.data.results;
      // });
    };
    $scope.cargaBanos = function(){
      // $http.get('http://localhost:1340/bano/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
      //   $scope.Banos = resp.data.results;
      // });
    };
     $scope.cargaTiposAlimentos = function(){
      // $http.get('http://localhost:1340/tipoAlimento/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
      //   $scope.tiposAlimentos = resp.data.results;
      // });
    };
    $scope.cargaAlimentos = function(){
      // $http.get('http://localhost:1340/alimento/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
      //   $scope.alimentos = resp.data.results;
      // });
    };
    $scope.cargaMedicamentos = function(){
      // $http.get('http://localhost:1340/medicamento/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
      //   $scope.medicamentos = resp.data.results;
      // });
    };
    // $scope.cargaMedicamentos();
    // $scope.cargaAlimentos();
    // $scope.cargaBanos();
    // $scope.cargaTiposBanos();
    //   $scope.cargaTiposMedicamentos();
    //   $scope.cargaTiposAlimentos();

// ##########################################################################
// ##########################################################################
// ##########################################################################

// Esta funcion es la que se ejecuta al aceptar (ok) en el modal nuevo baño
// invocado desde el dashboard 

// ##########################################################################
// ##########################################################################
// ##########################################################################
$scope.okMedicamento = function (item) {

    // $scope.items = items;
    // $scope.selected = {
    //   item: $scope.items[0]
    // };
      // var idAnimal=MyService.data.identificador;
      // item.idAnimal=idAnimal;
       item.idUsuario=MyService.data.idUsuario;
      $http.post('http://localhost:1340/medicamento/' ,item);       
      $modalInstance.close();
    //   var pas = item._id;
    //   $scope.banosFiltrados = $scope.banos.filter(function (bano) {  
    //   return (bano.idAnimal == pas );
    // });


    };
    $scope.okAlimento = function (item) {

    // $scope.items = items;
    // $scope.selected = {
    //   item: $scope.items[0]
    // };
      // var idAnimal=MyService.data.identificador;
      // item.idAnimal=idAnimal;
       item.idUsuario=MyService.data.idUsuario;
      $http.post('http://localhost:1340/alimento/' ,item);       
      $modalInstance.close();
    //   var pas = item._id;
    //   $scope.banosFiltrados = $scope.banos.filter(function (bano) {  
    //   return (bano.idAnimal == pas );
    // });


    };
    $scope.okBano = function (item) {

    // $scope.items = items;
    // $scope.selected = {
    //   item: $scope.items[0]
    // };
      // var idAnimal=MyService.data.identificador;
      // item.idAnimal=idAnimal;
       item.idUsuario=MyService.data.idUsuario;
      $http.post('http://localhost:1340/bano/' ,item);       
      $modalInstance.close();
    //   var pas = item._id;
    //   $scope.banosFiltrados = $scope.banos.filter(function (bano) {  
    //   return (bano.idAnimal == pas );
    // });


    };
    $scope.okSumAlimento = function (item) {

    // $scope.items = items;
    // $scope.selected = {
    //   item: $scope.items[0]
    // };
      var idAnimal=MyService.data.identificador;
       item.idAnimal=idAnimal;
       item.idUsuario=MyService.data.idUsuario;
      $http.post('http://localhost:1340/sumAlimento/' ,item);       
      $modalInstance.close();
    //   var pas = item._id;
    //   $scope.banosFiltrados = $scope.banos.filter(function (bano) {  
    //   return (bano.idAnimal == pas );
    // });
    };
    $scope.okSumMedicamento = function (item) {

    // $scope.items = items;
    // $scope.selected = {
    //   item: $scope.items[0]
    // };
      var idAnimal=MyService.data.identificador;
       item.idAnimal=idAnimal;
       item.idUsuario=MyService.data.idUsuario;
      $http.post('http://localhost:1340/sumMedicamento/' ,item);       
      $modalInstance.close();
    //   var pas = item._id;
    //   $scope.banosFiltrados = $scope.banos.filter(function (bano) {  
    //   return (bano.idAnimal == pas );
    // });
    };
 $scope.okSumBano = function (item) {

    // $scope.items = items;
    // $scope.selected = {
    //   item: $scope.items[0]
    // };
      var idAnimal=MyService.data.identificador;
       item.idAnimal=idAnimal;
       item.idUsuario=MyService.data.idUsuario;
      $http.post('http://localhost:1340/sumBano/' ,item);       
      $modalInstance.close();
    //   var pas = item._id;
    //   $scope.banosFiltrados = $scope.banos.filter(function (bano) {  
    //   return (bano.idAnimal == pas );
    // });


    };
// ##########################################################################
// ##########################################################################
// ##########################################################################

// FIN

// ##########################################################################
// ##########################################################################
// ##########################################################################
    $scope.okConfirm = function (item) { 
      var idAnimal=MyService.data.identificador;
      $http.delete('http://localhost:1340/animal/'+idAnimal , item)
      // $scope.items.splice($scope.items.indexOf(item), 1);
      $scope.items = null;
      $scope.item = null;
      $scope.animales = null;  
      $modalInstance.close();
    };

    $scope.ok = function (item) {
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])
  ; 
  app.controller('ModalDemoCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];




    $scope.open = function (item) {
      var identificador =item.id;
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
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
  }])
  ; 
  app.controller('PaginationDemoCtrl', ['$scope', '$log', function($scope, $log) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $log.info('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
  }])
  ; 
  app.controller('PopoverDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicPopover = 'Hello, World!';
    $scope.dynamicPopoverTitle = 'Title';
  }])
  ; 
  app.controller('ProgressDemoCtrl', ['$scope', function($scope) {
    $scope.max = 200;

    $scope.random = function() {
      var value = Math.floor((Math.random() * 100) + 1);
      var type;

      if (value < 25) {
        type = 'success';
      } else if (value < 50) {
        type = 'info';
      } else if (value < 75) {
        type = 'warning';
      } else {
        type = 'danger';
      }

      $scope.showWarning = (type === 'danger' || type === 'warning');

      $scope.dynamic = value;
      $scope.type = type;
    };
    $scope.random();

    $scope.randomStacked = function() {
      $scope.stacked = [];
      var types = ['success', 'info', 'warning', 'danger'];

      for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
          var index = Math.floor((Math.random() * 4));
          $scope.stacked.push({
            value: Math.floor((Math.random() * 30) + 1),
            type: types[index]
          });
      }
    };
    $scope.randomStacked();
  }])
  ; 
  app.controller('TabsDemoCtrl', ['$scope', function($scope) {
    $scope.tabs = [
      { title:'Dynamic Title 1', content:'Dynamic content 1' },
      { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];
  }])
  ; 
  app.controller('RatingDemoCtrl', ['$scope', function($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };
  }])
  ; 
  app.controller('TooltipDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
  }])
  ; 
  app.controller('TypeaheadDemoCtrl', ['$scope', '$http','MyService', '$state',function($scope, $http, MyService,$state) {
    $scope.selected = undefined;
            $http.get('http://localhost:1340/socio/').then(function (resp) {
   $scope.items2 = resp.data.results;

  });

  $http.get('http://localhost:1340/socio/').then(function (resp) {
   $scope.socios = resp.data.results;

  });




 $scope.selectItem3 = function(item){ 


    MyService.data.luz = 'on';
    
   
      MyService.data.socio = item;
   
 $scope.state = $state;
 
        $state.go('apps.socio');
            // $scope.item.selected = true;

 
      };











    // $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(res){
        var addresses = [];
        angular.forEach(res.data.results, function(item){
          addresses.push(item.formatted_address);
        });
        return addresses;
      });
    };
  }])
  ; 
  app.controller('DatepickerDemoCtrl', ['$scope', function($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
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
    $scope.format = $scope.formats[0];
  }])
  ; 
  app.controller('TimepickerDemoCtrl', ['$scope', function($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.changed = function () {
      //console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };
  }]);