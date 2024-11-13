class Template {
    constructor(parts = []) {
        this.templateParts = {
            'header': this.header,
            'footer': this.footer
        };

        this.script = Object.assign(document.createElement('script'), { src: 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.2.0/purify.min.js' });
        // Note to self: function() {} dengan () => {} memiliki scope this yg berbeda
        this.script.onload = () => {
            console.log('DOMPurify script has loaded.');

            parts.forEach((part) => {
                if (this.templateParts[part]) {
                    this.templateParts[part].call(this);
                }
            });
        };

        document.head.appendChild(this.script);
    }

    header(){
        // Header content
        const targetDiv = 'template-header';
        const content = `
            <div class="logo-container">
                <img src="/assets/images/logo/fttk_logo.png" />
            </div>
            <div class="nav-container">
                <a id="Home" href="/home2">Beranda</a>
                <a id="Peminjaman" href="/peminjaman2">Pinjam</a>
                <a>Kontak</a>
                <a>Daftar</a>
                <a>Masuk</a>
            </div>
        `;
        
        if (typeof(DOMPurify) === 'undefined') {
            console.log('DOMPurify is undefined.');
            return;
        } else if (document.getElementById(targetDiv) === null) {
            console.log('Unable to add template. Target position not found: div[id=footer]');
            return;
        }

        // Sanitize konten string/HTML markup
        let sanitizedContent = DOMPurify.sanitize(content);

        // Simpan di dalam div header-container agar dihitung sebagai HTML element
        const header = Object.assign(document.createElement('div'), { id: 'header-container' });
        header.innerHTML = sanitizedContent;

        // Menambahkan header-container setelah div 'header'
        document.getElementById(targetDiv).insertAdjacentElement('afterend', header);
        document.getElementById(targetDiv).remove();

        // Track user current pages
        const currentPage = document.title;
        const links = ["Home", "Peminjaman"];
        links.forEach((link) => {
            if (currentPage !== '' && currentPage === link){
                let navbarLink = document.getElementById(link);
                navbarLink?.classList.add('selected');
            }
        });
    }

    footer() {
        // Footer content
        const targetDiv = 'template-footer';
        const content = `
            <div id="information-container">
                <div class="column">
                    <h3>Legal</h3>
                    <hr/>
                    <a>Syarat dan Ketentuan</a>
                    <a>Kontrak</a>
                </div>
                <div class="column">
                    <h3>Bantuan</h3>
                    <hr/>
                    <a>FAQ</a>
                </div>
                <div class="column">
                    <h3>Pelayanan</h3>
                    <hr/>
                    <a>FTTK</a>
                    <a>Akademik</a>
                </div>
            </div>
            <div id="social-media-container">
                <a class="link-icon"><img src="/assets/images/logo/facebook.png"></a>
                <a class="link-icon"><img src="/assets/images/logo/instagram.png"></a>
                <a class="link-icon"><img src="/assets/images/logo/linkedin.png"></a>
                <a class="link-icon"><img src="/assets/images/logo/youtube.png"></a>
                <a class="link-icon"><img src="/assets/images/logo/twitter.png"></a>
            </div>
            <div id="copyright-container">
                <div class="logo-container">
                    <img src="/assets/images/logo/fttk_logo-w.png" />
                </div>
            </div>
        `;

        if (typeof(DOMPurify) === 'undefined') {
            console.log('DOMPurify is undefined.');
            return;
        } else if (document.getElementById(targetDiv) === null) {
            console.log('Unable to add template. Target position not found: div[id=footer]');
            return;
        }

        // Sanitize konten string/HTML markup
        let sanitizedContent = DOMPurify.sanitize(content);

        // Simpan di dalam div footer-container agar dihitung sebagai HTML element
        const footer = Object.assign(document.createElement('div'), { id: 'footer-container' });
        footer.innerHTML = sanitizedContent;

        // Menambahkan footer-container setelah div 'footer'
        document.getElementById(targetDiv).insertAdjacentElement('afterend', footer);
        document.getElementById(targetDiv).remove();
    }
}