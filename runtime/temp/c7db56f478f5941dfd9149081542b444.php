<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:74:"/data/home/bxu2713310775/htdocs/application/admin/view/index/userlist.html";i:1501650832;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/head.html";i:1501579231;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501558013;}*/ ?>
<!doctype html>
<html>

<head>
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
</head>

<body data-type="generalComponents">

        <div class="tpl-portlet-components">
            <div class="portlet-title">
                <div class="caption font-green bold">
                    <span class="am-icon-code"></span> 列表
                </div>
                <div class="tpl-portlet-input tpl-fz-ml">
                    <div class="portlet-input input-small input-inline">
                        <div class="input-icon right">
                            <i class="am-icon-search"></i>
                            <input type="text" class="form-control form-control-solid" placeholder="搜索..."> </div>
                    </div>
                </div>


            </div>
            <div class="tpl-block">
                <div class="am-g">
                    <div class="am-u-sm-12 am-u-md-6">
                        <div class="am-btn-toolbar">
                            <div class="am-btn-group am-btn-group-xs">
                                <a href="<?php echo url('Index/addattence'); ?>" class="am-btn am-btn-default am-btn-success"><span class="am-icon-plus"></span> 新增</a>
                                <button type="button" id="delete_del_all" class="am-btn am-btn-default am-btn-danger"><span class="am-icon-trash-o"></span> 删除</button>
                            </div>
                        </div>
                    </div>
                
                    <div class="am-u-sm-12 am-u-md-3">
                        <div class="am-input-group am-input-group-sm">
                            <input type="text" class="am-form-field">
                            <span class="am-input-group-btn">
            <button class="am-btn  am-btn-default am-btn-success tpl-am-btn-success am-icon-search" type="button"></button>
          </span>
                        </div>
                    </div>
                </div>
                <div class="am-g">
                    <div class="am-u-sm-12">
                        <form class="am-form">
                            <table class="am-table am-table-striped am-table-hover table-main">
                                <thead>
                                <tr>
                                    <th class="table-check"><input id="do_del_all" type="checkbox" class="tpl-table-fz-check"></th>
                                    <th class="table-id">ID</th>
                                    <th class="table-title">教师id</th>
                                    <th class="table-type">学生id</th>
                                    <th class="table-author am-hide-sm-only">时间</th>
                                    <th class="table-date am-hide-sm-only">未出勤的原因</th>
                                    <th class="table-set">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php if(is_array($rulelist) || $rulelist instanceof \think\Collection || $rulelist instanceof \think\Paginator): if( count($rulelist)==0 ) : echo "" ;else: foreach($rulelist as $key=>$vo): ?>
                                <tr>
                                    <td><input class="ids" value="<?php echo $vo['aid']; ?>" type="checkbox"></td>
                                    <td><?php echo $vo['aid']; ?></td>
                                    <td><a href="#"><?php echo $vo['truename']; ?></a></td>
                                    <td><?php echo $vo['sname']; ?></td>
                                    <td><?php echo date("Y-m-d H-i-s",$vo['pubdate']); ?></td>
                                     <td class="am-hide-sm-only"><?php echo $vo['intro']; ?></td>
                                    <td>
                                        <div class="am-btn-toolbar">
                                            <div class="am-btn-group am-btn-group-xs">
                                                <a href="<?php echo url('Index/upattence',['id'=>$vo['aid']]); ?>" class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span> 编辑</a>
                                                <a href="<?php echo url('Index/delattence',['id'=>$vo['aid']]); ?>" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"><span class="am-icon-trash-o"></span> 删除</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <?php endforeach; endif; else: echo "" ;endif; ?>

                                </tbody>
                            </table>
                            <div class="am-cf">

                                <div class="am-fr">
                                    <?php echo $page; ?>
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
    $('#do_del_all').click(function(){
       if($(this).is(':checked'))
       {
           $('.ids').prop('checked',true);
       }else{
           $('.ids').prop('checked',false);
       }
    });
    $('#delete_del_all').click(function(){
        var idds='';
        $('.ids').each(function(){
            if($(this).is(':checked'))
            {
                idds=idds+$(this).val()+',';
            }
        });
        idds=idds.substr(0,idds.length-1);
        window.location.href="/index.php/child/Index/delattence/id/"+idds;
    });
</script>
</body>

</html>