#target illustrator

(function () {
    // 创建对话框窗口
    var dlg = new Window("dialog", "Illustrator 脚本运行器");
    dlg.orientation = "row";
    dlg.alignChildren = "fill";

    // 左侧列
    var leftGroup = dlg.add("group");
    leftGroup.orientation = "column";
    leftGroup.alignChildren = "fill";

    // 按钮组
    var buttonsGroup = leftGroup.add("group");
    buttonsGroup.orientation = "row";
    buttonsGroup.alignChildren = "fill";

    // 插入换行符按钮
    var returnButton = buttonsGroup.add("button", undefined, "插入换行符");
    returnButton.onClick = function () {
        scriptText.textselection += "\r";
    };
    returnButton.helpTip = "在光标位置插入一个换行符。";

    // 插入制表符按钮
    var tabButton = buttonsGroup.add("button", undefined, "插入制表符");
    tabButton.onClick = function () {
        scriptText.textselection += "\t";
    };
    tabButton.helpTip = "在光标位置插入一个制表符。";

    // 脚本编辑区域
    var scriptText = leftGroup.add("edittext", undefined, "", { multiline: true, scrolling: true });
    scriptText.preferredSize = [600, 400];
    scriptText.active = true;
    scriptText.helpTip = "在此处输入或编辑您的脚本代码。";

    // 右侧列
    var rightGroup = dlg.add("group");
    rightGroup.orientation = "column";
    rightGroup.alignChildren = "fill";

    // 运行脚本按钮
    var runButton = rightGroup.add("button", undefined, "运行脚本");
    runButton.onClick = function () {
        try {
            // 使用 eval 执行脚本代码
            eval(scriptText.text);
        } catch (e) {
            alert("发生错误：\n" + e.message);
        }
    };
    runButton.helpTip = "执行您在左侧输入的脚本代码。";

    // 加载脚本按钮
    var loadButton = rightGroup.add("button", undefined, "加载脚本");
    loadButton.onClick = function () {
        var scriptFile = File.openDialog("选择要加载的脚本", "JavaScript Files:*.jsx;*.js,All Files:*.*");
        if (scriptFile) {
            scriptFile.encoding = "UTF8";
            scriptFile.open("r");
            var scriptContent = scriptFile.read();
            scriptFile.close();
            scriptText.text = scriptContent;
        }
    };
    loadButton.helpTip = "从文件加载脚本代码到编辑器。";

    // 保存脚本按钮
    var saveButton = rightGroup.add("button", undefined, "保存脚本");
    saveButton.onClick = function () {
        var scriptFile = File.saveDialog("将脚本保存为", "JavaScript Files:*.jsx");
        if (scriptFile) {
            scriptFile.encoding = "UTF8";
            scriptFile.open("w");
            scriptFile.write(scriptText.text);
            scriptFile.close();
            alert("脚本已成功保存。");
        }
    };
    saveButton.helpTip = "将当前编辑的脚本代码保存到文件。";

    // 关闭按钮
    var closeButton = rightGroup.add("button", undefined, "关闭");
    closeButton.onClick = function () {
        dlg.close();
    };

    // 显示对话框
    dlg.show();
})();