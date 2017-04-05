<?php

/**
 * 数据库处理类
 * @className DateBase
 * @version 1.0
 * @datetime 2016-11-28T17:40:06+080
 * @author liyusky
 */
class DateBase
{
    public $base;                       //连接数据库后的PDO对象
    protected $site;                    //站点信息
    protected $username;                //用户名
    protected $password;                //密码
    protected $arguments;               //数据库需外部填入的所有字段
    protected $goals;                   //数据库预处理状态名称
    protected $device;                  //数据库预处理状态明细

    /**
     * [chooseDB 设置数据库参数].
     * @method   chooseDB
     * @param [type] $mark [false/调试环境，true/生产环境]
     * @version  [1.0]
     * @author liyusky
     * @datetime 2016-11-28T17:30:03+080
     */
    protected function chooseBase()
    {
        $_dbType        = 'mysql';
        $_host          = '127.0.0.1';
        $_dbName        = 'panjian';
        $this->username = 'root';
        $this->password = '123456';
        $this->site = $_dbType . ':host=' . $_host . ';dbname=' . $_dbName;
    }

    /**
     * [connect 创建数据库连接对象].
     * @method   connect
     * @version  [1.0]
     * @author liyusky
     * @datetime 2016-11-28T17:35:07+080
     */
    protected function connectBase()
    {
        try {
            $this->base = new PDO($this->site, $this->username, $this->password);
            $this->base->query("SET NAMES 'UTF8';");
        } catch (Exception $e) {
            die('Error!: '.$e->getMessage().'<br />');
        }
    }

    /**
     * [disposeEffect 架设所有数据库功能]
     * @method   disposeEffect
     * @version  [1.0]
     * @author liyusky
     * @datetime 2017-01-10T16:30:39+080
     */
    protected function disposeEffect()
    {
        foreach ($this->device as $_role => $_proviso) {
            if ($_proviso['mark']) {
                $this->loadSQL($_role, $_proviso);
            }
        }
    }

    /**
     * [loadSQL 加载单个数据库处理]
     * @method   loadSQL
     * @param    [string]                  $Role    [功能名称]
     * @param    [array]                  $Proviso [数据库处理内容]
     * @version  [1.0]
     * @author liyusky
     * @datetime 2017-01-10T16:33:01+080
     */
    protected function loadSQL($Role, $Proviso)
    {
        try {
            $this->base->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->base->beginTransaction();
            $_prepareObj        = $this->base->prepare($Proviso['sql']);
            foreach ($Proviso['data'] as $_sign) {
                $_prepareObj->bindParam(':' . $_sign, $this->arguments[$_sign]);
            }
            $this->base->commit();
            $this->goals[$Role] = $_prepareObj;
        }
        catch (Exception $e) {
            $this->base->rollBack();
            die('Error!: '.$e->getMessage().'<br />');
        }
    }

    /**
     * [executeBase 执行对数据库功能]
     * @method   executeBase
     * @param    [array]                  $argument [参数数组]
     * @return   [boolean]                          [执行成功：true / 执行失败：false]
     * @version  [1.0]
     * @author liyusky
     * @datetime 2016-12-17T13:42:47+080
     */
    public function executeBase($Parameters)
    {
        $_role  = $Parameters['role'];
        foreach ($Parameters['data'] as $_key => $_value) {
            $this->arguments[$_key] = $_value;
        }
        $_flag = $this->goals[$_role]->execute();
        return $_flag;
    }

    /**
     * [getAllData 获取所有数据 ]
     * @method   getAllData
     * @param    [array]                  $Parameters [操作所需数据]
     * @return   [array]                              [数据库数据]
     * @version  [1.0]
     * @author liyusky
     * @datetime 2017-01-10T16:35:54+080
     */
    public function getAllData($Parameters)
    {
        $this->executeBase($Parameters);
        $_result = $this->goals[$Parameters['role']]->fetchAll(PDO::FETCH_ASSOC);
        return $_result;
    }

    /**
     * [getNextData 获取下一条数据]
     * @method   getNextData
     * @param    [array]                  $Parameters [操作所需数据]
     * @return   [array]                              [数据库数据]
     * @version  [1.0]
     * @author liyusky
     * @datetime 2017-01-10T16:37:31+080
     */
    public function getNextData($Parameters)
    {
        $this->executeBase($Parameters);
        $_result = $this->goals[$Parameters['role']]->fetch(PDO::FETCH_ASSOC);
        return $_result;
    }
}
