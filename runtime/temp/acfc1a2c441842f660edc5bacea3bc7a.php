<?php if (!defined('THINK_PATH')) exit(); /*a:2:{s:78:"/data/home/bxu2713310775/htdocs/application/admin/view/index/quanxianlist.html";i:1501414055;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501414059;}*/ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="<?php echo url('Index/do_quanxian'); ?>" method="post">
<input value="<?php echo $groupid; ?>" name="groupid" type="hidden" >
    <?php if(is_array($rulelist) || $rulelist instanceof \think\Collection || $rulelist instanceof \think\Paginator): $i = 0; $__LIST__ = $rulelist;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?>
    <div>
        <input type="checkbox" name="rules[]" class="first_level first_level_<?php echo $vo['id']; ?> first_<?php echo $vo['id']; ?>" data-id="1" value="<?php echo $vo['id']; ?>" /><?php echo $vo['title']; ?>

        <div style="padding-left:40px;">
            <?php if(is_array($vo['second']) || $vo['second'] instanceof \think\Collection || $vo['second'] instanceof \think\Paginator): $i = 0; $__LIST__ = $vo['second'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$sec): $mod = ($i % 2 );++$i;?>
            <input type="checkbox" name="rules[]" data-id="<?php echo $sec['id']; ?>" data-pid="<?php echo $vo['id']; ?>" class="second_level second_level_<?php echo $vo['id']; ?> second_<?php echo $sec['id']; ?>" value="<?php echo $sec['id']; ?>" /><?php echo $sec['title']; ?>

            <div style="padding-left:40px;">
                <?php if(is_array($sec['third']) || $sec['third'] instanceof \think\Collection || $sec['third'] instanceof \think\Paginator): $i = 0; $__LIST__ = $sec['third'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$third): $mod = ($i % 2 );++$i;?>
                <input type="checkbox" data-ppid="<?php echo $vo['id']; ?>" data-pid="<?php echo $sec['id']; ?>" name="rules[]" class="third_level third_level_<?php echo $vo['id']; ?> second_level_<?php echo $sec['id']; ?>" value="<?php echo $third['id']; ?>" /><?php echo $third['title']; endforeach; endif; else: echo "" ;endif; ?>
            </div>

            <?php endforeach; endif; else: echo "" ;endif; ?>

        </div>
    </div>
    <?php endforeach; endif; else: echo "" ;endif; ?>

    <input type="submit" value="保存"  />
</form>


 <script src="__STATIC__assets/js/jquery.min.js"></script>
    <script src="__STATIC__assets/js/amazeui.min.js"></script>
    <script src="__STATIC__assets/js/app.js"></script>
<!--<script type="text/javascript" src="js/jquery.min.js"></script>-->
<script type="text/javascript">
    $('.first_level').click(function(){
        var id=$(this).attr('data-id');
        if($(this).is(':checked'))
        {
            $('.second_level_'+id).prop('checked',true);
            $('.third_level_'+id).prop('checked',true);
        }else{
            $('.second_level_'+id).prop('checked',false);
            $('.third_level_'+id).prop('checked',false);
        }
    });
    $('.second_level').click(function(){
        var id=$(this).attr('data-id');
        var pid=$(this).attr('data-pid');
        $('.first_level_'+pid).prop('checked',true);
        if($(this).is(':checked'))
        {
            $('.second_level_'+id).prop('checked',true);
        }else{
            $('.second_level_'+id).prop('checked',false);
        }
    });
    $('.third_level').click(function(){
        var pid=$(this).attr('data-pid');
        var ppid=$(this).attr('data-ppid');
        $('.second_'+pid).prop('checked',true);
        $('.first_'+ppid).prop('checked',true);
    });
</script>
</body>
</html>