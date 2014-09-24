module.exports = {

  activate: function(){
    atom.workspaceView.command("go-to-view:jump", this.jump);
  },

  deactivate: function() {
  },

  jump: function() {
    var editor = atom.workspace.getActiveTextEditor();
    var ending = ".html.erb";

    var splitPath = editor.getPath().split('/app/')
    var workingPath = splitPath[0]
    var viewPath = splitPath[1].replace("_controller.rb", "").replace("controllers", "views") + "/";

    var line = editor.getCursorScreenPosition().row;
    while(line > 0) {
      var lineText = editor.lineTextForScreenRow(line);
      if( /\s*def (.*)/.test(lineText) ){
        var action = lineText.match(/def \w*[\(\ ]*/)[0].replace("def ", "").replace(/\(/g, "").trim();
        var view = workingPath + "/app/" + viewPath + action + ending;
        console.log("Open: " + view);
        atom.workspace.open(view);
        break;
      }
      line = line - 1;
    }
  }
};
