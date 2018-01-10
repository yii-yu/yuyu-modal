/**
 * 	Author     : Lipinski Yury
 * 	E-mail     : lipinski.yury@gmail.com
 *  Created on : 08.11.2017
 */

/**
 *  МОДАЛЬНОЕ ОКНО
 * ------------------------------------------------------------------------------
 * 
 *   Кнопка вызывающая модальное окно. Пример:
 *   	 <a 
 *  		class="... yuyu-modal" 		
 *  		data-toggle="yuyu-modal-ajax"
 *  		data-content="?ajax=form-message-user"   		
 *  		data-title="Заголовок"   		
 *              data-reload="close"  	
 *		data-button="Сохранить"
 *		data-options='{"background":"#ff0000","backgroundTop":"#08e2ca","color":"#08e2ca"}'
 *	>
 *		Добавить обращение
 *	</a>
 *
 *
 * 	Описание атрибутов кнопки модального окна:
 * 
 *  	class="... yuyu-modal"   - данный класс идентифицирует кнопку как модальное окно;		
 *  	data-toggle  - переключатель: 
 *  		 - если "yuyu-modal-ajax" то содержимое модального окна вытягивется с сервера по адресу, указанному в  data-content;
 *  		 - если "yuyu-modal" то содержимое модального окна берется из атрибута 	data-content;  		   	 			
 *  	data-content - указывает адрес содержимого или содержит информацию модального окна;  		
 *  	data-title	- заголовок, который будет выводится в модальном окне;  		
 *      data-button - название кнопки в футоре. Данная кнопка отправляет форму на сервер; 			
 *      data-reload - перезагрузка страницы, после закрытия модального окна;
 *          - если close - после перезагрузки страницы;             
 *          - если submit - при получении ответа сервера, после отправки формы;  			
 *      data-options - стилизация модального окна;
 *		"background" - цвет заливки шапки модального окна,кнопки в футоре и цвет рамки модального окна;
 *		"backgroundTop" - цвет заливки верхней части модального окна (градиент);
 *		"color" - цвет заголовка, цвет текста кнопок.
 *  
 *  AJAX SUBMIT FORM		
 * -------------------------------------------------------------------------------
 * 		
 *  Кнопка для асинхронной отправки формы на сервер	
 *      
 *      <input type="submit"  class="... yuyu-submit-ajax" data-toggle = "yuyu-submit" data-result="result_reports" value="Сохранить">
 *
 *      Описание атрибутов кнопки ajax отправки формы:
 *      
 *  	class="... yuyu-submit-ajax"   - данный класс активирует кнопку для ajax отправки формы на сервер;
 *      data-toggle = "yuyu-submit"      - активирует отправку ajax запроса методом post по адресу, указанному в action; *      
 *      data-result - содержит id элемента куда будет вставлен ответ с сервера, при задействовании yuyu-submit-ajax;	
 *
 * Важно! в форме прописать onsubmit="return false;" <form ... onsubmit="return false;" ><form>
 *  ------------------------------------------------------------------------------
 *      
 * 	Подключение: 
 * 	1. Загрузить на сервер данный файл.
 * 	2. Подключить на странице <script type="text/javascript" src="/js/yuyu_modal.js"></script>
 * 	3. Разместить на странице тэг <a></a> или <input> с указанными выше атрибутами
 *
 * 	
 *
 *	Если в консоле ошибка типа "SyntaxError: Unexpected token # in JSON at position 0" - неправильный синтаксис 
 *	атрибута data-options . Должно быть data-options='{"":"","":""}'
 *		
 *			
 */

 (function () {

    var option = {

        htmlModal:
        '<div class="yuyu-mod">' +
        '<div class="yuyu-modal-wrap">' +
        '<div class="yuyu-modal-header">' +
        '<div class="yuyu-btn-modal-close">' +
        '<svg class="yuyu-crossicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">' +
        '<circle class="yuyu-crossicon-circle" cx="26" cy="26" r="25" fill="none" />' +
        '<path class="yuyu-crossicon-cross" fill="none" d="M16 16 36 36 M36 16 16 36" />' +
        '</svg>' +
        '</div>' +
        '<div class="yuyu-modal-header-title"></div>' +
        '</div>' +
        '<div class="yuyu-modal-message"></div>' +
        '<div class="yuyu-modal-footer">' +
        '<div class="yuyu-modal-footer-button"></div>' +
        '</div>' +
        '</div>' +
        '</div>',

        cssModal:
        '.yuyu-mod{position: absolute;top: 0;left: 0;z-index: 9999;display: none;width: 100%;height: 100%;text-align: center;}' +
        '.yuyu-mod::before{content: "";width: 100%;height: 100%;position: absolute;left: 0;top: 0; background-color: #fafafa;opacity: 0.5}' +
        '.yuyu-modal-wrap{display: inline-block;width: auto;background-color: #ffffff;box-shadow: 0px 0px 20px rgba(0,0,0,0.5);position: relative;' +
        'border-color: #009688;border-style: solid;border-width: 2px;max-width: 50%;' +
        'border-radius: 15px;overflow: hidden;max-height: 0;transition: max-height .5s ease-in-out;}' +
        '.yuyu-modal-header{height: auto;overflow: hidden;min-height: 60px;line-height: 60px;font-size: 20px;padding: 5px;border-bottom-color: #ccc;' +
        'border-bottom-style: solid;border-bottom-width: 1px;color: #fff;background: radial-gradient(at top, #009688, #009688);}' +
        '.yuyu-modal-header-title{line-height: normal;width: calc(100% - 86px);float: right;padding: 12px;}' +
        '.yuyu-btn-modal-close{cursor: pointer;width: 60px;height: 60px;line-height: 60px;float: right;}' +
        '.yuyu-modal-message{height: 100%;width: auto;background-repeat: no-repeat;background-size: contain;overflow: hidden;text-align: left;padding: 20px;}' +
        '.yuyu-modal-footer{height: auto;font-size: 16px;padding: 10px 20px;text-align: right;border-top-color: #ccc;border-top-style: solid;' +
        'border-top-width: 1px;color: #ffffff;background: radial-gradient(at top, #fafafa, #f5f5f5);}' +
        '.yuyu-modal-footer-button{width: auto;padding:5px 15px;border-radius: 7px;background-color:#009688;display: inline-block;' +
        'cursor: pointer;border-color: #ffffff;border-width: 1px;border-style: solid;}' +
        '.yuyu-modal-footer-button:hover{background-color:#ffffff;color:#009688;border-color: #009688;transition: all .1s ease-in-out;}' +
        '.yuyu-crossicon{width: 40px;height: 40px;border-radius: 50%;display: block;stroke-width: 2;stroke: #ffffff;stroke-miterlimit: 10;' +
        'margin: 10% auto;box-shadow: inset 0px 0px 2px #ffffff;}' +
        '.yuyu-crossicon-circle{stroke-dasharray: 166;stroke-dashoffset: 166;stroke-width: 2;stroke-miterlimit: 10;stroke: #ffffff;' +
        'display: none;fill: none;animation: stroke 0.4s cubic-bezier(0.65, 0, 0.45, 1) forwards;}' +
        '.yuyu-crossicon-cross{transform-origin: 50% 50%;stroke-dasharray: 29;stroke-dashoffset: 29;animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards;}' +
        '.yuyu-crossicon:hover .crossicon-circle{display: block;}' +
        '.yuyu-crossicon:hover .crossicon-cross{transform-origin: 20% 20%;stroke-width: 4;}' +
        '@keyframes stroke{100%{stroke-dashoffset: 0;}}' +
        '@media screen and (max-width: 1200px) {.yuyu-modal-wrap{max-width:90%}}' +
        '@media screen and (max-width: 600px) {.yuyu-mod{position: absolute!important}',

    }

    function Widget() {

        this.buttons = [];
        this.csrfParam;
        this.csrfToken;
        this.elemStyle;

        this.config = {
            classNameBtn: 'yuyu-modal',
            classNameSubmit: 'yuyu-submit-ajax'
        };
        
        this.init();
        this.listener();
    }


    Widget.prototype.init = function () {
        var
        tagsA = document.getElementsByTagName('a'),
        tagsInput = document.getElementsByTagName('input'),
        tagsMeta= document.getElementsByTagName('meta'),
        i;

        for (i = 0; i < tagsA.length; i++) {
            if (tagsA[i].classList.contains(this.config.classNameBtn)) {
                this.buttons.push(tagsA[i]);
            }
        }

        for (i = 0; i < tagsInput.length; i++) {
            if (tagsInput[i].classList.contains(this.config.classNameSubmit)) {
                this.buttons.push(tagsInput[i]);
            }
        }

        for (i = 0; i < tagsMeta.length; i++) {

            if (tagsMeta[i].name=='csrf-param') {
                this.csrfParam=tagsMeta[i].content;
            }     
            if (tagsMeta[i].name=='csrf-token') {
                this.csrfToken=tagsMeta[i].content;
            }
        }
    }


    Widget.prototype.listener = function () {
        var
        _this = this,
        length = this.buttons.length,
        i;

        for (i = 0; i < length; i++) {
            this.buttons[i].addEventListener('click', function () {
                _this.toggle(this);
            });
        }
    }

    Widget.prototype.toggle = function (elemBtn) {

        switch (elemBtn.dataset.toggle) {
            case 'yuyu-modal':
            this.showModal(elemBtn.dataset, false);
            break;

            case 'yuyu-modal-ajax':
            this.showModal(elemBtn.dataset, true);
            break;

            case 'yuyu-submit':
            this.submitForm(elemBtn);
            break;

            default:
            break;
        }
    }

    Widget.prototype.showModal = function (dataset, isAjax) {

        var _this = this;

        this.renderCss();

        if (!isAjax && dataset.content) {
            this.build(dataset);
        }

        if (isAjax) {
            this.sendPost(dataset.content, false, function (error, result) {                       
                _this.build(dataset, result);              
            });
        }
    }

    Widget.prototype.sendPost = function (url, form, callback) {

        var
        xhr = new XMLHttpRequest(),
        f = form || document.createElement('form'),
        formData = new FormData(f);
        
        if(this.csrfParam && this.csrfToken){
           formData.append(this.csrfParam, this.csrfToken);
       }       

       xhr.timeout = 5000;
       xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                callback(null, xhr.response)
            } else {
                callback(xhr.status, null)
            }
        }
    }
    xhr.ontimeout = function () {
        console.log('Timeout');
    }

    xhr.open("POST", url);
        // xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.send(formData);

    };


    Widget.prototype.build = function (dataset, ajaxData) {
        var
        div,
        wrap,
        header,
        svg,
        content,
        footer,
        btnSave,
        _this = this;

        div = document.createElement('div');
        div.innerHTML = option.htmlModal;

        wrap = div.children[0].children[0];
        header = wrap.children[0].children[1];
        svg = wrap.children[0].children[0].children[0];
        content = wrap.children[1];
        footer = wrap.children[2];
        btnSave = footer.children[0];

        if (dataset.options) {
            setStyleUser(dataset.options);
        }

        div.children[0].style.display = 'block';

        header.innerHTML = dataset.title || '';
        content.innerHTML = ajaxData || dataset.content;

        if (dataset.button) {
            btnSave.innerHTML = dataset.button;
        } else {
            wrap.removeChild(footer);
        }

        document.body.insertBefore(div, document.body.firstChild);

        setTimeout(() => {
            wrap.style.maxHeight = '5000px';
            wrap.style.top = (window.scrollY / this.getHeightScreen() * 100) + 5 + '%';
        }, 100);

        div.addEventListener('click', closeModal);
        btnSave.addEventListener('click', sendForm);

        function closeModal(event) {

            if (event.target.tagName === 'svg' ||
                event.target.tagName === 'path' ||
                event.target.tagName === 'circle') {

                wrap.style.maxHeight = 0;

                // Даем отработать анимации перед удалением модального окна				

                wrap.addEventListener("transitionend", function () {

                    if(dataset.reload=='close'){
                        location.reload(true); 
                    }

                    document.body.removeChild(div);
                    _this.removeCss();
                });

            }
        }

        function sendForm() {
            var forms = content.getElementsByTagName('form');

            if (forms) {
                _this.sendPost(forms[0].action, forms[0], function (error, result) {

                    if(error){
                        console.log(error)
                    }

                    if(dataset.reload=='submit'){
                        location.reload(true); 
                    }else{
                    content.innerHTML = error || result;
                    footer.style.display = 'none';                 
                    }

                });
            }
        }

        function setStyleUser(options) {
            try {
                var objOptions = JSON.parse(options);
            } catch (err) {
                console.log(err);
                return;
            }


            if (objOptions.background && objOptions.backgroundTop === undefined) {
                wrap.style.borderColor = objOptions.background;
                wrap.children[0].style.background = 'radial-gradient(at top, ' + objOptions.background + ', ' + objOptions.background + ')';
                btnSave.style.backgroundColor = objOptions.background;
            }

            if (objOptions.background && objOptions.backgroundTop) {
                wrap.style.borderColor = objOptions.background;
                wrap.children[0].style.background = 'radial-gradient(at top, ' + objOptions.backgroundTop + ', ' + objOptions.background + ')';
                btnSave.style.backgroundColor = objOptions.background;
            }

            if (objOptions.color) {
                wrap.children[0].style.color = objOptions.color;
                svg.style.stroke = objOptions.color;
                svg.children[0].style.stroke = objOptions.color;
                btnSave.style.color = objOptions.color;
            }
        }
    }

    Widget.prototype.renderCss = function () {

        this.elemStyle = document.createElement('style');
        this.elemStyle.innerHTML = option.cssModal;

        document.head.appendChild(this.elemStyle);
    }

    Widget.prototype.removeCss = function () {
        document.head.removeChild(this.elemStyle);
        delete this.elemStyle;
    }

    Widget.prototype.getHeightScreen = function () {
        var maxHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
            );

        return maxHeight;
    };

    Widget.prototype.submitForm = function (elem) {
        var _this=this;
        this.sendPost(elem.form.action, elem.form, function (error, result) {
            var resultElem = document.getElementById(elem.dataset.result);
            resultElem.innerHTML = result;

            new Widget(); 

        })
        return false;
    }


    var objWidjet;
    objWidjet = new Widget();

    return objWidjet;

})();