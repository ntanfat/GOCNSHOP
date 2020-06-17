<!DOCTYPE html>
<html>
<body>
    <?php
        $http_origin = $_SERVER['HTTP_ORIGIN'];
        if ($http_origin == "https://detail.tmall.com" || $http_origin == "https://world.tmall.com" || $http_origin == "https://item.taobao.com" || $http_origin == "https://detail.1688.com")
        {  
            header("Access-Control-Allow-Origin: $http_origin");
        }
        header("Access-Control-Allow-Credentials: true");
    ?>

    <div class="gocnshop-sidebar">
        <div class="gocnshop-sidebar-icons">
            <ul>
                <li><a href="https://www.gocnshop.com/" target="_blank" class="nh-icon nh-logo" title="GOCNSHOP"></a></li>
                <li><a href="javascript:void(0);" class="nh-icon nh-search nh-sidebar-btn" data-screen="search" title="Tìm kiếm sản phẩm"></a></li>
                <li><a href="https://www.gocnshop.com/don-hang" target="_blank" class="nh-icon nh-cart" title="Giỏ hàng"></a></li>
                <li><a href="https://www.gocnshop.com/huong-dan-dat-hang" target="_blank" class="nh-icon nh-help" title="Hướng dẫn đặt hàng"></a></li>
                <li><a href="javascript:void(0);" class="nh-icon nh-contact nh-sidebar-btn" data-screen="contact" title="Liên hệ" target="parent"></a></li>
                <li><a href="https://www.gocnshop.com/" class="nh-icon nh-back" title="Trở về" target="_blank"></a></li>
            </ul>
        </div>
        <div class="gocnshop-sidebar-content">
            <div class="gocnshop-sidebar-header">
                <b class="gocnshop-sidebar-title"></b>
                <a href="javascript:void(0)" class="nh-sidebar-close" data-screen="none" title="Đóng lại"></a>
                <div class="clearboth"></div>
            </div>
            <div class="gocnshop-sidebar-screen" data-screen="user" data-screen-title="Tài khoản">
                <div class="gocnshop-user-info">
                    <ul>
                        <li class="nh-pp510"><span id="nhUsername"></span></li>
                        <li class="nh-pp510">Số dư: <span id="nhUserWalletBalance" style="color:#c00;font-weight:bold;"></span></li>
                        <li class="nh-pp510"><b>Tài khoản cá nhân</b></li>
                        <li><a href="https://www.gocnshop.com/thong-tin-tai-khoan/sua-tai-khoan" target="_blank"><i class="nh-menu-icon nh-icon-change-password"></i>Đổi mật khẩu</a></li>
                        <li><a href="https://www.gocnshop.com/thong-tin-tai-khoan/sua-dia-chi" target="_blank"><i class="nh-menu-icon nh-icon-address-book"></i>Sổ địa chỉ</a></li>
                        <li class="nh-pp510"><b>Ví điện tử</b></li>
                        <li><a href="https://www.gocnshop.com/thong-tin-tai-khoan/transactions-history" target="_blank"><i class="nh-menu-icon nh-icon-history"></i>Lịch sử giao dịch</a></li>
                        <li><a href="https://www.gocnshop.com/thong-tin-tai-khoan/don-hang" target="_blank"><i class="nh-menu-icon nh-icon-order-list"></i>Danh sách đơn hàng</a></li>
                        <li><a href="https://www.gocnshop.com/thong-tin-tai-khoan/make-a-deposit" target="_blank"><i class="nh-menu-icon nh-icon-change-password"></i>Mật khẩu ví</a></li>
                        <li class="nh-logout"><a href="javascript:void(0)" id="nhBtnLogout"><i class="nh-menu-icon nh-icon-logout"></i>Thoát</a></li>
                    </ul>
                </div>
            </div>
            <div class="gocnshop-sidebar-screen" data-screen="search" data-screen-title="Tìm kiếm">
                <div class="gocnshop-sidebar-form">
                    <div class="gocnshop-row-input gocnshop-select-website">
                        <a href="javascript:void(0)" data-website="taobao.com" class="nh-selected">
                            <img src="https://www.gocnshop.com/images/logo-taobao-sm.png">
                        </a>
                        <a href="javascript:void(0)" data-website="tmall.com">
                            <img src="https://www.gocnshop.com/images/logo-tmall-sm.png">
                        </a>
                        <a href="javascript:void(0)" data-website="1688.com">
                            <img src="https://www.gocnshop.com/images/logo-1688-sm.png">
                        </a>
                    </div>
                    <div class="gocnshop-row-input clearboth">
                        <input type="text" name="nh-keyword" id="nhTxtKeyword" class="gocnshop-form-input" placeholder="Từ khóa hoặc mã sản phẩm">
                    </div>
                    <div class="gocnshop-row-input clearboth">
                        <a id="nhBtnViewItem" href="javascript:void(0)" target="_blank">Xem sản phẩm</a>
                    </div>
                    <div class="gocnshop-row-input nh-search-result" id="gocnshopSearchResult"></div>
                </div>
            </div>
            <div class="gocnshop-sidebar-screen" data-screen="contact" data-screen-title="Liên hệ">
                <div class="gocnshop-sidebar-screen-content" style="width: 210px">
                    <b>Trụ Sở Chính:</b><br>
                    Địa chỉ: OG-07.17, Tầng 7 Officetel, 128 Hồng Hà, Phường 9, Quận Phú Nhuận, TP Hồ Chí Minh, Việt Nam.<br>
                    Điện thoại: <b style="color:#c00;">+84.123456789 - +84.123456789</b><br>
                    Email: hotro@gocnshop.com
                </div>
            </div>
        </div>
    </div>

</body>
</html>









