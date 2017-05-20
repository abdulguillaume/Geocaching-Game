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

    function statusCallback(status) {

        switch (status) {
            case Media.MEDIA_STARTING: console.log('Audio file is starting');
                break;
            case Media.MEDIA_RUNNING: console.log('Audio file is running');
                break;
            case Media.MEDIA_PAUSED: console.log('Audio file is paused');
                break;
            case Media.MEDIA_STOPPED: console.log('Audio file is stopped');
                break;
            default: console.log('Audio file status unknown');
                break;
        }
    }

    export class GeolocationController {

        private options = {
            timeout: 5000,
            enableHighAccuracy: false
        }

        private msg: string;

        private lat_ref = 40.689249;
        private long_ref = -74.044500;

        private lat_0;
        private long_0;

        public watchLat;
        public watchLong;

        private myPlayer = null;

        private audioIsPlaying = false;

        constructor(private $cordovaGeolocation: any){//ngCordova.IGeolocationService) {
            this.watchLocation();
        }


        public ifStationary(lat, long)
        {
            if (this.lat_0== lat && this.long_0 == long)
            {
                return true;
            }

            return false;
        }

        //Api found at: https://github.com/apache/cordova-plugin-media
        public loadMedia(url) {

            let that = this;

            let media = new Media(url, null, null);

            //media.
            media.play();

            return media;

        }

        public doAlert(lat, long) {

            let lat_diff = Math.abs(lat - this.lat_ref);
            let long_diff = Math.abs(long - this.long_ref); 


            if (lat_diff == 0 && long_diff == 0)
            {
                //special sound
                this.myPlayer = this.loadMedia('sound/usa-anthem.mp3')
                this.msg = "Welcome to the land of the free!";
                //this.myPlayer.play();

                return;
            }


            if (this.myPlayer!=null)
            {
                this.myPlayer.stop();
            }

            if (lat_diff <= Math.abs(this.lat_0 - this.lat_ref) && long_diff <= Math.abs(this.long_0 - this.long_ref)) {

                //make sound
                this.myPlayer = this.loadMedia('sound/clock-ticking.mp3');
                this.msg = "You're in the right path!";
                //this.myPlayer.play();

                return;
            }

            if (lat_diff > Math.abs(this.lat_0 - this.lat_ref) || long_diff > Math.abs(this.long_0 - this.long_ref)) {   
                
                //vibrate
                this.msg = "You're in the wrong path!";
                navigator.vibrate(1000);
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
                } else if (!this.ifStationary(this.watchLat, this.watchLong)) {
                    this.msg = 'moving..';
                    this.doAlert(this.watchLat, this.watchLong);
                } else {
                   // this.msg = 'stationary...';
                }

                this.lat_0 = this.watchLat;
                this.long_0 = this.watchLong;

            });
        }
    }
}
