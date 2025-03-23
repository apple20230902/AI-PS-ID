var doc = app.activeDocument;
var artboard1 = doc.artboards[0];
var rect1 = artboard1.artboardRect;

var centerX1 = (rect1[0] + rect1[2]) / 2;
var centerY1 = (rect1[1] + rect1[3]) / 2;

for (var i = 1; i < doc.artboards.length; i++) {
    var artboard = doc.artboards[i];
    var rect = artboard.artboardRect;

    var centerX = (rect[0] + rect[2]) / 2;
    var centerY = (rect[1] + rect[3]) / 2;

    var deltaX = centerX1 - centerX;
    var deltaY = centerY1 - centerY;

    // 移动画板
    artboard.artboardRect = [
        rect[0] + deltaX,
        rect[1] + deltaY,
        rect[2] + deltaX,
        rect[3] + deltaY
    ];

    // 移动画板上的内容
    var items = doc.pageItems;
    for (var j = 0; j < items.length; j++) {
        var item = items[j];
        if (itemIsOnArtboard(item, rect)) {
            item.translate(deltaX, deltaY);
        }
    }
}

function itemIsOnArtboard(item, artboardRect) {
    var bounds = item.geometricBounds; // [左, 上, 右, 下]
    var itemCenterX = (bounds[0] + bounds[2]) / 2;
    var itemCenterY = (bounds[1] + bounds[3]) / 2;

    var left = artboardRect[0];
    var top = artboardRect[1];
    var right = artboardRect[2];
    var bottom = artboardRect[3];

    if (itemCenterX >= left && itemCenterX <= right && itemCenterY <= top && itemCenterY >= bottom) {
        return true;
    } else {
        return false;
    }
}