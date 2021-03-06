angular.module('AttendeeController', []).controller('AttendeeController', ['$scope', '$http', '$location', '$routeParams', '$modal', 'Attendee', 'Modal', 'Seat',
    function ($scope, $http, $location, $routeParams, $modal, Attendee, Modal, Seat){
        $scope.create = function () {
            var person = new Attendee({
                company: this.company,
                lastname: this.lastName,
                firstname: this.firstName,
                phone: this.phone,
                email: this.email,
                balance: this.balance ,
                paidinfull: this.paid ,
                notes: this.notes,
                seat_id: this.seat.id
            });

            person.$save(function (res) {

                $location.path('attendees/');
            }, function (err) {
                console.log(err);
            });
        };

        $scope.paid = 0;
        $scope.balance = 0;
        $scope.showBalance = true;
        $scope.selectedTable = 0;
        $scope.selectedSeat = 0;

        $scope.setTableFocus = setTableFocus;
        $scope.setSeatFocus = setSeatFocus;
        $scope.updateSeats = updateSeats;

        $scope.toggleAmount = function(status) {
            if (status == 1) {
                $scope.showBalance = false;
                $scope.prevBalance = $scope.balance;
                $scope.balance = 0;
            }
            else if (status == 0) {
                $scope.showBalance = true;
                $scope.balance = $scope.prevBalance;

            }
        }

        $scope.togglePaid = function(status, balance) {
            if (status == 1) {
                $scope.showBalance = false;
                $scope.prevBalance = balance;
                $scope.balance = 0;
            }
            else if (status == 0) {
                $scope.showBalance = true;
                $scope.balance = $scope.prevBalance;

            }
            $scope.attendee.balance = $scope.balance;
        }


        $scope.find = function() {
            $scope.attendees = Attendee.query();
        }

        $scope.remove = function(attendee) {

            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Attendee',
                headerText: 'Delete '+ attendee.firstname + ' ' + attendee.lastname + ' ?',
                bodyText: 'Are you sure you want to delete this attendee?'
            };

            Modal.showModal({}, modalOptions).then( function(result) {
                    attendee.$remove(function (res) {
                        if (res) {
                            for (var i in $scope.attendees) {
                                if ($scope.attendees[i] === attendee) {
                                    $scope.attendees.splice(i, 1);
                                }
                            }
                        }
                    }, function (err) {
                        console.log(err);
                    })
                }
           )

        };

        function updateSeats() {

            var missing = true;
            for(var i = 0; i < $scope.availableSeats.length; i++) {
                if ($scope.availableSeats[i].id == $scope.attendee.seat_id) {
                    missing = false;
                }
            }

            if (missing) {
                $scope.availableSeats.push($scope.attendee.seat)
            }

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '/partials/attendees/updateSeat',
                controller: 'UpdateSeatController',
                size: 'lg',
                resolve: {
                    availableSeats: function() {
                        return $scope.availableSeats;
                    },
                    attendee: function() {
                        return $scope.attendee;
                    }
                }
            })


        };

        $scope.update = function(attendee) {
            attendee.$update(function(res) {
                $location.path('attendees/');
            }, function (err) {
                console.log(err);
            });

        };

        activate()

        function activate() {
              Seat.emptySeat().$promise.then(function(data) {
                $scope.availableSeats = data;


            });
        }

        function setTableFocus(focus) {
            $scope.selectedTable  = focus.table_number;

        }

        function setSeatFocus(focus) {
            $scope.selectedSeat = focus.seat_number;

        }

        $scope.findOne = function () {
            var splitPath = $location.path().split('/');
            var personId = splitPath[splitPath.length - 1];
            $scope.attendee = Attendee.get({personId: personId});
        };


    }
]);