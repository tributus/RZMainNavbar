/**
 * Created by anderson.santos on 13/05/2016.
 */
rz.widgets.RZMainNavbarRenderingWidgetHelper = {
    renderAppsMenu: function ($this, sb) {
        if ($this.params.ui.displayAppsMenu) {
            sb.appendFormat('        <div class="ui top right pointing dropdown item apps-button">');
            sb.appendFormat('            <div><i class="apps-icon"></i></div>');
            sb.appendFormat('            <div id="{0}appspopup" class="apps-contnt ui flowing basic admition popup top left transition hidden main-navbar-popup">',$this.params.elementID);
            sb.appendFormat('                <div class="dropdown-menu apps-menu">');
            sb.appendFormat('                    <div class="ui form">');
            sb.appendFormat('                        <div class="col-lg-12"><input id="{0}appSearchBox" type="text" class="form-control search-app-box" placeholder="{1}"></div>',$this.params.elementID,$this.params.language.searchBoxPlaceHolder);
            sb.appendFormat('                    </div>');
            sb.appendFormat('                    <div class="doubling stackable three column ui grid container found-apps-row-container">');

            sb.appendFormat('                        <div class="column"><a href="apps?appid=app1" class="app-button"><img src="http://localhost/img/app2.png"> <span>Clientes</span> </a></div>');
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
            sb.appendFormat('                        <div><span class="text-info">{0}</span></div>',$this.params.language.waitForAppsMessage);
            sb.appendFormat('                    </div>');
            sb.appendFormat('                    <div class="more-apps-label-container">');
            sb.appendFormat('                        <div class="user-name-label"><a href="#">{0}</a></div>',$this.params.language.moreApps);
            sb.appendFormat('                    </div>');
            sb.appendFormat('                </div>');
            sb.appendFormat('            </div>');
            sb.appendFormat('            <!--/Conteúdo do popup de apps -->');
            sb.appendFormat('        </div>'); //menu de apps
        }
    },
    renderUserMenu: function ($this, sb) {
        if ($this.params.ui.displayUserMenu) {
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
    }

};
