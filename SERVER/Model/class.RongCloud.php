<?php
include 'D:\SKILL\PROJECT\SOCKETDEMO\SERVER\Model\class.datebase.php';

class RongCloud extends DateBase{

    function __construct()
    {
        $this->arguments = array(           //数据库需外部填入的所有字段
            'userId'      => null,
            'name'      => null,
            'token'    => null,
            'role'   => null,
        );
        $this->goals     = array(           //数据库预处理状态名称
            'tokenInsert' => null,
            'tokenSelect' => null
        );
        $this->device    = array(           //数据库预处理状态明细
            'tokenInsert' => array(         //将注册数据插入temp表
                'mark' => true,
                'sql'  => '
                    INSERT INTO rongcloud(userId, name, token, role)
                    VALUES (:userId, :name, :token, :role);
                ',
                'data' => array("userId", "name", "token", "role"),
            ),
            'tokenSelect' => array(         //将注册数据插入temp表
                'mark' => true,
                'sql'  => '
                    SELECT token FROM rongcloud WHERE userId = :userId;
                ',
                'data' => array("userId"),
            )
        );
        $this->chooseBase();
        $this->connectBase();
        $this->disposeEffect();
    }
}
 ?>
