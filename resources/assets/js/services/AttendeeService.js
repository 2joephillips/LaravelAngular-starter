angular.module('AttendeeService', []).factory('Attendee', ['$resource',
    function($resource){
        return $resource('/api/attendee/:personId', {
            personId: '@id'
        }, {
        update: {
            method: 'PUT'
        },
            assignedAuctionItems: {
                method: 'GET',
                isArray: true,
                url: '/api/attendee/assignedAuctionItems'
            }
    });
}
]);