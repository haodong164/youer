<?php

namespace app\admin\controller;

use app\admin\controller\Common;

use  think\Controller;

class Index extends Common
{

	public function index()//首页；
	{
		$table = db('teacher');
		$truename = $table->where('id=' . session('id'))->find();
		if ($truename == false) {
			$table = db('family');
			$truename = $table->where('id=' . session('id'))->find();
		}
		$tid=session('id');
		$this->assign('tid',$tid);
		$this->assign('truename', $truename);
		$time=time();
		$lastLoginTime=$_COOKIE['lastLoginTime'];
		$this->assign('lastLoginTime',$lastLoginTime);
		//print_r($_COOKIE);exit;
		//获得当日零点时间戳
		$todaytime=strtotime('today');


		//echo $time;exit;
		//互动圈总数
		$table=db('comment');
		$zong=$table->count();
		$this->assign('zong',$zong);
		$info=$table->field('pudate')->select();


		$i=0;
		for($i;$i<$zong;$i++){
			$info[$i]=$info[$i]['pudate'];
			//echo $info[$i]; 
			if($info[$i]<$todaytime){
				unset($info[$i]);
			}
		}
		//jrgx==今日更新个数
		$jrgx=count($info);
		$this->assign('jrgx',$jrgx);
		$info=$table->where('pudate','<=',$time)->select();
		//互动圈结束



		//echo $time;exit;
		//成长乐园总数
		$table=db('funland');
		$zong=$table->count();
		$this->assign('funlandz',$zong);
		$info=$table->field('pubdate')->select();


		$i=0;
		for($i;$i<$zong;$i++){
			$info[$i]=$info[$i]['pubdate'];
			//echo $info[$i]; 
			if($info[$i]<$todaytime){
				unset($info[$i]);
			}
		}
		//jrgx==今日更新个数
		$jrgx=count($info);
		$this->assign('funlandg',$jrgx);
		$info=$table->where('pubdate','<=',$time)->select();
		//成长乐园结束
		

		//成长记录开始
		$table=db('record');
		$zong=$table->count();
		$this->assign('recordz',$zong);
		$info=$table->field('pubdate')->select();


		$i=0;
		for($i;$i<$zong;$i++){
			$info[$i]=$info[$i]['pubdate'];
			//echo $info[$i]; 
			if($info[$i]<$todaytime){
				unset($info[$i]);
			}
		}
		//jrgx==今日更新个数
		$jrgx=count($info);
		$this->assign('recordg',$jrgx);
		$info=$table->where('pubdate','<=',$time)->select();
		//成长记录结束

		//班级通知开始
		$table=db('news');
		$zong=$table->count();
		$this->assign('newsz',$zong);
		$info=$table->field('pubdate')->select();


		$i=0;
		for($i;$i<$zong;$i++){
			$info[$i]=$info[$i]['pubdate'];
			//echo $info[$i]; 
			if($info[$i]<$todaytime){
				unset($info[$i]);
			}
		}
		//jrgx==今日更新个数
		$jrgx=count($info);
		$this->assign('newsg',$jrgx);
		$info=$table->where('pubdate','<=',$time)->select();
		//班级通知结束


		//校园动态开始
		$table=db('notice');
		$zong=$table->count();
		$this->assign('noticez',$zong);
		$info=$table->field('pubdate')->select();


		$i=0;
		for($i;$i<$zong;$i++){
			$info[$i]=$info[$i]['pubdate'];
			//echo $info[$i]; 
			if($info[$i]<$todaytime){
				unset($info[$i]);
			}
		}
		//jrgx==今日更新个数
		$jrgx=count($info);
		$this->assign('noticeg',$jrgx);
		$info=$table->where('pubdate','<=',$time)->select();
		//校园动态结束
		//显示登录状态；
		return $this->fetch();
	}

	public function photo_grouplist()//图片分组列表页
	{

		$table = db('photo_group');
		$list = $table->field('photo_group.id as aid,teacher.id as tid,photo_group.*,teacher.*')->order("photo_group.id desc")->join('teacher','photo_group.tid = teacher.id')->paginate(config('paginate.list_rows'));
		//echo $table->getlastSql();exit;
		/*echo "<pre>";
		print_r($list);exit;*/
		$this->assign('list', $list);
		$this->assign('page', $list->render());
		return $this->fetch();
	}

	public function addphoto_group()//添加图片分组页
	{
		$db = db('teacher');
		$list = $db->select();
		$this->assign('list', $list);
		return $this->fetch();
	}

	public function do_add_photo_group()//执行添加图片分组页
	{
		$data = input('post.');
		$table = db('photo_group');
		$data['pubdate'] = time();
		$info = $table->insert($data);
		if ($info) {
			$this->success('Insert Success', 'Index/photo_grouplist');
		} else {
			$this->error('Insert Error','Index/photo_grouplist');
		}

	}

	public function del_photo_group()//删除图片分组
	{
		$id = input('id');
		$table = db('photo_group');
		$info = $table->where('id=' . $id)->delete();
		if ($info) {
			$this->success('删除成功','photo_grouplist');
		} else {
			$this->error('删除失败','photo_grouplist');
		}
	}

	public function up_photo_group()//图片分组更新页
	{
		$db = db('teacher');
		$list = $db->select();
		$this->assign('list', $list);
		$id = input('id');
		$table = db('photo_group');
		$info = $table->where('id=' . $id)->find();
	
		$this->assign('info', $info);
		
		
		return $this->fetch();

	}

	public function do_up_photo_group()//执行图片分组更新
	{
		$data = input('post.');
		$table = db('photo_group');
		$data['pubdate'] = time();
		//echo "<pre>";
		//print_r($data);exit;
		$info = $table->update($data);
		if ($info) {
			$this->success('Insert Success','photo_grouplist');
		} else {
			$this->error('Insert Error','photo_grouplist');
		}
	}

	//教师列表
	public function teacherlist()
	{
		$sql = db('teacher');
		$list = $sql->order("id desc")->paginate(config('paginate.list_rows'));
		$this->assign('list', $list);
		$this->assign('page', $list->render());
		return $this->fetch();
	}

	//教师表添加
	public function addteacher()
	{
		
		$db=db('teacher');
		$list=$db->select();
		$this->assign('jiaoshi',$list);
		$this->assign('dept',config('dept'));
		return $this->fetch();
	}

	//教师表处理添加
	public function do_addteacher()
	{
		$info = input('post.');
		//echo "<pre>";
		//print_r($info);
		//exit;
		$file = request()->file('photo');
		$fileinfo = $file->move(config('upload_path'));
		$info['photo'] = $fileinfo->getSavename();
		$info['password'] = md5(input('post.password'));
		
		$sql = db('teacher');
		$info = $sql->insert($info);
		if ($info) {
			$this->success('添加成功', 'Index/teacherlist');
		} else {
			$this->error('未知原因添加失败');
		}
	}

	//教师表修改
	public function upteacher()
	{
		$id = input('id');
		//  echo $id;
		// exit;
		$sql = db('teacher');
		$info = $sql->where('id=' . $id)->find();
		$this->assign('info', $info);

 
		$this->assign('dept',config('dept'));
		 


		return $this->fetch();
	}

	//教师表处理修改
	public function do_upteacher()
	{
		$info = input('post.');
		$info['password']=md5($info['password']);
		$id = input('post.id');
		$sql = db('teacher');
		$info = $sql->where('id=' . $id)->update($info);
		if ($info) {
			$this->success('更改成功', 'Index/teacherlist');
		} else {
			$this->error('未进行操作更改失败', 'Index/teacherlist');
		}

	}

	//教师表删除
	public function delteacher()
	{
		$id = input('id');
		$info = db('teacher')->where('id in(' . $id . ')')->delete();
		if ($info) {
			$this->success('删除成功', 'Index/teacherlist');
		} else {
			$this->error('删除失败', 'Index/teacherlist');
		}

	}


 public function recordlist()//记录
    {
        $sql = db('record');
        $list = $sql->order("id desc")->paginate(config('paginate.list_rows'));
        $this->assign('list', $list);
		$this->assign('page', $list->render());
        return $this->fetch();
    }

   
    public function addrecord()
    {
        $db=db('record');
        $list=$db->select();
        $this->assign('list',$list);

        $id=session('id');
        $this->assign('tid',$id);
        $table = db('teacher');
		$truename = $table->where('id=' . session('id'))->find();
		$this->assign('truename',$truename['truename']);
        return $this->fetch();
    }

  
    public function do_addrecord()
    {
        $data = input('post.');

        $name=input('name');
        $table = db('teacher');
		$truenameid = $table->field('id')->where("truename='".$name."'")->find();
 	    unset($data['name']);
 	    $data['tid']=$truenameid['id'];

		$data['name'] = session('truename');
		$data['fid'] = session('id');
        $table = db('record');
        $file = request()->file('photos');
        $data['pubdate']=time();
        if ($file) {
            $fileinfo = $file->move(config('upload_path'));

			// move(PUBLIC_PATH . 'Uploads');
            $data['photos'] = $fileinfo->getSavename();
        }
        $info = $table->insert($data);
        if ($info) {
            $this->success('succ', 'Index/recordlist');
        } else {
            $this->error('error');
        }

    }

    public function uprecord()
    {
        $id = input('id');
        //echo $id;
        // exit;
        $sql = db('record');
        $info = $sql->where('id=' . $id)->find();
        $this->assign('info', $info);
        return $this->fetch();
    }

   
    public function do_uprecord()
    {
    	 $info = input('post.');

    	$name=input('name');
        $table = db('teacher');
		$truenameid = $table->field('id')->where("truename='".$name."'")->find();
 	    unset($info['name']);
 	    $data['tid']=$truenameid['id'];

       
        $id = input('post.id');
        $sql = db('record');
        $info = $sql->where('id=' . $id)->update($info);
        if ($info) {
            $this->success('更改成功', 'Index/recordlist');
        } else {
            $this->error('未进行操作更改失败', 'Index/recordlist');
        }

    }

  
    public function delrecord()
    {
        $id = input('id');
        $info = db('record')->where('id in(' . $id . ')')->delete();
        if ($info) {
            $this->success('删除成功', 'Index/recordlist');
        } else {
            $this->error('删除失败', 'Index/recordlist');
        }
        $id = input('id');
    }

	//记录列表
	// public function recordlist()
	// {

	// 	$sql = db('record');
	// 	$list = $sql->paginate(config('paginate.list_rows'));
	// 	$this->assign('list', $list);
	// 	$this->assign('page',$list);
	// 	return $this->fetch();
	// }

	// //记录表添加
	// public function addrecord()
	// {
	// 	$table = db('teacher');
	// 	$truename = $table->where('id=' . session('id'))->find();
	// 	if ($truename == false) {
	// 		$table = db('family');
	// 		$truename = $table->where('id=' . session('id'))->find();
	// 	}
	// 	$this->assign('truename', $truename);
	// 	return $this->fetch();
	// }

	// //记录表处理添加
	// public function do_addrecord()
	// {
		
		

	// 	$info = input('post.');
	// 	$sql = db('record');
	// 	$info['pubdate'] = time();
	// 	// print_r ($info);
	// 	// exit;
	// 	$info = $sql->insert($info);
	// 	if ($info) {
	// 		$this->success('添加成功', 'Index/recordlist');
	// 	} else {
	// 		$this->error('未知原因添加失败');
	// 	}
	// }

	// //记录表修改
	// public function uprecord()
	// {
	// 	$id = input('id');
	// 	//echo $id;
	// 	// exit;
	// 	$sql = db('record');
	// 	$info = $sql->where('id=' . $id)->find();
	// 	$this->assign('info', $info);
	// 	return $this->fetch();
	// }

	// //记录表处理修改
	// public function do_uprecord()
	// {
	// 	$info = input('post.');
	// 	$id = input('post.id');
	// 	$sql = db('record');
	// 	$info = $sql->where('id=' . $id)->update($info);
	// 	if ($info) {
	// 		$this->success('更改成功', 'Index/recordlist');
	// 	} else {
	// 		$this->error('未进行操作更改失败', 'Index/recordlist');
	// 	}

	// }

	// //记录表删除
	// public function delrecord()
	// {
	// 	$id = input('id');
	// 	$info = db('record')->where('id in(' . $id . ')')->delete();
	// 	if ($info) {
	// 		$this->success('删除成功', 'Index/recordlist');
	// 	} else {
	// 		$this->error('删除失败', 'Index/recordlist');
	// 	}

	// }

	//�ҳ���
	public function familylist()
	{
		$db = db('family');
		$list = $db->order("id desc")->paginate(config('paginate.list_rows'));
		$this->assign('page', $list->render());
		$this->assign('list', $list);
		return $this->fetch();

	}

	//
	public function addfamily()
	{	
		return $this->fetch();
	}

	public function do_addfamily()
	{
		$mobile = input('telphone');
		if(!preg_match('/^1([0-9]{9})/',$mobile)) 
		$this->error('您的手机号码不正确', 'Index/familylist');
		
		$data = input('post.');
		$db = db('family');
		$file = request()->file('photo');
		$fileinfo = $file->move(config('upload_path'));
		$data['photo'] = $fileinfo->getSavename();
		$info = $db->insert($data);
		if ($info) {
			$this->success('增加成功', 'Index/familylist');
		} else {
			$this->error('增加失败', 'Index/familylist');
		}
	}

	public function upfamily()
	{
		$id = input('id');
		$db = db('family');
		$list = $db->where('id=' . $id)->find();
		//print_r($list);exit;
		$this->assign('list', $list);
		return $this->fetch();
	}

	public function do_upfamily()
	{
		$mobile = input('telphone');
		if(!preg_match('/^1([0-9]{9})/',$mobile)) 
		$this->error('您的手机号码不正确', 'Index/familylist');
		
		$db = db('family');
		$data = input('post.');
		$file = request()->file('photo');
		if ($file) {
			$fileinfo = $file->move(config('upload_path'));
			$data['photo'] = $fileinfo->getSavename();
		}

		$info = $db->update($data);
		if ($info) {
			$this->success('修改成功', 'Index/familylist');
		} else {
			$this->error('修改失败', Index / familylist);
		}
	}

	public function delfamily()
	{
		$id = input('id');
		$db = db('family');
		$info = $db->delete($id);
		if ($info) {
			$this->success('删除成功', 'Index/familylist');
		} else {
			$this->error('删除失败', 'Index/familylist');
		}
	}




	public function addstudent()
	{
		$db = db('student');
        $list = $db->paginate(config('paginate.list_rows'));
		$this->assign('list', $list);
		$this->assign('page', $list->render());

		$tdb=db('teacher');
		$info=$tdb->select();
		$this->assign('tname',$info);

		$fdb=db('family');
		$info1=$fdb->select();
		$this->assign('fname',$info1);

		$cdb=db('class');
		$info2=$cdb->select();
		$this->assign('class',$info2);
		return $this->fetch();
	}

	public function do_addstudent()
	{
		$data = input('post.');
		/*echo "<pre>";
        print_r($data);
        exit;*/
		$fail=request()->file('studentphoto');

       // $failinfo=$fail->move(config('upload_path'));
//        echo "<pre>";
//        print_r($failinfo);
//        exit;
        $failinfo=$fail->move(config('upload_path'));
        $data['studentphoto']=$failinfo->getSavename();
		//$data['inputtime']=time();
		$db = db('student');
		$list = $db->insert($data);
		if ($list) {
			$this->success('succ', 'Index/studentlist');
		} else {
			$this->error('fail', 'Index/studentlist');
		}
	}

	//学生表
	public function studentlist()
	{
		$db = db('student');
		$list = $db->order("id desc")->paginate(config('paginate.list_rows'));
		$this->assign('list', $list);
		$this->assign('page', $list->render());


		return $this->fetch();
	}

	//幼儿表更新 
	public function upstudent()
	{
		$id = input('id');
//        echo "$id";
//        exit;
		$db = db('student');
		$list = $db->where('id=' . $id)->find();
		$this->assign('ulist', $list);


		$tdb=db('teacher');
		$info=$tdb->select();
		$this->assign('tname',$info);

		$fdb=db('family');
		$info1=$fdb->select();
		$this->assign('fname',$info1);

		$cdb=db('class');
		$info2=$cdb->select();
		$this->assign('class',$info2);

		return $this->fetch();
	}

	public function do_upstudent()
	{
		$id = input('id');
		$data = input('post.');
		//print_r($data);exit;
		$file = request()->file('studentphoto');
		if ($file) {
			$fileinfo = $file->move(config('upload_path'));
			$data['studentphoto'] = $fileinfo->getSavename();
		}
		//$data['inputtime']=time();
		// echo "<pre>";print_r($data);exit;
		$db = db('student');
		$list = $db->where('id=' . $id)->update($data);
		if ($list) {
			$this->success('succ', 'Index/studentlist');
		} else {
			$this->error('fail', 'Index/studentlist');
		}
	}

	//ѧ����ɾ��
	public function delstudent()
	{
		$id = input('id');
		$db = db('student');
		$list = $db->where('id in (' . $id . ')')->delete();
		if ($list) {
			$this->success('succ', 'Index/studentlist');
		} else {
			$this->error('fail', 'Index/studentlist');
		}
	}


	public function ablumnlist()//����
	{
		$db = db('ablumn');
		$table = $db->order("id desc")->paginate(config('paginate.list_rows'));//����configҳ���ÿҳ���ٸ�ֵ

		$this->assign('page', $table);//��ҳ
		$this->assign('list', $table);//������ӱ��foreachѭ��


		return $this->fetch();
	}

	public function addablumn()
	{
		return $this->fetch();
	}

	public function do_addablumn()
	{
		$data = input('post.');//������post�ύ������
		$file = request()->file('photo');//����ͼƬ
		$fileinfo = $file->move(config('upload_path'));
		$data['photo'] = $fileinfo->getSavename();
		$data['pubdate'] = time();
		$table = db('ablumn');
		$info = $table->insert($data);
		if ($info) {
			$this->success('succ', 'Index/ablumnlist');
		} else {
			$this->error('增加失败');
		}
	}

	public function delablumn()
	{//ɾ���ķ���
		$id = input('id');
		$table = db('ablumn');
		$info = $table->where('id="' . $id . '"')->delete();
		if ($info) {
			$this->success("成功删除", 'Index/ablumnlist');
		} else {
			$this->error("删除失败", 'Index/ablumnlist');
		}
	}

	public function upablumn()
	{

		$id = input('id');
		$table = db('ablumn');
		$info = $table->where('id="' . $id . '"')->find();
		$this->assign('info', $info);
		return $this->fetch();
	}

	public function do_upablumn()
	{
		$data = input('post.');
		$table = db('ablumn');
		$file = request()->file('photo');
		if ($file) {
			$fileinfo = $file->move(config('upload_path'));
			$data['photo'] = $fileinfo->getSavename();
		}
		$id = input('id');
		//echo $id;
		$info = $table->update($data);
		if ($info !== false) {
			$this->success('增加成功', 'Index/ablumnlist');
		} else {
			$this->error('增加失败');
		}
	}

	public function userlist()
	{
		$stu = db('attence');
		$rulelist = $stu->field('attence.id as aid,teacher.id as tid,student.id as sid,attence.*,teacher.*,student.*')->order("attence.id desc")->join('teacher','attence.tid = teacher.id')->join('student','attence.sid = student.id')->paginate(config('paginate.list_rows'));

		$this->assign('rulelist', $rulelist);
		$this->assign('page', $rulelist->render());
		return $this->fetch();
	}

	public function addattence()
	{
		$db = db('student');
        $list = $db->select();
		$this->assign('list', $list);

		$tdb=db('teacher');
		$info=$tdb->select();
		$this->assign('tname',$info);

		return $this->fetch();
	}

	public function do_addattence()
	{
		$data = input('post.');
		$stu = db('attence');
		$data['pubdate'] = time();
		$info = $stu->insert($data);
		$tdb=db('teacher');
		if ($info) {
			$this->success('插入成功', 'Index/userlist');
		} else {
			$this->success('插入失败');
		}
	}

	public function delattence()
	{
		$id = input('id');
		$stu = db('attence');
		$delinfo = $stu->where('id in(' . $id . ')')->delete();
		if ($delinfo) {
			$this->success('删除成功', 'Index/userlist');
		} else {
			$this->success('删除失败');
		}
	}

	public function upattence()
	{
		$id = input('id');
		$stu = db('attence');
		$upinfo = $stu->where('id=' . $id)->find();
		$this->assign('upinfo', $upinfo);

		$db = db('student');
		$list = $db->select();
		$this->assign('ulist', $list);

		$tdb=db('teacher');
		$info=$tdb->select();
		$this->assign('tname',$info);

		return $this->fetch();
	}

	public function do_upattence()
	{
		$data = input('post.');

		$stu = db('attence');
		$uplist = $stu->update($data);
		if ($uplist) {
			$this->success('修改成功', 'Index/userlist');
		} else {
			$this->success('修改失败');
		}
	}

	public function add_news() //添加新闻
	{
		$db = db('new_cate');
		$rulelist = $db->where('pid=0')->select();
		$this->assign('rulelist', $rulelist);
		$db = db('teacher');
		$rulelists = $db->select();
		$this->assign('rulelists', $rulelists);
		return $this->fetch();
	}

	public function do_add_news() //执行添加
	{
		$db = db('news');
		$data = input('post.');
		//echo "<pre>";
		//print_r($data);exit;
		$data['pubdate'] = time();
		//$data['cid'] = $data['pid'];
		// print_r ($data);exit;
		//unset($data['pid']);
		$info = $db->insert($data);

		if ($info) {
			$this->success('添加成功', 'Index/newslist');
		} else {
			$this->error('未知错误,添加失败', 'Index/newslist');
		}

	}

	public function newslist() //新闻列表
	{
		$db = db('news');
		$rulelist = $db->order("id desc")->paginate(config('paginate.list_rows'));
		$this->assign('rulelist', $rulelist);
		$this->assign('page', $rulelist->render());
		return $this->fetch();
	}

	public function del_news() //删除
	{
		$id = input('id');
		$stu = db('news');
		$info = $stu->where('id in (' . $id . ')')->delete();
		if ($info) {
			$this->success('删除成功', 'Index/newslist');
		} else {
			$this->error('未知错误,删除失败', 'Index/newslist');
		}
	}

	public function up_news() //修改新闻列表
	{
		$id = input('id');
		$table = db('news');
		$userinfo = $table->where('id=' . $id)->find();
		$this->assign('userinfo', $userinfo);
		$db1 = db('new_cate');
		$rulelist = $db1->select();
		$this->assign('rulelist', $rulelist);
		$db2 = db('teacher');
		$list = $db2->select();
		$this->assign('list', $list);
		return $this->fetch();
	}

	public function do_up_news() //执行修改
	{
		$data = input();
		/*$data['id']=$data['userid'];
        unset($data['userid']);*/
		$stu = db('news');
		$info = $stu->update($data);
		if ($info) {
			$this->success('更新成功', 'Index/newslist');
		} elseif ($info === false) {
			$this->success('更新失败', 'Index/newslist');
		} else {
			$this->success('未进行任何操作', 'Index/newslist');
		}
	}

	public function checkzhname()
	{
		$name = input('post.names');
		$db = db('news');
		$info = $db->where("title='" . $name . "'")->find();
		if ($info) {
			$adata = [
				'status' => 1,
				'msg' => '此标题名称已存在'
			];
		} else {
			$adata = [
				'status' => 0,
				'msg' => '此标题名称可用'
			];
		}
		return json($adata);
	}

	public function add_new_cate() //添加新闻分类
	{
		$db = db('new_cate');
		$rulelist = $db->where('pid=0')->select();
		foreach ($rulelist as &$v) {
			$v['second'] = $db->where('pid=' . $v['id'])->select();
		}
		$this->assign('rulelist', $rulelist);
		return $this->fetch();
	}

	public function do_add_new_cate() //执行添加新闻分类
	{
		$db = db('new_cate');
		$data = input('post.');
		$info = $db->insert($data);
		if ($info) {
			$this->success('添加成功', 'Index/new_catelist');
		} else {
			$this->error('未知错误,添加失败', 'Index/new_catelist');
		}
	}

	public function new_catelist() //新闻分类列表
	{
		$db = db('new_cate');
		$rulelist = $db->order("id desc")->paginate(config('paginate.list_rows'));
		$this->assign('rulelist', $rulelist);
		$this->assign('page', $rulelist->render());
		return $this->fetch();
	}

	public function del_newcate()//删除新闻分类
	{
		$id = input('id');
		$stu = db('new_cate');
		$info = $stu->where('id in (' . $id . ')')->delete();
		if ($info) {
			$this->success('删除成功', 'Index/new_catelist');
		} else {
			$this->error('未知错误,删除失败', 'Index/new_catelist');
		}
	}

	public function up_newcate() //修改新闻分类
	{
		$id = input('id');
		$table = db('new_cate');
		$userinfo = $table->where('id=' . $id)->find();
		$this->assign('userinfo', $userinfo);
		$rulelist = $table->where('pid=0')->select();
		foreach ($rulelist as &$vo) {
			$vo['second'] = $table->where('pid=' . $vo['id'])->select();
		}
		$this->assign('rulelist', $rulelist);
		return $this->fetch();
	}

	public function do_up_newcate() //执行修改新闻分类
	{
		$data = input();
		$stu = db('new_cate');
		$info = $stu->update($data);
		if ($info) {
			$this->success('更新成功', 'Index/new_catelist');
		} elseif ($info === false) {
			$this->success('更新失败', 'Index/new_catelist');
		} else {
			$this->success('未进行任何操作', 'Index/userlist');
		}
	}

	// 日程表 

	public function calendar_list()
	{
		$db1 = db('calendar');

		$list = $db1->order("day asc")->paginate(config('paginate.list_rows1'));
		$this->assign('userlist', $list);
		$this->assign('page', $list->render());
		$info = $list->toArray()['data'];
		$db2 = db('teacher');
		for ($i = 0; $i < count($info); $i++) {
			$info[$i]['id'] = $db2->field('id')->where('id=' . $info[$i]['id'])->find()['id'];
		}
		return $this->fetch();
	}


	public function add_calendar()
	{
		$this->assign('xingqi',config('xingqi'));
		$this->assign('jieke',config('jieke'));

		return $this->fetch();
	}


	public function do_add_calendar()
	{
		$t1=input('day');
		$t2=input('title');


		$data = input('post.');
		$table = db('calendar');

		$t3=$table->where('day',"$t1")->where('title',"$t2")->find();
		// print_r($t3);exit;
		if($t3){
			$info = $table->where("id=".$t3['id'])->update($data);
			if ($info !== false) {
			$this->success('修改成功', 'Index/calendar_list');
		} else {
			$this->error('修改失败', 'Index/up_calendar');
		}

		}else{
			$info = $table->insert($data);
			if ($info) {
				$this->success('添加成功', 'Index/calendar_list');
			} else {
				$this->error('未知错误', 'Index/add_calendar');
			}
		}
		


	}


	public function delete_calendar()
	{
		$id = input('id');
		$table = db('calendar');

		$info = $table->where('id="' . $id . '"')->delete();
		if ($info) {
			$this->success('删除成功', 'Index/calendar_list');
		} else {
			$this->error('未知错误，删除失败', 'Index/calendar_list');
		}

	}

	public function up_calendar()
	{
		$this->assign('xingqi',config('xingqi'));
		$this->assign('jieke',config('jieke'));


		$id = input('id');

		$table = db('calendar');
		$info = $table->where('id="' . $id . '"')->find();
		$this->assign('info', $info);


		return $this->fetch();
	}


	public function do_up_calendar()
	{
		$data = input('post.');
		$table = db('calendar');
		$info = $table->update($data);

		if ($info !== false) {
			$this->success('修改成功', 'Index/calendar_list');
		} else {
			$this->error('修改失败', 'Index/up_calendar');
		}


	}

	//话题添加
	public function addtheme()
	{
		return $this->fetch();
	}

	//处理话题添加
	public function do_addtheme()
	{
		$data = input();
		//$data['fid'] = 1;
		$data['fid'] = session('id');
		$data['pubdate'] = time();
		$data['status'] = 0;
		$db = db('theme');
		$list = $db->insert($data);
		if ($list) {
			$this->redirect('Index/themelist');
		} else {
			$this->error('fail', 'Index/addtheme');
		}
		return $this->fetch();
	}

	//话题列表
	public function themelist()
	{
		$table1 = db('comment');
		$list1 = $table1->order("id desc")->paginate(config('paginate,list_rows'));
		$this->assign('page', $list1->render());
		$info = $list1->toArray()['data'];
		/*echo "<pre>";
		print_r($info);
		
		exit;*/
		$table2 = db('family');

		for ($i = 0; $i < count($info); $i++) {
			if(!empty($info[$i]['fid'])){
				$info[$i]['truename'] = $table2->field('truename')->where('id=' . $info[$i]['fid'])->find()['truename'];
			}else{
				$info[$i]['truename'] = $table2->field('truename')->where('id=' . $info[$i]['tid'])->find()['truename'];
			}
			
		}
		/*echo "<pre>";
		print_r($info);
		exit;*/
		$this->assign('list', $info);
		return $this->fetch();
	}

	//话题修改
	public function uptheme()
	{
		$id = input('id');
		$db = db('theme');
		$list = $db->where('id=' . $id)->find();
		$this->assign('list', $list);
		return $this->fetch();
	}

	//处理话题修改
	public function do_uptheme()
	{
		$data = input('post.');
		$data['pubdate'] = time();
		$db = db('theme');
		$list = $db->where('id=' . $data['id'])->update($data);
		if ($list) {
			$this->success('删除成功','Index/themelist');
		} else {
			$this->error('删除失败','fail');
		}
	}

	//删除话题
	public function deltheme()
	{
		$id = input('id');
	/*	$db = db('theme');
		$db2 = db('theme_reply');
		$list = $db->where('id in(' . $id . ')')->delete();
		$list2 = $db2->where('eid in(' . $id . ')')->delete();
		if ($list && $list2) {
			$this->redirect('Index/themelist');
		} else {
			$this->error('fail');
		}*/
		$db = db('comment');
		$list = $db->where('id in(' . $id . ')')->delete();
		if ($list) {
			$this->redirect('Index/themelist');
		} else {
			$this->error('fail');
		}
	}

	//添加话题回复
	public function addtheme_reply()
	{
		$id = input('id');
		$this->assign('id', $id);
		$db = db('theme');
		$list = $db->select();
		$this->assign('list', $list);
		return $this->fetch();
	}

	//处理添加话题回复
	public function do_addtheme_reply()
	{
		$data = input('post.');
		$id = $data['id'];
		unset($data['id']);
		$data['pubdate'] = time();
		if ($data['inden'] == 0) {
			$data['tid'] = session('id');
			//$data['tid'] = 2;
			$data['fid'] = 0;
		} else {
			$data['tid'] = 0;
			$data['fid'] = session('id');
			//$data['fid'] = 3;
		}
		unset($data['inden']);
		$db = db('theme_reply');
		$list = $db->insert($data);
		if ($list) {
			$this->redirect(url('Index/theme_replylist', ['id' => $id]));
		} else {
			$this->error('fail');
		}
	}

	//话题回复列表
	public function theme_replylist()
	{
		$id = input('id');
		//echo "$id";exit;
		$db1 = db('theme_reply');
		$db2 = db('teacher');
		$db3 = db('family');
		$db4 = db('theme');
		$list = $db4->where('id=' . $id)->find();
		//echo "<pre>";print_r($list);exit;
		$this->assign('title', $list);
		$list1 = $db1->where('eid=' . $id)->order("id desc")->paginate(config('paginate,list_rows'));
		/*echo "<pre>";print_r($list1);exit;*/
		$this->assign('page', $list1->render());
		$info = $list1->toArray()['data'];
		for ($i = 0; $i < count($info); $i++) {
			if ($info[$i]['fid'] == 0) {
				$info[$i]['truename'] = $db2->field('truename')->where('id=' . $info[$i]['tid'])->find()['truename'];
			}
			if ($info[$i]['tid'] == 0) {
				$info[$i]['truename'] = $db3->field('truename')->where('id=' . $info[$i]['fid'])->find()['truename'];
			}
			$info[$i]['titleid'] = $db4->field('fid')->where('id=' . $info[$i]['eid'])->find()['fid'];
			$info[$i]['title'] = $db4->field('title')->where('id=' . $info[$i]['eid'])->find()['title'];
			$info[$i]['name'] = $db3->field('truename')->where('id=' . $info[$i]['titleid'])->find()['truename'];
		}
		//name:发起人;truename:回复人;title:话题
		//echo "<pre>";print_r($info);exit;
		$this->assign('info', $info);
		return $this->fetch();
	}

	//编辑话题回复列表
	public function uptheme_reply()
	{
		$id = input('id');
		$db = db('theme_reply');
		$list = $db->where('id=' . $id)->find();
		//echo "<pre>";print_r($list);exit;
		$this->assign('list', $list);
		return $this->fetch();
	}

	//处理编辑话题回复列表
	public function do_uptheme_reply()
	{
		$data = input('post.');
		//echo "<pre>";print_r($data);
		$id = $data['eid'];
		unset($data['eid']);
		$data['pubdate'] = time();
		if ($data['inden'] == 0) {
			$data['tid'] = session('id');
			//$data['tid'] = 3;
			$data['fid'] = 0;
		} else {
			$data['tid'] = 0;
			$data['fid'] = session('id');
			//$data['fid'] = 3;
		}
		unset($data['inden']);
		$db = db('theme_reply');
		$list = $db->update($data);
		//echo $id;exit;
		if ($list) {
			$this->redirect('Index/themelist');
		} else {
			$this->error('fail');
		}
	}

	//删除话题回复
	public function deltheme_reply()
	{
		$id = input('id');
		$db = db('theme_reply');
		$list = $db->where('id in(' . $id . ')')->delete();
		if ($list) {
			$this->redirect('Index/themelist');
		} else {
			$this->error('fail', 'Index/themelist');
		}
	}


	//添加规则
	public function add_rules()
	{
		$db = db('think_auth_rule');
		$rulelist = $db->where('parentid=0')->select();
		foreach ($rulelist as &$v) {
			$v{'second'} = $db->where('parentid=' . $v['id'])->select();
		}
		$this->assign('rulelist', $rulelist);
		return $this->fetch();
	}

	//处理添加规则
	public function do_addrule()
	{
		$data = input('post.');
		if ($data['name'] == '' or $data['title'] == '') {
			$this->error('中文或英文名称不能为空', 'Index/addrules');
			exit;
		}
		//echo "<pre>";print_r($data);exit;
		$db = db('think_auth_rule');
		$list = $db->insert($data);
		if ($list) {
			$this->redirect('Index/rulelist');
		} else {
			$this->error('fail', 'Index/rulelist');
		}
	}

	//规则列表
	public function rulelist()
	{
		$db = db('think_auth_rule');
		$list = $db->order("id desc")->paginate(config('paginate.list_rows'));
		// echo "<pre>";print_r($list);exit;
		$this->assign('val', $list);
		$this->assign('page', $list->render());
		return $this->fetch();
	}

	//删除规则列表
	public function delrulelist()
	{
		$id = input('id');
		$db = db('think_auth_rule');
		$list = $db->where('id in (' . $id . ')')->delete();
		if ($list) {
			$this->redirect('Index/rulelist');
		} else {
			$this->error('fail');
		}
	}

	//修改规则列表
	public function uprulelist()
	{
		$id = input('id');
		$db = db('think_auth_rule');
		$rulelist = $db->where('parentid=0')->select();
		foreach ($rulelist as &$v) {
			$v{'second'} = $db->where('parentid=' . $v['id'])->select();
		}
		$this->assign('rulelist', $rulelist);

		$list = $db->where('id=' . $id)->find();
		$this->assign('val', $list);
		return $this->fetch();
	}

	//处理修改规则列表
	public function do_uprulelist()
	{
		$data = input('post.');
		$db = db('think_auth_rule');
		$list = $db->update($data);
		if ($list) {
			$this->redirect('Index/rulelist');
		} elseif ($list === false) {
			$this->error('fail');
		} else {
			$this->success('未改变', 'Index/rulelist');
		}
	}

	//权限 检查英文名称js
	public function checkenname()
	{
		$name = input('post.names');
		$db = db('think_auth_rule');
		$info = $db->where("name='" . $name . "'")->find();
		if ($info) {
			$adata = [
				'status' => 1,
				'msg' => '英文不可用',
			];
		} else {
			$adata = [
				'status' => 0,
				'msg' => '英文可用',
			];
		}
		return json($adata);
	}

	//权限 判断中文
	public function checktitle()
	{
		$name = input('post.names');
		$db = db('think_auth_rule');
		$info = $db->where("title='" . $name . "'")->find();
		if ($info) {
			$adata = [
				'status' => 1,
				'msg' => '中文不可用',
			];
		} else {
			$adata = [
				'status' => 0,
				'msg' => '中文可用',
			];
		}
		return json($adata);
	}

	//用户组页面
	public function group_grouplist()
	{
		$db = db('think_auth_group');
		$rulelist = $db->order("id desc")->paginate(config('paginate.list_rows'));
		$this->assign('rulelist', $rulelist);
		$this->assign('page', $rulelist->render());
		return $this->fetch();

	}

	//组的添加html
	public function add_groupuser()
	{

		return $this->fetch();
	}

	//执行添加
	public function add_think_auth_group()
	{
		$db = db('think_auth_group');
		$data = input('post.');
		//print_r($data);exit;
		$info = $db->insert($data);
		if ($info) {
			$this->success('添加成功', 'Index/group_grouplist');

		} else {
			$this->error('添加失败');

		}
	}

	//映射租的信息
	public function up_groupinfo()
	{
		$id = input('id');
		$db = db('think_auth_group');
		$info = $db->where('id=' . $id)->find();
		$this->assign('info', $info);
		return $this->fetch();
	}

	//修改组的信息
	public function up_think_auth_group()
	{
		$date = input('post.');
		$db = db('think_auth_group');
		$info = $db->update($date);
		if ($info) {
			$this->success('修改成功', 'Index/group_grouplist');
		} else {
			$this->error('修改失败');
		}
	}

	//删除
	public function del_think_auth_group()
	{
		$id = input('id');
		//echo $id
		$db = db('think_auth_group');
		$info = $db->where('id in(' . $id . ')')->delete();
		if ($info) {
			$this->success('删除成功', 'Index/group_grouplist');
		} else {
			$this->success('删除失败');
		}

	}

	//权限js  将权限显示
	public function quanxianlist()
	{
		$groupid = input('id');
		$db = db('think_auth_rule');
		$rulelist = $db->where('parentid=0')->select();
		foreach ($rulelist as &$v) {
			$v['second'] = $db->where('parentid=' . $v['id'])->select();
		}
		foreach ($v['second'] as &$t) {
			$t['third'] = $db->where('parentid=' . $t['id'])->select();
		}
		//   echo "<pre>";
		// print_r($rulelist);
		//exit;
		$this->assign('groupid', $groupid);

		$this->assign('rulelist', $rulelist);
		return $this->fetch();
	}

	//提交权限
	public function do_quanxian()
	{
		$date = input('post.');
		//echo'<pre>';
		//print_r($date);exit;
		$db = db('think_auth_group');
		$rules = implode(',', $date['rules']);
		$atate = [
			'rules' => $rules
		];
		$info = $db->where('id=' . $date['groupid'])->update($atate);
		if ($info !== false) {
			$this->success('成功保存', 'Index/group_grouplist');
		}
	}
	/*public function rulelist()
	{
		$db = db('think_auth_rule');
		$rulelist = $db->paginate(config('paginate.list_rows'));
		$this->assign('rulelist', $rulelist);
		$this->assign('page', $rulelist->render());
		return $this->fetch();

		return $this->fetch();
	}*/
	//作业列表
public function classes()
    {
        // $list=db('homework')
        //     ->join('teacher','homework.tid=teacher.id')
        //     ->field('homework.*,teacher.truename')
        //     ->select();
		
//        echo '<pre>';
//        print_r($list);exit;
		// $list1 = $table1->paginate(config('paginate.list_rows'));
		// $this->assign('page', $list1->render());
		// $db=db('homework');
        // $list = $db->paginate(config('paginate.list_rows'));
		// $this->assign('list', $list);
		// $this->assign('page', $list->render());
		$db1 = db ('homework');
		$db2 = db ('teacher');
		$list1 = $db1->order("id desc")->paginate(config('paginate,list_rows'));
		$this->assign('page', $list1->render());
		$list = $list1->toArray()['data'];
		for ($i = 0; $i < count($list); $i++) {
			$list[$i]['truename']=$db2->field('truename')->where('id='.$list[$i]['tid'])->find()['truename'];
		
		}
		
		$this->assign('list', $list);
        return $this->fetch();
    }
    public function addclasses()
    {

    	$tdb=db('teacher');
		$info=$tdb->select();
		$this->assign('tname',$info);
	
        return $this->fetch();
    }
    public function do_addclasses()
    {
        $data=input('post.');
        $stu=db('homework');
        $data['pubdate']=time();
        $info=$stu->insert($data);
        if($info)
        {
            $this->success('插入成功','Index/classes');
        }else{
            $this->error('插入失败');
        }
    }
    public function delclasses()
    {
        $id=input('id');
        $stu=db('homework');
        $info=$stu->where('id="'.$id.'"')->delete();
        if($info)
        {
            $this->success('删除成功','Index/classes');
        }else{
            $this->error('删除失败');
        }
    }
    public function upclasses()
    {
        $id=input('id');
        $stu=db('homework');
        $info=$stu->where('id="'.$id.'"')->find();
        $this->assign('info',$info);

        $tdb=db('teacher');
		$info=$tdb->select();
		$this->assign('tname',$info);
        return $this->fetch();
    }
    public function do_upclasses()
    {
        $data=input('post.');
        $stu=db('homework');
        $info=$stu->update($data);
        if($info)
        {
            $this->success('修改成功','Index/classes');
        }else{
            $this->error('修改失败');
        }
    }

	//班级表
	public function do_class()
	{
		$data = input('post.');
		$db = db('class');
		$info = $db->insert($data);
		if ($info) {
			$this->success('添加成功', 'Index/do_teacher');
		} else {
			$this->error('未知错误，添加失败', 'Index/do_teacher');
		}

	}

//点评表===========列表
	public function comment()
	{

//连接学生表；
		$db = db('student');
		$list = $db->select();
		$this->assign('student', $list);
//连接教师表；
		$db = db('teacher');
		$list = $db->select();
		$this->assign('list', $list);
		return $this->fetch();
	}

//评论记录到数据库中；
	public function do_comment()
	{
		$data = input('post.');
		// print_r($data);exit;
		$data['pubdate'] = time();
		$db = db('theme');
		$info = $db->insert($data);
		if ($info) {
			$this->success('添加成功', 'Index/xiugai');
		} else {
			$this->error('未知错误，添加失败', 'Index/comment');
		}

	}

//家长查询评论总列表；===============列表
	public function jiazhangchaxun()
	{


		$table1 = db('comment');
		$list1 = $table1->order("id desc")->paginate(config('paginate.list_rows'));
		$this->assign('page', $list1->render());
		$info = $list1->toArray()['data'];
		//连接学生表
		$table2 = db('student');
		for ($i = 0; $i < count($info); $i++) {
			$info[$i]['sname'] = $table2->field('sname')->where('id=' . $info[$i]['sid'])->find()['sname'];
		}
		//连接教师表
		$table3 = db('teacher');
		for ($i = 0; $i < count($info); $i++) {
			$info[$i]['truename'] = $table3->field('truename')->where('id=' . $info[$i]['tid'])->find()['truename'];
		}
		$this->assign('list', $info);
		return $this->fetch();

	}

//家长查询详情；
	public function chaxun()
	{
		$id = input('id');
		$table = db('comment');

		$list = $table->where('id="' . $id . '"')->find();
		$this->assign('list', $list);


		$sid = $list['sid'];
		$table1 = db('student');
		$info1 = $table1->where('id="' . $sid . '"')->find();
		$this->assign('info1', $info1);

		$tid = $list['tid'];
		$table2 = db('teacher');
		$info2 = $table2->where('id="' . $tid . '"')->find();
		$this->assign('info2', $info2);
		return $this->fetch();

	}

//教师修改/删除
	public function xiugai()
	{
		$table1 = db('theme');
		/*$list1 = $table1->order("id desc")->paginate(config('paginate.list_rows'));
		$this->assign('page', $list1->render());
		$info = $list1->toArray()['data'];
		print_r($info[2]['sid']);exit;
		//连接学生表
		$table2 = db('student');
		for ($i = 0; $i < count($info); $i++) {
			$info[$i]['sname'] = $table2->field('sname')->where('id=' . $info[$i]['sid'])->find()['sname'];
		}

		//连接教师表
		$table3 = db('teacher');
		for ($i = 0; $i < count($info); $i++) {
			$info[$i]['truename'] = $table3->field('truename')->where('id=' . $info[$i]['tid'])->find()['truename'];
		}
		$this->assign('list', $info);*/

		$list=$table1->order('id desc')->paginate(config('paginate.list_rows'));

		$info= $list->toArray()['data'];
				//
	/*	echo "<pre>";
		print_r($info);exit;*/
		//echo count($info);exit;
		//print_r($info[0]['sid']);exit;
		for ($i = 0; $i < count($info); $i++) {

			$info[$i]['pubdate']=date('Y-m-d H:i:s',$info[$i]['pubdate']);
			//echo $info[$i]['pubdate'];
		//	print_r(date('Y-m-d H:i:s',$info[$i]['pubdate']));
		}

		//连接学生表
		$table2 = db('student');
		for ($i = 0; $i < count($info); $i++) {
			$info[$i]['sname'] = $table2->field('sname')->where('id=' . $info[$i]['sid'])->find()['sname'];
		}

		//连接教师表
		$table3 = db('teacher');
		for ($i = 0; $i < count($info); $i++) {
			$info[$i]['truename'] = $table3->field('truename')->where('id=' . $info[$i]['tid'])->find()['truename'];
		}

		$this->assign('list', $info);
		return $this->fetch();
	}


	//教师编辑=======================列表
	// public function upbianji()
	// {
// 		$id = input('id');
// 		$table = db('comment');

// 		$list = $table->where('id="' . $id . '"')->find();
// 		$this->assign('list', $list);


// 		$sid = $list['sid'];
// 		$table1 = db('student');
// 		$info1 = $table1->where('id="' . $sid . '"')->find();
// 		$this->assign('info1', $info1);

// 		$tid = $list['tid'];
// 		$table2 = db('teacher');
// 		$info2 = $table2->where('id="' . $tid . '"')->find();
// 		$this->assign('info2', $info2);

// $id = input('id');
// 		$table = db('comment');

// 		$list = $table->where('id="' . $id . '"')->find();
// 		$this->assign('list', $list);


// 		$sid = $list['sid'];
// 		$table1 = db('student');
// 		$info1 = $table1->where('id="' . $sid . '"')->find();
// 		$this->assign('info1', $info1);

// 		$tid = $list['tid'];
// 		$table2 = db('teacher');
// 		$info2 = $table2->where('id="' . $tid . '"')->find();
// 		$this->assign('info2', $info2);
// 		return $this->fetch();


		// print_r($list);
		// exit;
	// 	return $this->fetch();
	// }


//教师修改评论；
	public function upbianji()
	{
		
		$id = input('id');
		$table = db('theme');
		$table1 = db('student');
		$table2 = db('teacher');
		$list = $table->where('id="' . $id . '"')->find();
		// echo "<pre>";
		// print_r($list);exit;	
		$list['sname'] = $table1->field('sname')->where('id=' . $list['sid'])->find()['sname'];
		$list['truename'] = $table2->field('truename')->where('id=' . $list['tid'])->find()['truename'];		
		// echo "$id";exit;
		$list['pubdate']=date('Y-m-d H:i:s', $list['pubdate']);		
		$this->assign('list', $list);
		// $list = $table->where('id="' . $id . '"')->update($list);
		// if ($list) {
		// 	$this->success('编辑成功', 'Index/xiugai');
		// } else {
		// 	$this->error('未知错误，编辑失败');
		// }
		return $this->fetch();
	}
		public function do_up_bianji() //执行修改
	{
		$data = input();
		/*$data['id']=$data['userid'];
        unset($data['userid']);*/
		$stu = db('theme');
		$info['pubdate']=time();
				//print_r($info);exit;

		$info = $stu->update($data);

		if ($info) {
			$this->success('更新成功', 'Index/xiugai');
		} elseif ($info === false) {
			$this->success('更新失败', 'Index/xiugai');
		} else {
			$this->success('未进行任何操作', 'Index/xiugai');
		}
	}

//教师删除评论
	public function deshanchu()
	{

		$id = input('id');
		$db = db('theme');
		$list = $db->where('id="' . $id . '"')->delete();
		if ($list) {
			$this->success('删除成功');
		} else {
			$this->error('删除失败');
		}
	}


	public function do_teacher()
	{
		$db=db('teacher');
		$list=$db->select();
		$this->assign('jiaoshi',$list);
		return $this->fetch();
	}

	// //班级通知，通知公告表
	// 	$table1 = db('comment');
	// 	$list1 = $table1->paginate(config('paginate.list_rows'));
	// 	$this->assign('page', $list1->render());
	// 	$info = $list1->toArray()['data'];
	public function noticelist()
	{
		$db = db('notice');
		$rulelist = $db->order("id desc")->paginate(config('paginate.list_rows'));
		$this->assign('rulelist', $rulelist);
		$this->assign('page', $rulelist->render());
		return $this->fetch();		
	}
		public function del_notice() //删除
	{
		$id = input('id');
		$stu = db('notice');
		$info = $stu->where('id in (' . $id . ')')->delete();
		if ($info) {
			$this->success('删除成功', 'Index/noticelist');
		} else {
			$this->error('未知错误,删除失败', 'Index/noticelist');
		}
	}

		public function add_notice() //添加通告
	{
		$db = db('notice');
		$rulelist = $db->where('id=1')->select();
		$this->assign('rulelist', $rulelist);

		$db = db('teacher');
		$rulelists = $db->select();
		$this->assign('rulelists', $rulelists);

		return $this->fetch();
	}

	public function do_add_notice() //执行公告添加
	{
		$db = db('notice');
		$data = input('post.');
		/*echo "<pre>";
		print_r($data);exit;*/
		$data['pubdate'] = time();
		/*$data['cid'] = $data['pid'];
		// print_r ($data);exit;
		unset($data['pid']);*/
		$info = $db->insert($data);

		if ($info) {
			$this->success('添加成功', 'Index/noticelist');
		} else {
			$this->error('未知错误,添加失败', 'Index/noticelist');
		}

	}
		public function up_notice() //修改通知列表
	{
		$id = input('id');
		$table = db('notice');
		$userinfo = $table->where('id=' . $id)->find();
		$this->assign('userinfo', $userinfo);
		$db1 = db('new_cate');
		$rulelist = $db1->select();
		$this->assign('rulelist', $rulelist);
		$db2 = db('teacher');
		$list = $db2->select();
		$this->assign('list', $list);
		return $this->fetch();
	}

	public function do_up_notice() //执行修改
	{
		$data = input();
		/*$data['id']=$data['userid'];
        unset($data['userid']);*/
		$stu = db('notice');
		$info = $stu->update($data);
		if ($info) {
			$this->success('更新成功', 'Index/noticelist');
		} elseif ($info === false) {
			$this->success('更新失败', 'Index/noticelist');
		} else {
			$this->success('未进行任何操作', 'Index/noticelist');
		}
	}
	//2017年7月31日11:18:31
	//即时通讯
	public function telephonelist()
	{
		$sql = db('telephone');
		$list = $sql->order('id desc')->paginate(config('paginate.list_rows'));
		$this->assign('list', $list);
		$this->assign('page', $list->render());
		return $this->fetch();
	}
	//通讯表的添加
	public function add_telephone()
	{

		return $this->fetch();
	}

	//通讯添加处理
	 public function telephone()
	{	$mobile = input('telephone');
		if(!preg_match('/^1([0-9]{10})/',$mobile)) 
		$this->error('您的手机号码不正确', 'Index/telephonelist');

		$db = db('telephone');
		$data = input('post.');

		$info = $db->insert($data);
		if ($info) {
			$this->success('添加成功', 'Index/telephonelist');

		} else {
			$this->error('添加失败');

		}

	}
	//通讯表修改
	public function up_telephone()

	{
		$id = input('id');
		$sql = db('telephone');
		$info = $sql->where('id=' . $id)->find();
		$this->assign('info', $info);
		return $this->fetch();
	}

	//通讯表处理
	public function do_telephone()

	{
		$mobile = input('telephone');
		if(!preg_match('/^1([0-9]{10})/',$mobile)) 
		$this->error('您的手机号码不正确', 'Index/telephonelist');

		$date = input('post.');
		$db = db('telephone');
		$info = $db->update($date);
		if ($info) {
			$this->success('修改成功', 'Index/telephonelist');
		} else {
			$this->error('修改失败');
		}
	}

   //删除通讯录
	public function del_telephone()
	{
		$id = input('id');

		$db = db('telephone');

		$list = $db->where('id="' . $id . '"')->delete();
		if ($list) {

			$this->success('删除成功');
		} else {

			$this->error('删除失败');
		}
	}
 //乐园列表
	public function leyuanlist()
	{

		$db=db('funland');
		$list = $db->order('id desc')->paginate(config('paginate.list_rows'));
		$this->assign('list', $list);
		$this->assign('page', $list->render());

    	 return $this->fetch();

	}
	//乐园添加页
	public function add_leyuan()
	{

		return $this->fetch();


	}

	//乐园添加处理
	public function do_addleyuan()
	{

		$data = input('post.');
		$file = request()->file('photo');
		$fileinfo = $file->move(config('upload_path'));
		$data['photo'] = $fileinfo->getSavename();
		$data['pubdate'] = time();
		$table = db('funland');
		$info = $table->insert($data);
		if ($info) {
			$this->success('succ', 'Index/leyuanlist');
		} else {
			$this->error('error'.'Index/add_leyuan');
		}


	}

    //乐园修改页

	public function up_leyuan()
	{

		$id=input('id');
		$table=db('funland');
		$info=$table->where('id='.$id)->find();
		$this->assign('info',$info);
		return $this->fetch();
	}


	public function do_leyuan()

	{

        $data = input('post.');
        $table = db('funland');
        $file = request()->file('photo');
        if ($file) {
            $fileinfo = $file->move(config('upload_path'));
            $data['photo'] = $fileinfo->getSavename();
        }
        $id = input('id');
        //echo $id;
        $info = $table->update($data);
        if ($info!== false) {
            $this->success('修改成功','Index/leyuanlist');
        } else {
            $this->error('失败','Index/leyuanlist');
        }


	}



   //乐园删除

	public function del_leyuan()

	{

		$id = input('id');
		$table = db('funland');
		$info = $table->where('id="' . $id . '"')->delete();
		if ($info){
			$this->success("成功", 'Index/leyuanlist');
		}else{
			$this->error("失败", 'Index/leyuanlist');
		}
	}


	public function content()
		{
		$id=input('id');

	    $table = db('theme');

		$info=$table->select();

		//echo"<pre>";

		//print_r($info);

		//exit;

		$this->assign('list','$list');

	    return $this->fetch();
	
	}

	
	//退出
	public function tuichu(){
		session_destroy();
		$this->redirect('Login/login');
	}

	//首页各种信息
	
}

?>