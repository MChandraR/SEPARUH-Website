class Template {
    constructor(parts = []) {
        this.templateParts = {
            'header': this.header,
            'footer': this.footer,
            'sidebar': this.sidebar,
        };
        this.items = [];
        console.log('KERUN');
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

    sidebar() {
        // Sidebar target div and content
        const targetDiv = 'template-sidebar';
        const content = `
                <div id="logo-container">
                    <img src="/assets/images/logo/fttk_logo.png" alt="logo_umrah">
                </div>
                <div class="navigation_button" id="dashboard-button">
                    <div>
                        <img src="assets/images/icon/dashboard-d.png" id="icon-dashboard">
                        <span class="button_label">Dashboard</span>
                    </div>
                </div>
                <div class="navigation_button" id="asset-button">
                    <div>
                        <img src="assets/images/icon/asset-d.png" id="icon-asset">
                        <span class="button_label">Aset dan Ruangan</span>
                    </div>
                </div>
                <div class="navigation_button" id="permohonan-button">
                    <div>
                        <img src="assets/images/icon/mail-d.png" id="icon-permohonan">
                        <span class="button_label">Permohonan</span>
                        <div id="counter">15</div>
                    </div>
                </div>
                <div class="navigation_button" id="logout-button">
                    <div>
                        <img src="assets/images/icon/logout-d.png" id="icon-logout">
                        <span class="button_label">Logout</span>
                    </div>
                </div>
        `;
    
        // Check if DOMPurify is loaded
        if (typeof DOMPurify === 'undefined') {
            console.log('DOMPurify is undefined.');
            return;
        } else if (document.getElementById(targetDiv) === null) {
            console.log(`Unable to add sidebar. Target position not found: div[id=${targetDiv}]`);
            return;
        }
    
        // Sanitize the content
        let sanitizedContent = DOMPurify.sanitize(content, {
            ALLOWED_ATTR: ['class', 'style', 'id', 'src', 'alt'],
        });
        ;
    
        // Create the sidebar container
        const sidebar = Object.assign(document.createElement('div'), { id: 'sidebar-container' });
        sidebar.innerHTML = sanitizedContent;
    
        // Insert the sidebar in the DOM
        document.getElementById(targetDiv).insertAdjacentElement('afterend', sidebar);
        document.getElementById(targetDiv).remove();

        const sidebarItems = document.querySelectorAll(".navigation_button");

            // Logic to detect the current page
            const currentPage = window.location.pathname;

            sidebarItems.forEach(item => {
                // Check if the ID matches the current page or part of it
                if (currentPage.includes(item.id.replace("-button", ""))) {
                    item.classList.add("active");
                }else{
                    item.classList.remove("active"); // Remove active class from others
                }
                
                // Add click event to manually highlight items
                item.addEventListener("click", () => {
                    item.classList.add("active");
                    item.id = item.id.replace("-button", "");
                    window.location.href = "/"+item.id;
                });
        });
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
        const script = Object.assign(document.createElement('script'), { src: '/js/jquery-3.7.1.min.js' });
        script.onload = () => { console.log('JQuery script has loaded.'); };
        document.head.appendChild(script);
        
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
            itemCard.href = `/peminjaman/${item.req_type?"asset":"ruangan"}?id=${item.room_id ?? item.asset_id}`;
            itemCard.style.animationDelay = `${(idx % 6) * 0.125}s`;
            itemCard.appendChild(itemImageContainer);
            itemCard.appendChild(itemInfo);
            
            // itemContainer.appendChild(itemCard);
            itemCollection.push(itemCard);
        });

        this.generateItemPages(this.items.length, itemCollection).forEach((collection) => {
            if (collection.id === 'page-1') collection.classList.add('show-page');
            itemContainer.insertAdjacentElement('afterbegin', collection);
        });
    }
}