app.controller('chatController', ['$scope', ($scope) => {
    $scope.onlineList = [];
    $scope.activeTab = 2;

    $scope.changeTab = tab => {
        $scope.activeTab = tab;
    };

    const socket = io();
    socket.on('onlineList', users => {
        $scope.onlineList = users;
        $scope.$apply();
    });
}]);