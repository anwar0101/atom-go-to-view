var GoToViewSpec = (function(){

  function GoToViewSpec(){
  }

  GoToViewSpec.prototype = {

    run: function(editor) {
      var path = editor.getPath()
      var spec = path.replace("/app/", "/spec/").replace(".rb", "_spec.rb");
      console.log("Open: " + spec);
      atom.project.open(spec);
    }

  }

  return GoToViewSpec;
})();


module.exports = GoToViewSpec;
