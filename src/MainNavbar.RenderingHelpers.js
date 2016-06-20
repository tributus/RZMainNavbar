/**
 * Created by anderson.santos on 13/05/2016.
 */
rz.widgets.RZMainNavbarRenderingWidgetHelper = {
    userMenuitemRenderers:{},
    createUserMenuitemRenderers: function (n, d) {
        this.userMenuitemRenderers[n] = d;
    },
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
                    renderer = $this.renderHelpers.userMenuitemRenderers["defaultUserMenuItemRenderer"];
                }
                else{
                    if(typeof(item.renderer)=="string"){
                        renderer = $this.renderHelpers.userMenuitemRenderers[item.renderer];

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
        if (status == "success") {
            if (searchResult !== undefined && searchResult.length > 0) {
                var sb = new StringBuilder();
                var itemCount = 0;
                searchResult.forEach(function (row) {
                    if (itemCount++ == 0) {
                        sb.append('<div class="row found-apps-row">');
                    }
                    sb.appendFormat('<div class="column">');
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
