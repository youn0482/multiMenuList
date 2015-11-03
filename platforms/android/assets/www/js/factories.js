angular.module('starter.factories', [])

.factory('myFactory', ['localStorageService','$cordovaVibration', '$cordovaLocalNotification', function( localStorageService, $cordovaVibration, $cordovaLocalNotification){
    
    
    
    var getStorage = function(key, firstLoad){
        
         //check to see if the local storage module is supported and if it exists
        if (localStorageService.isSupported && localStorageService.get('toDoStorage'+key) !== null){

                //fetch the stored To DO List
                return localStorageService.get('toDoStorage'+key);

        }else if(firstLoad == true){
            //create 3 initial To Do's
            var service = [];
           service.push({text:"Do Homework",isDone:false});
           service.push({ text:"Clean Room", isDone: false });
            service.push({ text:"Pay Bills", isDone: false });

            return service;
        }else{
            
            return 0;
            
        }
    }
    var getSettings = function(){
        
         //check to see if the local storage module is supported and if it exists
        if (localStorageService.isSupported && localStorageService.get('settingsStorage') !== null){

                //fetch the stored To DO List
                return localStorageService.get('settingsStorage');

        }else{
            //initial default
            var dft = {vibDone: false, notifyAll: false};
            return dft;
        }    
        
    }
    var updateStorage = function(list, key){
  
                localStorageService.remove('toDoStorage'+key);
            
            if (list.length !== 0){
                localStorageService.set('toDoStorage'+key, list);     
            }
   
    }
    var changeSettings = function(newSettings){
        
            localStorageService.set('settingsStorage', newSettings);
    }
    var checkVibrate = function(list, index){
       
        if (list[index].isDone && getSettings().vibDone){

                
                    $cordovaVibration.vibrate(100);
                
        }
        
        
    }
    var checkNotify = function(list, key){
        
        if (getSettings().notifyAll){
                
                for (var i=0; i < list.length; i++){
                    
                    if (!list[i].isDone){
                        
                        return;
                    }
                    
                }
                
            
            $cordovaLocalNotification.schedule({
                  id: 1,
                  title: 'List Complete',
                  text: "You have completed list " + key,
                  data: {
                    customProperty: 'custom value'
                  }
                }).then(function (result) {
                  
            });
                
            }
        
    }
    var clearStorage = function(key){
        
        localStorageService.remove('toDoStorage'+key);
    }
    
    
    
    return {
        
        getStorage: getStorage,
        getSettings: getSettings,
        changeSettings: changeSettings,
        updateStorage: updateStorage,
        checkVibrate: checkVibrate,
        checkNotify: checkNotify,
        clearStorage: clearStorage
        
}
    
}]);