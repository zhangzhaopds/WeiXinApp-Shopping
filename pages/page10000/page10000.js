var appInstance = getApp();
var WxParse     = require('../../components/wxParse/wxParse.js');
var util        = require('../../utils/util.js');

var pageData    = {
  data: {"carousel1":{"type":"carousel","style":"height:344.53125rpx;margin-left:auto;margin-right:auto;margin-top:0;opacity:1;","content":[{"customFeature":{"action":"inner-link","page-link":"page10009"},"pic":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912a9f6a3353.png","content":"","parentCompid":"carousel1","style":"","itemType":null,"itemParentType":"carousel","itemIndex":0,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10009\\\/page10009\",\"is_redirect\":0}","eventHandler":"tapInnerLinkHandler"},{"customFeature":[],"pic":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912a9f6965c9.png","content":"","parentCompid":"carousel1","style":""}],"customFeature":{"autoplay":true,"interval":2},"animations":[],"page_form":"","compId":"carousel1"},"free_vessel2":{"type":"free-vessel","style":"width:750rpx;height:182.8125rpx;background-color:rgb(255, 255, 255);margin-bottom:auto;margin-right:auto;opacity:1;margin-left:auto;","content":[{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:105.46875rpx;width:105.46875rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;left:21.09375rpx;top:11.71875rpx;","content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912a9ea6e504.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5","action":"inner-link","inner-page-link":"page10004"},"animations":[],"compId":"data.content[0]","parentCompid":"free_vessel2","itemType":"picture","itemParentType":"free-vessel","itemIndex":0,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10004\\\/page10004\",\"is_redirect\":0}","eventHandler":"tapInnerLinkHandler"},{"type":"text","style":"background-color:rgba(0, 0, 0, 0);border-color:rgb(34, 34, 34);border-style:none;border-width:4.6875rpx;color:rgb(102, 102, 102);font-size:25.78125rpx;height:44.53125rpx;line-height:44.53125rpx;margin-left:auto;margin-top:0;opacity:1;text-align:left;position:absolute;left:23.4375rpx;top:124.21875rpx;margin-right:0;","content":"招牌喜乐","customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":"5","boxStyle":false,"boxX":"0","boxY":"0","action":"inner-link","inner-page-link":"page10004"},"animations":[],"compId":"data.content[1]","parentCompid":"free_vessel2","markColor":"","mode":0,"itemType":"text","itemParentType":"free-vessel","itemIndex":1,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10004\\\/page10004\",\"is_redirect\":0}","eventHandler":"tapInnerLinkHandler"},{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:105.46875rpx;width:105.46875rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;left:171.09375rpx;top:11.71875rpx;","content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912a9eada341.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5","action":"inner-link","inner-page-link":"page10008"},"animations":[],"compId":"data.content[2]","parentCompid":"free_vessel2","itemType":"picture","itemParentType":"free-vessel","itemIndex":2,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10008\\\/page10008\",\"is_redirect\":0}","eventHandler":"tapInnerLinkHandler"},{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:105.46875rpx;width:105.46875rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;left:325.78125rpx;top:11.71875rpx;","content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912a9ea7a028.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5","action":"inner-link","inner-page-link":"page10007"},"animations":[],"compId":"data.content[3]","parentCompid":"free_vessel2","itemType":"picture","itemParentType":"free-vessel","itemIndex":3,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10007\\\/page10007\",\"is_redirect\":0}","eventHandler":"tapInnerLinkHandler"},{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:105.46875rpx;width:105.46875rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;left:478.125rpx;top:11.71875rpx;","content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912a9eae4769.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5","action":"inner-link","inner-page-link":"page10006"},"animations":[],"compId":"data.content[4]","parentCompid":"free_vessel2","itemType":"picture","itemParentType":"free-vessel","itemIndex":4,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10006\\\/page10006\",\"is_redirect\":0}","eventHandler":"tapInnerLinkHandler"},{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:105.46875rpx;width:105.46875rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;left:625.78125rpx;top:11.71875rpx;","content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912a9ea72a86.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5","action":"inner-link","inner-page-link":"page10005"},"animations":[],"compId":"data.content[5]","parentCompid":"free_vessel2","itemType":"picture","itemParentType":"free-vessel","itemIndex":5,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10005\\\/page10005\",\"is_redirect\":0}","eventHandler":"tapInnerLinkHandler"},{"type":"text","style":"background-color:rgba(0, 0, 0, 0);border-color:rgb(34, 34, 34);border-style:none;border-width:4.6875rpx;color:rgb(102, 102, 102);font-size:25.78125rpx;height:44.53125rpx;line-height:44.53125rpx;margin-left:auto;margin-top:0;opacity:1;text-align:left;position:absolute;left:173.4375rpx;top:124.21875rpx;margin-right:0;","content":"星球嚼起","customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":"5","boxStyle":false,"boxX":"0","boxY":"0","action":"inner-link","inner-page-link":"page10008"},"animations":[],"compId":"data.content[6]","parentCompid":"free_vessel2","markColor":"","mode":0,"itemType":"text","itemParentType":"free-vessel","itemIndex":6,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10008\\\/page10008\",\"is_redirect\":0}","eventHandler":"tapInnerLinkHandler"},{"type":"text","style":"background-color:rgba(0, 0, 0, 0);border-color:rgb(34, 34, 34);border-style:none;border-width:4.6875rpx;color:rgb(102, 102, 102);font-size:25.78125rpx;height:44.53125rpx;line-height:44.53125rpx;margin-left:auto;margin-top:0;opacity:1;text-align:left;position:absolute;left:330.46875rpx;top:124.21875rpx;margin-right:0;","content":"草莓系列","customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":"5","boxStyle":false,"boxX":"0","boxY":"0","action":"inner-link","inner-page-link":"page10007"},"animations":[],"compId":"data.content[7]","parentCompid":"free_vessel2","markColor":"","mode":0,"itemType":"text","itemParentType":"free-vessel","itemIndex":7,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10007\\\/page10007\",\"is_redirect\":0}","eventHandler":"tapInnerLinkHandler"},{"type":"text","style":"background-color:rgba(0, 0, 0, 0);border-color:rgb(34, 34, 34);border-style:none;border-width:4.6875rpx;color:rgb(102, 102, 102);font-size:25.78125rpx;height:44.53125rpx;line-height:44.53125rpx;margin-left:auto;margin-top:0;opacity:1;text-align:left;position:absolute;left:480.46875rpx;top:124.21875rpx;margin-right:0;","content":"魔幻梦游","customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":"5","boxStyle":false,"boxX":"0","boxY":"0","action":"inner-link","inner-page-link":"page10006"},"animations":[],"compId":"data.content[8]","parentCompid":"free_vessel2","markColor":"","mode":0,"itemType":"text","itemParentType":"free-vessel","itemIndex":8,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10006\\\/page10006\",\"is_redirect\":0}","eventHandler":"tapInnerLinkHandler"},{"type":"text","style":"background-color:rgba(0, 0, 0, 0);border-color:rgb(34, 34, 34);border-style:none;border-width:4.6875rpx;color:rgb(102, 102, 102);font-size:25.78125rpx;height:44.53125rpx;line-height:44.53125rpx;margin-left:auto;margin-top:0;opacity:1;text-align:left;position:absolute;left:628.125rpx;top:124.21875rpx;margin-right:0;","content":"紫薯炼奶","customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":"5","boxStyle":false,"boxX":"0","boxY":"0","action":"inner-link","inner-page-link":"page10005"},"animations":[],"compId":"data.content[9]","parentCompid":"free_vessel2","markColor":"","mode":0,"itemType":"text","itemParentType":"free-vessel","itemIndex":9,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10005\\\/page10005\",\"is_redirect\":0}","eventHandler":"tapInnerLinkHandler"}],"customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":5,"boxStyle":false,"boxX":0,"boxY":0},"animations":[],"page_form":"","compId":"free_vessel2"},"free_vessel3":{"type":"free-vessel","style":"width:750rpx;height:51.5625rpx;margin-bottom:auto;margin-right:auto;margin-top:7.03125rpx;opacity:1;margin-left:auto;","content":[{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:51.5625rpx;width:750rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;","content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912abf9a5af3.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5"},"animations":[],"compId":"data.content[0]","parentCompid":"free_vessel3"},{"type":"text","style":"background-color:rgba(0, 0, 0, 0);border-color:rgb(34, 34, 34);border-style:none;border-width:4.6875rpx;color:rgb(102, 102, 102);font-size:30.46875rpx;height:44.53125rpx;line-height:44.53125rpx;margin-left:auto;margin-top:0;opacity:1;text-align:left;position:absolute;left:35.15625rpx;top:4.6875rpx;margin-right:0;","content":"新人专享","customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":"5","boxStyle":false,"boxX":"0","boxY":"0"},"animations":[],"compId":"data.content[1]","parentCompid":"free_vessel3","markColor":"","mode":0}],"customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":5,"boxStyle":false,"boxX":0,"boxY":0},"animations":[],"page_form":"","compId":"free_vessel3"},"free_vessel4":{"type":"free-vessel","style":"width:750rpx;height:255.46875rpx;background-color:rgb(229, 231, 102);margin-bottom:auto;margin-right:auto;margin-left:auto;","content":[{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:208.59375rpx;width:339.84375rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;left:23.4375rpx;top:23.4375rpx;","content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912ad2ec0762.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5","action":"get-coupon","coupon-id":"400"},"animations":[],"compId":"data.content[0]","parentCompid":"free_vessel4","itemType":"picture","itemParentType":"free-vessel","itemIndex":0,"eventParams":"{\"coupon_id\":\"400\"}","eventHandler":"tapGetCouponHandler"},{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:208.59375rpx;width:339.84375rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;left:386.71875rpx;top:23.4375rpx;","content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912ad08756c3.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5","action":"get-coupon","inner-page-link":"prePage","coupon-id":"500"},"animations":[],"compId":"data.content[1]","parentCompid":"free_vessel4","itemType":"picture","itemParentType":"free-vessel","itemIndex":1,"eventParams":"{\"coupon_id\":\"500\"}","eventHandler":"tapGetCouponHandler"}],"customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":5,"boxStyle":false,"boxX":0,"boxY":0},"animations":[],"page_form":"","compId":"free_vessel4"},"free_vessel5":{"type":"free-vessel","style":"width:750rpx;height:51.5625rpx;margin-bottom:auto;margin-right:auto;margin-top:7.03125rpx;opacity:1;margin-left:auto;","content":[{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:51.5625rpx;width:750rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;","content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912abf9a5af3.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5"},"animations":[],"compId":"data.content[0]","parentCompid":"free_vessel5"},{"type":"text","style":"background-color:rgba(0, 0, 0, 0);border-color:rgb(34, 34, 34);border-style:none;border-width:4.6875rpx;color:rgb(102, 102, 102);font-size:30.46875rpx;height:44.53125rpx;line-height:44.53125rpx;margin-left:auto;margin-top:0;opacity:1;text-align:left;position:absolute;left:35.15625rpx;top:4.6875rpx;margin-right:0;","content":"今日特价","customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":"5","boxStyle":false,"boxX":"0","boxY":"0"},"animations":[],"compId":"data.content[1]","parentCompid":"free_vessel5","markColor":"","mode":0}],"customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":5,"boxStyle":false,"boxX":0,"boxY":0},"animations":[],"page_form":"","compId":"free_vessel5"},"goods_list6":{"type":"goods-list","style":"background-color:rgb(255, 255, 255);opacity:1;color:rgba(0, 0, 0, 0);height:auto;margin-left:auto;","content":"","customFeature":{"lineBackgroundColor":"rgb(255, 255, 255)","lineBackgroundImage":"","margin":"0","lineHeight":"143","imgWidth":"119","imgHeight":"143","vesselAutoheight":1,"height":"300px","form":"goods","mode":2,"name":"商品列表","ifUseContact":true,"isIntegral":false,"isShoppingCart":false,"id":"list-394753237785","source":"none"},"animations":[],"page_form":"","compId":"goods_list6","parentCompid":"goods_list6","list_style":"background-color:rgb(255, 255, 255);height:335.15625rpx;margin-left:auto;","img_style":"width:278.90625rpx;height:335.15625rpx;margin-left:auto;","title_width":{"width":"447.65625rpx"},"param":"{\"id\":\"list-394753237785\",\"form\":\"goods\",\"goods_type\":0,\"page\":1,\"app_id\":\"j22CVcNz2Z\",\"is_count\":0,\"is_integral\":0}"},"free_vessel7":{"type":"free-vessel","style":"width:750rpx;height:815.49482345581rpx;background-color:rgb(255, 255, 255);margin-bottom:auto;margin-right:auto;margin-top:7.03125rpx;opacity:1;margin-left:auto;","content":[{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:400.75685977936rpx;width:750rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;","content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912b2f5725ef.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5","action":"goods-trade","goods-id":"1034446","goods-name":"百威纯生500ml","goods-type":"0"},"animations":[],"compId":"data.content[0]","parentCompid":"free_vessel7","itemType":"picture","itemParentType":"free-vessel","itemIndex":0,"eventParams":"{\"goods_id\":\"1034446\"}","eventHandler":"tapGoodsTradeHandler"},{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:400.75685977936rpx;width:750rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;top:414.84375rpx;","content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912b2f4962c1.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5","action":"goods-trade","goods-id":"1034446","goods-name":"百威纯生500ml","goods-type":"0"},"animations":[],"compId":"data.content[1]","parentCompid":"free_vessel7","itemType":"picture","itemParentType":"free-vessel","itemIndex":1,"eventParams":"{\"goods_id\":\"1034446\"}","eventHandler":"tapGoodsTradeHandler"}],"customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":5,"boxStyle":false,"boxX":0,"boxY":0},"animations":[],"page_form":"","compId":"free_vessel7"},"free_vessel8":{"type":"free-vessel","style":"width:750rpx;height:49.21875rpx;margin-bottom:auto;margin-right:auto;margin-top:7.03125rpx;opacity:1;margin-left:auto;","content":[{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:51.5625rpx;width:750rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;","content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912abf9a5af3.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5","action":"none","inner-page-link":"prePage"},"animations":[],"compId":"data.content[0]","parentCompid":"free_vessel8"},{"type":"text","style":"background-color:rgba(0, 0, 0, 0);border-color:rgb(34, 34, 34);border-style:none;border-width:4.6875rpx;color:rgb(102, 102, 102);font-size:30.46875rpx;height:44.53125rpx;line-height:44.53125rpx;margin-left:auto;margin-top:0;opacity:1;text-align:left;position:absolute;left:35.15625rpx;top:4.6875rpx;margin-right:0;","content":"全部喜乐茶","customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":"5","boxStyle":false,"boxX":"0","boxY":"0"},"animations":[],"compId":"data.content[1]","parentCompid":"free_vessel8","markColor":"","mode":0}],"customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":5,"boxStyle":false,"boxX":0,"boxY":0},"animations":[],"page_form":"","compId":"free_vessel8"},"classify9":{"type":"classify","style":"font-size:30.46875rpx;height:82.03125rpx;line-height:82.03125rpx;opacity:1;background-color:rgb(255, 255, 255);color:rgb(170, 170, 170);margin-left:auto;","content":[{"customFeature":{"index_value":"招牌喜乐","action":"inner-link","page-link":"page10004","refresh_object":"list-543245895776","index_segment":"category"},"text":"招牌喜乐","content":"","parentCompid":"classify9","style":"","itemType":null,"itemParentType":"classify","itemIndex":0,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10004\\\/page10004\",\"is_redirect\":1}","eventHandler":"tapInnerLinkHandler"},{"customFeature":{"index_value":"星球嚼起","action":"inner-link","page-link":"page10008","refresh_object":"list-543245895776","index_segment":"category","goods-id":"1034446","goods-name":"百威纯生500ml","goods-type":"0"},"text":"星球嚼起","content":"","parentCompid":"classify9","style":"","itemType":null,"itemParentType":"classify","itemIndex":1,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10008\\\/page10008\",\"is_redirect\":1}","eventHandler":"tapInnerLinkHandler"},{"customFeature":{"index_value":"草莓系列","action":"inner-link","page-link":"page10007","refresh_object":"list-543245895776","index_segment":"category"},"text":"草莓系列","content":"","parentCompid":"classify9","style":"","itemType":null,"itemParentType":"classify","itemIndex":2,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10007\\\/page10007\",\"is_redirect\":1}","eventHandler":"tapInnerLinkHandler"},{"customFeature":{"index_value":"魔幻梦游","action":"inner-link","page-link":"page10006","refresh_object":"list-543245895776","index_segment":"category"},"text":"魔幻梦游","content":"","parentCompid":"classify9","style":"","itemType":null,"itemParentType":"classify","itemIndex":3,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10006\\\/page10006\",\"is_redirect\":1}","eventHandler":"tapInnerLinkHandler"},{"customFeature":{"action":"inner-link","page-link":"page10005","index_value":"紫薯炼奶","refresh_object":"list-543245895776","index_segment":"category"},"text":"紫薯炼奶","content":"","parentCompid":"classify9","style":"","itemType":null,"itemParentType":"classify","itemIndex":4,"eventParams":"{\"inner_page_link\":\"\\\/pages\\\/page10005\\\/page10005\",\"is_redirect\":1}","eventHandler":"tapInnerLinkHandler"}],"customFeature":{"mode":"1","selected":"0","selectedColor":"rgb(70, 69, 70)"},"animations":[],"page_form":"","compId":"classify9"},"list_vessel10":{"type":"list-vessel","style":"opacity:1;height:703.125rpx;background-color:rgb(243, 243, 243);margin-left:auto;","content":[{"type":"free-vessel","style":"width:372.39586114883rpx;height:393.63609552383rpx;margin-bottom:auto;margin-right:auto;margin-top:-23.4375rpx;opacity:1;margin-left:auto;","content":[{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:328.125rpx;width:372.39586114883rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;","content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912c4e5098c0.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5","segment":"","ifMust":true,"action":"none","inner-page-link":"prePage"},"animations":[],"compId":"data.content[0]","parentCompid":"data.content[0]"},{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:264.81120586395rpx;width:166.40626788139rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;left:98.4375rpx;top:32.8125rpx;","content":"https:\/\/1251027630.cdn.myqcloud.com\/1251027630\/zhichi_frontend\/static\/webapp\/images\/default.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5","segment":"cover","ifMust":true},"animations":[],"compId":"data.content[1]","parentCompid":"data.content[0]"},{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:60.815432667732rpx;width:372.39586114883rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;top:332.8125rpx;","content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912ce80879ff.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5","segment":"","ifMust":true,"action":"none","inner-page-link":"prePage"},"animations":[],"compId":"data.content[2]","parentCompid":"data.content[0]"},{"type":"text","style":"background-color:rgba(0, 0, 0, 0);border-color:rgb(34, 34, 34);border-style:none;border-width:4.6875rpx;color:rgb(255, 255, 255);font-size:30.46875rpx;height:44.53125rpx;line-height:44.53125rpx;margin-left:auto;margin-top:0;opacity:1;text-align:left;position:absolute;left:21.09375rpx;top:339.84375rpx;margin-right:0;","content":"我是文本","customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":"5","boxStyle":false,"boxX":"0","boxY":"0","segment":"title","ifMust":true},"animations":[],"compId":"data.content[3]","parentCompid":"data.content[0]","markColor":"","mode":0},{"type":"text","style":"background-color:rgba(0, 0, 0, 0);border-color:rgb(34, 34, 34);border-style:none;border-width:4.6875rpx;color:rgb(70, 69, 70);font-size:32.8125rpx;height:88.541668653488rpx;width:201.30209326744rpx;line-height:44.53125rpx;margin-left:auto;margin-top:0;opacity:1;text-align:left;position:absolute;left:16.40625rpx;top:276.5625rpx;margin-right:0;","content":"我是文本","customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":"5","boxStyle":false,"boxX":"0","boxY":"0","segment":"price","ifMust":true},"animations":[],"compId":"data.content[4]","parentCompid":"data.content[0]","markColor":"","mode":0}],"customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":5,"boxStyle":false,"boxX":0,"boxY":0},"animations":[],"parentCompid":"list_vessel10","compId":"data.content[0]"}],"customFeature":{"background-color":"rgb(243, 243, 243)","background-image":"","form":"tostore","id":"list-543245895776","lineBackgroundColor":"rgb(243, 243, 243)","lineBackgroundImage":"","link":"-1","margin":"3","name":"列表","source":"none","vesselAutoheight":1,"mode":1,"height":"300px"},"animations":[],"page_form":"","compId":"list_vessel10","list_style":"margin-bottom:7.03125rpx;background-color:rgb(243, 243, 243);margin-left:auto;","customFeature_id":"list-543245895776","is_more":1,"param":"{\"id\":\"list-543245895776\",\"form\":\"tostore\",\"page\":1,\"app_id\":\"j22CVcNz2Z\",\"is_count\":0}","form":"tostore"},"free_vessel11":{"type":"free-vessel","style":"width:750rpx;height:96.093754470348rpx;margin-bottom:auto;margin-right:auto;opacity:1;margin-left:auto;","content":[{"type":"picture","style":"opacity:1;background-color:transparent;border-color:rgb(34, 34, 34);border-style:none;height:58.593754470348rpx;width:750rpx;margin-left:auto;margin-right:0;margin-top:0;position:absolute;top:18.75rpx;","content":"http:\/\/img.weiye.me\/zcimgdir\/album\/file_5912bcc332fee.png","customFeature":{"boxShadow":"5","boxColor":"#000","boxX":"0","boxY":"0","boxR":"5"},"animations":[],"compId":"data.content[0]","parentCompid":"free_vessel11"}],"customFeature":{"boxColor":"rgb(0, 0, 0)","boxR":5,"boxStyle":false,"boxX":0,"boxY":0},"animations":[],"page_form":"","compId":"free_vessel11"},"has_tabbar":1},
  page_router: 'page10000',
    page_form: 'none',
      list_compids_params: [{"compid":"list_vessel10","param":{"id":"list-543245895776","form":"tostore","page":1,"app_id":"j22CVcNz2Z","is_count":0}}],
      goods_compids_params: [{"compid":"goods_list6","param":{"id":"list-394753237785","form":"goods","goods_type":0,"page":1,"app_id":"j22CVcNz2Z","is_count":0,"is_integral":0}}],
  prevPage:0,
      relobj_auto: [],
      bbsCompIds: [],
      dynamicVesselComps: [],
      communityComps: [],
      franchiseeComps: [],
      cityLocationComps: [],
      onLoad: function (e) {
    this.setData({
      addShoppingCartShow: false
    });
    appInstance.setPageUserInfo();
    if(e.detail){
      this.dataId = e.detail;
    }
    appInstance.checkLogin();

    this.suspensionBottom();
    appInstance.globalData.urlLocationId = e.location_id;

  },
  dataInitial: function(){
    appInstance.dataInitial();
  },
  onShareAppMessage: function(){
    var pageRouter = this.page_router,
        pagePath = '/pages/'+pageRouter+'/'+pageRouter;

    // 统计用户分享APP
    appInstance.countUserShareApp();

    pagePath += this.dataId ? '?detail='+this.dataId : '';
    return {
      title: appInstance.getAppTitle() || '即速应用',
      desc: appInstance.getAppDescription() || '即速应用，拖拽生成app，无需编辑代码，一键打包微信小程序',
      path: pagePath
    }
  },
  onShow: function(){
    var that = this;
    setTimeout(function(){
      appInstance.setPageUserInfo();
    });
  },

  suspensionBottom: function(){
    for (let i in this.data) {
      if(/suspension/.test(i)){
        let suspension = this.data[i],
            newdata = {};

        if(this.data.has_tabbar == 1){
          newdata[i + '.suspension_bottom'] = (+suspension.suspension_bottom - 56)*2.34;
        }else{
          newdata[i + '.suspension_bottom'] = (+suspension.suspension_bottom)*2.34;
        }
        this.setData(newdata);
      }
    }
  },
  pageScrollFunc: function (e) {
    let compid  = e.target.dataset.compid;
    let curpage = parseInt(e.target.dataset.curpage) + 1;
      if (this.prevPage !== curpage) {
          this.prevPage = curpage;
          appInstance.pageScrollFunc(compid, curpage);
      }
  },
  goodsScrollFunc: function (e) {
    let compid  = e.target.dataset.compid;
    let curpage = parseInt(e.target.dataset.curpage) + 1;
    if (this.prevPage !== curpage) {
        this.prevPage = curpage;
        appInstance.goodsScrollFunc(compid, curpage);
    }
  },
  franchiseeScrollFunc: function (e) {
    let compid  = e.target.dataset.compid;
    let curpage = parseInt(e.target.dataset.curpage) + 1;
    appInstance.franchiseeScrollFunc(compid, curpage);
  },
  changeCount: function (e) {
    let dataset = e.currentTarget.dataset;
    appInstance.changeCount(dataset);
  },
  inputChange: function (e) {
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    appInstance.inputChange(dataset, value);
  },
  bindDateChange: function(e) {
    let dataset = e.currentTarget.dataset;
    let value   = e.detail.value;
    appInstance.bindDateChange(dataset, value);
  },
  bindTimeChange: function(e) {
    let dataset = e.currentTarget.dataset;
    let value   = e.detail.value;
    appInstance.bindTimeChange(dataset, value);
  },
  bindSelectChange: function(e) {
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    appInstance.bindSelectChange(dataset, value);
  },
  bindScoreChange: function(e){
    let dataset = e.currentTarget.dataset;
    appInstance.bindScoreChange(dataset);
  },
  submitForm: function (e) {
    let dataset = e.currentTarget.dataset;
    appInstance.submitForm(dataset);
  },
  udpateVideoSrc: function (e) {
    let dataset = e.currentTarget.dataset;
    appInstance.udpateVideoSrc(dataset);
  },
  tapMapDetail: function (e) {
    let dataset = e.currentTarget.dataset;
    appInstance.tapMapDetail(dataset);
  },
  uploadFormImg: function (e) {
    let dataset = e.currentTarget.dataset;
    appInstance.uploadFormImg(dataset);
  },
  listVesselTurnToPage: function (e) {
    let dataset = e.currentTarget.dataset;
    appInstance.listVesselTurnToPage(dataset);
  },
  UserCenterTurnToPage: function (e) {
    let router = e.currentTarget.dataset.router;
    let openVerifyPhone = e.currentTarget.dataset.openVerifyPhone; // 是否开启短信验证
    if(openVerifyPhone){
      if(!appInstance.getUserInfo().phone) {
        appInstance.turnToPage('/pages/bindCellphone/bindCellphone', true);
      } else {
        appInstance.turnToPage('/pages/' + router + '/' + router +'?from=userCenterEle');
      }
    } else {
      appInstance.turnToPage('/pages/' + router + '/' + router +'?from=userCenterEle');
    }
  },
  turnToGoodsDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    let contact = e.currentTarget.dataset.contact;
    let goodsType = e.currentTarget.dataset.goodsType;
    switch(+goodsType){
      case 0:
      case 1: appInstance.turnToPage('/pages/goodsDetail/goodsDetail?detail=' + id +'&contact=' + contact);
        break;
      case 3: appInstance.turnToPage('/pages/toStoreDetail/toStoreDetail?detail=' + id);
        break;
    }
  },
  turnToFranchiseeDetail: function(e){
    let dataset = e.currentTarget.dataset,
        id = dataset.id;
    appInstance.turnToPage('/pages/franchiseeDetail/franchiseeDetail?detail=' + id);
  },
  sortListFunc: function (e) {
    let dataset = e.currentTarget.dataset;
    appInstance.sortListFunc(dataset);
  },
  bbsInputComment: function(e){
    var dataset = e.target.dataset,
        comment = e.detail.value;
    appInstance.bbsInputComment(dataset, comment);
  },
  bbsInputReply: function(e){
    var dataset = e.target.dataset,
        comment = e.detail.value;
    appInstance.bbsInputReply(dataset, comment);
  },
  uploadBbsCommentImage: function(e){
    var dataset = e.currentTarget.dataset;
    appInstance.uploadBbsCommentImage(dataset);
  },
  uploadBbsReplyImage: function(e){
    var dataset = e.currentTarget.dataset;
    appInstance.uploadBbsReplyImage(dataset);
  },
  deleteCommentImage: function(e){
    var dataset = e.currentTarget.dataset;
    appInstance.deleteCommentImage(dataset);
  },
  deleteReplyImage: function(e){
    var dataset = e.currentTarget.dataset;
    appInstance.deleteReplyImage(dataset);
  },
  bbsPublishComment: function(e){
    var dataset = e.currentTarget.dataset;
    appInstance.bbsPublishComment(dataset);
  },
  clickBbsReplyBtn: function(e){
    var dataset = e.currentTarget.dataset;
    appInstance.clickBbsReplyBtn(dataset);
  },
  bbsPublishReply: function(e){
    var dataset = e.currentTarget.dataset;
    appInstance.bbsPublishReply(dataset);
  },
  keywordList:{},
  bindSearchTextChange : function(e){
    this.keywordList[e.currentTarget.dataset.compid] = e.detail.value;
  },
  searchList:function(e){
    let dataset = e.currentTarget.dataset;
    appInstance.searchList(dataset);
  },
  selectLocal:function(e){
    var that = this;
    let id = e.currentTarget.dataset.id,
        newdata = this.data;
    newdata[id].hidden = typeof(this.data[id].hidden) == undefined ? false : !this.data[id].hidden;
    newdata[id].provinces = ['请选择'];  newdata[id].citys =['请选择']; newdata[id].districts = ['请选择']
    newdata[id].provinces_ids =[null]; newdata[id].city_ids =[null]; newdata[id].district_ids = [null];
    for(var i in newdata[id].areaList){
      newdata[id].provinces.push(newdata[id].areaList[i].name);
      newdata[id].provinces_ids.push(newdata[id].areaList[i].region_id);
    }
    newdata[id].newlocal = '';
    this.setData(newdata);
  },
  cancelCity:function(e){
    var that = this;
    let id = e.currentTarget.dataset.id,
        newdata = this.data;
    newdata[id].hidden = !this.data[id].hidden;
    newdata[id].province = '';
    newdata[id].city = '';
    newdata[id].district = '';
    this.setData(newdata);
  },
  bindCityChange:function(e){
    const val = e.detail.value;
    let id = e.currentTarget.dataset.id,
        newdata = this.data,
        cityList = newdata[id].areaList;
        if(!newdata[id].newlocal){
    newdata[id].province = this.data[id].province[val[0]] == '请选择' ? ''  : this.data[id].provinces[val[0]];
    newdata[id].citys = newdata[id].province == '请选择' ? ['请选择'] :  this.getCityList(cityList[val[0]].cities);
    newdata[id].city_ids = newdata[id].province == '请选择' ? [null] : this.getCityList(cityList[val[0]].cities,1);
    newdata[id].city = newdata[id].citys[val[1]];
    newdata[id].districts = newdata[id].city == '请选择' ? ['请选择'] :  this.getCityList(cityList[val[0]].cities[val[1]].towns);
    newdata[id].district_ids = newdata[id].city == '请选择' ? [null] : this.getCityList(cityList[val[0]].cities[val[1]].towns, 1);
    newdata[id].region_id = newdata[id].district_ids[val[2]];
    newdata[id].district = newdata[id].districts[val[2]];
    newdata[id].value = val;
    newdata[id].district = newdata[id].district == '请选择'? '' :newdata[id].district
    this.setData(newdata)
    }
  },
  submitCity:function(e){
    let id = e.currentTarget.dataset.id,
        newdata = this.data;
    if(!newdata[id].districts){
      appInstance.showModal({content: '您未选择城市!'});
      newdata[id].province = '';
      newdata[id].city = '';
      newdata[id].district = '';
    }else{
      newdata[id].hidden = !this.data[id].hidden;
      newdata[id].newlocal = newdata[id].province + ' ' + newdata[id].city + ' ' +      newdata[id].district;
      newdata[id].value = [0,0,0];
      appInstance.citylocationList(e.currentTarget.dataset, newdata[id].region_id);
    }
    this.setData(newdata);
  },
  getCityList:function (province, id){
    let cityList = [], cityList_id = [];
    for(let i in province){
      if(typeof(province[i]) == 'object'){
        cityList.push(province[i].name)
        cityList_id.push(province[i].region_id);
      }else{
        cityList[1] = province.name;
        cityList_id[1]=province.region_id;
      }
    }
    if(id){
      return cityList_id;
    }else{
      return cityList;
    }

  },
  

  
  
  tapGoodsTradeHandler: function(event) {
    appInstance.tapGoodsTradeHandler(event);
  },
  tapInnerLinkHandler: function(event) {
    appInstance.tapInnerLinkHandler(event);
  },
  tapPhoneCallHandler: function(event) {
    appInstance.tapPhoneCallHandler(event);
  },
  tapRefreshListHandler: function(event) {
    var _this = this;
    appInstance.tapRefreshListHandler(event, _this);
  },
  tapGetCouponHandler: function(event) {
    appInstance.tapGetCouponHandler(event);
  },
  tapCommunityHandler: function(event) {
    appInstance.tapCommunityHandler(event);
  },
  turnToCommunityPage: function(event){
    let id = event.currentTarget.dataset.id;
    appInstance.turnToPage('/pages/communityPage/communityPage?detail=' + id);
  },
  tapToFranchiseeHandler: function(event){
    appInstance.tapToFranchiseeHandler(event);
  },
  tapFranchiseeLocation: function(event){
    appInstance.tapFranchiseeLocation(event);
  },
  showAddShoppingcart: function(event) {
    var that = this,
        goods_id = event.currentTarget.dataset.id;
    appInstance.sendRequest({
      url: '/index.php?r=AppShop/getGoods',
      data: {
        data_id: goods_id
      },
      method: 'post',
      success: function (res) {
        if (res.status == 0) {
          var goods = res.data[0].form_data,
              defaultSelect = goods.model_items[0],
              goodsModel = [],
              selectModels = [],
              goodprice = 0,
              goodstock = 0,
              goodid ;
          if(goods.model_items.length){
            goodprice = defaultSelect.price;
            goodstock = defaultSelect.stock;
            goodid = defaultSelect.id;
          }else{
            goodprice = goods.price;
            goodstock = goods.stock;
          }
          for(let key in goods.model){
            if(key){
              let model = goods.model[key];
              goodsModel.push(model);
              selectModels.push(model.subModelId[0]);
            }
          }
          goods.model = goodsModel;
          that.setData({
            goodsInfo: goods ,
            addShoppingCartShow: true,
            'selectGoodsModelInfo.price': goodprice,
            'selectGoodsModelInfo.stock': goodstock,
            'selectGoodsModelInfo.buyCount': 1,
            'selectGoodsModelInfo.models': selectModels,
            'selectGoodsModelInfo.modelId': goodid
          });
        }
      }
    });
  },
  hiddeAddShoppingcart: function(){
    this.setData({
      addShoppingCartShow: false
    });
  },
  selectGoodsSubModel: function(e){
    let dataset = e.target.dataset,
        modelIndex = dataset.modelIndex,
        submodelIndex = dataset.submodelIndex,
        data = {};

    data['selectGoodsModelInfo.models['+modelIndex+']'] = this.data.goodsInfo.model[modelIndex].subModelId[submodelIndex];
    this.setData(data);
    this.resetSelectCountPrice();
  },
  resetSelectCountPrice: function(){
    let selectModelIds = this.data.selectGoodsModelInfo.models.join(','),
        modelItems = this.data.goodsInfo.model_items,
        data = {};

    for (let i = modelItems.length - 1; i >= 0; i--) {
      if(modelItems[i].model == selectModelIds){
        data['selectGoodsModelInfo.stock'] = modelItems[i].stock;
        data['selectGoodsModelInfo.price'] = modelItems[i].price;
        data['selectGoodsModelInfo.modelId'] = modelItems[i].id;
        break;
      }
    }
    this.setData(data);
  },
  clickGoodsMinusButton: function(e){
    let count = this.data.selectGoodsModelInfo.buyCount;

    if(count <= 1){
      return;
    }
    this.setData({
      'selectGoodsModelInfo.buyCount': count - 1
    });
  },
  clickGoodsPlusButton: function(e){
    let selectGoodsModelInfo = this.data.selectGoodsModelInfo,
        count = selectGoodsModelInfo.buyCount,
        stock = selectGoodsModelInfo.stock;

    if(count >= stock) {
      return;
    }
    this.setData({
      'selectGoodsModelInfo.buyCount': count + 1
    });
  },
  sureAddToShoppingCart: function(){
    var that = this,
        param = {
          goods_id: this.data.goodsInfo.id,
          model_id: this.data.selectGoodsModelInfo.modelId || '',
          num: this.data.selectGoodsModelInfo.buyCount,
          sub_shop_app_id : ''
        };

    appInstance.sendRequest({
      url: '/index.php?r=AppShop/addCart',
      data: param,
      success: function(res){
        appInstance.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1500
        });

        setTimeout(function(){
          appInstance.hideToast();
          setTimeout(function(){
            that.hiddeAddShoppingcart();
          }, 500);
        }, 1500);
      }
    })
  }
};
Page(pageData);
