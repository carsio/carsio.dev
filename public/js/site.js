function downloadCV() {
    var element = document.createElement('a');
    element.setAttribute('href', 'documents/Carsio-Eddyo.pdf');
    element.setAttribute('download', '');

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function type(id) {
    var typed4 = new Typed(id, {
        strings: ['npm install curriculum-vitae-carsio^1000\n`installing components...`^1000\n`Fetching from source...`^2000\n`Downloading assets from store...`^100\n`Task complete! :D`\n^200$ `'],
        typeSpeed: 50,
        backSpeed: 0,
        startDelay: 500,
        // attr: 'placeholder',
        bindInputFocusEvents: true,
        // loop: true,
        onComplete: function () {
            downloadCV()
        }
    });
}

var prompt = {
    window: $(".window"),
    windowContainer: $(".window-container"),
    shortcut: $(".prompt-shortcut"),
    input: $(".js-prompt-input"),
    animationName: 'bounce',
    opened: false,
    MAX: 1,
    OTHER: 2,

    init: function () {

        function promptMinimize () {
            prompt.windowContainerControl(prompt.OTHER);
            prompt.minimize();
        }

        function promptMaximize () {
            prompt.windowContainerControl(prompt.MAX);
            prompt.maximize();
        }

        function promptClose () {
            prompt.windowContainerControl(prompt.OTHER);
            prompt.close();
        }

        function promptOpen () {
            prompt.windowContainerControl(prompt.OTHER);
            prompt.open();
        }


        $(".js-minimize").click(promptMinimize);

        $(".js-maximize").click(promptMaximize);

        $(".js-close").click(promptClose);

        $(".js-open").click(promptOpen);

        prompt.shortcut.on('mouseenter', prompt.mouseenter)
        prompt.shortcut.on('mouseleave', prompt.mouseleave)
        prompt.close();
        prompt.animate();
        // prompt.input.focus();
        // prompt.input.blur(prompt.focus);
    },
    focus: function () {
        prompt.input.focus();
    },
    minimize: function () {
        prompt.window.removeClass("window--maximized");
        prompt.window.toggleClass("window--minimized");
    },
    maximize: function () {
        prompt.window.removeClass("window--minimized");
        prompt.window.toggleClass("window--maximized");
        prompt.focus();
    },
    close: function () {
        prompt.window.addClass("window--destroyed");
        prompt.window.removeClass("window--maximized window--minimized");
        prompt.shortcut.removeClass("hidden");
        prompt.input.val("");
    },
    open: function () {
        prompt.window.removeClass("window--destroyed");
        prompt.shortcut.addClass("hidden");
        prompt.focus();
        if (!prompt.opened) {
            type('#type');
            prompt.opened = !prompt.opened;
        }
    },
    animate: function () {

        animation()

        function animation() {
            if (!prompt.opened) {
                window.setTimeout(function () {
                    animateCSS(animation)
                }, 3000)
            }
        }

        function animateCSS(callback) {
            let nodeElement = prompt.shortcut.attr('id');
            let node = document.querySelector('#' + nodeElement);
            const animationName = prompt.animationName;


            // Não adicionar classe de animação quando  
            // o mouse estiver sobre o ícone do terminal
            if ($(node).hasClass('shortcut-hovered')) {
                animation()
            } else {
                $(node).addClass('animated ' + animationName)
            }

            function handleAnimationEnd() {
                $(node).removeClass('animated ' + animationName)
                node.removeEventListener('animationend', handleAnimationEnd)

                if (typeof callback === 'function') callback()
            }

            node.addEventListener('animationend', handleAnimationEnd)
        }

    },
    windowContainerControl: function (mode) {
        
        function removeWindowfull () {
            prompt.windowContainer.removeClass('window-full');
        }
        
        function toggleWindowFull() {
            prompt.windowContainer.toggleClass('window-full');
        }

        function waitAnimationEnd(callback) {
            return setTimeout(callback, 300);
        }

        function onMaxClicked () {
            if (prompt.window.hasClass('window--maximized')) {
                waitAnimationEnd(toggleWindowFull);
            } else {
                toggleWindowFull();
            }
        }

        function onOtherClicked (){
            waitAnimationEnd(removeWindowfull)
        }

        switch (mode) {
            case prompt.MAX:
                onMaxClicked();
                break;

            case prompt.OTHER:
                onOtherClicked();
        }
    },
    mouseenter: function () {
        prompt.shortcut.addClass('shortcut-hovered')
    },
    mouseleave: function () {
        prompt.shortcut.removeClass('shortcut-hovered')
    }
};

$(document).ready(prompt.init);