var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var DashController = (function () {
            function DashController() {
            }
            return DashController;
        }());
        Controllers.DashController = DashController;
        var ChatsController = (function () {
            function ChatsController(chatService) {
                this.chatService = chatService;
                this.chats = chatService.all();
            }
            ChatsController.prototype.remove = function (chat) {
                this.chatService.remove(chat);
            };
            return ChatsController;
        }());
        Controllers.ChatsController = ChatsController;
        var ChatDetailController = (function () {
            function ChatDetailController(chatService, $stateParams) {
                this.chatService = chatService;
                console.log('chat id==');
                console.log($stateParams['chatId']);
                this.chat = chatService.get(+$stateParams['chatId']);
            }
            return ChatDetailController;
        }());
        Controllers.ChatDetailController = ChatDetailController;
        var AccountController = (function () {
            function AccountController() {
                this.settings = {
                    enableFriends: true
                };
            }
            return AccountController;
        }());
        Controllers.AccountController = AccountController;
        var QuoteController = (function () {
            function QuoteController($ionicPopup, quoteService) {
                this.$ionicPopup = $ionicPopup;
                this.quoteService = quoteService;
            }
            QuoteController.prototype.getRandomQuote = function (id) {
                var quote = this.quoteService.get(id);
                this.$ionicPopup.alert({
                    title: 'Quote says',
                    template: quote.msg
                });
            };
            return QuoteController;
        }());
        Controllers.QuoteController = QuoteController;
        var HomeController = (function () {
            function HomeController($ionicPopup) {
                this.$ionicPopup = $ionicPopup;
            }
            HomeController.prototype.showOuch = function () {
                this.$ionicPopup.alert({
                    title: 'I Say',
                    template: 'Ouch!'
                });
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        var CameraController = (function () {
            function CameraController($cordovaCamera) {
                this.$cordovaCamera = $cordovaCamera;
                this.pictureUrl = 'http://placehold.it/300x300';
            }
            CameraController.prototype.takePicture = function () {
                var _this = this;
                var options = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA
                };
                this.$cordovaCamera.getPicture(options)
                    .then(function (data) {
                    console.log('camera data: ' + angular.toJson(data));
                    _this.pictureUrl = data;
                }, function (error) {
                    console.log('camera data: ' + angular.toJson(error));
                });
            };
            return CameraController;
        }());
        Controllers.CameraController = CameraController;
        var State;
        (function (State) {
            State[State["INIT"] = 0] = "INIT";
            State[State["GOOD"] = 1] = "GOOD";
            State[State["BAD"] = 2] = "BAD";
            State[State["OK"] = 3] = "OK";
        })(State || (State = {}));
        ;
        var GeolocationController = (function () {
            function GeolocationController($cordovaGeolocation) {
                this.$cordovaGeolocation = $cordovaGeolocation;
                this.options = {
                    timeout: 10000,
                    enableHighAccuracy: false
                };
                this.lat_ref = 40.689249;
                this.long_ref = -74.044500;
                this.watchLocation();
            }
            //public getCurrentLocation() {
            //    this.$cordovaGeolocation.getCurrentPosition(this.options)
            //        .then((location) => {
            //            this.lat = location.coords.latitude;
            //            this.long = location.coords.longitude;
            //        }, (error) => {
            //            console.log(error);
            //        });
            //}
            GeolocationController.prototype.ifStationary = function (lat, long) {
                if (this.lat_0 == lat && this.long_0 == long) {
                    return true;
                }
                return false;
            };
            GeolocationController.prototype.doAlert = function (lat, long) {
                var lat_diff = Math.abs(lat - this.lat_ref);
                var long_diff = Math.abs(long - this.long_ref);
                if (lat_diff == 0 && long_diff == 0) {
                    //special sound
                    this.msg = "Welcome to the land of the free!";
                    return;
                }
                //this.msg = long_diff + " ? " + (this.long_0 - this.long_ref);
                if (lat_diff <= Math.abs(this.lat_0 - this.lat_ref) && long_diff <= Math.abs(this.long_0 - this.long_ref)) {
                    //make sound
                    this.msg = "\nYou're in the right direction!";
                    return;
                }
                if (lat_diff > Math.abs(this.lat_0 - this.lat_ref) || long_diff > Math.abs(this.long_0 - this.long_ref)) {
                    //vibrate
                    this.msg = "\nYou're in the wrong direction!";
                    return;
                }
            };
            GeolocationController.prototype.watchLocation = function () {
                var _this = this;
                var watch = this.$cordovaGeolocation.watchPosition(this.options);
                watch.then(null, function (error) {
                    console.log(error);
                }, function (location) {
                    _this.watchLat = location.coords.latitude;
                    _this.watchLong = location.coords.longitude;
                    if (_this.lat_0 == null && _this.long_0 == null) {
                        _this.msg = 'init...';
                        _this.state = State.INIT;
                    }
                    else if (!_this.ifStationary(_this.watchLat, _this.watchLong)) {
                        _this.msg = 'moving..';
                        _this.doAlert(_this.watchLat, _this.watchLong);
                    }
                    else {
                        _this.msg = 'stationary...';
                    }
                    _this.lat_0 = _this.watchLat;
                    _this.long_0 = _this.watchLong;
                });
            };
            return GeolocationController;
        }());
        Controllers.GeolocationController = GeolocationController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=controllers.js.map