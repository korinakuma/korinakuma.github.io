var symbolHolder = document.getElementById('symbol-holder');
var colorOverlay = document.getElementById('color-overlay');
var inputColor = document.getElementById('input-color');
var inputSymbol = document.getElementById('input-symbol');

var applySymbol = function(){
    var symbol = inputSymbol.value;
    console.log('what is symbol', symbol)
    symbolHolder.innerText = symbol;
}

inputSymbol.addEventListener('input', applySymbol)

var applyColor = function(){
    var color = inputColor.value;
    console.log('what is color', color)
    colorOverlay.style.backgroundColor = color;
}

inputColor.addEventListener('input', applyColor)