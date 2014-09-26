var GoToViewJump = (function(){

  function GoToViewJump(){
  }

  GoToViewJump.prototype = {

    run: function(editor) {
      var path = editor.getPath();
      var viewPath = path.replace("_controller.rb", "").replace("controllers", "views");

      var line = editor.getCursorScreenPosition().row;
      while(line > 0) {
        var lineText = editor.lineTextForScreenRow(line);
        if( this.isFunctionDef(lineText) ){
          var view = viewPath + "/" + this.extractAction(lineText) + ".html.erb";
          console.log("Open: " + view);
          atom.workspace.open(view);
          break;
        }
        line = line - 1;
      }
    },

    isFunctionDef: function(text) {
      return /\s*def (.*)/.test(text);
    },

    extractAction: function(text) {
      return text.match(/def \w*[\(\ ]*/)[0].replace("def ", "").replace(/\(/g, "").trim()
    }

  }

  return GoToViewJump;
})();


module.exports = GoToViewJump;
