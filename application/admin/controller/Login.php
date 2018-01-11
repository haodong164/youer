<?php
namespace app\admin\controller;

use think\Controller;

class Login extends Controller
{
    public function login()
    {

        if(session('id')!='')
        {
            $this->redirect('Index/index');
        }
        else{
            return $this->fetch();
        }


    }
    public function do_login()
    {
        $truename=input('post.truename');
        $password=input('post.password');
        //echo md5($password);
        $table=db('teacher');
        $info=$table->where('truename="'.$truename.'"')->find();
        if($info==false)
        {
            $db=db('family');
            $finfo=$db->where('truename="'.$truename.'"')->find();
            //echo "<pre>";
           //print_r($finfo);exit;
            if($finfo)
            {
                if($finfo['password']==md5($password))
                {
                    session('id',$finfo['id']);
                    session('truename',$truename);

                    $this->assign('truename',$truename);
                    $this->success('登录成功','Index/index');
                }
                else{
                    $this->error('登录失败1,密码错误');
                }
            }
            else{
                $this->error('登录失败,用户名不存在');
            }

        }
        elseif($info)
        {
            if($info['password']==md5($password))
            {
                session('id',$info['id']);
                session('truename',$truename);
                //登录时间存储
                
                //查询上次登录时间
                $denglu=$table->where('id="'.$info['id'].'"')->field('lastLoginTime')->find();
                if(!empty($denglu))  
                {  
                  //如果不为空，则取出上次登录时间  
                   
                  //cookie值lastLoginTime为全局上次登录时间
                  setcookie('lastLoginTime',$denglu['lastLoginTime'],time()+24*3600*365,'/'); 

                  $time=time();
                  $info3=$table->where('id',$info['id'])->update(['lastLoginTime'=>$time]);
                
                 //取出之后，再更新登录时间    
                 // 
                 }else{  
                
                 $info3=$table->where('id',$info['id'])->update(['lastLoginTime'=>$time]);    
                }  

                $this->assign('truename',$truename);
                $this->success('登录成功','Index/index');
            }
            else{
                $this->error('登录失败2,密码错误');
            }
        }
        else{
            $this->error('登录失败,用户名不存在');
        }

    }
    public function want_register()
    {
        return $this->fetch();
    }
    public function t_register()//老师注册页面；
    {
        return $this->fetch();
    }
    public function do_t_register()//执行老师注册页面；
    {
        $data=input('post.');
        //echo "<pre>";
        //print_r($data);
        $table=db('teacher');
        $sinfo=$table->where('telphone='.$data['telphone'])->find();//查找接收的手机号；
        //echo "<pre>";
        //print_r($sinfo);exit;
        $data['id']=$sinfo['id'];
        $pass=$data['password']==$data['rpassword'];
        if($sinfo && $pass!==false)//查找到手机号并且两次密码相等；
        {
            unset($data['rpassword']);
            $data['password']=md5($data['password']);
            $file=request()->file('photo');
            $fileinfo=$file->move(config('upload_path'));
            $data['photo']=$fileinfo->getSavename();
            $info=$table->update($data);//更新数据
            if($info!==false)
            {
                $this->success('Insert Success','Login/login');
            }
            else
            {
                $this->error('Insert Error');
            }
        }
        else
        {
            $this->error("手机号码不正确");
        }
    }
    public function f_register()//家长注册页面；
    {
        return $this->fetch();
    }
    public function do_f_register()//执行家长注册页面；
    {
        $data=input('post.');
        //echo "<pre>";
        //print_r($data);
        $table=db('family');
        $sinfo=$table->where('telphone='.$data['telphone'])->find();//查找接收的手机号；
        //echo "<pre>";
        //print_r($sinfo);exit;
        $data['id']=$sinfo['id'];
        $pass=$data['password']==$data['rpassword'];
        if($sinfo && $pass!==false)//查找到手机号并且两次密码相等；
        {
            unset($data['rpassword']);
            $data['password']=md5($data['password']);
            $file=request()->file('photo');
            $fileinfo=$file->move(config('upload_path'));
            $data['photo']=$fileinfo->getSavename();
            $info=$table->update($data);//更新数据
            if($info!==false)
            {
                $this->success('Insert Success','Login/login');
            }
            else
            {
                $this->error('Insert Error');
            }
        }
        else
        {
            $this->error("手机号码不正确");
        }
    }


}