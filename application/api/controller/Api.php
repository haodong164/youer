<?php
namespace app\api\controller;
use think\Controller;
class Api extends Controller{
	public function index(){
		return "您成功了";
	}
	public function do_login(){
		// return json('not find');
		{//家长登录
		// $telphone=input('post.telphone');
		// $password=input('post.password');
		// $db=db('family');
		// if($telphone==''){
			// return json('kong');
		// }if($password==''){
			// return json('password kong');
		// }
		// $list=$db->where("telphone='".$telphone."'")->find();
		// if($list){
			// if($list['password']==$password){
				// $list['photo']="http://www.ryaonet.cn/public/Uploads/".$list['photo'];
				// $data=[
					// 'msg'=>'succ',
					// 'info'=>$list
				// ];
				// return json($data);
			// }else{
				// $data=['msg'=>'fail'];
				// return json($data);
			// }
		// }else{
			// return json('not find');
		// }
		}
		//家长 老师都可登录
		$telphone=input('post.telphone');
		$password=md5(input('post.password'));
		if($telphone==''){
			return json('kong');
		}if($password==''){
			return json('password kong');
		}
		$db=db('family');
		$db1=db('teacher');
		$list=$db->where("telphone='".$telphone."'")->find();
		if($list){
			if($list['password']==$password){
				$list['photo']="http://www.ryaonet.cn/public/Uploads/".$list['photo'];
				$list['identity']='家长';
				$data=[
					'msg'=>'succ',
					'info'=>$list,
				];
				return json($data);
			}else{
				$data=['msg'=>'fail'];
				return json($data);
			}
		}else{
			$list=$db1->where("telphone='".$telphone."'")->find();
				if($list){
					if($list['password']==$password){
					$list['photo']="http://www.ryaonet.cn/public/Uploads/".$list['photo'];
					$list['identity']='教师';
					$data=[
						'msg'=>'succ',
						'info'=>$list,
					];
					return json($data);
				}else{
					$data=['msg'=>'fail'];
					return json($data);
				}
			}else{
				return json('not find');
			}
		}
	}
	public function do_zhuces(){
		//return json('succ');
		$data=input('post.');
		//密码相同
		if($data['password']!=$data['repassword']){
			return json('password not same');
		}
		//真实姓名为空
		if($data['truename']==''){
			return json('truename not kong');
		}
		//用户名为空
		if($data['telphone']==''){
			return json('username not kong');
		}
		unset($data['repassword']);
		$db=db('family');
		//判断用户名是否存在
		$info=$db->where("telphone='".$data['telphone']."'")->select();
		if($info){
			return json('username exist');
		}
		$list=$db->insert($data);
		if($list){
			return json('succ');
		}else{
			return json('fail');
		}
	}
	//首页
	public function nav(){
		{//家长登录
		// $db=db('family');
		// $db1=db('class');
		// $db2=db('student');
		// $db3=db('teacher');
		// $tel=input('post.userid');
		// $list=$db->where("telphone='".$tel."'")->find();
		// $info=db('family')->join('student','family.id=student.fid')->where('family.id='.$list['id'])->find();
		// $info['teachername'] = $db3->field('truename')->where('id='.$info['tid'])->find()['truename'];
		// $info['teachertel'] = $db3->field('telphone')->where('id='.$info['tid'])->find()['telphone'];
		// $info['class_name'] = $db1->field('class_name')->where('id='.$info['class_id'])->find()['class_name'];
		// $info['photo']="http://www.ryaonet.cn/public/Uploads/".$info['photo'];
		 // return json($info);
		}
		 //家长 老师都可登录
		 $tel=input('post.userid');
		 // $tel='123';
		$db=db('family');
		$db1=db('class');
		$db2=db('student');
		$db3=db('teacher');
		$list=$db->where("telphone='".$tel."'")->find();
		if($list){
			$info=db('family')->join('student','family.id=student.fid')->where('family.id='.$list['id'])->find();
			$info['teachername'] = $db3->field('truename')->where('id='.$info['tid'])->find()['truename'];
			$info['teachertel'] = $db3->field('telphone')->where('id='.$info['tid'])->find()['telphone'];
			$info['class_name'] = $db1->field('class_name')->where('id='.$info['class_id'])->find()['class_name'];
			$info['photo']="http://www.ryaonet.cn/public/Uploads/".$info['photo'];
			$info['endtime']=strtotime($info['intotime'])+3*365*24*3600;
			$info['endtime']=date('Y-m-d',$info['endtime']);
			return json($info);
		}else{
			$info=$db3->where("telphone='".$tel."'")->find();
			$info['photo']="http://www.ryaonet.cn/public/Uploads/".$info['photo'];
			return json($info);
		}
	}
	//更换头像
	public function photoss(){
		{//家长登录
		// $file=request()->file('images');
		// $info=$file->move('public/Uploads/');
		// $userid=input('post.userid');
		// $result="http://www.ryaonet.cn/public/Uploads/".$info->getSavename();
		// $data['photo']=$info->getSavename();
		// $info=db('family')->where("telphone='".$userid."'")->update($data);
		// $list=db('family')->where("telphone='".$userid."'")->find();
		// if($info!==false)
		// {
			// $msg=[
				// 'msg'=>'succ',
				// 'info'=>$result,
				// 'data'=>$list
			// ];
		// }
		// else{
			
			// $msg=[
				// 'msg'=>'fail'
			// ];
		// }
		// return json($msg);
		}
		//家长 老师都可登录
		$file=request()->file('images');
		$info=$file->move('public/Uploads/');
		$userid=input('post.userid');
		$result="http://www.ryaonet.cn/public/Uploads/".$info->getSavename();
		$data['photo']=$info->getSavename();
		$list=db('family')->where("telphone='".$userid."'")->find();
		if($list){
			$info=db('family')->where("telphone='".$userid."'")->update($data);
			$list=db('family')->where("telphone='".$userid."'")->find();
				if($info!==false){
					$msg=[
						'msg'=>'succ',
						'info'=>$result,
						'data'=>$list
						];
				}else{
					$msg=[
						'msg'=>'fail'
					];
				}
				return json($msg);
		}else{
			$info=db('teacher')->where("telphone='".$userid."'")->update($data);
			$list=db('teacher')->where("telphone='".$userid."'")->find();
				if($info!==false){
					$msg=[
						'msg'=>'succ',
						'info'=>$result,
						'data'=>$list
					];
				}else{
					$msg=[
						'msg'=>'fail'
					];
				}
				return json($msg);
		}
	}
	//相册
	public function xiangce(){
		$db=db('ablumn');
		$page=input('post.carrage');
		$data=$db->page($page,15)->order('id desc')->select();
		foreach($data as &$v){
			$v['photos']="http://www.ryaonet.cn/public/Uploads/".$v['photo'];
			$v['pubdate']=date('Y-m-d',$v['pubdate']);
		}
		return json($data);
	}
	public function xiangceji(){
		$id=input('post.wid');
		// $id=1;
		$db=db('class');
		$db1=db('class_ablum');
		$data=$db1->where('cid='.$id)->select();
		for($i=0;$i<count($data);$i++){
			 $data[$i]['nickname']=$db->field('class_name')->where('id='.$data[$i]['cid'])->find()['class_name'];
		 }
		foreach($data as &$v){
			$v['photos']="http://www.ryaonet.cn/public/Uploads/".$v['photo'];
			$v['pubdate']=date('Y-m-d',$v['pubdate']);
		}
		return json($data);
	}
	public function xiangceji2(){
		$id=input('post.wid');
		$id=4;
		$db=db('class');
		$db1=db('class_ablum');
		$data=$db1->where('cid='.$id)->select();
		for($i=0;$i<count($data);$i++){
			 $data[$i]['nickname']=$db->field('class_name')->where('id='.$data[$i]['cid'])->find()['class_name'];
		 }
		foreach($data as &$v){
			$v['photos']="http://www.ryaonet.cn/public/Uploads/".$v['photo'];
			$v['pubdate']=date('Y-m-d',$v['pubdate']);
		}
		return json($data);
	}
	//放大图片
	public function fangda(){
		$id=input('post.wid');
		// $id=1;
		$db=db('class_ablum');
		$list=$db->where('id='.$id)->find();
		$list['photos']="http://www.ryaonet.cn/public/Uploads/".$list['photo'];
		return json($list);
	}
	//相机
	public function photo(){
		$file=request()->file('images');
		$info=$file->move('public/Uploads/');
		$result="http://www.ryaonet.cn/public/Uploads/".$info->getSavename();
		return json($result);
	}
	//记录相机
	public function jiphoto(){
		$file=request()->file('images');
		$info=$file->move('public/Uploads/');
		$result['imageurl']="http://www.ryaonet.cn/public/Uploads/".$info->getSavename();
		$result['imgurl']=$info->getSavename();
		return json($result);
	}
	public function chakan(){
		$id=input('post.wid');
		// $id=1;
		$db=db('class_ablum');
		$list=$db->where('id='.$id)->find();
		$list['photos']="http://www.ryaonet.cn/public/Uploads/".$list['photo'];
		return json($list);
	}
	//通讯
	public function getuserinfo(){
		$db=db('family');
		$db1=db('student');
		$db2=db('teacher');
		$db3=db('class');
		$tel=input('post.telphone');
		$identity=input('identity');
		
		// $tel='111';
		// $identity='教师';
		if($identity=='教师'){
			$list=$db2->where("telphone='".$tel."'")->find();
			$info=$db1->where("tid='".$list['id']."'")->find();
			$data=$db1->where("class_id='".$info['class_id']."'")->select();
		}else{
			$list=$db->where("telphone='".$tel."'")->find();
			$info=$db1->where("fid='".$list['id']."'")->find();
			$data=$db1->where("class_id='".$info['class_id']."'")->select();
		}
		for($i=0;$i<count($data);$i++){
				$data[$i]['truename']=$db->field('truename')->where('id='.$data[$i]['fid'])->find()['truename'];
				$data[$i]['telphone']=$db->field('telphone')->where('id='.$data[$i]['fid'])->find()['telphone'];
			}
		foreach($data as &$v){
			$v['photo']="http://www.ryaonet.cn/public/Uploads/".$v['studentphoto'];
		}
        return json($data);
    }
	//动态
	public function dongtai(){
		$page=input('post.currage');
        $db=db('notice');
        $data=$db->order('id desc')->page($page,8)->select();
		
		foreach ($data as &$v)
		{
			if($v['photo']==''){
				$v['photo']=='';
			}else{
				$v['photo']="http://www.ryaonet.cn/public/Uploads/".$v['photo'];
			}
			$v['pubdate']=date('Y-m-d',$v['pubdate']);
		}
        return json($data);
    }
	//动态内页
	public function neiye(){
		$id=input('post.wid');
		// $id=9;
		$db=db('notice');
		$db1=db('teacher');
		$data=$db->where("id='".$id."'")->find();
		$data['pubdate']=date('Y-m-d',$data['pubdate']);
		$data['name'] = $db1->field('truename')->where('id='.$data['tid'])->find()['truename'];
		$data['content']='<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">'.$data['content'];
		//print_r($data);
		return json($data);
	}
	//通知
	public function tongzhi(){
		$page=input('post.currage');
        $db=db('news');
        $data=$db->order('id desc')->page($page,8)->select();
		foreach ($data as $key=>&$v)
		{
			switch($key)
			{
				case 0:$v['status']="#FF3030";break;
				case 1:$v['status']="#FF7F00";break;
				case 2:$v['status']="#FFD700";break;
				default:$v['status']="#cccccc";break;
			}
			$v['pubdate']=date('Y-m-d',$v['pubdate']);
		}
        return json($data);
    }
	//通知内页
	public function tongnei(){
		$id=input('post.userid');
		//$id=1;
		$db=db('news');
		$db1=db('teacher');
		$data=$db->where("id='".$id."'")->find();
		$data['pubdate']=date('Y-m-d',$data['pubdate']);
		$data['content']='<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">'.$data['content'];
		$data['name'] = $db1->field('truename')->where('id='.$data['tid'])->find()['truename'];
		//print_r($data);
		return json($data);
	}
	//记录
	public function jilu(){
		// $page=input('post.currage');
        // $db=db('record');
		// $db1=db('family');
        // $data=$db->order('id desc')->page($page,8)->select();
		// for($i=0;$i<count($data);$i++){
			 // $data[$i]['truename']=$db1->field('truename')->where('id='.$data[$i]['fid'])->find()['truename'];
		 // }
		// foreach ($data as &$v)
		// {
			// $v['photos']="http://www.ryaonet.cn/public/Uploads/".$v['photos'];
			// $v['pubdate']=date('Y-m-d',$v['pubdate']);
		// }
        // return json($data);
		
		$page=input('post.currage');
        $db=db('record');
		$db1=db('family');
		$db2=db('teacher');
		 $data=$db->order('id desc')->page($page,8)->select();
		for($i=0;$i<count($data);$i++){
			if($data[$i]['tid']==''){
				$data[$i]['truename']=$db1->field('truename')->where('id='.$data[$i]['fid'])->find()['truename'];
			}
			if($data[$i]['fid']==''){
				$data[$i]['truename']=$db2->field('truename')->where('id='.$data[$i]['tid'])->find()['truename'];
			}
		}
		foreach ($data as &$v){
			$v['photos']="http://www.ryaonet.cn/public/Uploads/".$v['photos'];
			$v['pubdate']=date('Y-m-d',$v['pubdate']);
		}
		return json($data);
		
    }
	//记录内页
	public function jinei(){
		$id=input('post.userid');
		// $id=9;
		
		$db=db('record');
		$db1=db('teacher');
		$db2=db('family');
		$data=$db->where("id='".$id."'")->find();
		$data['photos']="http://www.ryaonet.cn/public/Uploads/".$data['photos'];
		$data['pubdate']=date('Y-m-d',$data['pubdate']);
		if($data['tid']==''){
			$data['name']=$db2->field('truename')->where("id='".$data['fid']."'")->find()['truename'];
		}if($data['fid']==''){
			$data['name']=$db1->field('truename')->where("id='".$data['tid']."'")->find()['truename'];
		}
		//print_r($data);
		return json($data);
	}
	//乐园
	public function leyuan(){
		$page=input('post.currage');
		$db=db('funland');
		$data=$db->order('id desc')->page($page,8)->select();
		foreach ($data as &$v)
		{
			$v['photo']="http://www.ryaonet.cn/public/Uploads/".$v['photo'];
			$v['pubdate']=date('Y-m-d',$v['pubdate']);
		}
		// echo "<pre>";
		// print_r($data);
		return json($data);
	}
	//乐园内页
	public function lenei(){
		$id=input('post.wid');
		// $id=20;
		$db=db('funland');
		$db1=db('teacher');
		$data=$db->where("id='".$id."'")->find();
		$data['pubdate']=date('Y-m-d',$data['pubdate']);
		$data['name'] = $db1->field('truename')->where('id='.$data['tid'])->find()['truename'];
		$data['photo']='http://www.ryaonet.cn/public/Uploads/'.$data['photo'];
		//print_r($data);
		return json($data);
	}
	//发表记录
	public function fabiao(){
		{
		// $db=db('record');
		// $db1=db('family');
		// $data['content']=input('post.content');
		// $data['photos']=input('post.imgurl');
		// $data['tel']=input('post.tel');
		// $data['title']=input('post.title');
		// $data['address']=input('post.address');
		// if($data['content']==''){
			// return json('kong');
		// }
		// $list=$db1->where("telphone='".$data['tel']."'")->find();
		// $data['fid']=$list['id'];
		// $data['pubdate']=time();
		// unset($data['tel']);
		// $list=$db->insert($data);
		// if($list){
			// return json('succ');
		// }else{
			// return json('fail');
		// }
		}
		
		//家长 老师都可登录
		
		$db=db('record');
		$db1=db('family');
		$db2=db('teacher');
		$identity=input('post.identity');
		$data['content']=input('post.content');
		$data['photos']=input('post.imgurl');
		$data['tel']=input('post.tel');
		$data['title']=input('post.title');
		$data['address']=input('post.address');
		if($data['content']==''){
			return json('kong');
		}
		if($identity=='教师'){
			$list=$db2->where("telphone='".$data['tel']."'")->find();
			$data['tid']=$list['id'];
			$data['pubdate']=time();
			unset($data['tel']);
			$list=$db->insert($data);
			if($list){
				return json('succ');
			}else{
				return json('fail');
			}
		}
		if($identity=='家长'){
			$list=$db1->where("telphone='".$data['tel']."'")->find();
			$data['fid']=$list['id'];
			$data['pubdate']=time();
			unset($data['tel']);
			$list=$db->insert($data);
			if($list){
				return json('succ');
			}else{
				return json('fail');
			}
		}
	}
	//修改密码
	public function xiugai(){
		{//家长
		// $tel=input('post.telphone');
		// $db=db('family');
		// $data['oldpassword']=input('post.oldpassword');
		// $data['password']=input('post.password');
		// $data['repassword']=input('post.repassword');
		// //判断是否填写密码
		// if($data['oldpassword']==''){
			// return json('oldpassword');
		// }
		// if($data['password']=='' && $data['repassword']==''){
			// return json('password');
		// }
		// //$tel=15163916901;
		
		// $list=$db->where("telphone='".$tel."'")->find();
		// //print_r($list);exit;
		// if($list['password']!=$data['oldpassword']){
			// return json('no same');
		// }
		// if($data['password']!=$data['repassword']){
			// return json('pass');
		// }
		// if($data['oldpassword']==$data['password']){
			// return json('chong xin xie');
		// }
		// unset($data['oldpassword']);
		// unset($data['repassword']);
		// $info=$db->where("telphone='".$tel."'")->update($data);
		// if($info){
			// return json('succ');
		// }else{
			// return json('fail');
		// }
		}
		//家长 教师
		$db1=db('teacher');
		$db=db('family');
		$identity=input('post.identity');
		$tel=input('post.telphone');
		$data['oldpassword']=md5(input('post.oldpassword'));
		$data['password']=md5(input('post.password'));
		$data['repassword']=md5(input('post.repassword'));
		//判断是否填写密码
		if($data['oldpassword']==''){
			return json('oldpassword');
		}
		if($data['password']=='' && $data['repassword']==''){
			return json('password');
		}
		//$tel=15163916901;
		if($identity=='教师'){
			$list=$db1->where("telphone='".$tel."'")->find();
			//print_r($list);exit;
			if($list['password']!=$data['oldpassword']){
				return json('no same');
			}
			if($data['password']!=$data['repassword']){
				return json('pass');
			}
			if($data['oldpassword']==$data['password']){
				return json('chong xin xie');
			}
			unset($data['oldpassword']);
			unset($data['repassword']);
			$info=$db1->where("telphone='".$tel."'")->update($data);
			if($info){
				return json('succ');
			}else{
				return json('fail');
			}
		}else{
			$list=$db->where("telphone='".$tel."'")->find();
			//print_r($list);exit;
			if($list['password']!=$data['oldpassword']){
				return json('no same');
			}
			if($data['password']!=$data['repassword']){
				return json('pass');
			}
			if($data['oldpassword']==$data['password']){
				return json('chong xin xie');
			}
			unset($data['oldpassword']);
			unset($data['repassword']);
			$info=$db->where("telphone='".$tel."'")->update($data);
			if($info){
				return json('succ');
			}else{
				return json('fail');
			}
		}
		
	}
	//班级作业
	public function homework(){
		$page=input('post.currage');
		$db=db('homework');
		$db1=db('teacher');
		$data=$db->order("pubdate desc")->page($page,3)->select();
		for ($i = 0; $i < count($data); $i++) {
			$data[$i]['name'] = $db1->field('truename')->where('id='.$data[$i]['tid'])->find()['truename'];
			$data[$i]['pubdate']=date('m-d H:i',$data[$i]['pubdate']);
		}
		
		foreach ($data as &$v)
		{
			$v['photo']="http://www.ryaonet.cn/public/Uploads/".$v['photo'];
		}
		return json($data);
	}
	//发表评论
	public function fabiaopinglu(){
		{//家长
		// $db=db('comments');
		// $db1=db('family');
		// $data['nums']=input('post.nums');
		// $data['tel']=input('post.tel');
		// $data['cid']=input('post.id');
		// if($data['nums']==''){
			// return json('kong');
		// }
		// $info=$db1->where("telphone='".$data['tel']."'")->find();
		// // print_r($info);
		// $data['neirong']=$data['nums'];
		// $data['fid']=$info['id'];
		// $data['time']=time();
		// unset($data['nums']);
		// unset($data['tel']);
		// $list=$db->insert($data);
		// if($list){
			// return json('succ');
		// }else{
			// return json('fail');
		// }
		}
		//家长 教师
		$db=db('comments');
		$db1=db('family');
		$db2=db('teacher');
		$data['nums']=input('post.nums');
		$data['tel']=input('post.tel');
		$data['cid']=input('post.id');
		
		// $data['nums']='qweqweqweqwe';
		// $data['tel']='123456';
		// $data['cid']=28;
		if($data['nums']==''){
			return json('kong');
		}
		$info=$db1->where("telphone='".$data['tel']."'")->find();
		// echo "<pre>";
		// print_r($info);exit;
		if($info){
			$data['neirong']=$data['nums'];
			$data['fid']=$info['id'];
			$data['time']=time();
			unset($data['nums']);
			unset($data['tel']);
			$list=$db->insert($data);
			if($list){
				return json('succ');
			}else{
				return json('fail');
			}
		}else{
			$info=$db2->where("telphone='".$data['tel']."'")->find();
			$data['neirong']=$data['nums'];
			$data['tid']=$info['id'];
			$data['time']=time();
			unset($data['nums']);
			unset($data['tel']);
			$list=$db->insert($data);
			if($list){
				return json('succ');
			}else{
				return json('fail');
			}
		}
		
	}
	//互动列表
	public function xinwen(){
		{//家长
		// $db=db('comment');
		// $db1=db('family');
		// $db2=db('comments');
		// $list=$db->order('id desc')->select();
		// for($i=0;$i<count($list);$i++){
			 // $list[$i]['nickname']=$db1->field('nickname')->where('id='.$list[$i]['fid'])->find()['nickname'];
			 // $list[$i]['familyphoto']=$db1->field('photo')->where('id='.$list[$i]['fid'])->find()['photo'];
			 // $list[$i]['familyphoto']="http://www.ryaonet.cn/public/Uploads/".$list[$i]['familyphoto'];
			 // $list[$i]['pudate']=date('Y-m-d',$list[$i]['pudate']);
		 // }
		 // foreach ($list as &$v)
		// {
			// if($v['photo']==''){
				// $v['photo']=='';
			// }else{
				// $v['photo']="http://www.ryaonet.cn/public/Uploads/".$v['photo'];
			// }
		// }
	   // return json($list); 
		}
	   //家长 教师
	    $tel=input('post.tel');
	    $identity=input('post.identity');
		
		// $tel='123';
	    // $identity='家长';
	    $db=db('comment');
		$db1=db('family');
		$db3=db('teacher');
		$db2=db('comments');
		$db4=db('comment_dianzan');
		$list=$db->order('id desc')->select();
		
		for($i=0;$i<count($list);$i++){
			if($list[$i]['fid']==''){
				 $list[$i]['nickname']=$db3->field('nickname')->where('id='.$list[$i]['tid'])->find()['nickname'];
				 $list[$i]['familyphoto']=$db3->field('photo')->where('id='.$list[$i]['tid'])->find()['photo'];
				 // $list[$i]['dzstate']=$db3->field('dzstate')->where('id='.$list[$i]['tid'])->find()['dzstate'];
				 $list[$i]['familyphoto']="http://www.ryaonet.cn/public/Uploads/".$list[$i]['familyphoto'];
				 $list[$i]['pudate']=date('Y-m-d',$list[$i]['pudate']);				
			}else{
				 $list[$i]['nickname']=$db1->field('nickname')->where('id='.$list[$i]['fid'])->find()['nickname'];
				 $list[$i]['familyphoto']=$db1->field('photo')->where('id='.$list[$i]['fid'])->find()['photo'];
				 // $list[$i]['dzstate']=$db1->field('dzstate')->where('id='.$list[$i]['fid'])->find()['dzstate'];
				 $list[$i]['familyphoto']="http://www.ryaonet.cn/public/Uploads/".$list[$i]['familyphoto'];
				 $list[$i]['pudate']=date('Y-m-d',$list[$i]['pudate']);
			}
			$list[$i]['num']=count($db2->where("cid='".$list[$i]['id']."'")->select());
			
			if($identity=='教师'){
				$path=$db3->where("telphone='".$tel."'")->find();
				$data=$db4->where("cid='".$list[$i]['id']."' and tid='".$path['id']."'")->find();
			}
			if($identity=='家长'){
				$path=$db1->where("telphone='".$tel."'")->find();
				$data=$db4->where("cid='".$list[$i]['id']."' and fid='".$path['id']."'")->find();
			}
			if($data){
				$list[$i]['state']=$data['state'];
			}else{
				$list[$i]['state']=0;
			}
			
		 }
		 foreach ($list as &$v)
		{
			if($v['photo']==''){
				$v['photo']=='';
			}else{
				$v['photo']="http://www.ryaonet.cn/public/Uploads/".$v['photo'];
			}
		}
	   return json($list); 
	}
	//互动内页
	public function hudongnei(){
		$db=db('comment');
		$db1=db('comments');
		$db2=db('family');
		$db3=db('teacher');
		$id=input('post.userid');
		// $id=38;
		$list=$db->where("id='".$id."'")->find();
		// echo "<pre>";
		// print_r($list);exit;
		if($list['tid']==''){
			$list['name']=$db2->field('nickname')->where("id='".$list['fid']."'")->find()['nickname'];
		}
		if($list['fid']==''){
			$list['name']=$db3->field('nickname')->where("id='".$list['tid']."'")->find()['nickname'];
		}
		// echo "<pre>";
		// print_r($list);exit;
		$data=$db1->order('id desc')->where("cid='".$list['id']."'")->select();
		if($data){
			for($i=0;$i<count($data);$i++){
				if($data[$i]['tid']==''){
					$data[$i]['nickname']=$db2->field('nickname')->where('id='.$data[$i]['fid'])->find()['nickname'];
					$data[$i]['photos']=$db2->field('photo')->where("id='".$data[$i]['fid']."'")->find()['photo'];
				}
				if($data[$i]['fid']==''){
					$data[$i]['nickname']=$db3->field('nickname')->where('id='.$data[$i]['tid'])->find()['nickname'];
					$data[$i]['photos']=$db3->field('photo')->where("id='".$data[$i]['tid']."'")->find()['photo'];
				}
				$data[$i]['pubdate']=date('m-d H:i:s',$data[$i]['time']);
				$data[$i]['content']=$list['content'];
				$data[$i]['time']=date('Y-m-d',$list['pudate']);
				$data[$i]['name']=$list['name'];
				$data[$i]['title']=$list['title'];
				$data[$i]['photo']='http://www.ryaonet.cn/public/Uploads/'.$list['photo'];
				$data[$i]['photos']='http://www.ryaonet.cn/public/Uploads/'.$data[$i]['photos'];
				$data[$i]['num']=count($data);
			}
		}else{
			$data['0']['id']=null;
			$data['0']['photo']=null;
			$data['0']['neirong']=null;
			$data['0']['cid']=null;
			$data['0']['fid']=null;
			$data['0']['tid']=null;
			$data['0']['nickname']=null;
			$data['0']['pubdate']=null;
			$data['0']['content']=$list['content'];
			$data['0']['time']=date('Y-m-d',$list['pudate']);
			$data['0']['name']=$list['name'];
			$data['0']['title']=$list['title'];
			$data['0']['photos']=null;
			$data['0']['num']=null;
		}
		// echo "<pre>";
		// print_r($data);exit;
		return json($data);
	}
	//添加互动话题
	public function fabu(){
		{//家长
		// $db1=db('family');
		// $db=db('comment');
		// $db2=db('teacher');
		// $data['title']=input('post.title');
		// $data['content']=input('post.nums');
		// $data['tel']=input('post.tel');
		// $data['photo']=input('post.imgurl');
		// if($data['title']==''){
			// return json('title not kong');
		// }
		// if($data['content']==''){
			// return json('title not kong');
		// }
		// $info=$db1->where("telphone='".$data['tel']."'")->find();
		// $data['fid']=$info['id'];
		
		// $data['pudate']=time();
		// unset($data['tel']);
		// $list=$db->insert($data);
		// if($list){
			// return json('succ');
		// }else{
			// return json('fail');
		// }
		}
		//家长 教师
		$db=db('comment');
		$db1=db('family');
		$db2=db('teacher');
		$data['title']=input('post.title');
		$data['content']=input('post.nums');
		$data['tel']=input('post.tel');
		$identity=input('post.identity');
		$data['photo']=input('post.imgurl');
		if($data['title']==''){
			return json('title not kong');
		}
		if($data['content']==''){
			return json('title not kong');
		}
		if($identity=='教师'){
			$info=$db2->where("telphone='".$data['tel']."'")->find();
			$data['tid']=$info['id'];
			$data['pudate']=time();
			unset($data['tel']);
			$list=$db->insert($data);
			if($list){
				return json('succ');
			}else{
				return json('fail');
			}
		}else{		
			$info=$db1->where("telphone='".$data['tel']."'")->find();
			$data['fid']=$info['id'];
			$data['pudate']=time();
			unset($data['tel']);
			$list=$db->insert($data);
			if($list){
				return json('succ');
			}else{
				return json('fail');
			}
		}
	}
	//互动评论
	public function pinglu(){  
		$id=input('post.id');
		// $id=2;
		$db=db('comment');
		$db1=db('family');
		$db2=db('comments');
		$list=$db->where('id='.$id)->find();
		$list['nickname']=$db1->field('nickname')->order('id desc')->where('id='.$list['fid'])->find()['nickname'];
		// 多加的一行；
		$list['neirong']=$db2->field('neirong')->order('id desc')->where('cid='.$list['id'])->find()['neirong'];
		 $list['pudate']=date('Y-m-d',$list['pudate']);
		return json($list);
	}
	//互动留言
	public function liuyan(){
		 $id=input('post.wid');
		 // $id=1;
		 $db=db('comments');
		 $db1=db('family');
		 $list=$db->order('id desc')->where('cid="'.$id.'"')->select();
		 for($i=0;$i<count($list);$i++){
			 $list[$i]['nickname']=$db1->field('nickname')->where('id='.$list[$i]['fid'])->find()['nickname'];
			$data[$i]['pubdate']=date('Y-m-d',$list[$i]['time']);
		 }
		 return json($list);
	}
	//当前登录人的评价
	public function mypingjia(){
		$db=db('theme');
		$db1=db('student');
		$db2=db('teacher');
		$db3=db('family');
		
		$tel=input('post.userid');
		$list=$db3->where("telphone='".$tel."'")->find();
		$info=$db1->where("fid='".$list['id']."'")->find();
		$path=$db->where("sid='".$info['id']."'")->select();
		for($i=0;$i<count($path);$i++){
			$path[$i]['teachername']=$db2->field('truename')->where("id='".$path[$i]['tid']."'")->find()['truename'];
			$path[$i]['pubdate']=date('Y-m-d',$path[$i]['pubdate']);
		}
		// $path['teachername']=$db2->field('truename')->where("id='".$path['tid']."'")->find()['truename'];
		// $path['pubdate']=date('Y-m-d',$path['pubdate']);
		// echo "<pre>";
		// print_r($path);
		// exit;
		
		return json($path);
	}
	//日程
	public function richeng(){
		$id=input('post.userid');
		// $id=1;
		$db=db('calendar');
		$list=$db->order('id Asc')->where('day='.$id)->select();
		return json($list);
	}
	//记录的添加图片
	// public function uploadimg(){
    	// if($_FILES['uploadfile']['error']==0){
    		 // $file=request()->file('uploadfile');
    		 // $upload=$file->move(config('upload_path'));
    		 // if($upload){
    		 	// $path='http://www.ryaonet.cn/public/upload/'.$upload->getSavename();
                // return json($path);
            // }
    	// }
    // }
	public function uploadimg(){
    	$file=request()->file('uploadfile');
    	$upload=$file->move(config('upload_path'));
    	$path['imageurl']='http://www.ryaonet.cn/public/Uploads/'.$upload->getSavename();
		$path['imgurl']=$upload->getSavename();
        return json($path);
    }
	//考勤
	public function qiandao(){
		$db=db('qiandao');
		//已签到
		$list=$db->select();
		//
		return json($list);
	}
	//发布动态
	public function fabudongtai(){
		$db=db('teacher');
		$db1=db('notice');
		$telphone=input('post.tel');
		$data['title']=input('post.title');
		$data['futitle']=input('post.futitle');
		$data['content']=input('post.content');
		$data['photo']=input('post.imgurl');
		if($data['photo']==''){
			$data['photo']=null;
		}
		if($data['title']==''){
			return json('title not kong');
		}
		if($data['futitle']==''){
			return json('futitle not kong');
		}
		if($data['content']==''){
			return json('content not kong');
		}
		$list=$db->where("telphone='".$telphone."'")->find();
		$data['tid']=$list['id'];
		$data['pubdate']=time();
		$info=$db1->insert($data);
		if($info){
			return json('succ');
		}else{
			return json('fail');
		}
	}
	//发布通知
	public function fabutongzhi(){
		$db=db('teacher');
		$db1=db('news');
		$telphone=input('post.tel');
		$data['title']=input('post.title');
		$data['futitle']=input('post.futitle');
		$data['content']=input('post.content');
		if($data['title']==''){
			return json('title not kong');
		}
		if($data['futitle']==''){
			return json('futitle not kong');
		}
		if($data['content']==''){
			return json('content not kong');
		}
		$list=$db->where("telphone='".$telphone."'")->find();
		$data['tid']=$list['id'];
		$data['pubdate']=time();
		$info=$db1->insert($data);
		if($info){
			return json('succ');
		}else{
			return json('fail');
		}
	}
	//发布乐园
	public function fabuleyuan(){
		$db=db('teacher');
		$db1=db('funland');
		$telphone=input('post.tel');
		$data['title']=input('post.title');
		$data['type']=input('post.type');
		$data['content']=input('post.content');
		$data['photo']=input('post.imgurl');
		if($data['photo']==''){
			$data['photo']='failmy\asdfghfdd5tgyhhhh.jpg';
		}
		if($data['title']==''){
			return json('title not kong');
		}
		if($data['type']==''){
			return json('type not kong');
		}
		if($data['content']==''){
			return json('content not kong');
		}
		$list=$db->where("telphone='".$telphone."'")->find();
		$data['tid']=$list['id'];
		$data['pubdate']=time();
		$info=$db1->insert($data);
		if($info){
			return json('succ');
		}else{
			return json('fail');
		}
	}
	//发布点评
	public function fabudianping(){
		// return json('name not kong');
		$db=db('theme');
		$db1=db('teacher');
		$db2=db('student');
		$tel=input('post.tel');
		$name=input('post.name');
		$data['content']=input('post.content');
		if($name==''){
			return json('name not kong');
		}
		if($data['content']==''){
			return json('content not kong');
		}
		$list=$db1->where("telphone='".$tel."'")->find();
		$data['tid']=$list['id'];
		$info=$db2->where("sname='".$name."'")->find();
		$data['sid']=$info['id'];
		$data['pubdate']=time();
		$path=$db->insert($data);
		if($path){
			return json('succ');
		}else{
			return json('fail');
		}
	}
	//点评列表
	public function pingjia(){
		$page=input('post.currage');
		$db=db('theme');
		$db1=db('teacher');
		$db2=db('student');
		$list=$db->order('id desc')->page($page,10)->select();
		for($i=0;$i<count($list);$i++){
			$list[$i]['teachername']=$db1->field('truename')->where('id='.$list[$i]['tid'])->find()['truename'];
			$list[$i]['syudentname']=$db2->field('sname')->where('id='.$list[$i]['sid'])->find()['sname'];
			$list[$i]['pubdate']=date('Y-m-d',$list[$i]['pubdate']);
		}
		// echo "<pre>";
		// print_r($list);
		// exit;
		return json($list);
	}
	// 我的点评
	// // public function mydianping(){
		// // $db=db('theme');
		// // $db1=db('family');
		// // $db2=db('teacher');
		// // $db3=db('student');
		// // $tel=('post.tel');
		// // $tel='123';
		// // $list=$db1->where("telphone='".$tel."'")->find();
		// // $info=$db3->where("fid='".$list['id']."'")->find();
		// // $data=$db->where("sid='".$info['id']."'")->select();
		// // $data['studentname']=$info['sname'];
		// // $path=$db2->where("id='".$data['tid']."'")->find();
		// // $data['teachername']=$path['truename'];
		// // echo "<pre>";
		// // print_r($data);
		// // exit;
	// // }
	
	//签到
	public function sign_add(){  //签到表添加
        $id= input('post.userid');
        $data['fid']=$id;
        $data['state']=1;
        $sign=db('qiandaos')->where("fid='".$id."'")->order('pubdate desc')->find();//查询最新数据
        if($sign['state']==1){	
            $list['info']='error';
            return json($list);exit;
        }else{
            $now=db('qiandaos')->where("fid='".$id."'")->order('pubdate desc')->find();
            $nowid=$now['id'];
            $info=db('qiandaos')->where("fid=$id and id=$nowid")->update($data);
            if($info){
                $list['info']='succ';
                return json($list);
            }else{
                $list['info']='cuowu';
                return json($list);
            }
        }
    }
	 public function sign_none_add(){
        $id=input('post.userid');
		// $id=22;
        $nowmonth = date('n',time());        //当前月
        $list=db('qiandaos')->where("fid='".$id."' and state=1 and month='".$nowmonth."'")->column('pubdate');
		$list2=db('qiandaos')->where("fid='".$id."' and state=0 and month='".$nowmonth."'")->column('pubdate');
        $datalist="";
        foreach($list as $key=>$v)
        {
            $datalist[$v]=[
               "0"=>[
                   "startingDay"=>'true',
                   'color'=>'#a5f0dc'
               ],
                "1"=>[
                    "endingDay"=>'true',
                    'color'=>'#a5f0dc'
                ]
            ];
        }
		 foreach($list2 as $key=>$v)
        {
            $datalist[$v]=[
               "0"=>[
                   "startingDay"=>'true',
                   'color'=>'#f4d2d4'
               ],
                "1"=>[
                    "endingDay"=>'true',
                    'color'=>'#f4d2d4'
                ]
            ];
        }

        return json($datalist);
    }
	
	public function lianbiao(){
		
		$id=input('post.userid');
		$day=input('post.day');
		$identity=input('post.identity');
		$tel=input('post.telphone');
		
		// $id=input('post.userid');
		// $day=2017-07-31;
		// $identity='教师';
		// $tel='111';
		//return json($id);
		// $id="22";
		// $day='2017-07-27';
		$db=db('family');
		$db2=db('student');
		$db3=db('class');
		$db4=db('qiandaos');
		$db5=db('teacher');
		if($identity=='家长'){
			$data=$db->where("id='".$id."'")->find();
			$data['sid'] = $db2->field('class_id')->where('fid='.$data['id'])->find()['class_id'];
			$list=$db2->where("class_id='".$data['sid']."'")->select();
			for($i=0;$i<count($list);$i++){
				 $list[$i]['state']=$db4->field('state')->where("sid='".$list[$i]['id']."' and pubdate='".$day."'")->find()['state'];
				 $list[$i]['yuan']=$db4->field('reason')->where("sid='".$list[$i]['id']."'and pubdate='".$day."'")->find()['reason'];
				 $list[$i]['ban']=$db3->field('class_name')->where("id='".$list[$i]['class_id']."'")->find()['class_name'];
				 $list[$i]['studentphoto']='http://www.ryaonet.cn/public/Uploads/'.$list[$i]['studentphoto'];
			}
		}else{
			$data=$db5->where("telphone='".$tel."'")->find();
			$info=$db3->where('tid='.$data['id'])->find();
			$list=$db2->where("class_id='".$info['id']."'")->select();
			for($i=0;$i<count($list);$i++){
				 $list[$i]['state']=$db4->field('state')->where("sid='".$list[$i]['id']."' and pubdate='".$day."'")->find()['state'];
				 $list[$i]['yuan']=$db4->field('reason')->where("sid='".$list[$i]['id']."'and pubdate='".$day."'")->find()['reason'];
				 $list[$i]['ban']=$db3->field('class_name')->where("id='".$list[$i]['class_id']."'")->find()['class_name'];
				 $list[$i]['studentphoto']='http://www.ryaonet.cn/public/Uploads/'.$list[$i]['studentphoto'];
			}
		}
		 //echo "<pre>";
		//print_r($list);exit;
		return json($list);
	}
	
	//
	public function jqiandao(){
		$id=input('post.id');
		$day=input('post.day');
		$reason=input('post.reason');
		// $id='13';
		// $day='2017-07-31';
		// $reason='niasd';
		$db=db('qiandaos');
		$db1=db('student');
		$nowmonth = date('n',time());
		$list=$db->where("sid='".$id."' and pubdate='".$day."'")->find();
		if($list){
			if($reason==''){
				$data['state']=1;
				$data['reason']='';
				$data['month']=$nowmonth;
				$info=$db->where("sid='".$id."' and pubdate='".$day."'")->update($data);
			}else{
				$data['state']=0;
				$data['reason']=$reason;
				$data['month']=$nowmonth;
				$info=$db->where("sid='".$id."' and pubdate='".$day."'")->update($data);
			}
			if($info){
				return json('succ');
			}elseif($info===false){
					return json('yi qian');//已签到，无需重复
			}else{
				return json('fail');//已签到，无需重复
			}
		}else{
			$info=$db1->where("id='".$id."'")->find();
			$data['sid']=$id;
			$data['fid']=$info['fid'];
			$data['pubdate']=$day;
			if($reason==''){
				$data['state']=1;
				$data['reason']='';
				$data['month']=$nowmonth;
			}else{
				$data['state']=0;
				$data['reason']=$reason;
				$data['month']=$nowmonth;
			}
			$info=$db->insert($data);
			if($info){
				return json('insert succ');//签到成功
			}else{
				return json('insert fail');
			}
		}
	}
	//点赞
	public function dianzan(){
		// return json('succ');
		$db=db('comment');
		$db1=db('comment_dianzan');
		$db2=db('teacher');
		$db3=db('family');
		
		$data['cid']=input('post.id');
		$tel=input('post.telphone');
		$identity=input('post.identity');
		
		// $data['cid']=11;
		// $tel='123';
		// $identity='家长';
		
		$path=$db->where("id='".$data['cid']."'")->find();
		$array['dianzan']=$path['dianzan']+1;
		$arr=$db->where("id='".$data['cid']."'")->update($array);
		if($identity=='教师'){
			$list=$db2->where("telphone='".$tel."'")->find();
			$data['tid']=$list['id'];
		}
		if($identity=='家长'){
			$list=$db3->where("telphone='".$tel."'")->find();
			$data['fid']=$list['id'];
		}
		$info=$db1->insert($data);
		if($info && $arr){
			return json('succ');
		}else{
			return json('fail');
		}
	}
	
	public function xingqi(){
		$list=date('w',time());
		echo $list;
	}
	

}
?>