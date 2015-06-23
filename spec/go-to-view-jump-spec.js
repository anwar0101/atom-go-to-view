var GoToViewJump = require('../lib/go-to-view-jump');

describe('Go To View Jump', function() {

  describe("run", function() {

    it("wont open any file if not a valid file", function() {
      editor = {
        getPath: function(){
          return "/home/workspace/project/app/utils/helper.rb";
        },
        getCursorScreenPosition: function(){
          return { row: 1 };
        },
        lineTextForScreenRow: function(row) {
          return "   def hello_world(var1)";
        }
      };

      spyOn(atom.workspace, 'open');
      new GoToViewJump(".html.erb").run(editor);
      expect(atom.workspace.open).not.toHaveBeenCalled();
    });

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
      new GoToViewJump(".html.erb").run(editor);
      expect(atom.workspace.open).toHaveBeenCalledWith("/home/workspace/project/app/views/hello/hello_world.html.erb")
    });

    it("opens a partial", function() {
      editor = {
        getPath: function(){
          return "/home/workspace/project/app/views/hello/hello.html.erb";
        },
        getCursorScreenPosition: function(){
          return { row: 1 };
        },
        lineTextForScreenRow: function(row) {
          return '<%= render "nav" %>';
        }
      };

      spyOn(atom.workspace, 'open');
      new GoToViewJump(".html.erb").run(editor);
      expect(atom.workspace.open).toHaveBeenCalledWith("/home/workspace/project/app/views/hello/_nav.html.erb");
    });

    it("jump to view supports slim", function() {
      editor = {
        getPath: function(){
          return "/home/workspace/project/app/views/hello/hello.html.slim";
        },
        getCursorScreenPosition: function(){
          return { row: 1 };
        },
        lineTextForScreenRow: function(row) {
          return '= render "nav"';
        }
      };

      spyOn(atom.workspace, 'open');
      new GoToViewJump(".html.slim").run(editor);
      expect(atom.workspace.open).toHaveBeenCalledWith("/home/workspace/project/app/views/hello/_nav.html.slim");
    });

    it("opens a partial in a different folder", function() {
      editor = {
        getPath: function(){
          return "/home/workspace/project/app/views/hello/hello.html.erb";
        },
        getCursorScreenPosition: function(){
          return { row: 1 };
        },
        lineTextForScreenRow: function(row) {
          return '<%= render "../common/header" %>';
        }
      };

      spyOn(atom.workspace, 'open');
      new GoToViewJump(".html.erb").run(editor);
      expect(atom.workspace.open).toHaveBeenCalledWith("/home/workspace/project/app/views/common/_header.html.erb");
    });

    xit("opens a partial with symbol syntax", function() {
      editor = {
        getPath: function(){
          return "/home/workspace/project/app/views/hello/hello.html.erb";
        },
        getCursorScreenPosition: function(){
          return { row: 1 };
        },
        lineTextForScreenRow: function(row) {
          return '<%= render partial: "../common/header" %>';
        }
      }

      spyOn(atom.workspace, 'open');
      new GoToViewJump(".html.erb").run(editor);
      expect(atom.workspace.open).toHaveBeenCalledWith("/home/workspace/project/app/views/common/_header.html.erb");
    });

    xit("opens a partial with hash rocket syntax", function() {
      editor = {
        getPath: function(){
          return "/home/workspace/project/app/views/hello/hello.html.erb";
        },
        getCursorScreenPosition: function(){
          return { row: 1 };
        },
        lineTextForScreenRow: function(row) {
          return '<%= render :partial => "../common/header" %>';
        }
      }

      spyOn(atom.workspace, 'open');
      new GoToViewJump(".html.erb").run(editor);
      expect(atom.workspace.open).toHaveBeenCalledWith("/home/workspace/project/app/views/common/_header.html.erb");
    });

  });

});
