Vue.component("todo-item", {
    props: ["item"],
    template: "<li>{{item.text}}</li>"
});

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!',
        title: 'this is title',
        canSee: true,
        firstName: "Walter",
        lastName: "O'Brien",

        todos: [{
                text: 'learn JavaScript'
            },
            {
                text: 'learn Vue'
            },
            {
                text: 'build something awesome'
            }
        ],

        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
    },

    watch: {
        // whenever question changes, this function will run
        question: function (newQuestion) {
            this.answer = 'Waiting for you to stop typing...';
            this.getAnswer();
        }
    },

    methods: {
        reverse: function () {
            this.message = this.message.split('').reverse().join('');
        },
        reverseMessageMethod: function () {
            console.log("Method called!");
            return this.message.split('').reverse().join('');
        },

        getAnswer: function () {
            var vm = this;
            window.setTimeout(function () {
                console.log("getAnswer called");
                if (vm.question.indexOf('?') === -1) {
                    vm.answer = 'Questions usually contain a question mark. ;-)';
                    return;
                }
                vm.answer = 'Thinking...';
                axios.get('https://yesno.wtf/api')
                    .then(function (response) {
                        vm.answer = response.data.answer;
                    })
                    .catch(function (error) {
                        vm.answer = 'Error! Could not reach the API. ' + error;
                    })
            }, 500);
        }
    },

    filters: {
        capitalize: function (value) {
            if (!value) return '';

            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    },

    computed: {
        reverseMessage: function () {
            console.log("Computed called!");
            return this.message.split('').reverse().join('');
        },

        fullName: {
            // getter
            get: function () {
                return this.firstName + ' ' + this.lastName
            },
            // setter
            set: function (newValue) {
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    }
});