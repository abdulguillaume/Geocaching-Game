namespace MyApp.Services {


    export class QuoteService {

        private quotes = [
            { owner: 0, msg: "lew ap manje nan men moun chich ou kenbe kiyew kout." },
            { owner: 0, msg: "pye kout pran devan." },
            { owner: 1, msg: "whatever you want!!" },
            { owner: 1, msg: "nothing to say!!" },
            { owner: 2, msg: "it is not worth my money." },
            { owner: 2, msg: "let see if i will have a job after this" },
            { owner: 2, msg: "listening to reggaeton!" }

        ]


        public get(ownerId) {

            let _quotes = this.quotes.filter(c => c.owner == ownerId);

            let index = Math.floor((Math.random() * (_quotes.length)));

            return _quotes[index];
        }


    }

    export class ChatService {
        // Some fake testing data
        private chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        public all() {
            return this.chats;
        } 

        public remove(chat) {
            this.chats.splice(this.chats.indexOf(chat), 1);
        }

        public get(chatId:number) {
            return this.chats.filter(c => c.id == chatId)[0];
        }

    }

    angular.module('MyApp').service('chatService', ChatService);

    angular.module('MyApp').service('quoteService', QuoteService);

}