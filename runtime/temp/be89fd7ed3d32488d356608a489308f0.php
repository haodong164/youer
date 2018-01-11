<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:77:"/data/home/bxu2713310775/htdocs/application/admin/view/index/up_calendar.html";i:1501764752;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/head.html";i:1501579231;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501558013;}*/ ?>
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
                        <form class="am-form am-form-horizontal" action="<?php echo url('Index/do_up_calendar'); ?>" method="post">
                          <!--   <div class="am-form-group">
                              <label for="user-name" class="am-u-sm-3 am-form-label">班级 / class</label>
                              <div class="am-u-sm-9">
                                  <input type="hidden" name="id" value="<?php echo $info['id']; ?>" >
                                  <input type="text" id="user-name" name="tid"  placeholder="请输入班级/class" value="<?php echo $info['tid']; ?>"/>
                                  <small>请输入班级</small>
                              </div>
                          </div>
                          
                          <div class="am-form-group">
                              <label for="user-email" class="am-u-sm-3 am-form-label">教室/ classrom</label>
                              <div class="am-u-sm-9">
                          
                                  <input type="text" id="user-email" name="class_id" value="<?php echo $info['class_id']; ?>"  placeholder="请输入教室/classroom">
                                  <small>教室你懂得...</small>
                              </div>
                          </div> -->
                             <div class="am-form-group">
                                <label for="user-phone" class="am-u-sm-3 am-form-label">星期几</label>
                                <div class="am-u-sm-9">
                                  <input type="hidden" name="id" value="<?php echo $info['id']; ?>" >
                                    <!-- <input type="text" id="user-phone" name="title" placeholder="请输入标题 / title"> -->
                                     <select name="day" id="tid">
                                            <option>请选择星期几</option>
                                           <?php if(is_array($xingqi) || $xingqi instanceof \think\Collection || $xingqi instanceof \think\Paginator): if( count($xingqi)==0 ) : echo "" ;else: foreach($xingqi as $key=>$xingqi): ?>
                                           <option value="<?php echo $xingqi; ?>"<?php if($info['day'] == $xingqi): ?> selected="selected"<?php endif; ?>>星期<?php echo $xingqi; ?></option>
                                           <?php endforeach; endif; else: echo "" ;endif; ?>
                                     </select>
                                </div>
                            </div>
                           <div class="am-form-group">
                                <label for="user-phone" class="am-u-sm-3 am-form-label">课程</label>
                                <div class="am-u-sm-9">
                                    <!-- <input type="text" id="user-phone" name="title" placeholder="请输入标题 / title"> -->
                                     <select name="title" id="tid">
                                            <option>请选择第几节课</option>
                                           <?php if(is_array($jieke) || $jieke instanceof \think\Collection || $jieke instanceof \think\Paginator): if( count($jieke)==0 ) : echo "" ;else: foreach($jieke as $key=>$jieke): ?>
                                           <option value="<?php echo $jieke; ?>"  <?php if($info['title'] == $jieke): ?> selected="selected" <?php endif; ?> 
                                           ><?php echo $jieke; ?></option>
                                           <?php endforeach; endif; else: echo "" ;endif; ?>
                                     </select>
                                </div>
                            </div>



                            <div class="am-form-group">
                                <label for="user-email" class="am-u-sm-3 am-form-label">开始时间 <span class="tpl-form-line-small-title">Time</span></label>
                                <div class="am-u-sm-9">
                                    <input type="text" class="am-form-field tpl-form-no-bg" placeholder="开始时间" name="starttime" value="<?php echo $info['starttime']; ?>"   readonly/>
                                    <small>开始时间必填</small>
                                </div>
                            </div>

                            <div class="am-form-group">
                                <label for="user-email" class="am-u-sm-3 am-form-label">结束时间 <span class="tpl-form-line-small-title">Time</span></label>
                                <div class="am-u-sm-9">
                                    <input type="text" class="am-form-field tpl-form-no-bg" placeholder="结束时间" name="endtime" value="<?php echo $info['endtime']; ?>"readonly/>
                                    <small>预计结束时间</small>
                                </div>
                            </div>


                            <div class="am-form-group">
                                <label for="user-intro" class="am-u-sm-3 am-form-label">内容 / Intro</label>
                                <div class="am-u-sm-9">
                                    <textarea class="" rows="5" name="content"   id="user-intro" placeholder="内容"><?php echo $info['content']; ?></textarea>
                                    <small>250字以内写出你的一生...</small>
                                </div>





                                <div class="am-form-group">
                                    <div class="am-u-sm-9 am-u-sm-push-3">
                                        <button type="sumbit" class="am-btn am-btn-primary">保存修改</button>
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
</body>

</html>