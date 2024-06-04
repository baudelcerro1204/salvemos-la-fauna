(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="./images/logo-uade.png"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
    {
      name: "jaguar",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Jaguar_%28Panthera_onca_palustris%29_female_Piquiri_River_2.JPG/1200px-Jaguar_%28Panthera_onca_palustris%29_female_Piquiri_River_2.JPG",
      id: 1,
    },
    {
      name: "rinoceronte",
      img: "https://cnnespanol.cnn.com/wp-content/uploads/2024/03/240311154731-rinocerontes-kenia-nueva-habitat-full-169.jpg?quality=100&strip=info",
      id: 2
    },
    {
      name: "orangutan",
      img: "https://img.rtve.es/imagenes/orangutanes-bailarines-gran-tamano-sobre-copas-arboles/1248710487603.jpg",
      id: 3
    },
    {
      name: "gorila",
      img: "https://files.worldwildlife.org/wwfcmsprod/images/Gorilla_WWwinter2023/story_full_width/8rwq82enph_Gorilla_WWwinter2023.jpg",
      id: 4
    }, 
    {
      name: "panda",
      img: "https://www.clarin.com/2016/08/23/SyeUZ1eqEx_1200x0.jpg",
      id: 5
    },
    {
      name: "tigre",
      img: "https://www.ngenespanol.com/wp-content/uploads/2022/09/tigre-de-bengala-el-gran-felino-de-las-selvas-de-la-india-770x431.jpg",
      id: 6
    },
    {
      name: "elefante",
      img: "https://okdiario.com/img/2021/05/20/que-comen-los-elefantes-655x368.jpg",
      id: 7
    },
    {
      name: "leopardo",
      img: "https://t2.ea.ltmcdn.com/es/razas/7/1/9/leopardo-indio_917_0_orig.jpg",
      id: 8
    },
    {
      name: "vaquita",
      img: "https://oceangeneration.org/wp-content/uploads/2023/07/meet-the-vaquita-the-most-endangered-marine-mammal.png",
      id: 9
    },
    {
      name: "gibon",
      img: "https://upload.wikimedia.org/wikipedia/commons/4/40/Hylobaes_lar_Canarias.jpg",
      id: 10
    },
    {
      name: "bonobo",
      img: "https://c02.purpledshub.com/uploads/sites/62/2022/09/Bonobo-mature-male-GettyImages-590968630-a96f0cf.jpg?w=1029&webp=1",
      id: 11
    },
    {
      name: "tapir",
      img: "https://static.dw.com/image/57351389_906.webp",
      id: 12
    },
  ];
  
  
    
	Memory.init(cards);

})();