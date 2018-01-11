<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:75:"/data/home/bxu2713310775/htdocs/application/admin/view/index/add_rules.html";i:1499931754;s:73:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/headcc.html";i:1496586692;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1496302482;}*/ ?>
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Amaze UI Admin index Examples</title>
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

<body data-type="generalComponents">

    <div class="tpl-content-wrapper1">
        <div class="tpl-content-page-title">
         
        </div>
        
        <div class="tpl-portlet-components">
            <div class="portlet-title">
                
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
                        <form action="<?php echo url('Index/do_addrule'); ?>" method="post" class="am-form am-form-horizontal">
                            <div class="am-form-group">
                                <label for="rule_en_name" class="am-u-sm-3 am-form-label">规则英文名称 / Name</label>
                                <div class="am-u-sm-9">
                                    <input type="text" name="name" id="rule_en_name" placeholder="规则英文名称 / Name">
                                    <small id="showjs"> </small>
                                </div>
                            </div>

                            <div class="am-form-group">
                                <label for="rule_zh_name" class="am-u-sm-3 am-form-label">规则中文名称 / ZhName</label>
                                <div class="am-u-sm-9">
                                    <input type="text" name="title"  id="rule_zh_name"  placeholder="规则中文名称 / Name">
                                    <small id="showzhjs"></small>
                                </div>
                            </div>



                            <div class="am-form-group">
                                <label  class="am-u-sm-3 am-form-label">级别</label>
                                <div class="am-u-sm-9">
                                    <input type="radio" name="status" checked="checked" value='1'><small>启用</small>
                                    <input type="radio" name="status" value='0'><small>禁用</small>
                                </div>
                            </div>

                            <div class="am-form-group">
                                <label  class="am-u-sm-3 am-form-label"></label>
                                <div class="am-u-sm-9">
                                    <input type="radio" name="level" checked="checked" value='1'><small>模块</small>
                                    <input type="radio" name="level" value='2'><small>控制器</small>
                                    <input type="radio" name="level" value='3'><small>操作方法</small>
                                </div>
                            </div>

                            <div class="am-form-group">
                                <label  class="am-u-sm-3 am-form-label">上一别</label>
                                <div class="am-u-sm-9">
                                    <select name="parentid">
                                        <option value='0'>默认</option>
                                        <?php if(is_array($rulelist) || $rulelist instanceof \think\Collection || $rulelist instanceof \think\Paginator): $i = 0; $__LIST__ = $rulelist;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?>
                                            <option value="<?php echo $vo['id']; ?>"><?php echo $vo['title']; ?></option>
                                                <?php if(is_array($vo['second']) || $vo['second'] instanceof \think\Collection || $vo['second'] instanceof \think\Paginator): $i = 0; $__LIST__ = $vo['second'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$sec): $mod = ($i % 2 );++$i;?>
                                                    <option value="<?php echo $sec['id']; ?>">----<?php echo $sec['title']; ?></option>
                                                <?php endforeach; endif; else: echo "" ;endif; endforeach; endif; else: echo "" ;endif; ?>
                                    </select>

                                </div>
                            </div>




                            <div class="am-form-group">
                                <div class="am-u-sm-9 am-u-sm-push-3">
                                    <button type="submit" class="am-btn am-btn-primary">添加</button>
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
$('#rule_en_name').blur(function(){
    var Enname=$(this).val();//获得当前框中的值
   // alert(Enname);
    if(Enname=='')
    {
        $('#showjs').html('名称不可为空');
        $('#showjs').css('color','red');
        return false;

    }

    $.ajax({
        url:"<?php echo url('Index/checkennmane'); ?>",
        type:"post",
        data:{names:Enname},
        success:function (data) {
           // alert(data.zhuangtai);
            $('#showjs').html(data.msg);
            if(data.zhuangtai)
            {
                $('#showjs').css('color','red');
            }
            else
            {
                $('#showjs').css('color','green');
            }
        }
        });


});


$('#rule_zh_name').blur(function(){
    var zhname=$(this).val();//获得当前框中的值
    // alert(Enname);
    if(zhname=='')
    {
        $('#showzhjs').html('名称不可为空');
        $('#showzhjs').css('color','red');
        return false;

    }

    $.ajax({
        url:"<?php echo url('Index/checkzhnmane'); ?>",
        type:"post",
        data:{names:zhname},
        success:function (data) {
            // alert(data.zhuangtai);
            $('#showjszh').html(data.msg);
            if(data.zhuangtai)
            {
                $('#showzhjs').css('color','red');
            }
            else
            {
                $('#showzhjs').css('color','green');
            }
        }
    });


});
</script>


</body>

</html>