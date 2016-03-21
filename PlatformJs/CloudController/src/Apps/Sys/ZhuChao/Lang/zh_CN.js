/*
 * Cntysoft Cloud Software Team
 *
 * @author SOFTBOY <cntysoft@163.com>
 * @copyright  Copyright (c) 2010-2011 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * @license    http://www.cntysoft.com/license/new-bsd     New BSD License
 */
Ext.define("App.Sys.ZhuChao.Lang.zh_CN", {
   extend: "Cntysoft.Kernel.AbstractLangHelper",
   data: {
      PM_TEXT: {
         DISPLAY_TEXT: "凤凰筑巢运维",
         ENTRY: {
            WIDGET_TITLE: "欢迎使用凤凰筑巢运维应用",
            TASK_BTN_TEXT: "凤凰筑巢运维"
         },
         PACKAGE_REPO : {
            WIDGET_TITLE: "欢迎使用软件库管理应用",
            TASK_BTN_TEXT: "软件库管理"
         },
         NEW_DEPLOY : {
            WIDGET_TITLE: "欢迎使用凤凰筑巢全新部署管理应用",
            TASK_BTN_TEXT: "全新部署"
         },
         UPGRADE_DEPLOY : {
            WIDGET_TITLE: "欢迎使用凤凰筑巢升级部署管理应用",
            TASK_BTN_TEXT: "升级部署"
         }
      },
      WIDGET_NAMES: {
         SERVER_MGR : "服务器管理",
         PACKAGE_REPO : "程序包管理",
         NEW_DEPLOY : "全新部署",
         UPGRADE : "升级部署"
      },
      PACKAGE_REPO : {
         
      },
      NEW_DEPLOY : {
         BTN: {
            START: "开始部署系统",
            TARGET: "设置部署元信息",
            WITHOUT_DB : "不包含数据库"
         },
         COLS: {
            MSG: "操作信息"
         },
         LABEL: {
            VERSION: "目标版本号",
            SERVER_ADDRESS : "目标部署服务器"
         },
         MSG: {
            TARGET_VERSION_WIN_TITLE: "目标部署版本设置窗口",
            TARGET_VERSION_TEXT: "目标部署服务器 : {0} ,部署版本: {1}"
         }
      },
      UPGRADE_DEPLOY : {
         BTN: {
            START: "开始升级系统",
            TARGET: "设置升级元信息",
            FORCE : "强制升级",
            NO_UPGRADE_SCRIPT : "不运行升级脚本"
         },
         COLS: {
            MSG: "操作信息"
         },
         LABEL: {
            FROM_VERSION : "起始版本号",
            TO_VERSION: "目标版本号",
            SERVER_ADDRESS : "目标部署服务器"
         },
         MSG: {
            TARGET_VERSION_WIN_TITLE: "目标升级版本设置窗口",
            TARGET_VERSION_TEXT: "目标部署服务器 : {0} ,版本范围 : {1} -> {2}"
         }
      }
   }
});