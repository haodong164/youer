<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:75:"/data/home/bxu2713310775/htdocs/application/admin/view/index/upstudent.html";i:1501596520;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/head.html";i:1501579231;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501558013;}*/ ?>
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

<body>

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
                <form action="<?php echo url('Index/do_upstudent'); ?>" method="post" enctype="multipart/form-data" class="am-form am-form-horizontal">
                    <div class="am-form-group">
                        <label for="user-name" class="am-u-sm-3 am-form-label">姓名 / Name</label>
                        <div class="am-u-sm-9">
                            <input type="hidden" name="id" value="<?php echo $ulist['id']; ?>" >
                            <input type="text" name="sname" value="<?php echo $ulist['sname']; ?>" id="user-name" placeholder="姓名 / Name">
                            <small>输入你的名字，让我们记住你。</small>
                        </div>
                    </div>
                    <div class="am-form-group">
                        <label for="user-name" class="am-u-sm-3 am-form-label">头像 / Photo</label>
                        <div class="am-u-sm-9">
                            <div class="am-form-group am-form-file">
                                <div class="tpl-form-file-img">
                                    <img style="max-height: 200px; width: auto;" id="preview" src="http://www.ryaonet.cn/public/Uploads/<?php echo $ulist['studentphoto']; ?>" alt="">
                                </div>
                                <button type="button" class="am-btn am-btn-danger am-btn-sm">
                                    <i class="am-icon-cloud-upload"></i> 添加封面图片</button>
                                <input id="doc-form-file" name="studentphoto" type="file" multiple>
                            </div>
                        </div>
                    </div>

                    <div class="am-form-group">
                        <label  class="am-u-sm-3 am-form-label">性别 / Sex</label>
                        <div class="am-u-sm-9">
                            <input type="radio" <?php if($ulist['sex'] == 1): ?> checked="checked"<?php endif; ?> value="1" name="sex"><small>男</small>
                            <input type="radio" <?php if($ulist['sex'] == 0): ?> checked="checked"<?php endif; ?> value="0" name="sex"><small>女</small>
                        </div>
                    </div>

                    <div class="am-form-group">
                        <label  class="am-u-sm-3 am-form-label">老师ID / TeacherId</label>
                        <div class="am-u-sm-9">
                            <!-- <input type="text" name="tid"><small>输入这孩子老师的ID</small> -->
                              <select name="tid" id="tid">
                             <option>请选择老师姓名</option>
                                           <?php if(is_array($tname) || $tname instanceof \think\Collection || $tname instanceof \think\Paginator): if( count($tname)==0 ) : echo "" ;else: foreach($tname as $key=>$tname): ?>
                                           <option value=<?php echo $tname['id']; if($ulist['tid'] == $tname['id']): ?> selected="selected" <?php endif; ?> ><?php echo $tname['truename']; ?></option>
                                           <?php endforeach; endif; else: echo "" ;endif; ?>
                             </select>
                            <small>输入这孩子老师的姓名</small>
                        </div>
                    </div>
                       <div class="am-form-group">
                        <label  class="am-u-sm-3 am-form-label">家长ID / familyId</label>
                        <div class="am-u-sm-9">
                            <!-- <input type="text" name="fid"><small>输入这孩子家长的ID</small> -->
                             <select name="fid" id="fid">
                             <option>请选择家长姓名</option>
                                           <?php if(is_array($fname) || $fname instanceof \think\Collection || $fname instanceof \think\Paginator): if( count($fname)==0 ) : echo "" ;else: foreach($fname as $key=>$fname): ?>
                                           <option value=<?php echo $fname['id']; if($ulist['fid'] == $fname['id']): ?> 
                                                    selected="selected" 
                                             <?php endif; ?>
                                         ><?php echo $fname['truename']; ?></option>
                                           <?php endforeach; endif; else: echo "" ;endif; ?>
                             </select>
                            <small>输入这孩子家长的姓名</small>
                        </div>
                    </div>
                    <div class="am-form-group">
                        <label  class="am-u-sm-3 am-form-label">班级 / Class</label>
                        <div class="am-u-sm-9">

                            <select name="class_id" id="fid">
                             <option>请选择所在班级</option>
                                           <?php if(is_array($class) || $class instanceof \think\Collection || $class instanceof \think\Paginator): if( count($class)==0 ) : echo "" ;else: foreach($class as $key=>$class): ?>
                                           <option value=<?php echo $class['id']; if($ulist['class_id'] == $class['id']): ?> selected=selected <?php endif; ?>><?php echo $class['class_name']; ?></option>
                                           <?php endforeach; endif; else: echo "" ;endif; ?>
                             </select>
                            <small>所属班级</small>
                        </div>
                    </div>
                    <div class="am-form-group">
                        <label for="user-phone" class="am-u-sm-3 am-form-label">出生年月 / Birthday</label>
                        <div class="am-u-sm-9">
                            <input type="date" name="birth" id="user-phone" value="<?php echo $ulist['birth']; ?>" placeholder="输入出生年月 / Telephone">
                        </div>
                    </div>

                    <div class="am-form-group">
                        <label  class="am-u-sm-3 am-form-label">入院时间</label>
                        <div class="am-u-sm-9">
                            <input type="date" name="intotime"  id="" value="<?php echo $ulist['intotime']; ?>" placeholder="输入入园时间">
                        </div>
                    </div>

                    <div class="am-form-group">
                        <label class="am-u-sm-3 am-form-label">地址 / Address</label>
                        <div class="am-u-sm-9">
                            <input type="text" name="address" value="<?php echo $ulist['address']; ?>" placeholder="输入你的地址 / Address">
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