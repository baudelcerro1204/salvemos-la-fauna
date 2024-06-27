(function() {
    // Objeto principal del juego de memoria
    var Memory = {
        // Método de inicialización
        init: function(cards) {
            this.$game = $(".game"); // Contenedor del juego
            this.$modal = $(".modal"); // Modal para mostrar mensajes
            this.$overlay = $(".modal-overlay"); // Superposición del modal
            this.$restartButton = $("button.restart"); // Botón de reinicio
            this.cardsArray = $.merge(cards, cards); // Duplicar el array de cartas para tener pares
            this.shuffleCards(this.cardsArray); // Barajar las cartas
            this.setup(); // Configurar el juego
        },

        // Método para barajar las cartas
        shuffleCards: function(cardsArray) {
            this.$cards = $(this.shuffle(this.cardsArray)); // Guardar las cartas barajadas
        },

        // Método para configurar el juego
        setup: function() {
            this.html = this.buildHTML(); // Construir el HTML de las cartas
            this.$game.html(this.html); // Añadir las cartas al contenedor del juego
            this.$memoryCards = $(".card"); // Seleccionar todas las cartas
            this.paused = false; // Estado del juego
            this.guess = null; // Carta adivinada
            this.binding(); // Vincular eventos
        },

        // Método para vincular eventos
        binding: function() {
            this.$memoryCards.on("click", this.cardClicked); // Evento de clic en las cartas
            this.$restartButton.on("click", $.proxy(this.reset, this)); // Evento de clic en el botón de reinicio
        },

        // Método para manejar el clic en una carta
        cardClicked: function() {
            var _ = Memory; // Referencia al objeto Memory
            var $card = $(this); // Carta clicada
            if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
                $card.find(".inside").addClass("picked"); // Marcar la carta como seleccionada
                if (!_.guess) {
                    _.guess = $(this).attr("data-id"); // Guardar la primera carta adivinada
                } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                    $(".picked").addClass("matched"); // Marcar las cartas como coincidentes
                    _.showAnimalInfo(_.guess); // Mostrar información del animal
                    _.guess = null; // Resetear la adivinanza
                } else {
                    _.guess = null; // Resetear la adivinanza
                    _.paused = true; // Pausar el juego
                    setTimeout(function() {
                        $(".picked").removeClass("picked"); // Desmarcar las cartas seleccionadas
                        Memory.paused = false; // Reanudar el juego
                    }, 600); // Esperar 600 ms
                }
                if ($(".matched").length == $(".card").length) {
                    _.win(); // Verificar si todas las cartas están emparejadas
                }
            }
        },

        // Método para manejar la victoria
        win: function() {
            this.paused = true; // Pausar el juego
            setTimeout(function() {
                Memory.showModal(); // Mostrar el modal de victoria
                Memory.$game.fadeOut(); // Ocultar el juego
            }, 1000); // Esperar 1 segundo
        },

        // Método para mostrar el modal
        showModal: function() {
            this.$overlay.show(); // Mostrar la superposición
            this.$modal.fadeIn("slow"); // Mostrar el modal lentamente
        },

        // Método para ocultar el modal
        hideModal: function() {
            this.$overlay.hide(); // Ocultar la superposición
            this.$modal.hide(); // Ocultar el modal
        },

        // Método para reiniciar el juego
        reset: function() {
            this.hideModal(); // Ocultar el modal
            this.shuffleCards(this.cardsArray); // Barajar las cartas
            this.setup(); // Configurar el juego
            this.$game.show("slow"); // Mostrar el juego lentamente
        },

        // Algoritmo de Fisher-Yates para barajar un array
        shuffle: function(array) {
            var counter = array.length, temp, index;
            // Mientras haya elementos en el array
            while (counter > 0) {
                // Seleccionar un índice aleatorio
                index = Math.floor(Math.random() * counter);
                // Decrementar el contador en 1
                counter--;
                // Intercambiar el último elemento con el seleccionado
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array; // Devolver el array barajado
        },

        // Método para construir el HTML de las cartas
        buildHTML: function() {
            var frag = '';
            this.$cards.each(function(k, v) {
                frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
                <div class="front"><img src="' + v.img + '"\
                alt="' + v.name + '" /></div>\
                <div class="back"><img src="./images/logo-uade.png"\
                alt="Codepen" /></div></div>\
                </div>';
            });
            return frag; // Devolver el HTML construido
        },

        // Información sobre animales en peligro de extinción
        animalInfo: {
            1: "El jaguar está en peligro debido a la deforestación y la caza furtiva.",
            2: "El rinoceronte está amenazado por la caza furtiva debido a la demanda de sus cuernos.",
            3: "El orangután está en peligro por la pérdida de hábitat debido a la deforestación.",
            4: "El gorila está en peligro por la caza furtiva y la pérdida de hábitat.",
            5: "El panda está amenazado por la pérdida de hábitat y la baja tasa de reproducción.",
            6: "El tigre está en peligro por la caza furtiva y la pérdida de hábitat.",
            7: "El elefante está amenazado por la caza furtiva y la pérdida de hábitat.",
            8: "El leopardo está en peligro por la pérdida de hábitat y la caza furtiva.",
            9: "La vaquita está en peligro crítico debido a la pesca incidental.",
            10: "El gibon está amenazado por la deforestación y la caza furtiva.",
            11: "El bonobo está en peligro por la pérdida de hábitat y la caza furtiva.",
            12: "El tapir está en peligro por la deforestación y la caza."
        },

        // Método para mostrar información del animal
        showAnimalInfo: function(id) {
            var info = this.animalInfo[id];
            alert(info);
        }
    };

    // Array de cartas con información sobre los animales
    var cards = [
        { name: "jaguar", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Jaguar_%28Panthera_onca_palustris%29_female_Piquiri_River_2.JPG/1200px-Jaguar_%28Panthera_onca_palustris%29_female_Piquiri_River_2.JPG", id: 1 },
        { name: "rinoceronte", img: "https://cnnespanol.cnn.com/wp-content/uploads/2024/03/240311154731-rinocerontes-kenia-nueva-habitat-full-169.jpg?quality=100&strip=info", id: 2 },
        { name: "orangutan", img: "https://img.rtve.es/imagenes/orangutanes-bailarines-gran-tamano-sobre-copas-arboles/1248710487603.jpg", id: 3 },
        { name: "gorila", img: "https://files.worldwildlife.org/wwfcmsprod/images/Gorilla_WWwinter2023/story_full_width/8rwq82enph_Gorilla_WWwinter2023.jpg", id: 4 },
        { name: "panda", img: "https://www.clarin.com/2016/08/23/SyeUZ1eqEx_1200x0.jpg", id: 5 },
        { name: "tigre", img: "https://www.ngenespanol.com/wp-content/uploads/2022/09/tigre-de-bengala-el-gran-felino-de-las-selvas-de-la-india-770x431.jpg", id: 6 },
        { name: "elefante", img: "https://okdiario.com/img/2021/05/20/que-comen-los-elefantes-655x368.jpg", id: 7 },
        { name: "leopardo", img: "https://t2.ea.ltmcdn.com/es/razas/7/1/9/leopardo-indio_917_0_orig.jpg", id: 8 },
        { name: "vaquita", img: "https://oceangeneration.org/wp-content/uploads/2023/07/meet-the-vaquita-the-most-endangered-marine-mammal.png", id: 9 },
        { name: "gibon", img: "https://upload.wikimedia.org/wikipedia/commons/4/40/Hylobaes_lar_Canarias.jpg", id: 10 },
        { name: "bonobo", img: "https://c02.purpledshub.com/uploads/sites/62/2022/09/Bonobo-mature-male-GettyImages-590968630-a96f0cf.jpg?w=1029&webp=1", id: 11 },
        { name: "tapir", img: "https://static.dw.com/image/57351389_906.webp", id: 12 }
    ];
    
    // Inicializar el juego con las cartas
    Memory.init(cards);
})();
