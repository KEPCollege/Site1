document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebarMenu = document.querySelector(".sidebar-menu");

    // Открытие/закрытие меню при клике на иконку
    menuToggle.addEventListener("click", function () {
        sidebarMenu.classList.toggle("active");
    });

    // Закрытие меню при клике вне него
    document.addEventListener("click", function (event) {
        if (!sidebarMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebarMenu.classList.remove("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const ruButton = document.getElementById("lang-ru");
    const kzButton = document.getElementById("lang-kz");

    function setLanguage(lang) {
        localStorage.setItem("language", lang); // Запоминаем язык
        updateActiveButton(lang); // Обновляем кнопки
        redirectToLanguagePage(lang); // Перенаправляем пользователя
    }

    function updateActiveButton(lang) {
        if (lang === "kz") {
            ruButton.classList.remove("active");
            kzButton.classList.add("active");
        } else {
            kzButton.classList.remove("active");
            ruButton.classList.add("active");
        }
    }

    function redirectToLanguagePage(lang) {
        let currentPath = window.location.pathname;
        let isInKZ = currentPath.startsWith("/kz/");
        let isInRU = currentPath.startsWith("/ru/");

        let newPath = "";

        if (lang === "kz" && !isInKZ) {
            newPath = currentPath.replace("/ru/", "/kz/");
            if (!isInRU) newPath = "/kz" + currentPath; 
        } else if (lang === "ru" && !isInRU) {
            newPath = currentPath.replace("/kz/", "/ru/");
            if (!isInKZ) newPath = "/ru" + currentPath; 
        }

        if (newPath && newPath !== currentPath) {
            window.location.href = newPath;
        }
    }

    // При загрузке страницы проверяем язык и обновляем кнопки
    let savedLang = localStorage.getItem("language") || "ru";
    updateActiveButton(savedLang);

    // Обработчики событий для кнопок
    ruButton.addEventListener("click", () => setLanguage("ru"));
    kzButton.addEventListener("click", () => setLanguage("kz"));
});
