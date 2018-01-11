<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:74:"/data/home/bxu2713310775/htdocs/application/admin/view/index/newslist.html";i:1501653829;}*/ ?>
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
    <link rel="icon" type="image/png" href="assets/i/favicon.png">
    <link rel="apple-touch-icon-precomposed" href="assets/i/app-icon72x72@2x.png">
    <meta name="apple-mobile-web-app-title" content="Amaze UI" />
    <link rel="stylesheet" href="__STATIC__/assets/css/amazeui.min.css" />
    <link rel="stylesheet" href="__STATIC__/assets/css/admin.css">
    <link rel="stylesheet" href="__STATIC__/assets/css/app.css">
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
                                <a href="<?php echo url('Index/add_news'); ?>" class="am-btn am-btn-default am-btn-success"><span class="am-icon-plus"></span> 新增</a>
                              
                                <button type="button" id="delete_rule_all" class="am-btn am-btn-default am-btn-danger"><span class="am-icon-trash-o"></span> 删除</button>
                            </div>
                        </div>
                    </div>
                    <!--<div class="am-u-sm-12 am-u-md-3">
                        <div class="am-form-group">
                            <select data-am-selected="{btnSize: 'sm'}">
                                <option value="option1">所有类别</option>
                                <option value="option2">IT业界</option>
                                <option value="option3">数码产品</option>
                                <option value="option3">笔记本电脑</option>
                                <option value="option3">平板电脑</option>
                                <option value="option3">只能手机</option>
                                <option value="option3">超极本</option>
                            </select>
                        </div>
                    </div>-->
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
                                    <th class="table-check"><input type="checkbox" id="check_rule_all" class="tpl-table-fz-check"></th>
                                    <th class="table-id">ID</th>
                                    <th class="table-title">标题</th>
                                    <th class="table-futitle">副标题</th>
                                    <th class="table-type">新闻分类ID</th>
                                    <!--<th class="table-title">发布内容</th>-->
                                    <th class="table-author am-hide-sm-only">教师ID</th>
                                    <th class="table-date am-hide-sm-only">发布时间</th>
                                    <th class="table-set">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php if(is_array($rulelist) || $rulelist instanceof \think\Collection || $rulelist instanceof \think\Paginator): $i = 0; $__LIST__ = $rulelist;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?>
                                <tr>
                                    <td><input type="checkbox" class="ids" value="<?php echo $vo['id']; ?>"></td>
                                    <td><?php echo $vo['id']; ?></td>
                                    <td><a href="#"><?php echo $vo['title']; ?></a></td>
                                    <td><a href="#"><?php echo $vo['futitle']; ?></a></td>
                                    <td><?php echo $vo['cid']; ?></td>
                                    <!--<td><?php echo $vo['content']; ?></td>-->
                                    <td class="am-hide-sm-only"><?php echo $vo['tid']; ?></td>
                                    <td class="am-hide-sm-only"><?php echo date("Y-m-d",$vo['pubdate']); ?></td>
                                    <td>
                                        <div class="am-btn-toolbar">
                                            <div class="am-btn-group am-btn-group-xs">
                                                <a href="<?php echo url('Index/up_news',['id'=>$vo['id']]); ?>" class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span> 编辑</a>
                                                <a href="<?php echo url('Index/del_news',['id'=>$vo['id']]); ?>" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"><span class="am-icon-trash-o"></span> 删除</a>
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















<script src="__STATIC__/assets/js/jquery.min.js"></script>
<script src="__STATIC__/js/amazeui.min.js"></script>
<script src="__STATIC__/js/app.js"></script>
   <script type="text/javascript">
       $('#check_rule_all').click(function(){
           if($(this).is(':checked'))
           {
               $('.ids').prop('checked',true);
           }
           else{
               $('.ids').prop('checked',false);
           }
       });
       $('#delete_rule_all').click(function(){
           var idds='';
           $('.ids').each(function(){
               if($(this).is(':checked'))
               {
                   idds+=$(this).val()+',';
               }
           });

           idds=idds.substr(0,idds.length-1);
           window.location.href="/admin.php/admin/Index/del_news/id/"+idds;
       });


   </script>
</body>

</html>