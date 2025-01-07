// NOTE: Untuk development aja, malas nambah" tag link :)

function src(target) {
    return `https://separuh.s3.ap-southeast-2.amazonaws.com/public/css/${target}.css`;
};

function cssLoader(source) {
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = source;
    document.head.appendChild(link);
};

function loadCSS(cssFiles) {
    // cek apakah cssFiles array
    if (!Array.isArray(cssFiles)) {
        console.log('Type err: Expected an array css files!');
        return;
    }

    // load file css
    document.addEventListener('DOMContentLoaded', function() {
        cssFiles.forEach(cssFile => {
            cssLoader(src(cssFile));
        });
        // Montserrat/Inter Font
        cssLoader("https://fonts.googleapis.com/css?family=Montserrat:700,400,300,200|Inter:700,400,300,200");
    });

    // mencegah flash of unstyled content (fouc)
    window.onload = () => {
        document.body.style.visibility = 'visible';
    };
}

