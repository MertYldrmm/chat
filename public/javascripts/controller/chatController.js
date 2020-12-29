app.controller('chatController', ['$scope', ($scope) => {
    const socket = io();

    socket.on('hello', () => {
        console.log('hello');
    });
}]);