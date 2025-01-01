class Template {
    constructor(parts = []) {
        this.templateParts = {
            'header': this.header,
            'footer': this.footer
        };
        this.items = [];
        // console.log('Template constructed');
        this.scripts = {
            'DOMPurify': () => { return Object.assign(document.createElement('script'), { src: 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.2.0/purify.min.js' }) },
            'JQuery': () => { return Object.assign(document.createElement('script'), { src: '/js/jquery-3.7.1.min.js' }) },
            'BootStrap': () => { return Object.assign(document.createElement('script'), { src: '/js/bootstrap/bootstrap.min.js' }) }
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
                <a id="Kontak" href="/kontak">Kontak</a>
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
        const links = ["Home", "Peminjaman", "Kontak"];
        links.forEach((link) => {
            if (currentPage !== '' && currentPage === link){
                let navbarLink = document.getElementById(link);
                navbarLink?.classList.add('selected');
            }
        });

        $.ajax({
            url: '/api/user/session-check',
            method: 'GET'
        }).done((e) => {
            const navContainer = document.getElementsByClassName('nav-container')[0];
            if (e.data.userLogged === true) {
                const dropdown = Object.assign(document.createElement('div'), { id: 'profile-dropdown', innerHTML: `${e.data.username}` });
                const profileImg = Object.assign(document.createElement('img'), { src: '/assets/images/icon/user.png' });
                
                const navProfile = Object.assign(document.createElement('a'), { id: 'profile', href: '/profile', innerHTML: 'Profile' })
                const navLogout = Object.assign(document.createElement('a'), { id: 'logout' , href: '/logout', innerHTML: 'Logout' });
                const dropdownContent = Object.assign(document.createElement('div'), { id: 'dropdown-content'});
                dropdownContent.append(navProfile, navLogout);
                // dropdown.style.bottom = dropdown.clientHeight;
                dropdown.addEventListener('click', function() {
                    dropdownContent.classList.toggle('open');
                });

                dropdown.append(profileImg, dropdownContent);
                navContainer.insertAdjacentElement('beforeend', dropdown);
            }
            else {
                const navLogin = Object.assign(document.createElement('a'), { id: 'login', href: '/login', innerHTML: 'Masuk' });
                const navRegister = Object.assign(document.createElement('a'), { id: 'register', href: '/register', innerHTML: 'Daftar' });
                navContainer.append(navRegister, navLogin);
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

    generateItemPages(itemCount = 0, itemCollection = null) {
        if (!document.getElementById('pagination-container')) {
            console.error("Err: element not found!!");
            return;
        }

        const pageNumContainer = document.getElementById('pagination-container');
        // Previous button
        const prevBtn = Object.assign(document.createElement('button'), { id: 'prevPageBtn', className: 'disabled', disabled: true });
        prevBtn.appendChild(Object.assign(document.createElement('span'), { innerHTML: 'Previous' }));
        prevBtn.insertAdjacentElement('afterbegin', Object.assign(document.createElement('img'), { src: '/assets/images/icon/arrow-left.png' }));

        // Next button
        const nextBtn = Object.assign(document.createElement('button'), { id: 'nextPageBtn' });
        nextBtn.appendChild(Object.assign(document.createElement('span'), { innerHTML: 'Next' }));
        nextBtn.insertAdjacentElement('beforeend', Object.assign(document.createElement('img'), { src: '/assets/images/icon/arrow-right.png' }));
        pageNumContainer.append(prevBtn, nextBtn);

        if (itemCount < 0 || !itemCollection) {
            console.error('Err: Item data is invalid!!');
            return;
        }
        // console.log("Collection: \n", itemCollection);

        // Iterasi setiap halaman
        let itemPage;
        let itemPages = [];
        for (let i = 0; i < itemCount; i++) {
            if (i%6 == 0) {
                // Buat button/link untuk setiap page
                const pageNum = i/6+1;
                const pageBtn = Object.assign(document.createElement('button'), { className: 'page-btn', innerHTML: `${pageNum}` });
                pageBtn.setAttribute('data-page', `${pageNum}`);
                if (pageBtn.getAttribute('data-page') === "1") pageBtn.classList.add('active');
                pageNumContainer.insertBefore(pageBtn, pageNumContainer.lastChild);

                itemPage = Object.assign(document.createElement('div'), { className: 'item-page', id: `page-${pageNum}` });
                itemPages.push(itemPage);
            }
            
            // Untuk konten item per page
            itemPage.appendChild(itemCollection[i]);
        }
        // itemPages.forEach(page => console.log(page));

        return itemPages;
    }

    generateItems(data) {
        this.items = data;
        console.log(this.items, this.items.length);

        // Arrow function untuk membuat elemen beserta className
        const createElement = (element_name, class_name) => {
            return Object.assign(document.createElement(element_name), { className: class_name });
        };

        const itemContainer = document.getElementById('item-container');
        let itemCollection = [];
        this.items.forEach((item, idx) => {
            const itemCard = createElement('a', 'item-card');
            const itemImageContainer = createElement('div', 'item-img-container');
            const itemInfo = createElement('div', 'item-info');

            // Item Image Container
            itemImageContainer.appendChild(Object.assign(document.createElement('img'), { src: `https://separuh.s3.ap-southeast-2.amazonaws.com/${item.room_id ?? item.asset_id}.png?time=${new Date().getHours()}` }));
            
            // Item Info
            itemInfo.appendChild(Object.assign(createElement('span', 'item-name'), { innerHTML: `${item.room_name ?? item.asset_name}` }));
            itemInfo.appendChild(Object.assign(createElement('span', 'item-score'), { innerHTML: `4.3 / 5.0` }));
            itemInfo.appendChild(Object.assign(createElement('p', 'item-description'), { innerHTML: `${item.description}` }));
            
            // Item Card
            itemCard.href = `/peminjaman/${item.asset_id?"asset":"ruangan"}?id=${item.room_id ?? item.asset_id}`;
            itemCard.style.animationDelay = `${(idx % 6) * 0.125}s`;
            itemCard.appendChild(itemImageContainer);
            itemCard.appendChild(itemInfo);
            itemCard.appendChild(Object.assign(createElement('span', `item-status ${item.status ? "inorder" : ""}`), {innerHTML : `${item.status ? "Dipinjam"  : "Tersedia"}`}));
            
            // itemContainer.appendChild(itemCard);
            itemCollection.push(itemCard);
        });

        this.generateItemPages(this.items.length, itemCollection).forEach((collection) => {
            if (collection.id === 'page-1') collection.classList.add('show-page');
            itemContainer.insertAdjacentElement('afterbegin', collection);
        });
    }
}