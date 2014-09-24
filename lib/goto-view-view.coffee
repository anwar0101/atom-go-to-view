{View} = require 'atom'

module.exports =
class GotoViewView extends View
  @content: ->
    @div class: 'goto-view overlay from-top', =>
      @div "The GotoView package is Alive! It's ALIVE!", class: "message"

  initialize: (serializeState) ->
    atom.workspaceView.command "goto-view:toggle", => @toggle()

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @detach()

  toggle: ->
    console.log "GotoViewView was toggled!"
    if @hasParent()
      @detach()
    else
      atom.workspaceView.append(this)
