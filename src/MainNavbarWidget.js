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