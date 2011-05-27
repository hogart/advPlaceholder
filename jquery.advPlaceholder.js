$.widget("ui.advPlaceholder", { // вообще неприлично пользоваться чужим неймспейсом, но один раз можно
    options: {
        placeholderContent: ""
    },

    _create: function() {
        var givenPlaceholder = this.element.attr('placeholder');
        if (!this.options.placeholderContent && givenPlaceholder) { // если плейсхолдер задан в разметке…
            this.options.placeholderContent = givenPlaceholder; // … то и берем его из разметки
            this.element.attr('placeholder', '') // стираем, чтоб не мешался
		}

        // находим родителя…
        this.parent = this.element.parent();
        // и даем ему класс, который несет значение position: relative !important;
        this.parent.addClass('ui-advPlaceholder-wrapper');

        // проверим, должен ли плейсхолдер быть видим на старте
		this.onBlur();

        // создаем плейсхолдер
        this.placeholder = $('<div class="ui-advPlaceholder-placeholder"></div>');
        this.placeholder.html(this.options.placeholderContent);
        this.parent.prepend(this.placeholder);

        // навешиваем обработчики
        this.element.bind('focus', $.proxy(this.onFocus, this));
        this.element.bind('blur', $.proxy(this.onBlur, this));
    },

    onFocus: function(evt) { // тут все тривиально
        this.parent.addClass('ui-advPlaceholder-wrapper__hide');
        this._trigger('onAfterFocus', evt, null);
    },

    onBlur: function(evt) {
        if (this.element.val() == '') { //если value элемента пусто, то прячем плейсхолдер
            this.parent.removeClass('ui-advPlaceholder-wrapper__hide');
            this._trigger('onAfterBlur', evt, {visible: true});
        }
        else {
            this._trigger('onAfterBlur', evt, {visible: false});
        }
    },

    setOption: function(key, value) {
        if (arguments.length == 1) { // чтение опции
            return this.options[key];
        }
        else {
            if (key == 'placeholderContent') {
                this.placeholder.html(value);
            }
        }
    },

    destroy: function() {
        $.Widget.prototype.destroy.call(this);
    }
})