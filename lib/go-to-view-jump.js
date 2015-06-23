var _ = require('underscore-plus');

var GoToViewJump = (function(){

  function GoToViewJump(){
  }

  GoToViewJump.prototype = {

    run: function(editor) {
      var path = editor.getPath();
      if( this.isView(path) ) {
        this.openPartial(editor, path, editor.getCursorScreenPosition().row);
      } else if( this.isController(path) ) {
        this.openView(editor, path);
      } else {
        console.log("invalid file: " + path);
      }
    },

    isView: function(text) {
      return text.endsWith(".html.erb");
    },

    openPartial: function(editor, path, row) {
      line = editor.lineTextForScreenRow(row).trim();
      var renderLocation = line.indexOf('render');
      if( renderLocation >= 0 ){
        var code = line.substring(renderLocation + 6, line.length - 3).trim();
        if( code.indexOf(":") >= 0 ) {
          // TODO - Extract partial value from rails hash
          throw 'Unsupported feature.'
        } else if( code.indexOf("=>") >= 0 ) {
          // TODO - Extract partial value from rails hash
          throw 'Unsupported feature'
        }
        var pathArray = path.split("/");
        pathArray.pop(); // Remove current file.
        var partialArray = code.replace(/["']/g, '').split("/");
        _.each(_.initial(partialArray), function(item){
          if( item === '..' ) {
            if(_.isEmpty(pathArray)){ throw 'Invalid partial path: ' + path; }
            pathArray.pop();
          } else if(item === '.'){
          } else {
            pathArray.push(item);
          }
        });
        pathArray.push(this.partialize(_.last(partialArray)));
        var partial = pathArray.join("/");
        console.log("Open partial: " + partial);
        atom.workspace.open(partial);
      }
    },

    isController: function(text) {
      return text.endsWith("_controller.rb");
    },

    partialize: function(partial) {
      return "_" + partial + ".html.erb";
    },

    openView: function(editor, path) {
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
