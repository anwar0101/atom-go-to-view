var GoToViewSpec = require('../lib/go-to-view-spec');

describe('Go To View Spec', function() {

  describe("run", function() {

    it("opens the spec file", function() {
      editor = {
        getPath: function(){
          return "/home/workspace/project/app/controllers/hello_controller.rb";
        }
      };

      spyOn(atom.workspace, 'open')
      new GoToViewSpec().run(editor);
      expect(atom.workspace.open).toHaveBeenCalledWith("/home/workspace/project/spec/controllers/hello_controller_spec.rb")
    });

  });

});
