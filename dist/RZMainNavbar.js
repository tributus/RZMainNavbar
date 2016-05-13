/**
 * Created by anderson.santos on 11/05/2016.
 */
rz.widgets.RZMainNavbarWidgetHelper = {
    MainNavbarWidgetInterface : [],
    MainNavbarWidgetEventHandlers : []
};
/**
 * Created by anderson.santos on 13/05/2016.
 */
rz.widgets.RZMainNavbarRenderingWidgetHelper = {
    renderAppsMenu : function($this,sb){
        sb.appendFormat('        <div class="ui top right pointing dropdown item apps-button">');
        sb.appendFormat('            <div><i class="apps-icon"></i></div>');
        sb.appendFormat('            <!--Conteúdo do popup de apps-->');
        sb.appendFormat('            <div id="appspopup" class="apps-contnt ui flowing basic admition popup top left transition hidden main-navbar-popup">');
        sb.appendFormat('                <div class="dropdown-menu apps-menu">');
        sb.appendFormat('                    <div class="ui form">');
        sb.appendFormat('                        <div class="col-lg-12"><input id="appSearchBox" type="text" class="form-control search-app-box" placeholder="pesquisar apps"></div>');
        sb.appendFormat('                    </div>');
        sb.appendFormat('                    <div class="doubling stackable three column ui grid container found-apps-row-container">');

        sb.appendFormat('                        <div class="column"><a href="apps?appid=app1" class="app-button">img src="http://localhost/img/app2.png"> <span>Clientes</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=app2" class="app-button"><img src="http://localhost/img/app1.png">span>Fornecedores</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=app3" class="app-button"><img src="http://localhost/img/app3.png"><span>Contas a pagar</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=app4" class="app-button"><img src="http://localhost/img/app4.png"><span>Contas a receber</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=app5" class="app-button"><img src="http://localhost/img/app5.png"><span>Fluxo de caixa</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=app6" class="app-button"><img src="http://localhost/img/app6.png"><span>DRE</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=app7" class="app-button"><img src="http://localhost/img/app7.png"><span>Estoque</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=app8" class="app-button"><img src="http://localhost/img/app8.png"><span>Comissões</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=app9" class="app-button"><img src="http://localhost/img/app9.png"><span>Políticas de desconto</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=appa" class="app-button"><img src="http://localhost/img/app10.png">span>Entrada de mercadorias</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=appb" class="app-button"><img src="http://localhost/img/app12.png"><span>Pedidos de compra</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=appc" class="app-button"><img src="http://localhost/img/app11.png"><span>Orçamentos</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=appa" class="app-button"><img src="http://localhost/img/app10.png"><span>Entrada de mercadorias</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=appb" class="app-button"><img src="http://localhost/img/app12.png"><span>Pedidos de compra</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=appc" class="app-button"><img src="http://localhost/img/app11.png"><span>Orçamentos</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=appa" class="app-button"><img src="http://localhost/img/app10.png"><span>Entrada de mercadorias</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=appb" class="app-button"><img src="http://localhost/img/app12.png"><span>Pedidos de compra</span> </a></div>');
        sb.appendFormat('                        <div class="column"><a href="apps?appid=appc" class="app-button"><img src="http://localhost/img/app11.png"><span>Orçamentos</span> </a></div>');

        sb.appendFormat('                    </div>');
        sb.appendFormat('                    <div class="delay-message-row">');
        sb.appendFormat('                        <div><span class="text-info">por favor aguarde...</span></div>');
        sb.appendFormat('                    </div>');
        sb.appendFormat('                    <div class="more-apps-label-container">');
        sb.appendFormat('                        <div class="user-name-label"><a href="#">mais apps</a></div>');
        sb.appendFormat('                    </div>');
        sb.appendFormat('                </div>');
        sb.appendFormat('            </div>');
        sb.appendFormat('            <!--/Conteúdo do popup de apps -->');
        sb.appendFormat('        </div>'); //menu de apps

    },
    renderUserMenu:function ($this, sb) {
        sb.appendFormat('        <div class="ui top right pointing dropdown item user-button">');
        sb.appendFormat('            <div>AS</div>');
        sb.appendFormat('            <!--Conteúdo do popup-->');
        sb.appendFormat('            <div id="usermenupopup" class="usm-contnt ui flowing basic admition popup top left transition hidden main-navbar-popup">');
        sb.appendFormat('                <div class="ui equal width center aligned padded grid">');
        sb.appendFormat('                    <div class="row">');
        sb.appendFormat('                        <div class="column">');
        sb.appendFormat('                            <div class="user-picture-big">');
        sb.appendFormat('                                <div>AS</div>');
        sb.appendFormat('                            </div>');
        sb.appendFormat('                        </div>');
        sb.appendFormat('                        <div class="column">');
        sb.appendFormat('                            <div class="ui secondary vertical rz menu">');
        sb.appendFormat('                                <a class="item">');
        sb.appendFormat('                                    Meu perfil');
        sb.appendFormat('                                </a>');
        sb.appendFormat('                                <a class="item">');
        sb.appendFormat('                                    Mensagens');
        sb.appendFormat('                                    <div class="ui orange label">3</div>');
        sb.appendFormat('                                </a>');
        sb.appendFormat('                                <a class="item">');
        sb.appendFormat('                                    Sair');
        sb.appendFormat('                                </a>');
        sb.appendFormat('                            </div>');
        sb.appendFormat('                        </div>');
        sb.appendFormat('                    </div>');
        sb.appendFormat('                    <div class="rz-nopaded row">');
        sb.appendFormat('                        <div class="column">');
        sb.appendFormat('                            <div class="user-menu-footer">');
        sb.appendFormat('                                Anderson Norberto Santos');
        sb.appendFormat('                            </div>');
        sb.appendFormat('                        </div>');
        sb.appendFormat('                    </div>');
        sb.appendFormat('                </div>');
        sb.appendFormat('            </div>');
        sb.appendFormat('        </div>'); //menu de usuário
    }

};

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
    var executePostRenderScripts = function (options) {
        $('.apps-button').popup({popup: $('#appspopup'), on: 'click'});
        $('.user-button').popup({popup: $('#usermenupopup'), on: 'click'});

        var searchOptions = {
            dataSource: options.uiApiBaseUrl
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
            elementID: elementID,
            rootElementClass: "ui top attached main menu rz-navbar",          //css classes for root element

        };
        $this.params = $.extend(true, {}, defaultParams, params);
        initialized();
    };

    this.render = function (target, params) {
        var sb = new StringBuilder();
        sb.appendFormat('<div class="{0}">', $this.params.rootElementClass);
        sb.appendFormat('    <a class="navbar-brand" href="#">');
        sb.appendFormat('        <div class="brand"></div>');
        sb.appendFormat('    </a>');

        //menu direito
        sb.appendFormat('    <div class="right menu">');
        $this.renderHelpers.renderAppsMenu($this, sb);
        $this.renderHelpers.renderUserMenu($this, sb);

        sb.appendFormat('    </div>');
        sb.appendFormat('</div>');


        $("#" + target).html(sb.toString());
        executePostRenderScripts(params);
    }
});