document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebarMenu = document.querySelector(".sidebar-menu");

    // Открытие/закрытие бокового меню
    menuToggle.addEventListener("click", function () {
        sidebarMenu.classList.toggle("active");
    });

    // Закрытие меню при клике вне него
    document.addEventListener("click", function (event) {
        if (!sidebarMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebarMenu.classList.remove("active");
        }
    });

    // Обработчик для подменю
    document.querySelectorAll(".has-submenu > a").forEach(function (submenuToggle) {
        submenuToggle.addEventListener("click", function (event) {
            event.preventDefault(); // Отключаем переход по ссылке
            this.parentElement.classList.toggle("active"); // Переключаем подменю
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const ruButton = document.getElementById("lang-ru");
    const kzButton = document.getElementById("lang-kz");

    function setLanguage(lang) {
        localStorage.setItem("language", lang);
        updateActiveButton(lang);
        redirectToLanguagePage(lang);
    }

    function updateActiveButton(lang) {
        ruButton.classList.toggle("active", lang === "ru");
        kzButton.classList.toggle("active", lang === "kz");
    }

    function redirectToLanguagePage(lang) {
        let currentPath = window.location.pathname; // Текущий путь (например, "/kz/about.html")

        // Если на главной странице, просто перекидываем на index.html
        if (currentPath === "/" || currentPath === "/index.html") {
            window.location.href = lang === "kz" ? "/kz/index.html" : "/index.html";
            return;
        }

        // Проверяем, в какой папке находимся
        let isInKZ = currentPath.startsWith("/kz/");
        let isInRU = currentPath.startsWith("/ru/");

        let newPath = currentPath;

        // Если переключаемся на KZ, но сейчас в RU → убираем "/ru/" и добавляем "/kz/"
        if (lang === "kz" && isInRU) {
            newPath = "/kz" + currentPath.replace("/ru", "");
        }
        // Если переключаемся на RU, но сейчас в KZ → убираем "/kz/" и добавляем "/ru/"
        else if (lang === "ru" && isInKZ) {
            newPath = "/ru" + currentPath.replace("/kz", "");
        }
        // Если мы НЕ в /ru/ и НЕ в /kz/, просто переходим в корень
        else if (lang === "ru") {
            newPath = "/index.html";
        } else if (lang === "kz") {
            newPath = "/kz/index.html";
        }

        // Меняем страницу
        window.location.href = newPath;
    }

    // При загрузке страницы проверяем сохраненный язык
    let savedLang = localStorage.getItem("language") || "ru";
    updateActiveButton(savedLang);

    // Если нужно, делаем редирект
//    if (savedLang === "kz" && !window.location.pathname.startsWith("/kz/")) {
//        redirectToLanguagePage("kz");
//    } else if (savedLang === "ru" && !window.location.pathname.startsWith("/ru/")) {
//        redirectToLanguagePage("ru");
//    }

    // Назначаем обработчики кликов на кнопки
    ruButton.addEventListener("click", () => setLanguage("ru"));
    kzButton.addEventListener("click", () => setLanguage("kz"));
});
