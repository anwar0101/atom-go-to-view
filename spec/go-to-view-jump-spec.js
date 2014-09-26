var GoToViewJump = require('../lib/go-to-view-jump');

describe('Go To View Jump', function() {

  describe("run", function() {

    it("opens the view", function() {
      editor = {
        getPath: function(){
          return "/home/workspace/project/app/controllers/hello_controller.rb";
        },
        getCursorScreenPosition: function(){
          return { row: 1 };
        },
        lineTextForScreenRow: function(row) {
          return "   def hello_world(var1)";
        }
      };

      spyOn(atom.workspace, 'open')
      new GoToViewJump().run(editor);
      expect(atom.workspace.open).toHaveBeenCalledWith("/home/workspace/project/app/views/hello/hello_world.html.erb")
    });

  });

});
