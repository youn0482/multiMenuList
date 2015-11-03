angular.module('starter.controllers', [])


.controller('ListController',['$scope','$stateParams','$ionicPopup','myFactory', function($scope, $stateParams, $ionicPopup, myFactory){
    
        
        //initialize some variables
        $scope.toDos = [];
        $scope.text = '';
        $scope.key = $stateParams.key
        //get the lists from storage and make sure they are updated
        $scope.toDos = myFactory.getStorage($stateParams.key, true);
        myFactory.updateStorage($scope.toDos, $stateParams.key);
        
        //add a new item to list function
        $scope.submit = function(){
            
            if ($scope.text) {

                $scope.toDos.push({
                    text: $scope.text,
                    isDone:false});
                
                myFactory.updateStorage($scope.toDos, $stateParams.key);
                
                $scope.text = '';
            }
            
                                    
        }
                                          
        //delete an item from list function
        $scope.delete = function(index) {
            

            $scope.toDos.splice(index, 1);
            myFactory.updateStorage($scope.toDos, $stateParams.key);
            
            
        };
        
        //save a completed item
        $scope.saveDone = function(index){
            
            myFactory.updateStorage($scope.toDos, $stateParams.key);
            myFactory.checkVibrate($scope.toDos, index);       
            myFactory.checkNotify($scope.toDos, $stateParams.key);
        };
        
        //clear a whole list
        $scope.clear = function(){
            
            var askUser = $ionicPopup.confirm({
            title: 'Clear List',
            template: 'Are you sure you want to clear this list?'
            });
            
          askUser.then(function(ans) {
            if (ans) {
                $scope.toDos = [];
                myFactory.clearStorage($stateParams.key);
            }
          });
        };
    
        
    }])

//this controller controls the side menu and settings memory
.controller('SettingsController',['$state','$scope', 'myFactory', function($state, $scope, myFactory){
    
    $scope.listMessage = [];
    $scope.settings = {};
    $scope.settings = myFactory.getSettings();
    
    
    $scope.saveSettings = function(){

        myFactory.changeSettings($scope.settings);
    }
    
    
    $scope.reload = function(){
       
        for (var i=0; i<3; i++){
        
            var list = myFactory.getStorage((i+1), false);
            var doneCount = 0;
            
            if (!list){
                $scope.listMessage[i] = "";
                  
            }else{
                //loop through the list
                for (var x=0; x<list.length; x++){

                    if (list[x].isDone == true){

                        doneCount++;
                    }
                }
                
                $scope.listMessage[i] = doneCount + " of " + list.length + " complete";
            }   
        }
       
    }
    
}]);