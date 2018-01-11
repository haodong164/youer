<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:74:"/data/home/bxu2713310775/htdocs/application/admin/view/index/uprecord.html";i:1501589773;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/head.html";i:1501579231;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501558013;}*/ ?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>智慧幼儿园</title>
    <meta name="description" content="这是一个 index 页面">
    <meta name="keywords" content="index">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="icon" type="image/png" href="__STATIC__assets/i/favicon.png">
    <link rel="apple-touch-icon-precomposed" href="__STATIC__assets/i/app-icon72x72@2x.png">
    <meta name="apple-mobile-web-app-title" content="Amaze UI" />
    <link rel="stylesheet" href="__STATIC__assets/css/amazeui.min.css" />
    <link rel="stylesheet" href="__STATIC__assets/css/admin.css">
    <link rel="stylesheet" href="__STATIC__assets/css/app.css">
</head>

            <div class="tpl-portlet-components">
                <div class="portlet-title">
                    <div class="caption font-green bold">
                        <span class="am-icon-code"></span> 表单
                    </div>
                    <div class="tpl-portlet-input tpl-fz-ml">
                        <div class="portlet-input input-small input-inline">
                            <div class="input-icon right">
                                <i class="am-icon-search"></i>
                                <input type="text" class="form-control form-control-solid" placeholder="搜索..."> </div>
                        </div>
                    </div>


                </div>
                <div class="tpl-block ">

                    <div class="am-g tpl-amazeui-form">


                       <div class="am-u-sm-12 am-u-md-9">
                            <form class="am-form am-form-horizontal" action="<?php echo url('Index/do_uprecord'); ?>"  method="post" enctype="multipart/form-data">
                                
								<div class="am-form-group">
                                    <label for="user-password" readonly='readonly' class="am-u-sm-3 am-form-label">发表人 / Truename</label>
                                    <div class="am-u-sm-9">
                                        <input type="hidden" name="id" value="<?php echo $info['id']; ?>">
                                        <input type="text" id="user-password" value="<?php echo $info['name']; ?>" placeholder="发表人 / Truename" >
                                    </div>
                                </div>
                           <div class="am-form-group">
                                  <label class="am-u-sm-3 am-form-label">标题 / Title</label>
                                     <div class="am-u-sm-9">
                                      <input type="text" name="title" value="<?php echo $info['title']; ?>"  placeholder="输入你的标题 / Title">
                                  </div>
                            </div>
                                <div class="am-form-group">
                                    <label  name="photo" class="am-u-sm-3 am-form-label">签到图片</label>
                                    <div class="am-u-sm-9">
                                        <div class="am-form-group am-form-file">
                                            <div class="tpl-form-file-img">
                                                <img style="max-height: 200px; width: auto;" id="preview" src="http://www.ryaonet.cn/public/Uploads/<?php echo $info['photos']; ?>" alt="">
                                            </div>
                                            <button type="button" class="am-btn am-btn-danger am-btn-sm">
                                                <i class="am-icon-cloud-upload"></i> 添加封面图片</button>
                                            <input id="doc-form-file"  value="<?php echo $info['photos']; ?>" name="photos" type="file" multiple>
                                        </div>
                                    </div>
                                </div>
								
								 <div class="am-form-group">
                                    <label for="user-intro" class="am-u-sm-3 am-form-label">记录内容 / Content</label>
                                    <div class="am-u-sm-9">
								         <textarea class="" rows="5" id="user-intro" name="content"><?php echo $info['content']; ?></textarea>
                                    <small></small>
                                    </div>
                                </div>

                                <div class="am-form-group">
                                    <label class="am-u-sm-3 am-form-label">地址 / Address</label>
                                    <div class="am-u-sm-9">
                                        <input type="text" name="address" value="<?php echo $info['address']; ?>" placeholder="输入你的地址 / Address">
                                    </div>
                                </div>
								
                                <div class="am-form-group">
                                    <div class="am-u-sm-9 am-u-sm-push-3">
                                        <button type="submit" class="am-btn am-btn-primary">保存修改</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <script src="__STATIC__assets/js/jquery.min.js"></script>
    <script src="__STATIC__assets/js/amazeui.min.js"></script>
    <script src="__STATIC__assets/js/app.js"></script>
 <script type="text/javascript">
        $(function() {
$("#doc-form-file").change(function() {
var $file = $(this);
var fileObj = $file[0];
var windowURL = window.URL || window.webkitURL;
var dataURL;
var $img = $("#preview");
 
if(fileObj && fileObj.files && fileObj.files[0]){
dataURL = windowURL.createObjectURL(fileObj.files[0]);
$img.attr('src',dataURL);
}else{
dataURL = $file.val();
var imgObj = document.getElementById("preview");
// 两个坑:
// 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
// 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
 
}
});
});

    </script>
</body>

</html>