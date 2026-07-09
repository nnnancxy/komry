const menuList = document.getElementById('big-menu-items');
const moreBtn = document.getElementById('more');
const overflowModal = document.getElementById('overflow-modal');
const modalList = document.getElementById('modal-list');

// Сохраняем все оригинальные пункты меню
const menuItems = Array.from(menuList.children);

function updateMenu() {
    // 1. Возвращаем все элементы обратно в меню перед замером
    menuItems.forEach(item => menuList.appendChild(item));
    modalList.innerHTML = ''; // Очищаем модальное окно

    // 2. Вычисляем доступную ширину (ширина контейнера минус отступы и кнопка "Еще")
    const containerWidth = menuList.parentElement.clientWidth;
    const moreBtnWidth = moreBtn.offsetWidth;
    let currentWidth = 0;
    let overflowItems = [];

    // 3. Проходимся по пунктам меню и ищем те, что не влезают
    menuItems.forEach((item, index) => {
        currentWidth += item.offsetWidth;
        
        // Если ширина превышает доступную (с учетом кнопки "Еще")
        if (currentWidth > containerWidth - moreBtnWidth) {
            overflowItems.push(item);
        }
    });

    // 4. Переносим не влезшие элементы в модальное окно
    if (overflowItems.length > 0) {
        moreBtn.style.display = 'inline-block';
        overflowItems.forEach(item => {
            modalList.appendChild(item.cloneNode(true)); // Клонируем для модального окна
            item.remove(); // Удаляем из видимого меню
        });
    } else {
        moreBtn.style.display = 'none';
        overflowModal.style.display = 'none'; // Скрываем модальное, если всё влезло
    }
}

// Показ/скрытие модального окна при клике на кнопку "Еще"
moreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = overflowModal.style.display === 'block';
    overflowModal.style.display = isVisible ? 'none' : 'block';
});

// Закрытие модального окна при клике в пустом месте
document.addEventListener('click', () => {
    overflowModal.style.display = 'none';
});

// Запуск при загрузке страницы и при изменении размеров окна
window.addEventListener('resize', updateMenu);
window.addEventListener('load', updateMenu);
