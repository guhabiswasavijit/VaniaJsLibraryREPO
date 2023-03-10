// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {
        type: type,
    });
    if (window.navigator.msSaveOrOpenBlob)
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function format(node, level) {
    var indentBefore = new Array(level++ + 1).join("  "),
        indentAfter = new Array(level - 1).join("  "),
        textNode;

    for (var i = 0; i < node.children.length; i++) {
        textNode = document.createTextNode("\n" + indentBefore);
        node.insertBefore(textNode, node.children[i]);

        format(node.children[i], level);

        if (node.lastElementChild == node.children[i]) {
            textNode = document.createTextNode("\n" + indentAfter);
            node.appendChild(textNode);
        }
    }

    return node;
}

var dialogConfig = {
    title: "About",
    body: {
        type: "panel",
        items: [
            {
                type: "htmlpanel",
                html: '<h2>HTMEditor Version 0.5</h2>Online Free WYSIWYG HTML Editor.<br><a href="https://htmeditor.com" target="_blank"><b>HTM</b>Editor.com</a><br><br>Built on the <a href="https://www.tiny.cloud/docs/" target="_blank">Tinymce Version 5</a> engine.<br><a href="https://www.tiny.cloud/docs/" target="_blank">https://www.tiny.cloud</a>',
            }
        ],
    },
    buttons: [
        {
            type: "cancel",
            name: "closeButton",
            text: "OK"
        },
    ],
    initialData: {},
    onSubmit: function (api) {
        api.close();
    },
}

var Init = function(htmeditor_textarea, full_screen = false, editor_height = 480) {
    //Reszie the editor when the window is resized

    if (full_screen == "yes") {
        window.onresize = function () {
            tinymce.activeEditor.editorContainer.style.height = window.innerHeight + "px";
            tinymce.activeEditor.editorContainer.style.width = window.innerWidth + "px";
        };
    }

    tinymce.init({
        //Do not remove new lines
        apply_source_formatting: false,
        remove_linebreaks: false,
        verify_html: false,

        //Disable quick insert popup
        quickbars_insert_toolbar: "",

        branding: false,
        selector: "textarea#" + htmeditor_textarea,
        plugins:
            "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
        imagetools_cors_hosts: ["picsum.photos"],

        toolbar:
            "preview | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | table | undo redo | bold italic underline strikethrough | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | print | insertfile image media template link anchor codesample | ltr rtl",

        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: "30s",
        autosave_prefix: "{path}{query}-{id}-",
        autosave_restore_when_empty: false,
        autosave_retention: "2m",
        image_advtab: true,

        //Set the bootstrap style
        content_css: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",

        //Set the content padding
        content_style: "body {padding: 10px}",


        //Set the htmeditor custom
        menu: {
            custom_file: {
                title: "File",
                items: "newdocument basicitem | openfile saveas  | code preview | print",
            },
            custom_tools: {
                title: "Tools",
                items: "code wordcount | convert_to_app | recommended_hosting",
            },
            custom_help: {
                title: "Help",
                items: "help | costum_about",
            },
        },

        //Create the menu
        menubar: "custom_file edit view insert format custom_tools table, custom_help",

        importcss_append: true,

        mobile: {
            theme: 'silver',
            plugins:
                "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
            toolbar:
                "preview | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | table | undo redo | bold italic underline strikethrough | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | print | insertfile image media template link anchor codesample | ltr rtl",

            //Create the menu
            menubar: "custom_file edit view insert format custom_tools table, custom_help"
        },

        file_picker_callback: function (callback, value, meta) {
            /* Provide file and text for the link dialog */
            if (meta.filetype === "file") {
                callback("https://www.google.com/logos/google.jpg", {
                    text: "My text",
                });
            }

            /* Provide image and alt text for the image dialog */
            if (meta.filetype === "image") {
                callback("https://www.google.com/logos/google.jpg", {
                    alt: "My alt text",
                });
            }

            /* Provide alternative source and posted for the media dialog */
            if (meta.filetype === "media") {
                callback("movie.mp4", {
                    source2: "alt.ogg",
                    poster: "https://www.google.com/logos/google.jpg",
                });
            }
        },
        templates: [
            {
                title: "New Table",
                description: "creates a new table",
                content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
            },
            {
                title: "Starting my story",
                description: "A cure for writers block",
                content: "Once upon a time...",
            },
            {
                title: "New list with dates",
                description: "New List with dates",
                content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
            },
        ],
        template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
        template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",

        image_caption: true,
        quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
        noneditable_noneditable_class: "mceNonEditable",
        toolbar_mode: "sliding",
        contextmenu: "link image imagetools table",

        //Set the height
        height: parseInt(editor_height),
    
    mode : "none",

    
        setup: function (editor) {
            editor.ui.registry.addMenuItem("basicitem", {
                text: "New window document",
                icon: "duplicate",
                onAction: function () {
                    window.open("/author/", "_blank");
                },
            });
            editor.ui.registry.addMenuItem("openfile", {
                text: "Open File",
                icon: "browse",
                onAction: function () {
                    const fileSelector = document.getElementById("htmeditor-file-input-open-file");
                    fileSelector.addEventListener("change", (event) => {
                        const fileList = event.target.files;

                        var file = fileList[0];

                        if (file.type == "text/html") {
                            const reader = new FileReader();
                            reader.addEventListener("load", (event) => {
                                tinymce.activeEditor.setContent(event.target.result);
                            });
                            reader.readAsText(file, "UTF-8");
                        }
                    });

                    document.getElementById("htmeditor-file-input-open-file").click();
                },
            });

            editor.ui.registry.addMenuItem("saveas", {
                text: "Save As",
                icon: "save",
                onAction: function () {

                    console.log(tinyMCE.activeEditor.getContent());

                    var str = tinyMCE.activeEditor.getContent();
                    var div = document.createElement("div");
                    div.innerHTML = str.trim();

                    download(format(div, 0).innerHTML, "mypage.html", "text/html");
                },
            });

            editor.ui.registry.addMenuItem("costum_about", {
                text: "About",
                icon: "info",
                onAction: function () {
                    editor.windowManager.open(dialogConfig);
                },
            });

            editor.ui.registry.addMenuItem("convert_to_app", {
                text: "Convert To Mobile App",
                icon: "reload",
                onAction: function () {
                    window.open("https://webintoapp.com?ref=htmeditor", "_blank");
                },
            });

            editor.ui.registry.addMenuItem("recommended_hosting", {
                text: "Recommended Web Hosting Services",
                icon: "checkmark",
                onAction: function () {
                    window.open("https://webhosting4me.com?ref=htmeditor", "_blank");
                },
            });

            editor.on("init", function (e) {
                if (full_screen == "yes") editor.execCommand("mceFullScreen");
            });
        },
    });
}

//Load the tinymce JS dynamically
var loadScript = function (url, callback) {

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    //Add it begore the text area element 
    document.getElementById(htmeditor_textarea).prepend(script);

    //Or add it after the text area element 
    //document.getElementById(htmeditor_textarea).appendChild(script);

}

//Init the editor after the JS was loaded
var load_js_callback = function () {

    Init(htmeditor_textarea, full_screen, editor_height);
};

//Get the parameters
var htmeditor_textarea = document.currentScript.getAttribute("htmeditor_textarea");
var full_screen = document.currentScript.getAttribute("full_screen") == null ? "no" : document.currentScript.getAttribute("full_screen");
var editor_height = document.currentScript.getAttribute("editor_height") == null ? "480" : document.currentScript.getAttribute("editor_height");
var run_local = document.currentScript.getAttribute("run_local") == null ? "no" : document.currentScript.getAttribute("run_local");

// Create a file input for save the file
var file = document.createElement("input");
file.setAttribute("id", "htmeditor-file-input-open-file");
file.setAttribute("type", "file");
file.setAttribute("accept", ".html, .html");
file.setAttribute("style", "display: none;");

//Append the div to the container div
document.getElementById(htmeditor_textarea).prepend(file);

window.onload = function () {

    //Run local? So add a dot in the beginning
    if(run_local == "yes")
        loadScript("./js/tinymce/tinymce.min.js", load_js_callback);
    else
        loadScript("https://htmeditor.com/js/tinymce/tinymce.min.js", load_js_callback);
    
};
