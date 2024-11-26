class Template {
    constructor(parts = []) {
        this.templateParts = {
            'header': this.header,
            'footer': this.footer
        };
        this.items = [];

        this.scripts = {
            'DOMPurify': () => { return Object.assign(document.createElement('script'), { src: 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.2.0/purify.min.js' }) },
            'JQuery': () => { return Object.assign(document.createElement('script'), { src: '/js/jquery-3.7.1.min.js' }) }
        }

        for (let scriptName in this.scripts) {
            if (this.scripts.hasOwnProperty(scriptName)) {
                let script = this.scripts[scriptName]();
                
                // For template loader
                if (scriptName === 'DOMPurify') {
                    script.onload = () => {
                        parts.forEach((part) => {
                            if (this.templateParts[part]) {
                                this.templateParts[part].call(this);
                            }
                        });
                    };
                }
                
                document.head.appendChild(script);
                console.log(`${scriptName} script has loaded.`);
            }
        }
        // this.script = Object.assign(document.createElement('script'), { src: 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.2.0/purify.min.js' });
        // Note to self: function() {} dengan () => {} memiliki scope this yg berbeda
        // this.script.onload = () => {
        //     console.log('DOMPurify script has loaded.');

            
        // };

        // document.head.appendChild(this.script);
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
                <a id="Login" href="/login">Masuk</a>
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

    generateItems(data) {
        const script = Object.assign(document.createElement('script'), { src: '/js/jquery-3.7.1.min.js' });
        script.onload = () => { console.log('JQuery script has loaded.'); };
        document.head.appendChild(script);
        
        this.items = data;
        console.log(this.items);

        // Untuk membuat elemen beserta className
        const createElement = (element_name, class_name) => {
            return Object.assign(
                document.createElement(element_name),
                { className: class_name }
            );
        };

        const itemContainer = document.getElementById('item-container');
        this.items.forEach((item) => {
            const itemCard = createElement('div', 'item-card');
            const itemImageContainer = createElement('div', 'item-img-container');
            const itemInfo = createElement('div', 'item-info');

            // Item Image Container
            itemImageContainer.appendChild(Object.assign(document.createElement('img'), { src: "/assets/images/room.jpg" }));
            
            // Item Info
            itemInfo.appendChild(Object.assign(createElement('span', 'item-name'), { innerHTML: `${item.room_name}` }));
            itemInfo.appendChild(Object.assign(createElement('span', 'item-score'), { innerHTML: `4.3 / 5.0` }));
            itemInfo.appendChild(Object.assign(createElement('p', 'item-description'), { innerHTML: `${item.description}` }));

            // Item Card
            itemCard.appendChild(itemImageContainer);
            itemCard.appendChild(itemInfo);
            
            itemContainer.appendChild(itemCard);
        });
    }
}