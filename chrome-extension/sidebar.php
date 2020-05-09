<!DOCTYPE html>
<html>
<body>
    <?php
        $http_origin = $_SERVER['HTTP_ORIGIN'];
        if ($http_origin == "https://detail.tmall.com" || $http_origin == "https://item.taobao.com" || $http_origin == "https://detail.1688.com")
        {  
            header("Access-Control-Allow-Origin: $http_origin");
        }
        header("Access-Control-Allow-Credentials: true");
    ?>

    <div class="nhtq-sidebar">
        <div class="nhtq-sidebar-icons">
            <ul>
                <li><a href="https://demo3.netsoftsolution.net/gocnshop/" target="_blank" class="nh-icon nh-logo" title="GOCNSHOP"></a></li>
                <li><a href="javascript:void(0);" class="nh-icon nh-search nh-sidebar-btn" data-screen="search" title="Tìm kiếm sản phẩm"></a></li>
                <li><a href="https://demo3.netsoftsolution.net/gocnshop/don-hang" target="_blank" class="nh-icon nh-cart" title="Giỏ hàng"></a></li>
                <li><a href="https://demo3.netsoftsolution.net/gocnshop/huong-dan-dat-hang" target="_blank" class="nh-icon nh-help" title="Hướng dẫn đặt hàng"></a></li>
                <li><a href="javascript:void(0);" class="nh-icon nh-contact nh-sidebar-btn" data-screen="contact" title="Liên hệ" target="parent"></a></li>
                <li><a href="https://demo3.netsoftsolution.net/gocnshop/" class="nh-icon nh-back nh-sidebar-btn" title="Trở về" target="_blank"></a></li>
            </ul>
        </div>
        <div class="nhtq-sidebar-content">
            <div class="nhtq-sidebar-header">
                <b class="nhtq-sidebar-title"></b>
                <a href="javascript:void(0)" class="nh-sidebar-close" data-screen="none" title="Đóng lại"></a>
                <div class="clearboth"></div>
            </div>
            <div class="nhtq-sidebar-screen" data-screen="user" data-screen-title="Tài khoản">
                <div class="nhtq-user-info">
                    <ul>
                        <li class="nh-pp510"><span id="nhUsername"></span></li>
                        <li class="nh-pp510">Số dư: <span id="nhUserWalletBalance" style="color:#c00;font-weight:bold;"></span></li>
                        <li class="nh-pp510"><b>Tài khoản cá nhân</b></li>
                        <li><a href="https://demo3.netsoftsolution.net/gocnshop/thong-tin-tai-khoan/sua-tai-khoan" target="_blank"><i class="nh-menu-icon nh-icon-change-password"></i>Đổi mật khẩu</a></li>
                        <li><a href="https://demo3.netsoftsolution.net/gocnshop/thong-tin-tai-khoan/sua-dia-chi" target="_blank"><i class="nh-menu-icon nh-icon-address-book"></i>Sổ địa chỉ</a></li>
                        <li class="nh-pp510"><b>Ví điện tử</b></li>
                        <li><a href="https://demo3.netsoftsolution.net/gocnshop/thong-tin-tai-khoan/transactions-history" target="_blank"><i class="nh-menu-icon nh-icon-history"></i>Lịch sử giao dịch</a></li>
                        <li><a href="https://demo3.netsoftsolution.net/gocnshop/thong-tin-tai-khoan/don-hang" target="_blank"><i class="nh-menu-icon nh-icon-order-list"></i>Danh sách đơn hàng</a></li>
                        <li><a href="https://demo3.netsoftsolution.net/gocnshop/thong-tin-tai-khoan/make-a-deposit" target="_blank"><i class="nh-menu-icon nh-icon-change-password"></i>Mật khẩu ví</a></li>
                        <li class="nh-logout"><a href="javascript:void(0)" id="nhBtnLogout"><i class="nh-menu-icon nh-icon-logout"></i>Thoát</a></li>
                    </ul>
                </div>
            </div>
            <div class="nhtq-sidebar-screen" data-screen="search" data-screen-title="Tìm kiếm">
                <div class="nhtq-sidebar-form">
                    <div class="nhtq-row-input nhtq-select-website">
                        <a href="javascript:void(0)" data-website="taobao.com" class="nh-selected">
                            <img src="https://demo3.netsoftsolution.net/gocnshop/images/logo-taobao-sm.png">
                        </a>
                        <a href="javascript:void(0)" data-website="tmall.com">
                            <img src="https://demo3.netsoftsolution.net/gocnshop/images/logo-tmall-sm.png">
                        </a>
                        <a href="javascript:void(0)" data-website="1688.com">
                            <img src="https://demo3.netsoftsolution.net/gocnshop/images/logo-1688-sm.png">
                        </a>
                    </div>
                    <div class="nhtq-row-input clearboth">
                        <input type="text" name="nh-keyword" id="nhTxtKeyword" class="nhtq-form-input" placeholder="Từ khóa hoặc mã sản phẩm">
                    </div>
                    <div class="nhtq-row-input clearboth">
                        <a id="nhBtnViewItem" href="javascript:void(0)" target="_blank">Xem sản phẩm</a>
                    </div>
                    <div class="nhtq-row-input nh-search-result" id="nhtqSearchResult"></div>
                </div>
            </div>
            <div class="nhtq-sidebar-screen" data-screen="contact" data-screen-title="Liên hệ">
                <div class="nhtq-sidebar-screen-content">
                    <b>Trụ sở tại Hà Nội:</b><br>
                    Địa chỉ: Số 47, ngõ 16 Hoàng Cầu, Đống Đa, HN<br>
                    Điện thoại: <b style="color:#c00;">(04-3) 519.0740</b><br>
                    Email: hotro@gocnshop.com
                </div>
                <div class="nhtq-sidebar-screen-content">
                    <b>Trụ sở tại Tp. Hồ Chí Minh:</b><br>
                    Địa chỉ: Số 78 cư xá Trần Quang Diệu, P.14, Q3<br>
                    Điện thoại: <b style="color:#c00;">083.3060.999</b><br>
                    Email: hotro@gocnshop.com
                </div>
            </div>
        </div>
    </div>

</body>
</html>









