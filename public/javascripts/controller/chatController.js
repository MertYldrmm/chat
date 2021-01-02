app.controller('chatController', ['$scope','chatFactory', 'userFactory', ($scope, chatFactory, userFactory) => {
    /**
     * initialization
     */
    function init(){
        userFactory.getUser().then(user => {
            $scope.user = user;
        });
    }
    init();
    /**
     * Angular variables
     */
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 2;
    $scope.chatClicked = false;
    $scope.loadingMessages = false;
    $scope.chatName = "";
    $scope.roomId ="";
    $scope.message = "";
    $scope.messages = [];

    $scope.user = {};

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

    socket.on('receiveMessage', data => {
        $scope.messages[data.roomId].push({
            userId: data.userId,
            username: data.username,
            surname: data.surname,
            message: data.message
        });
        $scope.$apply();
    });

    $scope.newMessage = () => {
        if($scope.message.trim() !== ''){
            socket.emit('newMessage', {
                message: $scope.message,
                roomId: $scope.roomId
            });

            $scope.messages[$scope.roomId].push({
                userId: $scope.user._id,
                username: $scope.user.name,
                surname: $scope.user.surname,
                message: $scope.message
            });

            $scope.message="";
        }   
    };

    $scope.switchRoom = (room) => {
        $scope.chatName = room.name;
        $scope.roomId = room.id;
        $scope.chatClicked = true;

        if(!$scope.messages.hasOwnProperty(room.id)){
            $scope.loadingMessages = true;
            console.log("servise bağlanıyor.");

            chatFactory.getMessages(room.id).then(data => {
                $scope.messages[room.id] = data;
                $scope.loadingMessages = false;
            });
        }

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