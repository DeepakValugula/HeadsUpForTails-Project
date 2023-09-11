/** Shopify CDN: Minification failed

Line 24:2 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 25:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 39:13 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 44:20 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 51:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 53:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 58:16 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 64:17 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 65:6 Transforming const to the configured target environment ("es5") is not supported yet

**/
(function() {
  var __sections__ = {};
  (function() {
    for(var i = 0, s = document.getElementById('sections-script').getAttribute('data-sections').split(','); i < s.length; i++)
      __sections__[s[i]] = true;
  })();
  (function() {
  if (!__sections__["footer"]) return;
  try {
    
  class LocalizationForm extends HTMLElement {
    constructor() {
      super();
      this.elements = {
        input: this.querySelector('input[name="locale_code"], input[name="country_code"]'),
        button: this.querySelector('button'),
        panel: this.querySelector('ul'),
      };
      this.elements.button.addEventListener('click', this.openSelector.bind(this));
      this.elements.button.addEventListener('focusout', this.closeSelector.bind(this));
      this.addEventListener('keyup', this.onContainerKeyUp.bind(this));

      this.querySelectorAll('a').forEach(item => item.addEventListener('click', this.onItemClick.bind(this)));
    }

    hidePanel() {
      this.elements.button.setAttribute('aria-expanded', 'false');
      this.elements.panel.setAttribute('hidden', true);
    }

    onContainerKeyUp(event) {
      if (event.code.toUpperCase() !== 'ESCAPE') return;

      this.hidePanel();
      this.elements.button.focus();
    }

    onItemClick(event) {
      event.preventDefault();
      const form = this.querySelector('form');
      this.elements.input.value = event.currentTarget.dataset.value;
      if (form) form.submit();
    }

    openSelector() {
      this.elements.button.focus();
      this.elements.panel.toggleAttribute('hidden');
      this.elements.button.setAttribute('aria-expanded', (this.elements.button.getAttribute('aria-expanded') === 'false').toString());
    }

    closeSelector(event) {
      const shouldClose = event.relatedTarget && event.relatedTarget.nodeName === 'BUTTON';
      if (event.relatedTarget === null || shouldClose) {
        this.hidePanel();
      }
    }
  }

  
    customElements.define('localization-form', LocalizationForm);

$(".huft_subs_btn").click(function() {
      var email = $(".huft_subs_email").val();

      if(email.length == "")
        {
          $("#huft_subs_error").text("Please enter your email address");
          return false;
          
        }
      	else
        {
          
          var regEx = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
            var validEmail = regEx.test(email);
            if (!validEmail) {
              $('#huft_subs_error').text('Please enter a valid email address');
              return false;
            }
          }
          
         //return true;
       
    });



  } catch(e) { console.error(e); }
})();

})();
