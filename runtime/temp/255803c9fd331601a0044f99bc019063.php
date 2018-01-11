<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:81:"/data/home/bxu2713310775/htdocs/application/admin/view/index/theme_replylist.html";i:1499931757;}*/ ?>
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

<body>



<div class="tpl-portlet-components">
    <div class="portlet-title">
        <div style="width: 80px;font-size: 24px;color: #00e359;margin: 0 auto">
            <?php echo $title['title']; ?>
        </div>
        <div></div>


    </div>
    <div class="tpl-block">
        <div class="am-g">
            <div class="am-u-sm-12 am-u-md-6">
                <div class="am-btn-toolbar">
                    <div class="am-btn-group am-btn-group-xs">
                        <a href="<?php echo url('Index/addtheme_reply',['id'=>$title['id']]); ?>" type="button" class="am-btn am-btn-default am-btn-success"><span class="am-icon-plus"></span> 新增</a>
                        <button type="button" id="delete_rulelist_all" class="am-btn am-btn-default am-btn-danger"><span class="am-icon-trash-o"></span> 删除</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="am-g">
            <div class="am-u-sm-12">
                <form class="am-form">
                    <table class="am-table am-table-striped am-table-hover table-main">
                        <thead>
                        <tr>
                            <th class="table-check"><input type="checkbox" id="check_rulelist_all" class="tpl-table-fz-check"></th>
                            <th class="table-id">ID</th>
                            <th class="table-title">回复人</th>
                            <th class="table-type">内容</th>
                            <th class="table-title">回复时间</th>
                            <th class="table-set">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php if(is_array($info) || $info instanceof \think\Collection || $info instanceof \think\Paginator): if( count($info)==0 ) : echo "" ;else: foreach($info as $key=>$val): ?>
                        <tr>
                            <td><input value="<?php echo $val['id']; ?>" class="ids" type="checkbox"></td>
                            <td><?php echo $val['id']; ?></td>
                            <td><?php echo $val['truename']; ?></td>
                            <td class="am-hide-sm-only"><?php echo $val['content']; ?></td>
                            <td><?php echo date("m-d H:i:s",$val['pubdate']); ?></td>
                            <td>
                                <div class="am-btn-toolbar">
                                    <div class="am-btn-group am-btn-group-xs">
                                        <a href="<?php echo url('Index/uptheme_reply',['id'=>$val['id']]); ?>" class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span> 编辑</a>
                                        <a href="<?php echo url('Index/deltheme_reply',['id'=>$val['id']]); ?>" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"><span class="am-icon-trash-o"></span> 删除</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <?php endforeach; endif; else: echo "" ;endif; ?>


                        </tbody>
                    </table>
                    <div class="am-cf">

                        <div class="am-fr">
                            <ul class="am-pagination tpl-pagination">
                                <?php echo $page; ?>
                            </ul>
                        </div>
                    </div>
                    <hr>

                </form>
            </div>

        </div>
    </div>
    <div class="tpl-alert"></div>
</div>




<script src="__STATIC__assets/js/jquery.min.js"></script>
<script src="__STATIC__assets/js/amazeui.min.js"></script>
<script src="__STATIC__assets/js/app.js"></script>
<script type="text/javascript">
    $('#check_rulelist_all').click(function(){
        if($(this).is(':checked')){
            $('.ids').prop('checked',true);
        }else{
            $('.ids').prop('checked',false);
        }
    });
    $('#delete_rulelist_all').click(function(){
        var idds='';
        $('.ids').each(function(){
            if($(this).is(':checked')){
                idds+=$(this).val()+',';
            }
        });
        idds=idds.substr(0,idds.length-1);
        //alert(idds);
        window.location.href="/index.php/admin/Index/deltheme_reply/id/"+idds;
    });
</script>

</body>

</html>