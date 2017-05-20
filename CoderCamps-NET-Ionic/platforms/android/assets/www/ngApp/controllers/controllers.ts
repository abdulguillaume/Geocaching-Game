namespace MyApp.Controllers {

    export class DashController {
    }





    export class ChatsController {
        public chats;

        public remove(chat) {
            this.chatService.remove(chat);
        }

        constructor(private chatService: MyApp.Services.ChatService) {
            this.chats = chatService.all();
        }
    }



    export class ChatDetailController {
        public chat;

        constructor(private chatService: MyApp.Services.ChatService, $stateParams: ng.ui.IStateParamsService) {
            console.log('chat id==');
            console.log($stateParams['chatId']);
            this.chat = chatService.get(+$stateParams['chatId']);
        }
    }



    export class AccountController {
        public settings = {
            enableFriends: true
        }
    }

    export class QuoteController {

        getRandomQuote(id) {
            let quote = this.quoteService.get(id);

            this.$ionicPopup.alert({
                title: 'Quote says',
                template: quote.msg
            });
        }

        constructor(private $ionicPopup: ionic.popup.IonicPopupService, private quoteService: MyApp.Services.QuoteService) { }
    }

    export class HomeController {

        public showOuch() {
            this.$ionicPopup.alert({
                title: 'I Say',
                template: 'Ouch!'
            });
        }

        constructor(private $ionicPopup: ionic.popup.IonicPopupService) { }
    }


    export class CameraController {
        public pictureUrl = 'http://placehold.it/300x300';

        constructor(private $cordovaCamera: any) { }

        public takePicture() {
            let options = {
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA
            };

            this.$cordovaCamera.getPicture(options)
                .then((data) => {
                    console.log('camera data: ' + angular.toJson(data));
                    this.pictureUrl = data;
                }, (error) => {
                    console.log('camera data: ' + angular.toJson(error));
                });

        }
    }

    enum State { INIT, GOOD, BAD, OK };

    export class GeolocationController {

        private options = {
            timeout: 10000,
            enableHighAccuracy: false
        }

        public state: State;

        private msg: string;

        private lat_ref = 40.689249;
        private long_ref = -74.044500;

        private lat_0;
        private long_0;

        public watchLat;
        public watchLong;

        constructor(private $cordovaGeolocation: any) {//ngCordova.IGeolocationService) {
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

        public ifStationary(lat, long)
        {
            if (this.lat_0== lat && this.long_0 == long)
            {
                return true;
            }

            return false;
        }

        public doAlert(lat, long) {

            let lat_diff = Math.abs(lat - this.lat_ref);
            let long_diff = Math.abs(long - this.long_ref); 

            if (lat_diff == 0 && long_diff == 0)
            {
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

            
                
        }

        public watchLocation() {
            let watch = this.$cordovaGeolocation.watchPosition(this.options);
            watch.then(null, (error) => {
                console.log(error);
            }, (location) => {
                this.watchLat = location.coords.latitude;
                this.watchLong = location.coords.longitude;

                if (this.lat_0 == null && this.long_0 == null) {
                    this.msg = 'init...';
                    this.state = State.INIT;
                } else if (!this.ifStationary(this.watchLat, this.watchLong)) {
                    this.msg = 'moving..';
                    this.doAlert(this.watchLat, this.watchLong);
                } else {
                    this.msg = 'stationary...';
                }

                this.lat_0 = this.watchLat;
                this.long_0 = this.watchLong;

            });
        }
    }
}
