var gocnshop_config = {
    apiDomain: '//nhaphangtrungquoc.vn/',
    domain: 'https://www.gocnshop.com/',
    path: 'extension/prod/'
};

var HTMLUtil = {
    hideElement: function (selector) {
        var element = this.select(selector);
        if (element !== null && typeof element !== 'undefined' && typeof element.style !== 'undefined') {
            element.style.display = 'none';
        }
    },
    select: function (selector, element) {
        if (typeof selector !== 'string') {
            return null;
        }
        if (typeof element === 'undefined' || !element) {
            element = document;
        }
        return element.querySelector(selector);
    },
    selectAll: function (selector, element) {
        if (typeof element === 'undefined' || !element) {
            return document.querySelectorAll(selector);
        }
        return element.querySelectorAll(selector);
    },
    formatMoney: function (input) {
        return input.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    },
    each: function (elements, callback) {
        for (var i in elements) {
            if (typeof elements[i] === 'object') {
                callback(elements[i]);
            }
        }
    },
    serialize: function (obj, prefix) {
        var str = [], p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                str.push(v !== null && typeof v === "object" ?
                    HTMLUtil.serialize(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    },
    get: function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4
                && xhr.status === 200) {
                callback && callback(xhr.response);
            }
        };

        xhr.withCredentials = true;
        xhr.send();
    },
    post: function (url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.responseType = 'json';
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4
                && xhr.status === 200) {
                callback && callback(xhr.response);
            }
        };

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.withCredentials = true;
        if (data !== null && data !== undefined) {
            xhr.send(HTMLUtil.serialize(data));
        } else {
            xhr.send();
        }
    },
    fullHeight: function (element) {
        var e = null;
        if (typeof element === 'string') {
            e = HTMLUtil.select(element);
        } else {
            e = element;
        }
        if (e !== null) {
            e.style.height = window.innerHeight + 'px';
            HTMLUtil.addEvent(window, "resize", function (event) {
                e.style.height = window.innerHeight + 'px';
            });
        }
    },
    addEvent: function (object, type, callback) {
        if (object === null || typeof object === 'undefined') return;
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
        } else if (object.attachEvent) {
            object.attachEvent("on" + type, callback);
        } else {
            object["on" + type] = callback;
        }
    },
    getSearchUrl: function (website, keyword) {
        var url = "";
        switch (website) {
            case "taobao.com":
            case "taobao":
                url = 'http://s.taobao.com/search?q=' + keyword;
                break;
            case "tmall.com":
            case "tmall.hk":
            case "tmall":
                url = 'http://list.tmall.com/search_product.htm?q=' + keyword;
                break;
            case "1688.com":
            case "1688":
                url = 'http://s.1688.com/selloffer/offer_search.htm?keywords=' + keyword;
                break;
            default:
                return null;
        }
        return url;
    },
    getItemUrl: function (website, itemId) {
        var url = "";
        switch (website) {
            case "taobao.com":
            case "taobao":
                url = 'https://item.taobao.com/item.htm?id=' + itemId;
                break;
            case "tmall.com":
            case "tmall.hk":
            case "tmall":
                if (window.location.hostname.indexOf('world.tmall.com') !== 0) {
                    url = 'https://world.tmall.com/item/' + itemId + '.htm';
                } else {
                    url = 'https://detail.tmall.com/item.htm?id=' + itemId;
                }
                break;
            case "1688.com":
            case "1688":
                url = 'https://detail.1688.com/offer/' + itemId + '.html';
                break;
            default:
                return null;
        }
        return url;
    },
    alert: function (msg, options) {
        var type = 'alert';
        var parent = 'body';
        if (typeof options !== 'undefined' && options !== null) {
            if (typeof options.type !== 'undefined') {
                type = options.type;
            }

            if (typeof options.parent !== 'undefined') {
                parent = options.parent;
            }
        }
        var html = '<div class="gocnshopAlert gocnshopAlert-' + type + '">' +
            '<div class="gocnshopAlertContent">' +
            '<div class="gocnshopAlertMessage">' +
            msg +
            '</div>' +
            '<button type="button" class="gocnshopAlertClose" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">\u00d7</span>' +
            '</button>' +
            '</div>' +
            '</div>';
        var p = HTMLUtil.select(parent);
        // ÄĂ³ng táº¥t cáº£ alert trong parent
        var olds = HTMLUtil.selectAll('.gocnshopAlertWrap', p);
        if (olds.length > 0) {
            for (var i = 0; i < olds.length; i++) {
                olds[i].parentNode.removeChild(olds[i]);
            }
        }
        if (typeof p !== 'undefined' && p !== null) {
            var e = document.createElement('div');
            e.classList.add('gocnshopAlertWrap');
            e.innerHTML = html;
            HTMLUtil.select('.gocnshopAlertClose', e).onclick = function () {
                e.parentNode.removeChild(e);
            };
            p.appendChild(e);
        }
    }
};

function NHToolbar() {
    // Init
    var instance = this;
    HTMLUtil.get(gocnshop_config.domain + 'admincp/admin-ajax.php?action=gocnshop_config', function (response) {
        var res = JSON.parse(response);
        instance.config = res;
        instance.hostname = instance.getHostName();
        instance.website = instance.getWebsite();
        instance.shop = instance.getShopInfo();
        instance.item = instance.getItemInfo();
        instance.sku = null;
        instance.selectedQuantity = 0;
        instance.subtotal = 0;
        instance.domestic_fee = 0;
        instance.order_fee = 0;
        instance.run();
    });
}


NHToolbar.prototype.itemDetailPatterns = [
    'item.taobao.com',
    'tw.taobao.com/item',
    'world.taobao.com/item',
    'detail.tmall.com',
    'taiwan.tmall.com/item',
    'world.tmall.com/item',
    'detail.1688.com',
    'detail.tmall.hk/hk/item'
];

NHToolbar.prototype.setSidebarState = function (data) {
    var instance = this;

    if (typeof this.sidebar.state === 'undefined' || this.sidebar.state === null) {
        this.sidebar.state = { website: "taobao.com" };
    }
    var oldState = this.sidebar.state;

    for (var i in data) {
        this.sidebar.state[i] = data[i];
    }

    if (this.sidebar.state.isShowContent) {
        HTMLUtil.select('.gocnshop-sidebar-content').style.display = 'block';
    } else {
        this.sidebar.state.screen = false;
        HTMLUtil.select('.gocnshop-sidebar-content').style.display = 'none';

        HTMLUtil.each(this.sidebar.buttons, function (element) {
            element.classList.remove('nh-selected');
        });
    }
    if (this.sidebar.state.screen) {
        var originScreen = this.sidebar.state.screen;
        if (this.sidebar.state.screen === 'user') {
            if (this.config.user === null) {
                this.sidebar.state.screen = 'login';
            }
        }

        HTMLUtil.each(this.sidebar.screens, function (screen) {
            screen.style.display = 'none';
        });
        var selected = HTMLUtil.select('.gocnshop-sidebar-screen[data-screen="' + this.sidebar.state.screen + '"]');
        selected.style.display = 'block';

        HTMLUtil.select('.gocnshop-sidebar-title').innerHTML = selected.getAttribute('data-screen-title');
        HTMLUtil.each(this.sidebar.buttons, function (btn) {
            if (btn.getAttribute('data-screen') === originScreen) {
                btn.classList.add('nh-selected');
            } else {
                btn.classList.remove('nh-selected');
            }
        });
    }
    if (typeof this.sidebar.state.website !== 'undefined' && this.sidebar.state.website !== null) {
        var elements = HTMLUtil.selectAll('.gocnshop-select-website a');
        HTMLUtil.each(elements, function (element) {
            element.classList.remove('nh-selected');
        });

        HTMLUtil.select('.gocnshop-select-website a[data-website="' + this.sidebar.state.website + '"]').classList.add('nh-selected');
    }
    if (typeof this.sidebar.state.searchResult !== 'undefined' && this.sidebar.state.searchResult !== null) {
        var html = '';
        if (this.sidebar.state.searchResult.length > 0) {
            for (i = 0; i < this.sidebar.state.searchResult.length; i++) {
                var word = this.sidebar.state.searchResult[i];
                html += '<div class="nh-search-item">' +
                    '<div class="nh-search-keyword">' +
                    '<a href="' + HTMLUtil.getSearchUrl(this.sidebar.state.website, word.keyword_cn) + '" target="_blank">' +
                    word.keyword_label + '</a></div>' +
                    '</div>';
            }
        } else {
            html += '<div class="nh-search-item" style="color:#c00;">Kh\u00f4ng c\u00f3 k\u1ebft qu\u1ea3 n\u00e0o \u0111\u01b0\u1ee3c t\u00ecm th\u1ea5y.</div>';
        }
        HTMLUtil.select('#gocnshopSearchResult').innerHTML = html;
    }
};

NHToolbar.prototype.render = function () {
    var instance = this;
    HTMLUtil.get(gocnshop_config.domain + gocnshop_config.path + 'sidebar.php', function (res) {
        instance.sidebar = document.createElement('div');
        instance.sidebar.setAttribute('id', 'gocnshopSideBar');
        instance.sidebar.innerHTML = res;

        var body = document.getElementsByTagName('body')[0];
        body.insertBefore(instance.sidebar, body.firstChild);
        HTMLUtil.fullHeight(instance.sidebar);
        HTMLUtil.fullHeight(HTMLUtil.select('.gocnshop-sidebar-icons', instance.sidebar));

        //
        instance.sidebar.screens = HTMLUtil.selectAll('.gocnshop-sidebar-screen', instance.sidebar);
        instance.sidebar.buttons = HTMLUtil.selectAll('.nh-sidebar-btn', instance.sidebar);
        //
        HTMLUtil.each(instance.sidebar.buttons, function (lnk) {
            lnk.onclick = function (event) {
                if (this.classList.contains('nh-selected')) {
                    instance.setSidebarState({ isShowContent: false });
                    return false;
                }

                instance.setSidebarState({
                    isShowContent: true,
                    screen: lnk.getAttribute('data-screen')
                });
                return false;
            };
        });
        HTMLUtil.select('.nh-sidebar-close', instance.sidebar).onclick = function () {
            instance.setSidebarState({ isShowContent: false });
            return false;
        };
        var elements = HTMLUtil.selectAll('.gocnshop-select-website a');
        HTMLUtil.each(elements, function (element) {
            element.onclick = function () {
                instance.setSidebarState({ website: this.getAttribute('data-website') });
                return false;
            };
        });
        var idxTimeout = null;
        var txtKeyword = HTMLUtil.select('#nhTxtKeyword');
        var patternNumberOnly = /^(\d+)$/;
        var btnViewItem = HTMLUtil.select('#nhBtnViewItem');
        HTMLUtil.addEvent(txtKeyword, 'keyup', function (event) {
            var keyword = txtKeyword.value.trim();
            if (patternNumberOnly.test(keyword)) {
                if (keyword.length >= 5) {
                    btnViewItem.style.display = 'block';
                    btnViewItem.onclick = function () {
                        var url = HTMLUtil.getItemUrl(instance.sidebar.state.website, keyword);
                        if (url !== null) {
                            window.open(url, '_blank');
                        }
                    };
                } else {
                    btnViewItem.style.display = 'none';
                }
                return;
            }
            if (idxTimeout !== null) {
                clearTimeout(idxTimeout);
            }
            idxTimeout = setTimeout(function () {
                HTMLUtil.get(gocnshop_config.domain + 'admincp/admin-ajax.php?action=gocnshop_search&term=' + encodeURIComponent(keyword), function (res) {
                    var words = JSON.parse(res);
                    instance.setSidebarState({ searchResult: words });
                });
            }, 500);
        });

        instance.setSidebarState({ website: instance.website });
    });
};

NHToolbar.prototype.renderItemInfo = function () {
    switch (this.website) {
        case 'taobao.com':
            this.renderItemInfoTaobao();
            break;
        case 'tmall.com':
        case 'tmall.hk':
            this.renderItemInfoTmall();
            break;
        case '1688.com':
        default:
            this.renderItemInfo1688();
            break;
    }

    // Add `add-to-cart` event
    var instance = this;
    var btnAddToCart = HTMLUtil.select('#gocnshopBtnAddToCart');
    if (btnAddToCart) {
        btnAddToCart.onclick = function () {
            instance.addToCart();
        };
    }
    var btnLoveItem = HTMLUtil.select('#gocnshopBtnLoveItem');
    if (btnLoveItem) {
        btnLoveItem.onclick = function () {
            if (!instance.config.user) {
                HTMLUtil.alert('Qu\xfd kh\xe1ch vui l\xf2ng \u0111\u0103ng nh\u1eadp \u0111\u1ec3 c\xf3 th\u1ec3 th\xeam s\u1ea3n ph\u1ea9m v\xe0o danh s\xe1ch y\xeau th\xedch.', { parent: '#gocnshopLoveMsg' });
                return;
            }
            var data = {
                objectId: instance.item.id,
                objectName: instance.item.title,
                objectType: 2,
                itemImages: instance.item.image,
                itemPrice: instance.sku[0].price_vnd,
                siteName: instance.website,
                itemUrl: instance.item.url
            };
            HTMLUtil.post(gocnshop_config.domain + 'admincp/admin-ajax.php?action=gocnshop_favourite', { postData: data }, function (res) {
                HTMLUtil.alert(res.msg, { parent: '#gocnshopLoveMsg', type: 'success' });
            });
        };
    }
    var btnLoveShop = HTMLUtil.select('#gocnshopBtnLoveShop');
    if (btnLoveShop) {
        btnLoveShop.onclick = function () {
            if (!instance.config.user) {
                HTMLUtil.alert('Qu\xfd kh\xe1ch vui l\xf2ng \u0111\u0103ng nh\u1eadp \u0111\u1ec3 c\xf3 th\u1ec3 th\xeam shop v\xe0o danh s\xe1ch y\xeau th\xedch.', { parent: '#gocnshopLoveMsg' });
                return;
            }
            var data = {
                objectId: instance.shop.id,
                objectName: instance.shop.name,
                objectType: 1,
                siteName: instance.website,
                itemUrl: instance.shop.url
            };
            HTMLUtil.post(gocnshop_config.domain + 'admincp/admin-ajax.php?action=gocnshop_favourite', { postData: data }, function (res) {
                HTMLUtil.alert(res.msg, { parent: '#gocnshopLoveMsg', type: 'success' });
            });
        };
    }
};

NHToolbar.prototype.renderItemInfo1688 = function () {
    var html = this.getItemInfoHTML(this.item);
    var t = HTMLUtil.selectAll('.obj-order');
    if (t.length === 0) {
        t = HTMLUtil.selectAll('.order-action-container');
    }
    var parent = null;
    if (t.length > 0) {
        parent = t[t.length - 1];
    }

    if (parent !== null) {
        parent.innerHTML = html;
        // GĂ¡n sá»± kiá»‡n vĂ o cĂ¡c pháº§n nháº­p sá»‘ lÆ°á»£ng Ä‘áº·t mua:
        var instance = this;
        instance.timeoutResourceId = null;

        var elements = HTMLUtil.selectAll('.mod-detail-purchasing .unit-detail-amount-control');
        if (!elements) {
            elements = HTMLUtil.selectAll('.obj-amount .unit-detail-amount-control');
        }
        if (!elements) {
            elements = HTMLUtil.selectAll('.spu-list-content .unit-detail-amount-control');
        }

        if (elements) {
            HTMLUtil.each(elements, function (element) {
                var amountInput = HTMLUtil.select('input[type=text]', element);
                var buttonUp = HTMLUtil.selectAll('a', element);

                buttonUp[0].onclick = buttonUp[1].onclick = amountInput.onkeyup = function () {
                    clearTimeout(instance.timeoutResourceId);
                    instance.timeoutResourceId = setTimeout(function () {
                        instance.updateSelectedSKU1688();
                    }, 500);
                };
            });
            instance.updateSelectedSKU1688();
        }
    }
};

NHToolbar.prototype.renderItemInfoTaobao = function () {
    var html = this.getItemInfoHTML(this.item);
    var originButtonParent = HTMLUtil.select('#J_box_buycart');
    if (originButtonParent === null) {
        originButtonParent = HTMLUtil.select('#J_juValid');
    }

    if (originButtonParent) {
        // Insert giao diá»‡n Ä‘áº·t hĂ ng
        originButtonParent.innerHTML = '';
        var ele = HTMLUtil.select('#J_Title');
        // if (ele) {
        var div = document.createElement('div');
        div.innerHTML = html;
        originButtonParent.appendChild(div);
        // }
        // J_isSku
        var instance = this;
        instance.timeoutResourceId = null;
        var jskuAElements = HTMLUtil.selectAll('#J_SKU a');

        if (jskuAElements.length === 0) {
            jskuAElements = HTMLUtil.selectAll('.J_TSaleProp li a');
        }

        if (jskuAElements.length > 0) {
            for (var i = 0; i < jskuAElements.length; i++) {
                jskuAElements[i].onclick = function () {
                    clearTimeout(instance.timeoutResourceId);
                    instance.timeoutResourceId = setTimeout(function () {
                        instance.updateSelectedSKUTaobao();
                    }, 500);
                };
            }
        }

        var amountInput = HTMLUtil.select('#J_Stock input[type=text]');
        var buttonUp = HTMLUtil.selectAll('#J_Stock a');
        if (buttonUp !== null && buttonUp !== undefined && buttonUp.length > 0) {
            buttonUp[0].onclick = buttonUp[1].onclick = amountInput.onkeyup = function () {
                clearTimeout(instance.timeoutResourceId);
                instance.timeoutResourceId = setTimeout(function () {
                    instance.updateSelectedSKUTaobao();
                }, 500);
            };
        }

        instance.updateSelectedSKUTaobao();
    }
};

NHToolbar.prototype.renderItemInfoTmall = function () {
    var html = this.getItemInfoHTML(this.item);
    var originButtonParent = HTMLUtil.select('.tb-action.tm-clear');
    if (originButtonParent) {
        // Insert giao diá»‡n Ä‘áº·t hĂ ng
        originButtonParent.innerHTML = '';
        // var ele = HTMLUtil.select('.tb-detail-hd');
        // if (ele) {
        var div = document.createElement('div');
        div.innerHTML = html;
        originButtonParent.appendChild(div);
        // }
        // J_isSku
        var instance = this;
        instance.timeoutResourceId = null;
        var jskuAElements = HTMLUtil.selectAll('.J_TSaleProp li a');
        if (jskuAElements.length > 0) {
            for (var i = 0; i < jskuAElements.length; i++) {
                jskuAElements[i].onclick = function () {
                    clearTimeout(instance.timeoutResourceId);
                    instance.timeoutResourceId = setTimeout(function () {
                        instance.updateSelectedSKUTmall();
                    }, 500);
                };
            }
        }
        //
        var amountInput = HTMLUtil.select('.tb-amount-widget input[type=text]');
        var buttonUp = HTMLUtil.selectAll('.mui-amount-btn span');
        if (buttonUp !== null && buttonUp !== undefined && buttonUp.length > 0) {
            buttonUp[0].onclick = buttonUp[1].onclick = amountInput.onkeyup = function () {
                clearTimeout(instance.timeoutResourceId);
                instance.timeoutResourceId = setTimeout(function () {
                    instance.updateSelectedSKUTmall();
                }, 500);
            };
        }

        instance.updateSelectedSKUTmall();
    }
};

NHToolbar.prototype.getItemInfoHTML = function (item) {
    var htmlPriceRange = '';
    if (this.website === '1688.com') {
        if (item.price_ranges !== null && item.price_ranges.length > 0) {
            var htmlTmpRange = '';
            for (var i = 0; i < item.price_ranges.length; i++) {
                var range = item.price_ranges[i];
                htmlTmpRange +=
                    '<div class="gocnshop-price-range-item">' +
                    '<div class="gocnshop-price-range-quantity mgr-btm-10">' + (range.quantity_end !== null ? range.quantity_start + ' - ' + range.quantity_end : '&ge; ' + range.quantity_start) + '</div>' +
                    '<div class="gocnshop-price-range-price">' + HTMLUtil.formatMoney(range.price_vnd) + '\u0111</div>' +
                    '</div>';
            }

            htmlPriceRange =
                '<div class="gocnshop-price-range">' +
                '<div class="gocnshop-price-range-left">' +
                '<div class="lbl-quantity mgr-btm-10">S\u1ed1 l\u01b0\u1ee3ng:</div>' +
                '<div class="lbl-quantity">Gi\u00e1 b\u00e1n:</div>' +
                '</div>' +
                '<div class="gocnshop-price-range-right">' +
                htmlTmpRange +
                '<div class="clrb"></div>' +
                '</div>' +
                '<div class="clrb"></div>' +
                '</div>';
        } else {
            htmlPriceRange =
                '<div class="gocnshop-price-range">' +
                '<div class="gocnshop-price-range-left">' +
                '<div class="lbl-quantity mgr-btm-10">S\u1ed1 l\u01b0\u1ee3ng:</div>' +
                '<div class="lbl-quantity">Gi\u00e1 b\u00e1n:</div>' +
                '</div>' +
                '<div class="gocnshop-price-range-right">' +
                '<div class="gocnshop-price-range-item">' +
                '<div class="gocnshop-price-range-quantity mgr-btm-10">&ge;' + item.min_quantity + '</div>' +
                '<div class="gocnshop-price-range-price" id="gocnshopStdPrice">' + HTMLUtil.formatMoney(item.min_price_vnd) +
                (item.max_price_vnd > 0 ? " - " + HTMLUtil.formatMoney(item.max_price_vnd) : "") +
                '\u0111</div>' +
                '</div>' +
                '<div class="clrb"></div>' +
                '</div>' +
                '<div class="clrb"></div>' +
                '</div>';
        }
    }

    var htmlShopInfo = '';
    if (this.shop && this.shop.name) {
        htmlShopInfo = '<tr><td colspan="2">Shop: <a href="' + this.shop.url + '" target="_blank">' + this.shop.name + '</a><span style="float: right">T\u1ec9 gi\xe1: <span class="text-red" style="font-size: 15px">' + this.config.config.exchange_rate_cn + '</span></span></td></tr>' +
            '<tr><td colspan="2"><div id="gocnshopLoveMsg"></div><a href="' + this.shop.url + '" target="_blank" class="gocnshop-love-item gocnshop-go-to-shop">S\u1ea3n ph\u1ea9m c\u00f9ng shop</a> ' +
            '<a href="javascript:void(0)" id="gocnshopBtnLoveShop" class="gocnshop-love-item gocnshop-love-shop">Y\u00eau th\u00edch shop</a> <a href="javascript:void(0)" id="gocnshopBtnLoveItem" class="gocnshop-love-item">Y\u00eau th\u00edch s\u1ea3n ph\u1ea9m</a>' +
            '</td></tr>';
    }

    var html =
        '<div class="gocnshop-item-info">' +
        '<div class="gocnshop-box-title">GOCNSHOP</div>' +
        htmlPriceRange + // Khoáº£ng giĂ¡ náº¿u cĂ³
        '<div class="gocnshop-item-detail" style="padding:10px;">' +
        '<table border="1" class="gocnshop-table-item-detail">' +
        '<tbody>' + htmlShopInfo +
        '<tr><td>M\u00e3 s\u1ea3n ph\u1ea9m: <span class="text-red">' + item.id + '</span></td>' +
        '<tr>' +
        '<td width="50%">\u0110\u00e3 ch\u1ecdn: <span class="text-item-price text-red" id="gocnshopSelectedQuantity">0</span></td>' +
        '<td style="text-align:right;">Th\u00e0nh ti\u1ec1n: <span class="text-item-price text-red" id="gocnshopSelectedSubtotal">0\u0111</span></td>' +
        '</tr>' +
        '<tr>' +
        '<td colspan="2"><div id="gocnshopOrderMsg"></div><div class="gocnshop-item-btn-order"><a href="javascript:void(0)" id="gocnshopBtnAddToCart"></a></div></td>' +
        '</tr>' +
        '</tbody></table>' +
        '<div class="text-notice clrb">Qu\u00fd kh\u00e1ch vui l\u00f2ng ch\u1ecdn \u0111\u1ea7y \u0111\u1ee7 th\u00f4ng tin s\u1ea3n ph\u1ea9m \u0111\u1ec3 xem gi\u00e1 chu\u1ea9n.</div>' +
        '</div>' +
        '<div class="gocnshop-box-footer" style="text-align:left;padding:5px 10px;">' +
        '<strong>L\u01b0u \u00fd: </strong><br>' +
        'S\u1ea3n ph\u1ea9m y\u00eau c\u1ea7u \u0111\u1eb7t mua s\u1ed1 l\u01b0\u1ee3ng t\u1ed1i thi\u1ec3u l\u00e0: ' + this.item.min_quantity + '<br>' +
        'Qu\u00fd kh\u00e1ch vui l\u00f2ng kh\u00f4ng s\u1eed d\u1ee5ng Google Translate khi \u0111\u1eb7t h\u00e0ng.' +
        '</div>' +
        '</div>';

    return html;
};

NHToolbar.prototype.getItemStruct = function () {

    return {
        "id": null,
        "title": null,
        "website": this.getWebsite(),
        "url": window.location.href,
        "image": null,
        "min_price": 0,
        "max_price": 0,
        "min_price_vnd": 0,
        "max_price_vnd": 0,
        "ws_rule_number": 1,
        "min_quantity": 1,
        "price_ranges": null,
        "weight": 0,
        "shop_id": null,
        "shop_name": null,
        "shop_address": null
    };
};

NHToolbar.prototype.getItemInfo = function () {
    if (this.isItemDetailPage()) {
        switch (this.website) {
            case "1688.com":
                return this.getItemInfo1688();
            case "taobao.com":
                return this.getItemInfoTaobao();
            case "tmall.com":
            case "tmall.hk":
                return this.getItemInfoTmall();
        }
    }

    return null;
};

NHToolbar.prototype.getItemInfo1688 = function () {
    var item = this.getItemStruct();
    // MĂ£ sáº£n pháº©m
    if (iDetailConfig !== undefined && iDetailConfig.offerid !== undefined) {
        item.id = iDetailConfig.offerid;
        item.title = HTMLUtil.select('h1.d-title').innerHTML;
        var elImage = HTMLUtil.select('.mod-detail-gallery img');
        if (elImage === null || typeof elImage === 'undefined') {
            elImage = HTMLUtil.select('.mod-detail-version2018-gallery .tab-pane .box-img img');
        }
        if (elImage !== null && typeof elImage !== 'undefined') {
            item.image = elImage.src;
        }

        // Config min/max quantity, ws_rule_number
        var itemInfoArea = HTMLUtil.select('.mod-detail-purchasing');

        var modConfig = itemInfoArea.getAttribute('data-mod-config');
        if (modConfig !== undefined && modConfig !== null && modConfig) {
            modConfig = JSON.parse(modConfig);

            if (modConfig.wsRuleNum !== undefined && modConfig.wsRuleNum !== "") {
                var wsRuleNum = parseInt(modConfig.wsRuleNum);

                if (!isNaN(wsRuleNum)) {
                    item.ws_rule_number = wsRuleNum;
                }
            }

            if (modConfig.min !== undefined && modConfig.min !== "") {
                var minQty = parseInt(modConfig.min);

                if (!isNaN(item.ws_rule_number)) {
                    item.min_quantity = minQty;
                }
            }
        }

        if (iDetailData.sku !== undefined && iDetailData.sku.price !== undefined) {
            var arrPrice = iDetailData.sku.price.split("-");
            item.min_price = parseFloat(arrPrice[0].replace(",", "."));
            item.min_price_vnd = this.rmbToVnd(item.min_price);
            if (arrPrice.length > 1) {
                item.max_price = parseFloat(arrPrice[1].replace(",", "."));
                item.max_price_vnd = this.rmbToVnd(item.max_price);
            }
        }

    }

    // Khoáº£ng giĂ¡
    item.price_ranges = [];
    var price_ranges = [];
    if (iDetailData !== undefined && iDetailData.sku !== undefined && iDetailData.sku.priceRange !== undefined) {
        for (var i = 0, len = iDetailData.sku.priceRange.length; i < len; i++) {
            var range = iDetailData.sku.priceRange[i];
            var nextRange = i < len - 1 ? iDetailData.sku.priceRange[i + 1] : null;
            price_ranges.push({
                'quantity_start': range[0],
                'quantity_end': nextRange !== null ? nextRange[0] - 1 : null,
                'price': range[1],
                'price_vnd': this.rmbToVnd(range[1])
            });
        }
    } else {
        var elementPriceTd = HTMLUtil.selectAll('#mod-detail-price .d-content .price td');
        if (elementPriceTd && elementPriceTd.length > 0) {
            for (i = 0; i < elementPriceTd.length; i++) {
                range = elementPriceTd[i].getAttribute('data-range');
                if (range !== undefined && range !== null) {
                    range = JSON.parse(range);
                    if (typeof range.price !== 'undefined') {
                        var prc = parseFloat(range.price.replace(",", "."));
                        price_ranges.push({
                            'quantity_start': range.begin,
                            'quantity_end': range.end !== "" ? range.end : null,
                            'price': prc,
                            'price_vnd': this.rmbToVnd(prc)
                        });
                    }
                }
            }
        } else {
            elementPriceTd = HTMLUtil.select('.d-content .obj-price .price-now');
            if (elementPriceTd) {
                prc = parseFloat(elementPriceTd.innerHTML);
                price_ranges.push({
                    'quantity_start': 1,
                    'quantity_end': null,
                    'price': prc,
                    'price_vnd': this.rmbToVnd(prc)
                });
            }
        }
    }

    if (iDetailConfig && (iDetailConfig.isRangePriceSku === "true" || iDetailConfig.isRangePriceSku === true || iDetailConfig.isSKUOffer === "false")
        || price_ranges.length > 1
    ) {
        item.price_ranges = price_ranges;
    }

    return item;
};

NHToolbar.prototype.getItemInfoTaobao = function () {
    var te = HTMLUtil.select('.operation #buy a');
    if (te) {
        te.innerText = 'Xem chi ti\u1ebft v\u00e0 mua h\u00e0ng';
        return;
    }

    var item = this.getItemStruct();
    var titleSelector = '.tb-main-title .t-title';
    var imageSelector = '.tb-thumb-content img';
    if (this.hostname === 'item.taobao.com') {
        titleSelector = '.tb-main-title';
        imageSelector = '.tb-booth img';
    }
    item.title = HTMLUtil.select(titleSelector).innerText.trim();
    item.image = HTMLUtil.select(imageSelector).src;

    if (g_config !== undefined) {
        if (g_config.itemId !== undefined) {
            item.id = g_config.itemId;
        }
    }

    return item;
};
NHToolbar.prototype.getItemInfoTmall = function () {
    var item = this.getItemStruct();
    item.title = HTMLUtil.select('#detail .tb-detail-hd h1').innerText;
    item.image = HTMLUtil.select('#detail .tb-booth img').src;
    if (g_config !== undefined) {
        if (g_config.itemId !== undefined) {
            item.id = g_config.itemId;
        }
    }

    return item;
};
NHToolbar.prototype.shopInfoTags1688 = ['.company-name a', '.smt-info a.name', '.content .abstract .company .name'];
NHToolbar.prototype.getShopInfo = function () {
    var shop = {
        id: "",
        name: "",
        address: "",
        url: ""
    };

    var lnkToShop = null;

    if (this.website === '1688.com') {

        for (var ix in this.shopInfoTags1688) {
            lnkToShop = HTMLUtil.select(this.shopInfoTags1688[ix]);
            if (lnkToShop) {
                break;
            }
        }
        // lnkToShop = HTMLUtil.select('.company-name a');
        // if (!lnkToShop) {
        //     lnkToShop = HTMLUtil.select('.smt-info a.name');
        // }
        if (lnkToShop) {
            shop.name = lnkToShop.innerText;
            shop.url = lnkToShop.href;
            shop.id = shop.url.replace("http://", "").replace("https://", "").split("/")[0].split('.')[0];
        }
        // Shop address
        var dElement = HTMLUtil.select('.delivery-detail .delivery-addr');
        if (dElement !== undefined && dElement && dElement.innerHTML) {
            var addr = dElement.innerHTML.split(" ");
            if (addr.length > 0) {
                shop.address = addr[0];
            }
        }
        if (shop.url) {
            shop.url = 'https://' + shop.id + '.1688.com/page/offerlist.htm';
        }
    } else if (this.website === 'taobao.com') {
        if (this.hostname === 'item.taobao.com') {
            if (g_config && g_config.shopName !== undefined) {
                shop.name = g_config.shopName;
                shop.url = 'https:' + g_config.idata.shop.url;
                if (typeof g_config !== 'undefined' && typeof g_config.shopId !== 'undefined') {
                    shop.id = 'shop' + g_config.shopId;
                } else {
                    shop.id = shop.url.replace("http://", "").replace("https://", "").split("/")[0].split('.')[0];
                }
            }
        } else {
            lnkToShop = HTMLUtil.select('.shop-info .tb-shop-name a');
            if (lnkToShop) {
                shop.name = lnkToShop.innerHTML;
                shop.url = lnkToShop.href;
                shop.id = shop.url.replace("http://", "").replace("https://", "").split("/")[0].split('.')[0];
            }
        }
        if (shop.url) {
            shop.url = 'https://' + shop.id + '.taobao.com/search.htm';
        }
        var addrTags = ['#J_LogisticInfo .tb-location em', '#J_WlAreaInfo #J-From'];
        for (var i = 0; i < addrTags.length; i++) {
            var addrTag = HTMLUtil.select(addrTags[i]);
            if (typeof addrTag !== 'undefined' && addrTag !== null) {
                var sa = addrTag.innerHTML.trim();
                if (sa !== '') {
                    shop.address = sa.substring(0, 2);
                    break;
                }
            }
        }
    } else if (this.website === "tmall.com" || this.website === "tmall.hk") {
        if (g_config !== undefined && g_config !== null) {
            console.log(g_config);
            if (g_config.shopId !== undefined && g_config.shopId !== null) {
                shop.name = decodeURIComponent(g_config.sellerNickName);
                if (shop.name === 'undefined' || shop.name === '') {
                    shop.name = g_config.pageId;
                }
                if (g_config.shopUrl !== '') {
                    shop.url = 'https:' + g_config.shopUrl;
                }
                if (g_config.shopId !== '') {
                    shop.id = g_config.shopId;
                }
            }
        }
        if (shop.id === '') {
            shop.id = window.location.href.replace("http://", "").replace("https://", "").split("/")[0].split('.')[0];
        }
        if (shop.url === '') {
            shop.url = 'https://' + shop.name + '.tmall.com';
            // if (!isNaN(shop.id)) {
            //     shop.url = 'https://' + shop.id + '.tmall.com/search.htm';
            // }
        }
        var addrInput = HTMLUtil.select('input[name=region]');
        if (typeof addrInput !== 'undefined' && addrInput !== null) {
            sa = addrInput.value;
            if (sa !== '') {
                shop.address = sa.substring(0, 2);
            }
        }
    }
    console.log(shop);
    return shop;
};

NHToolbar.prototype.priceTag = {
    "taobao.com": [
        "#J_PromoPriceNum", "#J_PromoPrice .tb-rmb-num", "#J_priceStd .tb-rmb-num", "#J_StrPrice .tb-rmb-num"
    ]
};

NHToolbar.prototype.updateSelectedSKU1688 = function () {
    this.selectedQuantity = 0;
    this.subtotal = 0;

    //Get domestic_fee
    var el = document.querySelectorAll('div.cost-entries-type em.value');
    if (typeof (el) !== 'undefined' && el !== null && el.length !== 0) {
        this.domestic_fee = parseInt(el[0].innerText) * this.config.config.exchange_rate_cn;
    } else {
        this.domestic_fee = this.config.config.domestic_fee_1688;
    }

    if (iDetailConfig.isSKUOffer === "true") {
        if (iDetailData.sku !== undefined && iDetailData.sku.skuMap !== undefined) {
            var selectedSku = [];
            var isPriceEmpty = false;
            for (var i in iDetailData.sku.skuMap) {
                var s = iDetailData.sku.skuMap[i];
                var amount = 0;
                if (typeof s.amount === 'undefined' && typeof s.amountValue !== 'undefined') {
                    amount = parseInt(s.amountValue);
                } else if (typeof s.amount !== 'undefined') {
                    amount = parseInt(s.amount);
                }
                if (amount !== 0) {
                    var si = {
                        "name": i,
                        "quantity": amount
                    };
                    if (typeof s.price === 'string') {
                        s.price = parseFloat(s.price.replace(",", "."));
                    }

                    if (typeof s.discountPrice === 'string') {
                        s.discountPrice = parseFloat(s.discountPrice.replace(",", "."));
                    }

                    if (typeof s.discountPrice !== 'undefined') {
                        if (typeof s.price === 'undefined' || s.discountPrice <= s.price) {
                            si.price = s.discountPrice;
                        }
                    } else if (typeof s.price !== 'undefined') {
                        si.price = s.price;
                    } else { // KhĂ´ng cĂ³ price vĂ  priceDiscount
                        isPriceEmpty = true;
                    }
                    si.price_vnd = this.rmbToVnd(si.price);

                    if (iDetailData.sku.skuProps !== undefined && iDetailData.sku.skuProps.length > 0) {
                        var arrName = si.name.split('&gt;');

                        for (var idx = 0; idx < arrName.length; idx++) {
                            if (iDetailData.sku.skuProps[idx] !== undefined) {
                                for (var pi = 0; pi < iDetailData.sku.skuProps[idx].value.length; pi++) {
                                    if (iDetailData.sku.skuProps[idx].value[pi].name !== undefined
                                        && arrName[idx] === iDetailData.sku.skuProps[idx].value[pi].name) {
                                        if (iDetailData.sku.skuProps[idx].value[pi].imageUrl !== undefined) {
                                            si.image = iDetailData.sku.skuProps[idx].value[pi].imageUrl;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    selectedSku.push(si);
                    this.selectedQuantity += si.quantity;
                    this.subtotal += si.price_vnd * si.quantity;
                }
            }

            if (isPriceEmpty && typeof this.item !== 'undefined'
                && typeof this.item.price_ranges !== 'undefined'
                && this.item.price_ranges.length > 0) {
                var tmpPrice = 0, tmpPriceVnd = 0;
                for (i = 0; i < this.item.price_ranges.length; i++) {
                    if (this.item.price_ranges[i].quantity_start <= this.selectedQuantity
                        && this.item.price_ranges[i].quantity_end >= this.selectedQuantity) {
                        tmpPrice = parseFloat(this.item.price_ranges[i].price.replace(",", "."));
                        tmpPriceVnd = this.rmbToVnd(tmpPrice);
                    }
                }
                if (tmpPrice > 0) {
                    this.subtotal = 0;
                    for (i = 0; i < selectedSku.length; i++) {
                        selectedSku[i].price = tmpPrice;
                        selectedSku[i].price_vnd = tmpPriceVnd;
                        this.subtotal += selectedSku[i].price_vnd * selectedSku[i].quantity;
                    }
                }
            }

            this.sku = selectedSku;

            HTMLUtil.select('#gocnshopSelectedQuantity').innerHTML = HTMLUtil.formatMoney(this.selectedQuantity);

            if (this.subtotal !== 0) {
                this.subtotal += this.domestic_fee;
            }

            HTMLUtil.select('#gocnshopSelectedSubtotal').innerHTML = HTMLUtil.formatMoney(this.subtotal) + '\u0111';
        }
    } else {
        var element = HTMLUtil.select('.obj-amount .unit-detail-amount-control .amount-input');
        if (element) {
            // Select price from range
            var price = 0;
            var quantity = parseInt(element.value);
            if (this.item.price_ranges !== null && this.item.price_ranges.length > 0) {
                for (i = 0; i < this.item.price_ranges.length; i++) {
                    if (quantity >= this.item.price_ranges[i].quantity_start) {
                        price = this.item.price_ranges[i].price;
                    }
                }

            }
            si = {
                "name": "",
                "quantity": quantity,
                "price": price,
                "price_vnd": this.rmbToVnd(price),
                "image": ""
            };
            this.sku = [];
            this.sku.push(si);
            this.selectedQuantity += quantity;
            this.subtotal += si.price_vnd * quantity;

            HTMLUtil.select('#gocnshopSelectedQuantity').innerHTML = HTMLUtil.formatMoney(this.selectedQuantity);

            if (this.subtotal !== 0) {
                this.subtotal += this.domestic_fee;
            }

            HTMLUtil.select('#gocnshopSelectedSubtotal').innerHTML = HTMLUtil.formatMoney(this.subtotal) + '\u0111';
        }
    }
};

NHToolbar.prototype.updateSelectedSKUTaobao = function () {
    this.selectedQuantity = parseInt(HTMLUtil.select('#J_IptAmount').value);
    this.subtotal = 0;
    this.domestic_fee = this.config.config.domestic_fee_taobao;

    var price = 0;
    var ele = null;
    for (var i = 0; i < this.priceTag["taobao.com"].length; i++) {
        ele = HTMLUtil.select(this.priceTag["taobao.com"][i]);
        if (ele !== null && typeof ele !== 'undefined') {
            break;
        }
    }
    if (ele !== null) {
        var str = ele.innerText.replace("Â¥", "").trim();
        price = parseFloat(str.replace(",", "."));
    }

    var priceVnd = this.rmbToVnd(price);

    // Selected SKU
    this.sku = [];
    var elementJSKU = this.hostname === 'item.taobao.com'
        ? HTMLUtil.selectAll('.J_Prop.tb-prop')
        : HTMLUtil.selectAll('#J_SKU dl');

    if (elementJSKU !== null && elementJSKU.length > 0) {
        var selectedProperties = this.hostname === 'item.taobao.com'
            ? HTMLUtil.selectAll('.J_Prop.tb-prop .tb-selected a')
            : HTMLUtil.selectAll('#J_SKU dl .tb-selected a');
        if (selectedProperties !== null
            && selectedProperties !== undefined
            && selectedProperties.length === elementJSKU.length) {
            var tmpSkuName = [];
            var img = "";
            for (i = 0; i < selectedProperties.length; i++) {
                if (this.hostname === 'item.taobao.com') {
                    tmpSkuName.push(HTMLUtil.select('span', selectedProperties[i]).innerText.trim());
                } else {
                    tmpSkuName.push(selectedProperties[i].getAttribute('title').trim());
                }

                // áº¢nh cá»§a SKU.
                if (selectedProperties[i].style !== undefined
                    && selectedProperties[i].style !== null
                    && selectedProperties[i].style.backgroundImage !== null
                    && selectedProperties[i].style.backgroundImage.length !== "") {

                    img = selectedProperties[i].style.backgroundImage.slice(4, -1).replace(/"/g, "").replace("30x30", "400x400").trim();
                }
            }
            this.sku.push({
                "name": tmpSkuName.join(" ; "),
                "quantity": this.selectedQuantity,
                "price": price,
                "price_vnd": priceVnd,
                "image": img
            });
        }
    } else {
        this.sku.push({
            "name": "",
            "quantity": this.selectedQuantity,
            "price": price,
            "price_vnd": priceVnd,
            "image": ""
        });
    }

    this.subtotal = priceVnd * this.selectedQuantity;

    ele = HTMLUtil.select('#gocnshopStdPrice');
    if (typeof ele !== 'undefined' && ele !== null) {
        ele.innerHTML = HTMLUtil.formatMoney(priceVnd) + '\u0111';
    }

    HTMLUtil.select('#gocnshopSelectedQuantity').innerHTML = HTMLUtil.formatMoney(this.selectedQuantity);

    if (this.subtotal !== 0) {
        this.subtotal += this.domestic_fee;
    }

    HTMLUtil.select('#gocnshopSelectedSubtotal').innerHTML = HTMLUtil.formatMoney(this.subtotal) + '\u0111';
};

NHToolbar.prototype.updateSelectedSKUTmall = function () {
    if (this.shop === null || this.shop.id === "") {
        this.shop = this.getShopInfo();
    }

    this.selectedQuantity = parseInt(HTMLUtil.select('.tb-text.mui-amount-input').value);
    this.subtotal = 0;
    this.domestic_fee = this.config.config.domestic_fee_tmall;

    var price = 0;

    var priceElement = HTMLUtil.select('.tm-promo-price .tm-price');
    if (typeof priceElement === 'undefined' || priceElement === null) {
        priceElement = HTMLUtil.select('#J_StrPriceModBox .tm-price');
    }

    if (typeof priceElement !== 'undefined' && priceElement !== null) {
        price = parseFloat(priceElement.innerText.trim().replace(",", "."));
    }

    var priceVnd = this.rmbToVnd(price);

    // Selected SKU
    this.sku = [];
    var elementJSKU = HTMLUtil.selectAll('.tb-sku .tb-prop.tm-sale-prop');
    var elementJSKU_services = HTMLUtil.selectAll('.tb-sku .tb-prop.tm-services');

    if (elementJSKU !== null && (elementJSKU.length + elementJSKU_services.length) > 0) {
        var selectedProperties = HTMLUtil.selectAll('.tb-sku .tb-prop .tb-selected a');
        if (selectedProperties !== null
            && selectedProperties !== undefined
            && selectedProperties.length === (elementJSKU.length + elementJSKU_services.length)) {

            var tmpSkuName = [];
            var img = "";
            for (var i = 0; i < selectedProperties.length; i++) {
                tmpSkuName.push(selectedProperties[i].innerText.trim());

                // áº¢nh cá»§a SKU.
                if (selectedProperties[i].style !== undefined
                    && selectedProperties[i].style !== null
                    && selectedProperties[i].style.backgroundImage !== null
                    && selectedProperties[i].style.backgroundImage.length !== "") {

                    img = selectedProperties[i].style.backgroundImage.slice(4, -1).replace(/"/g, "").replace("40x40", "400x400").trim();
                }
            }
            this.sku.push({
                "name": tmpSkuName.join(" ; "),
                "quantity": this.selectedQuantity,
                "price": price,
                "price_vnd": priceVnd,
                "image": img
            });
        }
    } else {
        this.sku.push({
            "name": "",
            "quantity": this.selectedQuantity,
            "price": price,
            "price_vnd": priceVnd,
            "image": ""
        });
    }

    this.subtotal = priceVnd * this.selectedQuantity;
    var ele = HTMLUtil.select('#gocnshopStdPrice');
    if (typeof ele !== 'undefined' && ele !== null) {
        ele.innerHTML = HTMLUtil.formatMoney(priceVnd) + '\u0111';
    }

    HTMLUtil.select('#gocnshopSelectedQuantity').innerHTML = HTMLUtil.formatMoney(this.selectedQuantity);

    if (this.subtotal !== 0) {
        this.subtotal += this.domestic_fee;
    }

    HTMLUtil.select('#gocnshopSelectedSubtotal').innerHTML = HTMLUtil.formatMoney(this.subtotal) + '\u0111';
};


NHToolbar.prototype.addToCart = function () {
    HTMLUtil.alert("\u0110ang x\u1eed l\u00fd...", { parent: '#gocnshopOrderMsg', type: 'info' });

    if (this.website === '1688.com') {
        this.updateSelectedSKU1688();
    } else if (this.website === 'taobao.com') {
        this.updateSelectedSKUTaobao();
    } else if (this.website === 'tmall.com' || this.website === 'tmall.hk') {
        this.updateSelectedSKUTmall();
    } else {
        HTMLUtil.alert("Kh\u00f4ng x\u00e1c \u0111\u1ecbnh \u0111\u01b0\u1ee3c website b\u00e1n h\u00e0ng.");
        return;
    }
    if (this.shop.address === "") {
        this.shop = this.getShopInfo();
    }

    if (typeof this.sku !== 'undefined' && this.sku !== null && this.sku.length > 0 && this.selectedQuantity >= this.item.min_quantity) {
        for (var i = 0; i < this.sku.length; i++) {
            if (typeof this.sku[i].image !== 'undefined' && this.sku[i].image && this.sku[i].image.indexOf("//") === 0) {
                this.sku[i].image = "https:" + this.sku[i].image;
            }
        }

        var data = {
            website: this.getWebsite(),
            id: this.item.id,
            title: this.item.title,
            url: this.item.url,
            image: this.item.image,
            ws_rule_number: this.item.ws_rule_number,
            min_quantity: this.item.min_quantity,
            price_ranges: this.item.price_ranges,
            weight: this.item.weight,
            shop_id: this.shop.id,
            shop_name: this.shop.name,
            shop_url: this.shop.url,
            shop_address: this.shop.address,
            list_sku: this.sku
        };

        var t = null;

        var custom_data = {
            domestic_fee: this.domestic_fee,
            order_fee: this.order_fee,
            price_vnd: 0, //
            description: '', //
            short_description: '', //
            website: this.getWebsite(),
            id: data.id,
            title: data.title,
            url: data.url,
            image: data.image,
            ws_rule_number: data.ws_rule_number,
            min_quantity: data.min_quantity,
            //price_ranges
            weight: data.weight,
            shop_id: data.shop_id,
            shop_name: data.shop_name,
            shop_url: data.shop_url,
            shop_address: data.shop_address,
            attributes: [],
            list_sku: data.list_sku
        };
        console.log(custom_data);
        HTMLUtil.post(gocnshop_config.domain + 'admincp/admin-ajax.php?action=gocnshop_add_product', custom_data, function (res) {
            if (res.code === 1) {
                HTMLUtil.alert('S\u1ea3n ph\u1ea9m \u0111\xe3 \u0111\u01b0\u1ee3c th\xeam v\xe0o gi\u1ecf h\xe0ng. ' +
                    '<a href="' + gocnshop_config.domain + 'don-hang" target="_blank"><b>Xem gi\u1ecf h\xe0ng &raquo;</b></a>',
                    { parent: '#gocnshopOrderMsg', type: 'success' });
            } else {
                HTMLUtil.alert('Th\xeam s\u1ea3n ph\u1ea9m v\xe0o gi\u1ecf h\xe0ng kh\xf4ng th\xe0nh c\xf4ng.',
                    { parent: '#gocnshopOrderMsg', type: 'error' });
            }
        });
    } else {
        if (typeof this.sku === 'undefined' || this.sku === null || this.sku.length === 0) {
            HTMLUtil.alert('Qu\u00fd kh\u00e1ch vui l\u00f2ng ch\u1ecdn th\u00f4ng s\u1ed1 s\u1ea3n ph\u1ea9m mu\u1ed1n \u0111\u1eb7t mua.', { parent: '#gocnshopOrderMsg', type: 'error' });
        } else if (this.selectedQuantity) {
            HTMLUtil.alert('S\u1ed1 l\u01b0\u1ee3ng \u0111\u1eb7t mua qu\u00fd kh\u00e1ch y\u00eau c\u1ea7u kh\u00f4ng ph\u00f9 h\u1ee3p.', { parent: '#gocnshopOrderMsg', type: 'error' });
        }
    }
};


//NHToolbar.prototype.run = function () {
//    var instance = this;
//    HTMLUtil.addEvent(window, 'load', function () {
//        if (instance.isItemDetailPage()) {
//            setTimeout(function () {
//                instance.renderItemInfo();
//            }, 100);
//        }
//    });

//    instance.render();
//};
NHToolbar.prototype.run = function () {
    var instance = this;
    setTimeout(function () {
        if (instance.isItemDetailPage()) {
            setTimeout(function () {
                instance.renderItemInfo();
            }, 100);
        }
    }, 5000);
    instance.render();
};

NHToolbar.prototype.getHostName = function () {
    return window.location.hostname;
};

NHToolbar.prototype.getWebsite = function () {
    var hostname = this.getHostName();
    if (hostname.indexOf('taobao.com') >= 0) {
        return 'taobao.com';
    } else if (hostname.indexOf('1688.com') >= 0) {
        return '1688.com';
    } else if (hostname.indexOf('tmall.com') >= 0) {
        return 'tmall.com';
    } else if (hostname.indexOf('tmall.hk') >= 0) {
        return 'tmall.com';
    }
};

NHToolbar.prototype.getUrl = function () {
    return window.location.href;
};

NHToolbar.prototype.isItemDetailPage = function () {
    var url = this.getUrl();
    for (var i in this.itemDetailPatterns) {
        if (~url.indexOf(this.itemDetailPatterns[i])) {
            return true;
        }
    }

    return false;
};

NHToolbar.prototype.rmbToVnd = function (price_cn) {
    var exchange_rate = this.config.config.exchange_rate_cn;
    var service_cost = 0;
    switch (this.website) {
        case '1688.com':
            service_cost = this.config.config.service_cost_1688;
            break;
        case 'taobao.com':
            service_cost = this.config.config.service_cost_taobao;
            break;
        case 'tmall.com':
        case 'tmall.tk':
            service_cost = this.config.config.service_cost_tmall;
            break;
    }
    this.order_fee = (service_cost * price_cn / 100) * exchange_rate;
    var result = price_cn * exchange_rate;

    result = Math.ceil(result);
    if (result % 100 !== 0) {
        result = result + (100 - result % 100);
    }
    return result;
};

var nhtb = new NHToolbar();
//zxc