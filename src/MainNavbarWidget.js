/**
 * Created by anderson.santos on 11/05/2016.
 */
rz.widgets.MainNavbarWidget = ruteZangada.widget("rzMainNavbar", rz.widgets.RZMainNavbarWidgetHelper.MainNavbarWidgetInterface, rz.widgets.RZMainNavbarWidgetHelper.MainNavbarWidgetEventHandlers, function () {
    var $this = this;
    $this.renderHelpers = rz.widgets.RZMainNavbarRenderingWidgetHelper;
    var renderAppList = function (searchResult, status, sender, page) {
        if (status == "success") {
            if (searchResult !== undefined && searchResult.length > 0) {
                var sb = new StringBuilder();
                var itemCount = 0;
                searchResult.forEach(function (row) {
                    if (itemCount++ == 0) {
                        sb.append('<div class="row found-apps-row">'); //FFOFOFOFOFOFOFOF style="display: none;"
                    }

                    sb.appendFormat('<div class="col-lg-4">');
                    sb.appendFormat('    <a href="apps?appid={0}" class="app-button">', row.appuid);
                    sb.appendFormat('        <img src="{0}">', row.iconurl);
                    sb.appendFormat('        <span>{0}</span>', row.label);
                    sb.appendFormat('    </a>');
                    sb.appendFormat('</div>');

                    if (itemCount == 3) {
                        sb.append('</div>');
                        itemCount = 0;
                    }
                });
                if (page > 0) {
                    $(".found-apps-row-container").append(sb.toString());
                }
                else {
                    $(".found-apps-row-container").html(sb.toString());
                    //FFOFOFOFOFOFOFOF  $(".found-apps-row-container .row").fadeIn(300);
                }
            }
            else {
                if (page > 0) {
                    sender.foo = "bah";
                }
                else {
                    $(".found-apps-row-container").html('<p class="not-found-message">nenhum item encontrado</p>');
                }
            }
        }
        else {
            var sb = new StringBuilder();
            sb.append('<div class="ui orange label large apps-search-error-message">');
            sb.append('<i class="warning circle icon ic" aria-hidden="true"></i>');
            //sb.append('<span class="sr-only">Error:</span>');
            sb.append('ocorreu um erro ao pesquisar aplicativos. Tente novamente em alguns segundos. Se o problema persistir, contacte o suporte técnico.');
            sb.append('</div>');


            $(".found-apps-row-container").html(sb.toString());
        }
        //$(".delay-message-row").removeClass("visible");
        $(".delay-message-row").fadeOut(300);
    };
    var executePostRenderScripts = function () {
        $('.apps-button').popup({popup: $('#'+$this.params.elementID + 'appspopup'), on: 'click'});
        $('.user-button').popup({popup: $('#usermenupopup'), on: 'click'});

        var searchOptions = {
            dataSource: $this.params.uiApiBaseUrl
            , keySource: "#appSearchBox"
            , renderResultsMethod: renderAppList
            , pageSize: 12
            , enableInfiniteScroll: true
            , targetResultElement: ".found-apps-row-container"
            , delayed: function () {
                //$('.found-apps-row-container > .row').fadeOut(300, function(){ $(this).remove();});
                $(".delay-message-row").fadeIn(300);
                //$(".found-apps-row-container").html("");
                //$(".delay-message-row").addClass("visible");
            }
        };
        var appSearcher = new rz.plugins.SearchDataPlugin(searchOptions);
        appSearcher.searchData("");
    };

    this.initialize = function (params, initialized) {
        var elementID = generateRandomID(8);
        var defaultParams = {
            elementID: elementID,                                           //root element id
            uiApiBaseUrl:"http://localhost:3000/api/apps",                  //default api url
            brandNavUrl:"#",                                                //url for brand link
            ui: {
                rootElementClass: "ui top attached main menu",              //css classes for root element
                appsButtonRenderer:$this.renderHelpers.renderAppsMenu,      //render app menu method
                userMenuRenderer:$this.renderHelpers.renderUserMenu,        //render user menu
                displayAppsMenu:true,                                       //defines if apps menu will be displayed
                displayUserMenu:true                                       //defines if user menu will be displayed
            },
            language:{
                searchBoxPlaceHolder:"search for apps",
                waitForAppsMessage:"please wait...",
                moreApps:"more apps"
            }
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
    }
});