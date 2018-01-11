<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:76:"/data/home/bxu2713310775/htdocs/application/admin/view/index/addteacher.html";i:1501578362;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/head.html";i:1501579231;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501558013;}*/ ?>
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
                            <form class="am-form am-form-horizontal" action="<?php echo url('Index/do_addteacher'); ?>"  method="post" enctype="multipart/form-data">
                                <div class="am-form-group">
                                    <label for="user-name" class="am-u-sm-3 am-form-label">真实姓名 / TrueName</label>
                                    <div class="am-u-sm-9">
                                        <input type="text" id="user-name" placeholder="真实姓名 / TrueName" name="truename">
                                        <small>输入你的名字，让我们记住你。</small>
                                    </div>
                                </div>
								<div class="am-form-group">
                                    <label for="user-phone" class="am-u-sm-3 am-form-label">电话 / Telephone</label>
                                    <div class="am-u-sm-9">
                                        <input type="tel" id="user-phone" placeholder="输入你的手机号 / Telephone" name="telphone">
                                    </div>
                                </div>
								
								<div class="am-form-group">
                                    <label for="user-password" class="am-u-sm-3 am-form-label">密码 / Password</label>
                                    <div class="am-u-sm-9">
                                        <input type="password" id="user-password" placeholder="输入你的密码 / Password" name="password">
                             
                                    </div>
                                </div>
								<div class="am-form-group">
                                    <label for="user-name" class="am-u-sm-3 am-form-label">昵称 / NickName</label>
                                    <div class="am-u-sm-9">
                                        <input type="text" id="user-name" placeholder="昵称 / NickName" name="nickname">
                                
                                    </div>
                                </div>
                                <div class="am-form-group">
                                    <label for="user-name" class="am-u-sm-3 am-form-label">头像 / Photo</label>
                                    <div class="am-u-sm-9">
                                            <div class="am-form-group am-form-file">
                                            <div class="tpl-form-file-img">
                                                <img style="max-height: 200px; width: auto;" id="preview" src="__STATIC__/assets/img/a5.png" alt="">
                                            </div>
											<button type="button" class="am-btn am-btn-danger am-btn-sm">
                                             <i class="am-icon-cloud-upload"></i>添加头像</button>
                                            <input id="doc-form-file"  type="file" name="photo"  multiple >
                                        </div>
                                    </div>
                                </div>

                                <div class="am-form-group">
                                    <label for="user-email" class="am-u-sm-3 am-form-label">性别 / Sex</label>
                                    <div class="am-u-sm-9">
                                        <input type="radio"  name="sex" checked="checked" value='1'><small>女</small>
                                        <input type="radio"  name="sex"  value='0'><small>男</small>
                                    </div>
                                </div>

                                
                                <div class="am-form-group">
                                    <label for="user-name" class="am-u-sm-3 am-form-label">教师</label>
                                    <div class="am-u-sm-9">
                                       <select name="dept" id="user">
                                           <option>请选择教师职位</option>
                                           <?php if(is_array($dept) || $dept instanceof \think\Collection || $dept instanceof \think\Paginator): if( count($dept)==0 ) : echo "" ;else: foreach($dept as $key=>$dept): ?>
                                           <option value="<?php echo $dept; ?>"><?php echo $dept; ?></option>
                                           <?php endforeach; endif; else: echo "" ;endif; ?>
                                       </select>
                                        <small>负责的职位</small>
                                    </div>
                                </div>
								
								<div class="am-form-group">
                                    <label for="user-QQ" class="am-u-sm-3 am-form-label">状态</label>
                                    <div class="am-u-sm-9">
                                        <input type="radio" name="status" checked="checked" value='1'><small>启用</small>
                                        <input type="radio" name="status" value='0'><small>禁用</small>
                                    </div>
                                </div>
								
                                <div class="am-form-group">
                                    <div class="am-u-sm-9 am-u-sm-push-3">
                                        <button type="submit" class="am-btn am-btn-primary">保存添加</button>
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