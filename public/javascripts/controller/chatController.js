app.controller('chatController', ['$scope','chatFactory', ($scope, chatFactory) => {
    /**
     * Angular variables
     */
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 2;
    $scope.chatClicked = false;
    $scope.chatName = "";
    $scope.roomId ="";
    $scope.message = "";

    /**
     * Socket.io event handling.
     */
    const socket = io();
    socket.on('onlineList', users => {
        $scope.onlineList = users;
        $scope.$apply();
    });

    socket.on('roomList', rooms => {
        $scope.roomList = rooms;
        $scope.$apply();
    });

    $scope.newMessage = () => {
        socket.emit('newMessage', {
            message: $scope.message,
            roomId: $scope.roomId
        });
        $scope.message="";
    };

    $scope.switchRoom = (room) => {
        $scope.chatName = room.name;
        $scope.roomId = room.id;
        $scope.chatClicked = true;

        chatFactory.getMessages(room.id).then(data => {
            console.group(data);
        })
    };

    $scope.newRoom = () =>{
        //let randomName = Math.random().toString(36).substring(7);

        let roomName = window.prompt("Enter room name..");
        if(roomName !== null && roomName !== ''){
            socket.emit('newRoom', roomName);
        }
    };

    $scope.changeTab = tab => {
        $scope.activeTab = tab;
    };
    
}]);