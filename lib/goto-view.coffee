GotoViewView = require './goto-view-view'

module.exports =
  gotoViewView: null

  activate: (state) ->
    @gotoViewView = new GotoViewView(state.gotoViewViewState)

  deactivate: ->
    @gotoViewView.destroy()

  serialize: ->
    gotoViewViewState: @gotoViewView.serialize()
