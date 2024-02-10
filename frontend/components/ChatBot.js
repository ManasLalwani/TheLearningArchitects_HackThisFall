import React, { Component } from "react";

export default class ChatBot extends Component {
  componentDidMount() {

    // (function (d, m) {
    //     var kommunicateSettings = {
    //         "appId": "3cde40680ea73ccbb48af77d37c4ceb34",
    //         "onInit": function () {
    //             var iframeStyle = document.createElement('style');
    //             var classSettings = ".change-kommunicate-iframe-height{height:100%!important;width:100%!important;right:0!important;bottom:0!important;max-height: 100%!important;}";
    //             iframeStyle.type = 'text/css';
    //             iframeStyle.innerHTML = classSettings;
    //             document.getElementsByTagName('head')[0].appendChild(iframeStyle);
    //             var launcherIconStyle = "@media(min-width: 510px){.mck-sidebox.fade.in,.mck-box .mck-box-sm{width:100%; height:100%;max-height:100%!important;border-radius:0px!important;}.mck-sidebox{right:0!important;bottom:0!important;}}";
    //             Kommunicate.customizeWidgetCss(launcherIconStyle);

    //             var iframe = parent.document.getElementById("kommunicate-widget-iframe"),
    //                 launcher = KommunicateGlobal.document.getElementById('mck-sidebox-launcher'),
    //                 preChatPopup = KommunicateGlobal.document.querySelector('#chat-popup-widget-container .chat-popup-widget-text-wrapper'),
    //                 closeButton = KommunicateGlobal.document.getElementById('km-chat-widget-close-button');

    //             [launcher, preChatPopup].forEach(function (element) {
    //                 element && element.addEventListener('click', function () {
    //                     iframe.classList.add("change-kommunicate-iframe-height");
    //                 });
    //             });

    //             closeButton.addEventListener('click', function () {
    //                 iframe.classList.remove("change-kommunicate-iframe-height");
    //             });
    //         }
    //     };
    //     var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
    //     s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
    //     var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
    //     window.kommunicate = m; m._globals = kommunicateSettings;
    // })(document, window.kommunicate || {});

    (function(d, m){
        var kommunicateSettings = {"appId":"976f144fccb05b835704a68f045cbfce","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});
// </script>
  }
  render() {
    return <div></div>;
  }
}