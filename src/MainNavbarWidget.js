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
            userInfo:{                                                      //logged user info
                fullName:"unknow user",
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

    var executePostRenderScripts = function () {
        if($this.params.ui.displayUserMenu){
            $('#' + $this.params.elementID + ' .user-button').popup({popup: $('#' + $this.params.elementID +'usermenupopup'), on: 'click'});
            $('#' + $this.params.elementID + ' .usermenuitem').click(function(e){
                var action = $(e.currentTarget).data("action");
                if(action !==undefined){
                    $this.raiseEvent("usermenuitemclick",{action:action},$this);
                }

                //return false;
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
        }
    };
});