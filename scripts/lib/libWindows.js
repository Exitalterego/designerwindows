class Window extends Wall {
    constructor(...args) {
        super(...args);
        this.windowControl = null;
    }

    async _onModifyWindow(windowChange=false) {

        // Update WallsLayer data
        canvas.addPendingOperation("WallsLayer.initialize", this.layer.initialize, this.layer);
    
        // Re-draw window icons
        if ( windowChange ) {
          if ( this.data.window !== CONST.WALL_WINDOW_TYPES.NONE ) {
            if ( this.windowControl ) this.windowControl.draw();
            else canvas.controls.createWindowControl(this);
          }
          else if ( this.doorControl ) this.doorControl.parent.removeChild(this.doorControl);
        }
    
        // Re-initialize perception
        canvas.addPendingOperation("WallsLayer.modifyWall", () => canvas.initializeSources(), this);
      }

    /* Toggles between wall states based on control 
     * This will be needed to toggle between 
     */
      _onMouseDown(event) {
        event.stopPropagation();
        const state = this.wall.data.ds;
        const states = CONST.WALL_DOOR_STATES;
    
        // Determine whether the player can control the door at this time
        if ( !game.user.can("WALL_DOORS") ) return false;
        if ( game.paused && !game.user.isGM ) {
          ui.notifications.warn(game.i18n.localize("GAME.PausedWarning"));
          return false;
        }
    
        // Play an audio cue for locked doors
        if ( state === states.LOCKED ) {
          AudioHelper.play({src: CONFIG.sounds.lock});
          return false;
        }
    
        // Toggle between OPEN and CLOSED states
        this.wall.update({ds: state === states.CLOSED ? states.OPEN : states.CLOSED});
      }
}

class WindowControl extends DoorControl {
    constructor(window) {
      super();
      this.window = window;
      this.window.windowControl = this;
    }