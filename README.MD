Модальное окно yuyu-modal
-------------
Модальное окно, с возможностью подгружать содержимое с сервера и отправлять обратно форму с данными в ассинхронном режиме (ajax).
При отправке на сервер считывает "csrf-token" с страницы и передает его на сервер. 

Подключение
---------------

Ссылка development(будет использоваться самая последняя версия):

https://rawgit.com/yii-yu/yuyu-modal/master/js/yuyu_modal.js

Ссылка production(текущая версия в дальнейшем не будет меняться):

Подключается на странице как обычный js файл, например:
<script type="text/javascript" src="https://rawgit.com/yii-yu/yuyu-modal/master/js/yuyu_modal.js"></script>

Использование
-----------------

**Ссылка. Пример:**
```html
    <a class="... yuyu-modal" 		
  	data-toggle="yuyu-modal-ajax"
   	data-content="?page=form-message-user"   		
   	data-title="Заголовок" 
 	data-button="Сохранить"
 	data-options='{"background":"#ff0000","backgroundTop":"#08e2ca","color":"#08e2ca"}'
    >Текст ссылки</a>
``` 

**Описание атрибутов ссылки:**
  
***class="... yuyu-modal"***   - данный класс идентифицирует ссылку для открытия модального окна;

***data-toggle***  - переключатель для разных вариантов использования данного модуля: 
* "yuyu-modal-ajax" то содержимое модального окна вытягивется с сервера по адресу, указанному в  data-content;                   
* "yuyu-modal" то содержимое модального окна берется из атрибута data-content;
 
***data-content*** - адрес контроллера на сервере, который возвращает содержимое для модального окна (если data-toggle="yuyu-modal-ajax") или же само содержимое (если data-toggle="yuyu-modal");

***data-title*** - заголовок, который будет выводится в модальном окне;

***data-button*** - название кнопки в футоре. Данная кнопка отправляет форму на сервер;

***data-reload*** - перезагрузка страницы, после закрытия модального окна;
* "close" - после закрытия модального окна;  
* "submit" - после отправки из модального окна формы на сервер. Форма отправляется путем нажатия на кнопку обозначенную атрибутом "data-button";

           
***data-options*** - цветовая стилизация модального окна;   
* "background" - цвет заливки шапки модального окна,кнопки в футоре и цвет рамки модального окна;
* "backgroundTop" - цвет заливки верхней части модального окна (градиент). Если без градиента, то указать такой же цвет как и в "background";
* "color" - цвет заголовка, цвет текста кнопок.          


---
Важно! в отправляемой из модального окна форме прописать onsubmit="return false;" <form ... onsubmit="return false;" ><form>
----

Для передачи csrf токена на сервер станица в <head> </head> должна содержать тэг вида: 
```html
<meta name="csrf-token" content="NhsgCyA...">
```
 
Если в консоле браузера ошибка типа "SyntaxError: Unexpected token # in JSON at position 0" - неправильный синтаксис атрибута data-json. Должно быть: data-json='{"":"","":""}'