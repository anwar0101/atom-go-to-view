GoToViewJump = require('./go-to-view-jump');
GoToViewSpec = require('./go-to-view-spec');

module.exports = {

  activate: function(){
    atom.workspaceView.command("go-to-view:jump", this.jump);
    atom.workspaceView.command("go-to-view:spec", this.spec);
  },

  deactivate: function() {
  },

  jump: function() {
    new GoToViewJump().run(atom.workspace.getActiveTextEditor());
  },

  spec: function() {
    new GoToViewSpec().run(atom.workspace.getActiveTextEditor());
  }
};
