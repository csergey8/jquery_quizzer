$(document).ready(() => {

  (function startQuiz(){

    this.settings = {
      result: []
    }

    this.loadQuiz = function() {
      $('.panel_one h1').show("drop", 500, () => {
        $('.start_quiz').addClass("started", 500);
      })

      $('.start_quiz').on('click', () => {
        
        showPanel(1);
        listenNext();
      })
    }

    this.showNext = function(next) {
      let wrapper = next.find('.wrapper');
      wrapper.fadeIn('500', () => {
          manageOptions(next);
      })
    }

    this.manageOptions = function(next) {
      let options = next.find('.options');
      let childrens = options.find('div');
      let counter = 0;

      childrens.each((i, el) => {
        $(el).delay(counter).fadeIn('300');
        counter += 500;
      })

      childrens.on('click', function() {
        childrens.removeClass('active');
        next.addClass('valid');
        $(this).addClass('active');
      })
    }

    this.showPanel = function(position) {
      let current = $('div[data-panel="' + (position - 1) + '"]');
      current.find('.wrapper').animate({ left: "-=100px", opacity: 0}, 500, () => {
          
        // hide current
        current.addClass('hidden');

        // show next
        let next = $('div[data-panel="' + position + '"]');
        next.removeClass('hidden');
        showNext(next);
      
      })
    }

    this.listenNext = function() {
      $('.next_question').on('click', function() {
        let next = $(this).data("next");
        if(validateSelection($(this))) {
          showPanel(next);
          showProgressAndStore(next);
        } 
        
      })
    }

    this.validateSelection = function($this) {
        let parent = $this.parents().eq(1);

         if(parent.hasClass('valid')){
           return true
         } else {
           $('.error').fadeIn("300", function(params) {
             $(this).delay("1000").fadeOut("300")
           })
           return false
         }
    }

    this.showProgressAndStore = function(panel) {
      $('.progress .bar').animate({ "width": "+=25%" }, 500);
      let options = $('div[data-panel="' + (panel - 1) + '"]').find('.options');
      options.find('div').each(function(i, el) {
        if($(this).hasClass('active')) {
          settings.result.push($(this).text());
          console.log(settings.result)
        }
      })
    }
    
    

    loadQuiz();
  })();
  
})