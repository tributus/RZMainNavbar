/**
 * Created by anderson.santos on 20/06/2016.
 */
rz.widgets.extensions.extension("defaultUserMenuItemRendereWithLabel","rutezangada.widgets.RZMainNavbarWidget.MenuitemRenderer",function(data){
    return '* <div class="ui orange label menu-item-label">*</div>'.replace("*", data.text).replace("*", data.labelValue || "");
});