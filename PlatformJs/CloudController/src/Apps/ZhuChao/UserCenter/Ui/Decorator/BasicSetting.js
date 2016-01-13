/*
 * Cntysoft Cloud Software Team
 * 
 * @author Arvin <cntyfeng@163.com>
 * @copyright  Copyright (c) 2010-2015 Cntysoft Technologies China Inc. <http://www.cntysoft.com>
 * @license   Expression $license is undefined on line 6, column 17 in Templates/ClientSide/javascript.js.
 */
Ext.define('App.ZhuChao.UserCenter.Ui.Decorator.BasicSetting', {
   extend : 'Ext.form.Panel',
   mixins: {
      langTextProvider: 'WebOs.Mixin.RunableLangTextProvider',
      formTooltip: 'Cntysoft.Mixin.FormTooltip'
   },
   /*
    * {@link WebOs.Mixin.RunableLangTextProvider#property-runableLangKey}
    */
   runableLangKey : 'App.ZhuChao.UserCenter',
   
   constructor : function(config)
   {
      config = config || {};
      this.LANG_TEXT = this.GET_LANG_TEXT('UI.DECORATOR.BASIC_SETTING');
      this.mixins.formTooltip.constructor.call(this);
      this.applyConstraintConfig(config);
      this.callParent([config]);
   },

   applyConstraintConfig : function(config)
   {
      Ext.apply(config, {
         border : false,
         bodyPadding : 10,
         title : this.LANG_TEXT.TITLE,
         autoScroll : true,
         autoRender : true
      });
   },

   initComponent : function()
   {
      Ext.apply(this, {
         items : this.getItemsConfig(),
         defaults : {
            labelWidth : 200,
            minWidth : 500,
            listeners : this.getFormItemListener()
         },
         listeners : {
            afterrender : function(){
               if(this.responseData){
                  this.applyInfoValue(this.responseData);
               }
            },
            scope : this
         }
      });
      this.callParent();
   },
   
   getFormItemListener : function()
   {
      return {
         afterrender : function(comp)
         {
            this.mixins.formTooltip.setupTooltipTarget.call(this, comp);
         },
         scope : this
      };
   },
   
   getItemsConfig : function()
   {
      var F = this.LANG_TEXT.FIELDS;
      var T = this.LANG_TEXT.TOOLTIP_TEXT;
      return [{
            xtype : 'fieldcontainer',
            layout : 'hbox',
            fieldLabel : F.PCD,
            defaults : {
               margin : '0 10 0 0'
            },
            items : [{
               xtype : 'combo',
               name : 'province',
               queryMode: 'local',
               displayField: 'name',
               valueField: 'code',
               store : Ext.create('Ext.data.Store', {
                  fields : ['name', 'code']
               }),
               editable : false,
               emptyText : F.EMPTY_TEXT,
               listeners : {
                  afterrender : function(combo){
                     this.provinceRef = combo;
                     this.mainPanelRef.appRef.getProvinces(function(response){
                        combo.getStore().loadData(response.data);
                        if(this.responseData && this.responseData['province']){
                           combo.setValue(this.responseData['province']);
                        }
                     }, this);
                  },
                  change : function(combo, newValue){
                     this.mainPanelRef.appRef.getArea(newValue, function(response){
                        this.cityRef.getStore().loadData(response.data);
                        if(this.responseData && newValue == this.responseData['province']){
                           this.cityRef.setValue(this.responseData['city']);
                        }else{
                           this.cityRef.setValue('');
                        }
                     }, this);
                  },
                  scope : this
               }
            },{
               xtype : 'combo',
               name : 'city',
               queryMode: 'local',
               displayField: 'name',
               valueField: 'code',
               store : Ext.create('Ext.data.Store', {
                  fields : ['name', 'code']
               }),
               editable : false,
               emptyText : F.EMPTY_TEXT,
               listeners : {
                  afterrender : function(combo){
                     this.cityRef = combo;
                  },
                  change : function(combo, newValue){
                     this.mainPanelRef.appRef.getArea(newValue, function(response){
                        this.districtRef.getStore().loadData(response.data);
                        if(this.responseData && newValue == this.responseData['city']){
                           this.districtRef.setValue(this.responseData['district']);
                        }else{
                           this.districtRef.setValue('');
                        }
                     }, this);
                  },
                  scope : this
               }
            },{
               xtype : 'combo',
               name : 'district',
               queryMode: 'local',
               displayField: 'name',
               valueField: 'code',
               store : Ext.create('Ext.data.Store', {
                  fields : ['name', 'code']
               }),
               editable : false,
               emptyText : F.EMPTY_TEXT,
               listeners : {
                  afterrender : function(combo){
                     this.districtRef = combo;
                  },
                  scope : this
               }
            }]
         }, {
            xtype : 'textfield',
            fieldLabel : F.ADDRESS,
            width : 700,
            name : 'address'
         }, {
            xtype : 'radiogroup',
            fieldLabel : F.IS_AUTHED,
            width : 500,
            items: [
               { boxLabel: F.AUTH_NOT, name: 'isAuthed', inputValue: 1, checked: true},
               { boxLabel: F.AUTHED, name: 'isAuthed', inputValue: 2 }
            ]
         }, {
            xtype : 'numberfield',
            fieldLabel : F.BOND,
            minValue : 1000,
            value : 1000,
            name : 'bond',
            maxValue : 1000000
         }, {
            xtype : 'textfield',
            fieldLabel : F.TELEPHONE,
            name : 'telephone',
            toolTipText : T.TELEPHONE
         }, {
            xtype : 'textarea',
            fieldLabel : F.INTRO,
            name : 'intro',
            width : 800,
            height : 80
         }, {
            xtype : 'textarea',
            fieldLabel : F.INTRODUCTION,
            name : 'introduction',
            width : 800,
            height : 200
         }, {
            xtype : 'textarea',
            fieldLabel : F.LINK_US,
            name : 'linkUs',
            width : 800,
            height : 200
         }];
   },
   
   getInfoValues : function()
   {
      var values = {};
      if(!this.rendered && this.responseData){
         var list = ['province', 'city', 'district', 'address', 'isAuthed', 'bond', 'telephone', 'intro', 'introduction', 'linkUs'];
         var len = list.length;
         for(var i = 0; i < len; i++){
            var name = list[i];
            values[name] = this.responseData[name];
         }
      }else{
         values = this.getForm().getValues();
      }
      
      return values;
   },
   
   applyInfoValue : function(values)
   {
      if(!this.rendered){
         this.responseData = values;
      }else{
         var filter = ['province', 'city', 'district'];
         var valueClone = Ext.clone(values);
         Ext.Object.each(valueClone, function(key, val){
            if(Ext.Array.contains(filter, key)){
               delete valueClone[key];
            }
         },this);

         this.getForm().setValues(valueClone);
      }
   },
   
   isInfoValid : function()
   {
      return this.getForm().isValid();
   },
   
   destroy : function()
   {
      delete this.appRef;
      delete this.responseData;
      delete this.provinceRef;
      delete this.cityRef;
      delete this.districtRef;
      this.mixins.langTextProvider.destroy.call(this);
      this.callParent();
   }
});

