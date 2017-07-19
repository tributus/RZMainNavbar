/**
 * Created by anderson.santos on 11/05/2016.
 */
rz.widgets.RZMainNavbarWidgetHelper = {
    MainNavbarWidgetInterface : [],
    MainNavbarWidgetEventHandlers : ["usermenuitemclick"]
};
/**
 * Created by anderson.santos on 13/05/2016.
 */
rz.widgets.RZMainNavbarRenderingWidgetHelper = {
    renderAppsMenu: function ($this, sb) {
        if ($this.params.ui.displayAppsMenu) {
            sb.appendFormat('        <div class="ui top right pointing dropdown item apps-button rz-navbar-button">');
            sb.appendFormat('            <div><i class="apps-icon"></i></div>');
            sb.appendFormat('            <div id="{0}appspopup" class="apps-contnt ui flowing basic admition popup top left transition hidden main-navbar-popup">',$this.params.elementID);
            sb.appendFormat('                <div class="dropdown-menu apps-menu">');
            sb.appendFormat('                    <div class="ui form">');
            sb.appendFormat('                        <div class="col-lg-12"><input id="{0}appSearchBox" type="text" class="form-control search-app-box" placeholder="{1}"></div>',$this.params.elementID,$this.params.language.searchBoxPlaceHolder);
            sb.appendFormat('                    </div>');
            sb.appendFormat('                    <div class="doubling stackable three column ui grid container found-apps-row-container of-{0}">',$this.params.elementID);

            sb.appendFormat('                    </div>');
            sb.appendFormat('                    <div class="delay-message-row">');
            sb.appendFormat('                       <div class="ui label wait-label">');
            sb.appendFormat('                           <div class="ui active inline small loader"></div>');
            sb.appendFormat('                           <span>{0}</span>',$this.params.language.waitForAppsMessage);
            sb.appendFormat('                       </div>');


            sb.appendFormat('                    </div>');
            sb.appendFormat('                    <div class="more-apps-label-container">');
            sb.appendFormat('                        <div class="user-name-label"><a href="#">{0}</a></div>',$this.params.language.moreApps);
            sb.appendFormat('                    </div>');
            sb.appendFormat('                </div>');
            sb.appendFormat('            </div>');
            sb.appendFormat('        </div>');
        }
    },
    renderUserMenu: function ($this, sb) {
        if ($this.params.ui.displayUserMenu && $this.params.userMenuItems !==undefined && $this.params.userMenuItems.length > 0) {
            var uspic = rz.widgets.RZMainNavbarRenderingWidgetHelper.resolveUserPicture($this);
            sb.appendFormat('        <div class="ui top right pointing dropdown item user-button rz-navbar-button">');
            sb.appendFormat('            <div>{0}</div>', uspic);
            sb.appendFormat('            <div id="{0}usermenupopup" class="usm-contnt ui flowing basic admition popup top left transition hidden main-navbar-popup">',$this.params.elementID);
            sb.appendFormat('                <div class="ui equal width center aligned padded grid">');
            sb.appendFormat('                    <div class="row">');
            sb.appendFormat('                        <div class="column">');
            sb.appendFormat('                            <div class="user-picture-big">');
            sb.appendFormat('                                <div>{0}</div>',uspic);
            sb.appendFormat('                            </div>');
            sb.appendFormat('                        </div>');
            sb.appendFormat('                        <div class="column">');
            sb.appendFormat('                            <div class="ui secondary vertical rz menu">');

            var idx = 0;
            $this.params.userMenuItems.forEach(function(item){
                var renderer = undefined;
                if(item.renderer===undefined){
                    renderer = rz.widgets.extensions.getExtension("defaultUserMenuItemRenderer", "rutezangada.widgets.RZMainNavbarWidget.MenuitemRenderer");
                }
                else{
                    if(typeof(item.renderer)=="string"){
                        renderer = rz.widgets.extensions.getExtension(item.renderer, "rutezangada.widgets.RZMainNavbarWidget.MenuitemRenderer");
                    }
                    else{
                        renderer = item.renderer;
                    }
                }

                sb.appendFormat('<a id="{1}_usermenuitem_{2}" data-action="{3}" class="item usermenuitem" data-behaviors="{4}">{0}</a>',
                    renderer(item),
                    $this.params.elementID,
                    idx++,
                    item.action,
                    item.behaviors || ""
                );
            });
            sb.appendFormat('                            </div>');
            sb.appendFormat('                        </div>');
            sb.appendFormat('                    </div>');
            sb.appendFormat('                    <div class="rz-nopaded row">');
            sb.appendFormat('                        <div class="column">');
            sb.appendFormat('                            <div class="user-menu-footer">');
            sb.appendFormat('                                {0}',$this.params.userInfo.fullName);
            sb.appendFormat('                            </div>');
            sb.appendFormat('                        </div>');
            sb.appendFormat('                    </div>');
            sb.appendFormat('                </div>');
            sb.appendFormat('            </div>');
            sb.appendFormat('        </div>'); //menu de usuário
        }
    },
    renderAppList : function ($this,searchResult, status, sender, page) {
        var getBase64RowData = function(data){
            return btoa(JSON.stringify(data));
        }
        var resolveHref = function(data){
            if(typeof $this.params.onAppClick=="function"){
                return "#";
            }
            else{
                var url = $this.params.onAppClick;
                for(var prop in data){
                    var regexp = new RegExp("{" + prop + "}","g");
                    url = url.replace(regexp,(data[prop] || ""));
                }
                return url;
            }
        }
        if (status == "success") {
            if (searchResult !== undefined && searchResult.length > 0) {
                var sb = new StringBuilder();
                var itemCount = 0;
                searchResult.forEach(function (row) {
                    if (itemCount++ == 0) {
                        sb.append('<div class="row found-apps-row">');
                    }
                    sb.appendFormat('<div class="column">');

                    sb.appendFormat('    <a href="{0}" class="app-button" data-appdata={1}>',resolveHref(row),getBase64RowData(row));

                    if(row.iconurl){
                        sb.appendFormat('        <div class="img" style="background:url(\'{0}\')"></div>', row.iconurl);
                    }
                    else{
                        sb.appendFormat('        <div class="img"></div>');
                    }
                    sb.appendFormat('        <span>{0}</span>', row.label);
                    sb.appendFormat('    </a>');
                    sb.appendFormat('</div>');

                    if (itemCount == 3) {
                        sb.append('</div>');
                        itemCount = 0;
                    }
                });
                if (page > 0) {
                    $(".of-" + $this.params.elementID + ".found-apps-row-container").append(sb.toString());
                }
                else {
                    $(".of-" + $this.params.elementID + ".found-apps-row-container").html(sb.toString());
                }
            }
            else {
                if (page > 0) {
                    sender.foo = "bah";
                }
                else {
                    $(".of-" + $this.params.elementID + ".found-apps-row-container").html('<p class="not-found-message">'+$this.params.language.notfound+'</p>');
                }
            }
        }
        else {
            var sb = new StringBuilder();
            sb.appendFormat('<div class="ui orange label large apps-search-error-message">');
            sb.appendFormat('<i class="warning circle icon ic" aria-hidden="true"></i>');
            sb.appendFormat('<span>{0}</span>',$this.params.language.loadapperror);
            sb.appendFormat('</div>');


            $(".found-apps-row-container").html(sb.toString());
        }
        $(".delay-message-row").fadeOut(300);
    },
    resolveUserPicture:function ($this) {
        if($this.params.userInfo.userPicture===undefined){
            return (function(s){
                var avoidable =$this.params.language.avoidable2;
                while(avoidable.indexOf(s.substr(0,2)) != -1){
                    s = s.substr(1);
                }
                return s
            })($this.params.userInfo.fullName + "??").toUpperCase().substr(0,2);
        }
        else{
            return '<img src="*">'.replace("*",$this.params.userInfo.userPicture);
        }
    }

};

/**
 * Created by anderson.santos on 11/05/2016.
 */
rz.widgets.MainNavbarWidget = ruteZangada.widget("rzMainNavbar", rz.widgets.RZMainNavbarWidgetHelper.MainNavbarWidgetInterface, rz.widgets.RZMainNavbarWidgetHelper.MainNavbarWidgetEventHandlers, function () {
    var $this = this;
    $this.renderHelpers = rz.widgets.RZMainNavbarRenderingWidgetHelper;
    this.initialize = function (params, initialized) {
        var elementID = generateRandomID(8);
        var defaultParams = {
            elementID: elementID,                                           //root element id
            uiApiBaseUrl:"http://localhost:3000/api/apps",                  //default api url
            brandNavUrl:"#",                                                //url for brand link
            onAppClick:"apps?appid={appuid}",                               //url to navigate after app menuitem click. (you can use a function here)
            userInfo:{                                                      //logged user info
                fullName:"unknown user",
                userPicture:undefined,
                userName:undefined
            },
            ui: {
                rootElementClass: "ui top attached main menu",              //css classes for root element
                appsButtonRenderer:$this.renderHelpers.renderAppsMenu,      //render app menu method
                userMenuRenderer:$this.renderHelpers.renderUserMenu,        //render user menu
                appsListRenderer:$this.renderHelpers.renderAppList,
                displayAppsMenu:true,                                       //defines if apps menu will be displayed
                displayUserMenu:true                                       //defines if user menu will be displayed
            },
            language:{
                avoidable2:"cusspt",
                searchBoxPlaceHolder:"search for apps",
                waitForAppsMessage:"please wait...",
                moreApps:"more apps",
                notfound:"no items found",
                loadapperror:"an error has ocurred when searching for apps. Try again in few seconds. If the problem remains, contact technical support."
            },
            userMenuItems:[]
        };
        $this.params = $.extend(true, {}, defaultParams, params);
        initialized();
    };

    this.render = function (target) {
        var sb = new StringBuilder();
        sb.appendFormat('<div id="{0}" class="{1} rz-navbar">', $this.params.elementID ,$this.params.ui.rootElementClass);
        sb.appendFormat('    <a class="navbar-brand" href="{0}"><div class="brand"></div></a>', $this.params.brandNavUrl);
        //right menu
        sb.appendFormat('    <div class="right menu">');
        $this.params.ui.appsButtonRenderer($this, sb);
        $this.params.ui.userMenuRenderer($this, sb);
        sb.appendFormat('    </div>');
        sb.appendFormat('</div>');

        $("#" + target).html(sb.toString());
        executePostRenderScripts();
    };

    var hasBehavior = function(behavior,el){
        return getBehaviors(el).indexOf(behavior) != -1;
    };
    var getBehaviors = function (el) {
        var b = $(el.currentTarget).data("behaviors");
        if(b===undefined){
            return [];
        }
        else{
            return b.split(";");
        }
    };

    var executePostRenderScripts = function () {
        if($this.params.ui.displayUserMenu){
            $('#' + $this.params.elementID + ' .user-button').popup({popup: $('#' + $this.params.elementID +'usermenupopup'), on: 'click'});
            $('#' + $this.params.elementID + ' .usermenuitem').click(function(e){
                var action = $(e.currentTarget).data("action");
                if(action !==undefined){
                    if(!hasBehavior("no-hide-popup-when-click",e)){
                        $('#' + $this.params.elementID + ' .user-button').popup('hide');
                    }
                    $this.raiseEvent("usermenuitemclick",{action:action,behaviors:getBehaviors(e)},$this);
                }
            });
        }

        if($this.params.ui.displayAppsMenu){
            $('#' + $this.params.elementID + ' .apps-button').popup({popup: $('#'+ $this.params.elementID + 'appspopup'), on: 'click'});
            var searchOptions = {
                dataSource: $this.params.uiApiBaseUrl
                , keySource: "#"+$this.params.elementID+"appSearchBox"
                , renderResultsMethod: function (searchResult, status, sender, page){
                    $this.params.ui.appsListRenderer($this,searchResult, status, sender, page);
                }
                , pageSize: 12
                , enableInfiniteScroll: true
                , targetResultElement: ".found-apps-row-container"
                , delayed: function () {
                    $(".delay-message-row").fadeIn(300);
                }
            };
            var appSearcher = new rz.plugins.SearchDataPlugin(searchOptions);
            appSearcher.searchData("");
            if(typeof $this.params.onAppClick=="function"){
                $('#' + $this.params.elementID + ' .app-button').click(function(el){
                    var iel = $(el.currentTarget);
                    var appData = iel.data("appdata");
                    try{
                        appData = JSON.parse(atob(appData));
                        typeof $this.params.onAppClick($this,appData);
                    }
                    catch(ex){
                        console.warn("invalid app data",ex);
                    }
                })
            }
        }
    };
});