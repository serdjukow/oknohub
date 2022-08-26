ymaps.ready(init)
function init() {
	const suggestView = new ymaps.SuggestView('address')
	suggestView.events.add('select', function (event) {
		let selected = event.get('item').value
		ymaps
			.geocode(selected, {
				/**
				 * Опции запроса
				 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
				 */

				results: 1,
			})
			.then(function (res) {
				// Выбираем первый результат геокодирования.
				const firstGeoObject = res.geoObjects.get(0),
					// Координаты геообъекта.
					coords = firstGeoObject.geometry.getCoordinates(),
					// Область видимости геообъекта.
					bounds = firstGeoObject.properties.get('boundedBy')

				const addressCords = document.getElementById('address-cords')
				addressCords.innerHTML = `
				Получаем данные от сервера...
				<pre class="text-start">
					<code>
						userInfo {
							coords: ${coords},
							addressFromServer: ${firstGeoObject.getAddressLine()}
						}
					</code>
				</pre>
				Показываем клиенту второй шаг... 
				`
			})
	})
	//установка смещения блока подсказок по вертикали
	document.getElementsByTagName('ymaps')[0].style.top = document.getElementsByTagName('ymaps')[0].style.top.match(/d+/) * 1 + 100 + '%'
	//установка смещения блока подсказок по горизонтали
	document.getElementsByTagName('ymaps')[0].style.left = document.getElementsByTagName('ymaps')[0].style.left.match(/d+/) * 1 - 1 + 'px'
}
