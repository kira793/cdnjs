if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/dd-drag/dd-drag.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/dd-drag/dd-drag.js",
    code: []
};
_yuitest_coverage["build/dd-drag/dd-drag.js"].code=["YUI.add('dd-drag', function (Y, NAME) {","","","    /**","     * Provides the ability to drag a Node.","     * @module dd","     * @submodule dd-drag","     */","    /**","     * Provides the ability to drag a Node.","     * @class Drag","     * @extends Base","     * @constructor","     * @namespace DD","     */","","    var DDM = Y.DD.DDM,","        NODE = 'node',","        DRAGGING = 'dragging',","        DRAG_NODE = 'dragNode',","        OFFSET_HEIGHT = 'offsetHeight',","        OFFSET_WIDTH = 'offsetWidth',","        /**","        * Handles the mouseup DOM event, does nothing internally just fires.","        * @event drag:mouseup","        * @bubbles DDM","        * @type {CustomEvent}","        */","        /**","        * Handles the mousedown DOM event, checks to see if you have a valid handle then starts the drag timers.","        * @event drag:mouseDown","        * @preventable _defMouseDownFn","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl><dt>ev</dt><dd>The original mousedown event.</dd></dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_MOUSE_DOWN = 'drag:mouseDown',","        /**","        * Fires after the mousedown event has been cleared.","        * @event drag:afterMouseDown","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl><dt>ev</dt><dd>The original mousedown event.</dd></dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_AFTER_MOUSE_DOWN = 'drag:afterMouseDown',","        /**","        * Fires after a handle is removed.","        * @event drag:removeHandle","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl><dt>handle</dt><dd>The handle that was removed.</dd></dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_REMOVE_HANDLE = 'drag:removeHandle',","        /**","        * Fires after a handle is added.","        * @event drag:addHandle","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl><dt>handle</dt><dd>The handle that was added.</dd></dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_ADD_HANDLE = 'drag:addHandle',","        /**","        * Fires after an invalid selector is removed.","        * @event drag:removeInvalid","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl><dt>handle</dt><dd>The handle that was removed.</dd></dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_REMOVE_INVALID = 'drag:removeInvalid',","        /**","        * Fires after an invalid selector is added.","        * @event drag:addInvalid","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl><dt>handle</dt><dd>The handle that was added.</dd></dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_ADD_INVALID = 'drag:addInvalid',","        /**","        * Fires at the start of a drag operation.","        * @event drag:start","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>pageX</dt><dd>The original node position X.</dd>","        * <dt>pageY</dt><dd>The original node position Y.</dd>","        * <dt>startTime</dt><dd>The startTime of the event. getTime on the current Date object.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_START = 'drag:start',","        /**","        * Fires at the end of a drag operation.","        * @event drag:end","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>pageX</dt><dd>The current node position X.</dd>","        * <dt>pageY</dt><dd>The current node position Y.</dd>","        * <dt>startTime</dt><dd>The startTime of the event, from the start event.</dd>","        * <dt>endTime</dt><dd>The endTime of the event. getTime on the current Date object.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_END = 'drag:end',","        /**","        * Fires every mousemove during a drag operation.","        * @event drag:drag","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>pageX</dt><dd>The current node position X.</dd>","        * <dt>pageY</dt><dd>The current node position Y.</dd>","        * <dt>scroll</dt><dd>Should a scroll action occur.</dd>","        * <dt>info</dt><dd>Object hash containing calculated XY arrays: start, xy, delta, offset</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_DRAG = 'drag:drag',","        /**","        * Fires when this node is aligned.","        * @event drag:align","        * @preventable _defAlignFn","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>pageX</dt><dd>The current node position X.</dd>","        * <dt>pageY</dt><dd>The current node position Y.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_ALIGN = 'drag:align',","        /**","        * Fires when this node is over a Drop Target. (Fired from dd-drop)","        * @event drag:over","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>","        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        /**","        * Fires when this node enters a Drop Target. (Fired from dd-drop)","        * @event drag:enter","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>","        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        /**","        * Fires when this node exits a Drop Target. (Fired from dd-drop)","        * @event drag:exit","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        /**","        * Fires when this node is dropped on a valid Drop Target. (Fired from dd-ddm-drop)","        * @event drag:drophit","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>drop</dt><dd>The best guess on what was dropped on.</dd>","        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>","        * <dt>others</dt><dd>An array of all the other drop targets that was dropped on.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        /**","        * Fires when this node is dropped on an invalid Drop Target. (Fired from dd-ddm-drop)","        * @event drag:dropmiss","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>pageX</dt><dd>The current node position X.</dd>","        * <dt>pageY</dt><dd>The current node position Y.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","","    Drag = function(o) {","        this._lazyAddAttrs = false;","        Drag.superclass.constructor.apply(this, arguments);","","        var valid = DDM._regDrag(this);","        if (!valid) {","            Y.error('Failed to register node, already in use: ' + o.node);","        }","    };","","    Drag.NAME = 'drag';","","    /**","    * This property defaults to \"mousedown\", but when drag-gestures is loaded, it is changed to \"gesturemovestart\"","    * @static","    * @property START_EVENT","    */","    Drag.START_EVENT = 'mousedown';","","    Drag.ATTRS = {","        /**","        * Y.Node instance to use as the element to initiate a drag operation","        * @attribute node","        * @type Node","        */","        node: {","            setter: function(node) {","                if (this._canDrag(node)) {","                    return node;","                }","                var n = Y.one(node);","                if (!n) {","                    Y.error('DD.Drag: Invalid Node Given: ' + node);","                }","                return n;","            }","        },","        /**","        * Y.Node instance to use as the draggable element, defaults to node","        * @attribute dragNode","        * @type Node","        */","        dragNode: {","            setter: function(node) {","                if (this._canDrag(node)) {","                    return node;","                }","                var n = Y.one(node);","                if (!n) {","                    Y.error('DD.Drag: Invalid dragNode Given: ' + node);","                }","                return n;","            }","        },","        /**","        * Offset the drag element by the difference in cursor position: default true","        * @attribute offsetNode","        * @type Boolean","        */","        offsetNode: {","            value: true","        },","        /**","        * Center the dragNode to the mouse position on drag:start: default false","        * @attribute startCentered","        * @type Boolean","        */","        startCentered: {","            value: false","        },","        /**","        * The number of pixels to move to start a drag operation, default is 3.","        * @attribute clickPixelThresh","        * @type Number","        */","        clickPixelThresh: {","            value: DDM.get('clickPixelThresh')","        },","        /**","        * The number of milliseconds a mousedown has to pass to start a drag operation, default is 1000.","        * @attribute clickTimeThresh","        * @type Number","        */","        clickTimeThresh: {","            value: DDM.get('clickTimeThresh')","        },","        /**","        * Set to lock this drag element so that it can't be dragged: default false.","        * @attribute lock","        * @type Boolean","        */","        lock: {","            value: false,","            setter: function(lock) {","                if (lock) {","                    this.get(NODE).addClass(DDM.CSS_PREFIX + '-locked');","                } else {","                    this.get(NODE).removeClass(DDM.CSS_PREFIX + '-locked');","                }","                return lock;","            }","        },","        /**","        * A payload holder to store arbitrary data about this drag object, can be used to store any value.","        * @attribute data","        * @type Mixed","        */","        data: {","            value: false","        },","        /**","        * If this is false, the drag element will not move with the cursor: default true. Can be used to \"resize\" the element.","        * @attribute move","        * @type Boolean","        */","        move: {","            value: true","        },","        /**","        * Use the protective shim on all drag operations: default true. Only works with dd-ddm, not dd-ddm-base.","        * @attribute useShim","        * @type Boolean","        */","        useShim: {","            value: true","        },","        /**","        * Config option is set by Drag to inform you of which handle fired the drag event (in the case that there are several handles): default false.","        * @attribute activeHandle","        * @type Node","        */","        activeHandle: {","            value: false","        },","        /**","        * By default a drag operation will only begin if the mousedown occurred with the primary mouse button.","        * Setting this to false will allow for all mousedown events to trigger a drag.","        * @attribute primaryButtonOnly","        * @type Boolean","        */","        primaryButtonOnly: {","            value: true","        },","        /**","        * This attribute is not meant to be used by the implementor, it is meant to be used as an Event tracker so you can listen for it to change.","        * @attribute dragging","        * @type Boolean","        */","        dragging: {","            value: false","        },","        parent: {","            value: false","        },","        /**","        * This attribute only works if the dd-drop module has been loaded. It will make this node a drop target as well as draggable.","        * @attribute target","        * @type Boolean","        */","        target: {","            value: false,","            setter: function(config) {","                this._handleTarget(config);","                return config;","            }","        },","        /**","        * This attribute only works if the dd-drop module is active. It will set the dragMode (point, intersect, strict) of this Drag instance.","        * @attribute dragMode","        * @type String","        */","        dragMode: {","            value: null,","            setter: function(mode) {","                return DDM._setDragMode(mode);","            }","        },","        /**","        * Array of groups to add this drag into.","        * @attribute groups","        * @type Array","        */","        groups: {","            value: ['default'],","            getter: function() {","                if (!this._groups) {","                    this._groups = {};","                    return [];","                }","","                return Y.Object.keys(this._groups);","            },","            setter: function(g) {","                this._groups = Y.Array.hash(g);","                return g;","            }","        },","        /**","        * Array of valid handles to add. Adding something here will set all handles, even if previously added with addHandle","        * @attribute handles","        * @type Array","        */","        handles: {","            value: null,","            setter: function(g) {","                if (g) {","                    this._handles = {};","                    Y.Array.each(g, function(v) {","                        var key = v;","                        if (v instanceof Y.Node || v instanceof Y.NodeList) {","                            key = v._yuid;","                        }","                        this._handles[key] = v;","                    }, this);","                } else {","                    this._handles = null;","                }","                return g;","            }","        },","        /**","        * Controls the default bubble parent for this Drag instance. Default: Y.DD.DDM. Set to false to disable bubbling. Use bubbleTargets in config","        * @deprecated","        * @attribute bubbles","        * @type Object","        */","        bubbles: {","            setter: function(t) {","                this.addTarget(t);","                return t;","            }","        },","        /**","        * Should the mousedown event be halted. Default: true","        * @attribute haltDown","        * @type Boolean","        */","        haltDown: {","            value: true","        }","    };","","    Y.extend(Drag, Y.Base, {","        /**","        * Checks the object for the methods needed to drag the object around.","        * Normally this would be a node instance, but in the case of Graphics, it","        * may be an SVG node or something similar.","        * @method _canDrag","        * @private","        * @param {Object} n The object to check","        * @return {Boolean} True or false if the Object contains the methods needed to Drag","        */","        _canDrag: function(n) {","            if (n && n.setXY && n.getXY && n.test && n.contains) {","                return true;","            }","            return false;","        },","        /**","        * The default bubbleTarget for this object. Default: Y.DD.DDM","        * @private","        * @property _bubbleTargets","        */","        _bubbleTargets: Y.DD.DDM,","        /**","        * Add this Drag instance to a group, this should be used for on-the-fly group additions.","        * @method addToGroup","        * @param {String} g The group to add this Drag Instance to.","        * @return {Self}","        * @chainable","        */","        addToGroup: function(g) {","            this._groups[g] = true;","            DDM._activateTargets();","            return this;","        },","        /**","        * Remove this Drag instance from a group, this should be used for on-the-fly group removals.","        * @method removeFromGroup","        * @param {String} g The group to remove this Drag Instance from.","        * @return {Self}","        * @chainable","        */","        removeFromGroup: function(g) {","            delete this._groups[g];","            DDM._activateTargets();","            return this;","        },","        /**","        * This will be a reference to the Drop instance associated with this drag if the target: true config attribute is set..","        * @property target","        * @type {Object}","        */","        target: null,","        /**","        * Attribute handler for the target config attribute.","        * @private","        * @method _handleTarget","        * @param {Boolean/Object} config The Config","        */","        _handleTarget: function(config) {","            if (Y.DD.Drop) {","                if (config === false) {","                    if (this.target) {","                        DDM._unregTarget(this.target);","                        this.target = null;","                    }","                } else {","                    if (!Y.Lang.isObject(config)) {","                        config = {};","                    }","                    config.bubbleTargets = config.bubbleTargets || Y.Object.values(this._yuievt.targets);","                    config.node = this.get(NODE);","                    config.groups = config.groups || this.get('groups');","                    this.target = new Y.DD.Drop(config);","                }","            }","        },","        /**","        * Storage Array for the groups this drag belongs to.","        * @private","        * @property _groups","        * @type {Array}","        */","        _groups: null,","        /**","        * This method creates all the events for this Event Target and publishes them so we get Event Bubbling.","        * @private","        * @method _createEvents","        */","        _createEvents: function() {","","            this.publish(EV_MOUSE_DOWN, {","                defaultFn: this._defMouseDownFn,","                queuable: false,","                emitFacade: true,","                bubbles: true,","                prefix: 'drag'","            });","","            this.publish(EV_ALIGN, {","                defaultFn: this._defAlignFn,","                queuable: false,","                emitFacade: true,","                bubbles: true,","                prefix: 'drag'","            });","","            this.publish(EV_DRAG, {","                defaultFn: this._defDragFn,","                queuable: false,","                emitFacade: true,","                bubbles: true,","                prefix: 'drag'","            });","","            this.publish(EV_END, {","                defaultFn: this._defEndFn,","                preventedFn: this._prevEndFn,","                queuable: false,","                emitFacade: true,","                bubbles: true,","                prefix: 'drag'","            });","","            var ev = [","                EV_AFTER_MOUSE_DOWN,","                EV_REMOVE_HANDLE,","                EV_ADD_HANDLE,","                EV_REMOVE_INVALID,","                EV_ADD_INVALID,","                EV_START,","                'drag:drophit',","                'drag:dropmiss',","                'drag:over',","                'drag:enter',","                'drag:exit'","            ];","","            Y.Array.each(ev, function(v) {","                this.publish(v, {","                    type: v,","                    emitFacade: true,","                    bubbles: true,","                    preventable: false,","                    queuable: false,","                    prefix: 'drag'","                });","            }, this);","        },","        /**","        * A private reference to the mousedown DOM event","        * @private","        * @property _ev_md","        * @type {EventFacade}","        */","        _ev_md: null,","        /**","        * The getTime of the mousedown event. Not used, just here in case someone wants/needs to use it.","        * @private","        * @property _startTime","        * @type Date","        */","        _startTime: null,","        /**","        * The getTime of the mouseup event. Not used, just here in case someone wants/needs to use it.","        * @private","        * @property _endTime","        * @type Date","        */","        _endTime: null,","        /**","        * A private hash of the valid drag handles","        * @private","        * @property _handles","        * @type {Object}","        */","        _handles: null,","        /**","        * A private hash of the invalid selector strings","        * @private","        * @property _invalids","        * @type {Object}","        */","        _invalids: null,","        /**","        * A private hash of the default invalid selector strings: {'textarea': true, 'input': true, 'a': true, 'button': true, 'select': true}","        * @private","        * @property _invalidsDefault","        * @type {Object}","        */","        _invalidsDefault: {'textarea': true, 'input': true, 'a': true, 'button': true, 'select': true },","        /**","        * Private flag to see if the drag threshhold was met","        * @private","        * @property _dragThreshMet","        * @type {Boolean}","        */","        _dragThreshMet: null,","        /**","        * Flag to determine if the drag operation came from a timeout","        * @private","        * @property _fromTimeout","        * @type {Boolean}","        */","        _fromTimeout: null,","        /**","        * Holder for the setTimeout call","        * @private","        * @property _clickTimeout","        * @type {Boolean}","        */","        _clickTimeout: null,","        /**","        * The offset of the mouse position to the element's position","        * @property deltaXY","        * @type {Array}","        */","        deltaXY: null,","        /**","        * The initial mouse position","        * @property startXY","        * @type {Array}","        */","        startXY: null,","        /**","        * The initial element position","        * @property nodeXY","        * @type {Array}","        */","        nodeXY: null,","        /**","        * The position of the element as it's moving (for offset calculations)","        * @property lastXY","        * @type {Array}","        */","        lastXY: null,","        /**","        * The xy that the node will be set to. Changing this will alter the position as it's dragged.","        * @property actXY","        * @type {Array}","        */","        actXY: null,","        /**","        * The real xy position of the node.","        * @property realXY","        * @type {Array}","        */","        realXY: null,","        /**","        * The XY coords of the mousemove","        * @property mouseXY","        * @type {Array}","        */","        mouseXY: null,","        /**","        * A region object associated with this drag, used for checking regions while dragging.","        * @property region","        * @type Object","        */","        region: null,","        /**","        * Handler for the mouseup DOM event","        * @private","        * @method _handleMouseUp","        * @param {EventFacade} ev The Event","        */","        _handleMouseUp: function() {","            this.fire('drag:mouseup');","            this._fixIEMouseUp();","            if (DDM.activeDrag) {","                DDM._end();","            }","        },","        /**","        * The function we use as the ondragstart handler when we start a drag","        * in Internet Explorer. This keeps IE from blowing up on images as drag handles.","        * @private","        * @method _fixDragStart","        * @param {Event} e The Event","        */","        _fixDragStart: function(e) {","            if (this.validClick(e)) {","                e.preventDefault();","            }","        },","        /**","        * The function we use as the onselectstart handler when we start a drag in Internet Explorer","        * @private","        * @method _ieSelectFix","        */","        _ieSelectFix: function() {","            return false;","        },","        /**","        * We will hold a copy of the current \"onselectstart\" method on this property, and reset it after we are done using it.","        * @private","        * @property _ieSelectBack","        */","        _ieSelectBack: null,","        /**","        * This method copies the onselectstart listner on the document to the _ieSelectFix property","        * @private","        * @method _fixIEMouseDown","        */","        _fixIEMouseDown: function() {","            if (Y.UA.ie) {","                this._ieSelectBack = Y.config.doc.body.onselectstart;","                Y.config.doc.body.onselectstart = this._ieSelectFix;","            }","        },","        /**","        * This method copies the _ieSelectFix property back to the onselectstart listner on the document.","        * @private","        * @method _fixIEMouseUp","        */","        _fixIEMouseUp: function() {","            if (Y.UA.ie) {","                Y.config.doc.body.onselectstart = this._ieSelectBack;","            }","        },","        /**","        * Handler for the mousedown DOM event","        * @private","        * @method _handleMouseDownEvent","        * @param {EventFacade} ev  The Event","        */","        _handleMouseDownEvent: function(ev) {","            this.fire(EV_MOUSE_DOWN, { ev: ev });","        },","        /**","        * Handler for the mousedown DOM event","        * @private","        * @method _defMouseDownFn","        * @param {EventFacade} e  The Event","        */","        _defMouseDownFn: function(e) {","            var ev = e.ev;","","            this._dragThreshMet = false;","            this._ev_md = ev;","","            if (this.get('primaryButtonOnly') && ev.button > 1) {","                return false;","            }","            if (this.validClick(ev)) {","                this._fixIEMouseDown(ev);","                if (Drag.START_EVENT.indexOf('gesture') !== 0) {","                    //Only do these if it's not a gesture","                    if (this.get('haltDown')) {","                        ev.halt();","                    } else {","                        ev.preventDefault();","                    }","                }","","                this._setStartPosition([ev.pageX, ev.pageY]);","","                DDM.activeDrag = this;","","                this._clickTimeout = Y.later(this.get('clickTimeThresh'), this, this._timeoutCheck);","            }","            this.fire(EV_AFTER_MOUSE_DOWN, { ev: ev });","        },","        /**","        * Method first checks to see if we have handles, if so it validates the click","        * against the handle. Then if it finds a valid handle, it checks it against","        * the invalid handles list. Returns true if a good handle was used, false otherwise.","        * @method validClick","        * @param {EventFacade} ev  The Event","        * @return {Boolean}","        */","        validClick: function(ev) {","            var r = false, n = false,","            tar = ev.target,","            hTest = null,","            els = null,","            nlist = null,","            set = false;","            if (this._handles) {","                Y.Object.each(this._handles, function(i, n) {","                    if (i instanceof Y.Node || i instanceof Y.NodeList) {","                        if (!r) {","                            nlist = i;","                            if (nlist instanceof Y.Node) {","                                nlist = new Y.NodeList(i._node);","                            }","                            nlist.each(function(nl) {","                                if (nl.contains(tar)) {","                                    r = true;","                                }","                            });","                        }","                    } else if (Y.Lang.isString(n)) {","                        //Am I this or am I inside this","                        if (tar.test(n + ', ' + n + ' *') && !hTest) {","                            hTest = n;","                            r = true;","                        }","                    }","                });","            } else {","                n = this.get(NODE);","                if (n.contains(tar) || n.compareTo(tar)) {","                    r = true;","                }","            }","            if (r) {","                if (this._invalids) {","                    Y.Object.each(this._invalids, function(i, n) {","                        if (Y.Lang.isString(n)) {","                            //Am I this or am I inside this","                            if (tar.test(n + ', ' + n + ' *')) {","                                r = false;","                            }","                        }","                    });","                }","            }","            if (r) {","                if (hTest) {","                    els = ev.currentTarget.all(hTest);","                    set = false;","                    els.each(function(n) {","                        if ((n.contains(tar) || n.compareTo(tar)) && !set) {","                            set = true;","                            this.set('activeHandle', n);","                        }","                    }, this);","                } else {","                    this.set('activeHandle', this.get(NODE));","                }","            }","            return r;","        },","        /**","        * Sets the current position of the Element and calculates the offset","        * @private","        * @method _setStartPosition","        * @param {Array} xy The XY coords to set the position to.","        */","        _setStartPosition: function(xy) {","            this.startXY = xy;","","            this.nodeXY = this.lastXY = this.realXY = this.get(NODE).getXY();","","            if (this.get('offsetNode')) {","                this.deltaXY = [(this.startXY[0] - this.nodeXY[0]), (this.startXY[1] - this.nodeXY[1])];","            } else {","                this.deltaXY = [0, 0];","            }","        },","        /**","        * The method passed to setTimeout to determine if the clickTimeThreshold was met.","        * @private","        * @method _timeoutCheck","        */","        _timeoutCheck: function() {","            if (!this.get('lock') && !this._dragThreshMet && this._ev_md) {","                this._fromTimeout = this._dragThreshMet = true;","                this.start();","                this._alignNode([this._ev_md.pageX, this._ev_md.pageY], true);","            }","        },","        /**","        * Remove a Selector added by addHandle","        * @method removeHandle","        * @param {String} str The selector for the handle to be removed.","        * @return {Self}","        * @chainable","        */","        removeHandle: function(str) {","            var key = str;","            if (str instanceof Y.Node || str instanceof Y.NodeList) {","                key = str._yuid;","            }","            if (this._handles[key]) {","                delete this._handles[key];","                this.fire(EV_REMOVE_HANDLE, { handle: str });","            }","            return this;","        },","        /**","        * Add a handle to a drag element. Drag only initiates when a mousedown happens on this element.","        * @method addHandle","        * @param {String} str The selector to test for a valid handle. Must be a child of the element.","        * @return {Self}","        * @chainable","        */","        addHandle: function(str) {","            if (!this._handles) {","                this._handles = {};","            }","            var key = str;","            if (str instanceof Y.Node || str instanceof Y.NodeList) {","                key = str._yuid;","            }","            this._handles[key] = str;","            this.fire(EV_ADD_HANDLE, { handle: str });","            return this;","        },","        /**","        * Remove an invalid handle added by addInvalid","        * @method removeInvalid","        * @param {String} str The invalid handle to remove from the internal list.","        * @return {Self}","        * @chainable","        */","        removeInvalid: function(str) {","            if (this._invalids[str]) {","                this._invalids[str] = null;","                delete this._invalids[str];","                this.fire(EV_REMOVE_INVALID, { handle: str });","            }","            return this;","        },","        /**","        * Add a selector string to test the handle against. If the test passes the drag operation will not continue.","        * @method addInvalid","        * @param {String} str The selector to test against to determine if this is an invalid drag handle.","        * @return {Self}","        * @chainable","        */","        addInvalid: function(str) {","            if (Y.Lang.isString(str)) {","                this._invalids[str] = true;","                this.fire(EV_ADD_INVALID, { handle: str });","            }","            return this;","        },","        /**","        * Internal init handler","        * @private","        * @method initializer","        */","        initializer: function() {","","            this.get(NODE).dd = this;","","            if (!this.get(NODE).get('id')) {","                var id = Y.stamp(this.get(NODE));","                this.get(NODE).set('id', id);","            }","","            this.actXY = [];","","            this._invalids = Y.clone(this._invalidsDefault, true);","","            this._createEvents();","","            if (!this.get(DRAG_NODE)) {","                this.set(DRAG_NODE, this.get(NODE));","            }","","            //Fix for #2528096","            //Don't prep the DD instance until all plugins are loaded.","            this.on('initializedChange', Y.bind(this._prep, this));","","            //Shouldn't have to do this..","            this.set('groups', this.get('groups'));","        },","        /**","        * Attach event listners and add classname","        * @private","        * @method _prep","        */","        _prep: function() {","            this._dragThreshMet = false;","            var node = this.get(NODE);","            node.addClass(DDM.CSS_PREFIX + '-draggable');","            node.on(Drag.START_EVENT, Y.bind(this._handleMouseDownEvent, this));","            node.on('mouseup', Y.bind(this._handleMouseUp, this));","            node.on('dragstart', Y.bind(this._fixDragStart, this));","        },","        /**","        * Detach event listeners and remove classname","        * @private","        * @method _unprep","        */","        _unprep: function() {","            var node = this.get(NODE);","            node.removeClass(DDM.CSS_PREFIX + '-draggable');","            node.detachAll('mouseup');","            node.detachAll('dragstart');","            node.detachAll(Drag.START_EVENT);","            this.mouseXY = [];","            this.deltaXY = [0,0];","            this.startXY = [];","            this.nodeXY = [];","            this.lastXY = [];","            this.actXY = [];","            this.realXY = [];","        },","        /**","        * Starts the drag operation","        * @method start","        * @return {Self}","        * @chainable","        */","        start: function() {","            if (!this.get('lock') && !this.get(DRAGGING)) {","                var node = this.get(NODE), ow, oh, xy;","                this._startTime = (new Date()).getTime();","","                DDM._start();","                node.addClass(DDM.CSS_PREFIX + '-dragging');","                this.fire(EV_START, {","                    pageX: this.nodeXY[0],","                    pageY: this.nodeXY[1],","                    startTime: this._startTime","                });","                node = this.get(DRAG_NODE);","                xy = this.nodeXY;","","                ow = node.get(OFFSET_WIDTH);","                oh = node.get(OFFSET_HEIGHT);","","                if (this.get('startCentered')) {","                    this._setStartPosition([xy[0] + (ow / 2), xy[1] + (oh / 2)]);","                }","","","                this.region = {","                    '0': xy[0],","                    '1': xy[1],","                    area: 0,","                    top: xy[1],","                    right: xy[0] + ow,","                    bottom: xy[1] + oh,","                    left: xy[0]","                };","                this.set(DRAGGING, true);","            }","            return this;","        },","        /**","        * Ends the drag operation","        * @method end","        * @return {Self}","        * @chainable","        */","        end: function() {","            this._endTime = (new Date()).getTime();","            if (this._clickTimeout) {","                this._clickTimeout.cancel();","            }","            this._dragThreshMet = this._fromTimeout = false;","","            if (!this.get('lock') && this.get(DRAGGING)) {","                this.fire(EV_END, {","                    pageX: this.lastXY[0],","                    pageY: this.lastXY[1],","                    startTime: this._startTime,","                    endTime: this._endTime","                });","            }","            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-dragging');","            this.set(DRAGGING, false);","            this.deltaXY = [0, 0];","","            return this;","        },","        /**","        * Handler for fixing the selection in IE","        * @private","        * @method _defEndFn","        */","        _defEndFn: function() {","            this._fixIEMouseUp();","            this._ev_md = null;","        },","        /**","        * Handler for preventing the drag:end event. It will reset the node back to it's start position","        * @private","        * @method _prevEndFn","        */","        _prevEndFn: function() {","            this._fixIEMouseUp();","            //Bug #1852577","            this.get(DRAG_NODE).setXY(this.nodeXY);","            this._ev_md = null;","            this.region = null;","        },","        /**","        * Calculates the offsets and set's the XY that the element will move to.","        * @private","        * @method _align","        * @param {Array} xy The xy coords to align with.","        */","        _align: function(xy) {","            this.fire(EV_ALIGN, {pageX: xy[0], pageY: xy[1] });","        },","        /**","        * Calculates the offsets and set's the XY that the element will move to.","        * @private","        * @method _defAlignFn","        * @param {EventFacade} e The drag:align event.","        */","        _defAlignFn: function(e) {","            this.actXY = [e.pageX - this.deltaXY[0], e.pageY - this.deltaXY[1]];","        },","        /**","        * This method performs the alignment before the element move.","        * @private","        * @method _alignNode","        * @param {Array} eXY The XY to move the element to, usually comes from the mousemove DOM event.","        */","        _alignNode: function(eXY, scroll) {","            this._align(eXY);","            if (!scroll) {","                this._moveNode();","            }","        },","        /**","        * This method performs the actual element move.","        * @private","        * @method _moveNode","        */","        _moveNode: function(scroll) {","            //if (!this.get(DRAGGING)) {","            //    return;","            //}","            var diffXY = [], diffXY2 = [], startXY = this.nodeXY, xy = this.actXY;","","            diffXY[0] = (xy[0] - this.lastXY[0]);","            diffXY[1] = (xy[1] - this.lastXY[1]);","","            diffXY2[0] = (xy[0] - this.nodeXY[0]);","            diffXY2[1] = (xy[1] - this.nodeXY[1]);","","","            this.region = {","                '0': xy[0],","                '1': xy[1],","                area: 0,","                top: xy[1],","                right: xy[0] + this.get(DRAG_NODE).get(OFFSET_WIDTH),","                bottom: xy[1] + this.get(DRAG_NODE).get(OFFSET_HEIGHT),","                left: xy[0]","            };","","            this.fire(EV_DRAG, {","                pageX: xy[0],","                pageY: xy[1],","                scroll: scroll,","                info: {","                    start: startXY,","                    xy: xy,","                    delta: diffXY,","                    offset: diffXY2","                }","            });","","            this.lastXY = xy;","        },","        /**","        * Default function for drag:drag. Fired from _moveNode.","        * @private","        * @method _defDragFn","        * @param {EventFacade} ev The drag:drag event","        */","        _defDragFn: function(e) {","            if (this.get('move')) {","                if (e.scroll && e.scroll.node) {","                    var domNode = e.scroll.node.getDOMNode();","                    //If it's the window","                    if (domNode === Y.config.win) {","                        domNode.scrollTo(e.scroll.left, e.scroll.top);","                    } else {","                        e.scroll.node.set('scrollTop', e.scroll.top);","                        e.scroll.node.set('scrollLeft', e.scroll.left);","                    }","                }","                this.get(DRAG_NODE).setXY([e.pageX, e.pageY]);","                this.realXY = [e.pageX, e.pageY];","            }","        },","        /**","        * Fired from DragDropMgr (DDM) on mousemove.","        * @private","        * @method _move","        * @param {EventFacade} ev The mousemove DOM event","        */","        _move: function(ev) {","            if (this.get('lock')) {","                return false;","            }","","            this.mouseXY = [ev.pageX, ev.pageY];","            if (!this._dragThreshMet) {","                var diffX = Math.abs(this.startXY[0] - ev.pageX),","                diffY = Math.abs(this.startXY[1] - ev.pageY);","                if (diffX > this.get('clickPixelThresh') || diffY > this.get('clickPixelThresh')) {","                    this._dragThreshMet = true;","                    this.start();","                    //This only happens on gestures to stop the page from scrolling","                    if (ev && ev.preventDefault) {","                        ev.preventDefault();","                    }","                    this._alignNode([ev.pageX, ev.pageY]);","                }","            } else {","                if (this._clickTimeout) {","                    this._clickTimeout.cancel();","                }","                this._alignNode([ev.pageX, ev.pageY]);","            }","        },","        /**","        * Method will forcefully stop a drag operation. For example calling this from inside an ESC keypress handler will stop this drag.","        * @method stopDrag","        * @return {Self}","        * @chainable","        */","        stopDrag: function() {","            if (this.get(DRAGGING)) {","                DDM._end();","            }","            return this;","        },","        /**","        * Lifecycle destructor, unreg the drag from the DDM and remove listeners","        * @private","        * @method destructor","        */","        destructor: function() {","            this._unprep();","            if (this.target) {","                this.target.destroy();","            }","            DDM._unregDrag(this);","        }","    });","    Y.namespace('DD');","    Y.DD.Drag = Drag;","","","","","}, '@VERSION@', {\"requires\": [\"dd-ddm-base\"]});"];
_yuitest_coverage["build/dd-drag/dd-drag.js"].lines = {"1":0,"17":0,"195":0,"196":0,"198":0,"199":0,"200":0,"204":0,"211":0,"213":0,"221":0,"222":0,"224":0,"225":0,"226":0,"228":0,"238":0,"239":0,"241":0,"242":0,"243":0,"245":0,"288":0,"289":0,"291":0,"293":0,"356":0,"357":0,"368":0,"379":0,"380":0,"381":0,"384":0,"387":0,"388":0,"399":0,"400":0,"401":0,"402":0,"403":0,"404":0,"406":0,"409":0,"411":0,"422":0,"423":0,"436":0,"447":0,"448":0,"450":0,"466":0,"467":0,"468":0,"478":0,"479":0,"480":0,"495":0,"496":0,"497":0,"498":0,"499":0,"502":0,"503":0,"505":0,"506":0,"507":0,"508":0,"526":0,"534":0,"542":0,"550":0,"559":0,"573":0,"574":0,"702":0,"703":0,"704":0,"705":0,"716":0,"717":0,"726":0,"740":0,"741":0,"742":0,"751":0,"752":0,"762":0,"771":0,"773":0,"774":0,"776":0,"777":0,"779":0,"780":0,"781":0,"783":0,"784":0,"786":0,"790":0,"792":0,"794":0,"796":0,"807":0,"813":0,"814":0,"815":0,"816":0,"817":0,"818":0,"819":0,"821":0,"822":0,"823":0,"827":0,"829":0,"830":0,"831":0,"836":0,"837":0,"838":0,"841":0,"842":0,"843":0,"844":0,"846":0,"847":0,"853":0,"854":0,"855":0,"856":0,"857":0,"858":0,"859":0,"860":0,"864":0,"867":0,"876":0,"878":0,"880":0,"881":0,"883":0,"892":0,"893":0,"894":0,"895":0,"906":0,"907":0,"908":0,"910":0,"911":0,"912":0,"914":0,"924":0,"925":0,"927":0,"928":0,"929":0,"931":0,"932":0,"933":0,"943":0,"944":0,"945":0,"946":0,"948":0,"958":0,"959":0,"960":0,"962":0,"971":0,"973":0,"974":0,"975":0,"978":0,"980":0,"982":0,"984":0,"985":0,"990":0,"993":0,"1001":0,"1002":0,"1003":0,"1004":0,"1005":0,"1006":0,"1014":0,"1015":0,"1016":0,"1017":0,"1018":0,"1019":0,"1020":0,"1021":0,"1022":0,"1023":0,"1024":0,"1025":0,"1034":0,"1035":0,"1036":0,"1038":0,"1039":0,"1040":0,"1045":0,"1046":0,"1048":0,"1049":0,"1051":0,"1052":0,"1056":0,"1065":0,"1067":0,"1076":0,"1077":0,"1078":0,"1080":0,"1082":0,"1083":0,"1090":0,"1091":0,"1092":0,"1094":0,"1102":0,"1103":0,"1111":0,"1113":0,"1114":0,"1115":0,"1124":0,"1133":0,"1142":0,"1143":0,"1144":0,"1156":0,"1158":0,"1159":0,"1161":0,"1162":0,"1165":0,"1175":0,"1187":0,"1196":0,"1197":0,"1198":0,"1200":0,"1201":0,"1203":0,"1204":0,"1207":0,"1208":0,"1218":0,"1219":0,"1222":0,"1223":0,"1224":0,"1226":0,"1227":0,"1228":0,"1230":0,"1231":0,"1233":0,"1236":0,"1237":0,"1239":0,"1249":0,"1250":0,"1252":0,"1260":0,"1261":0,"1262":0,"1264":0,"1267":0,"1268":0};
_yuitest_coverage["build/dd-drag/dd-drag.js"].functions = {"Drag:194":0,"setter:220":0,"setter:237":0,"setter:287":0,"setter:355":0,"setter:367":0,"getter:378":0,"setter:386":0,"(anonymous 2):401":0,"setter:398":0,"setter:421":0,"_canDrag:446":0,"addToGroup:465":0,"removeFromGroup:477":0,"_handleTarget:494":0,"(anonymous 3):573":0,"_createEvents:524":0,"_handleMouseUp:701":0,"_fixDragStart:715":0,"_ieSelectFix:725":0,"_fixIEMouseDown:739":0,"_fixIEMouseUp:750":0,"_handleMouseDownEvent:761":0,"_defMouseDownFn:770":0,"(anonymous 5):821":0,"(anonymous 4):814":0,"(anonymous 6):843":0,"(anonymous 7):857":0,"validClick:806":0,"_setStartPosition:875":0,"_timeoutCheck:891":0,"removeHandle:905":0,"addHandle:923":0,"removeInvalid:942":0,"addInvalid:957":0,"initializer:969":0,"_prep:1000":0,"_unprep:1013":0,"start:1033":0,"end:1075":0,"_defEndFn:1101":0,"_prevEndFn:1110":0,"_align:1123":0,"_defAlignFn:1132":0,"_alignNode:1141":0,"_moveNode:1152":0,"_defDragFn:1195":0,"_move:1217":0,"stopDrag:1248":0,"destructor:1259":0,"(anonymous 1):1":0};
_yuitest_coverage["build/dd-drag/dd-drag.js"].coveredLines = 274;
_yuitest_coverage["build/dd-drag/dd-drag.js"].coveredFunctions = 51;
_yuitest_coverline("build/dd-drag/dd-drag.js", 1);
YUI.add('dd-drag', function (Y, NAME) {


    /**
     * Provides the ability to drag a Node.
     * @module dd
     * @submodule dd-drag
     */
    /**
     * Provides the ability to drag a Node.
     * @class Drag
     * @extends Base
     * @constructor
     * @namespace DD
     */

    _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 1)", 1);
_yuitest_coverline("build/dd-drag/dd-drag.js", 17);
var DDM = Y.DD.DDM,
        NODE = 'node',
        DRAGGING = 'dragging',
        DRAG_NODE = 'dragNode',
        OFFSET_HEIGHT = 'offsetHeight',
        OFFSET_WIDTH = 'offsetWidth',
        /**
        * Handles the mouseup DOM event, does nothing internally just fires.
        * @event drag:mouseup
        * @bubbles DDM
        * @type {CustomEvent}
        */
        /**
        * Handles the mousedown DOM event, checks to see if you have a valid handle then starts the drag timers.
        * @event drag:mouseDown
        * @preventable _defMouseDownFn
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>ev</dt><dd>The original mousedown event.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_MOUSE_DOWN = 'drag:mouseDown',
        /**
        * Fires after the mousedown event has been cleared.
        * @event drag:afterMouseDown
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>ev</dt><dd>The original mousedown event.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_AFTER_MOUSE_DOWN = 'drag:afterMouseDown',
        /**
        * Fires after a handle is removed.
        * @event drag:removeHandle
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>handle</dt><dd>The handle that was removed.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_REMOVE_HANDLE = 'drag:removeHandle',
        /**
        * Fires after a handle is added.
        * @event drag:addHandle
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>handle</dt><dd>The handle that was added.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_ADD_HANDLE = 'drag:addHandle',
        /**
        * Fires after an invalid selector is removed.
        * @event drag:removeInvalid
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>handle</dt><dd>The handle that was removed.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_REMOVE_INVALID = 'drag:removeInvalid',
        /**
        * Fires after an invalid selector is added.
        * @event drag:addInvalid
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>handle</dt><dd>The handle that was added.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_ADD_INVALID = 'drag:addInvalid',
        /**
        * Fires at the start of a drag operation.
        * @event drag:start
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>pageX</dt><dd>The original node position X.</dd>
        * <dt>pageY</dt><dd>The original node position Y.</dd>
        * <dt>startTime</dt><dd>The startTime of the event. getTime on the current Date object.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_START = 'drag:start',
        /**
        * Fires at the end of a drag operation.
        * @event drag:end
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>pageX</dt><dd>The current node position X.</dd>
        * <dt>pageY</dt><dd>The current node position Y.</dd>
        * <dt>startTime</dt><dd>The startTime of the event, from the start event.</dd>
        * <dt>endTime</dt><dd>The endTime of the event. getTime on the current Date object.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_END = 'drag:end',
        /**
        * Fires every mousemove during a drag operation.
        * @event drag:drag
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>pageX</dt><dd>The current node position X.</dd>
        * <dt>pageY</dt><dd>The current node position Y.</dd>
        * <dt>scroll</dt><dd>Should a scroll action occur.</dd>
        * <dt>info</dt><dd>Object hash containing calculated XY arrays: start, xy, delta, offset</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_DRAG = 'drag:drag',
        /**
        * Fires when this node is aligned.
        * @event drag:align
        * @preventable _defAlignFn
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>pageX</dt><dd>The current node position X.</dd>
        * <dt>pageY</dt><dd>The current node position Y.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_ALIGN = 'drag:align',
        /**
        * Fires when this node is over a Drop Target. (Fired from dd-drop)
        * @event drag:over
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>
        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        /**
        * Fires when this node enters a Drop Target. (Fired from dd-drop)
        * @event drag:enter
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>
        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        /**
        * Fires when this node exits a Drop Target. (Fired from dd-drop)
        * @event drag:exit
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        /**
        * Fires when this node is dropped on a valid Drop Target. (Fired from dd-ddm-drop)
        * @event drag:drophit
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The best guess on what was dropped on.</dd>
        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>
        * <dt>others</dt><dd>An array of all the other drop targets that was dropped on.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        /**
        * Fires when this node is dropped on an invalid Drop Target. (Fired from dd-ddm-drop)
        * @event drag:dropmiss
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>pageX</dt><dd>The current node position X.</dd>
        * <dt>pageY</dt><dd>The current node position Y.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */

    Drag = function(o) {
        _yuitest_coverfunc("build/dd-drag/dd-drag.js", "Drag", 194);
_yuitest_coverline("build/dd-drag/dd-drag.js", 195);
this._lazyAddAttrs = false;
        _yuitest_coverline("build/dd-drag/dd-drag.js", 196);
Drag.superclass.constructor.apply(this, arguments);

        _yuitest_coverline("build/dd-drag/dd-drag.js", 198);
var valid = DDM._regDrag(this);
        _yuitest_coverline("build/dd-drag/dd-drag.js", 199);
if (!valid) {
            _yuitest_coverline("build/dd-drag/dd-drag.js", 200);
Y.error('Failed to register node, already in use: ' + o.node);
        }
    };

    _yuitest_coverline("build/dd-drag/dd-drag.js", 204);
Drag.NAME = 'drag';

    /**
    * This property defaults to "mousedown", but when drag-gestures is loaded, it is changed to "gesturemovestart"
    * @static
    * @property START_EVENT
    */
    _yuitest_coverline("build/dd-drag/dd-drag.js", 211);
Drag.START_EVENT = 'mousedown';

    _yuitest_coverline("build/dd-drag/dd-drag.js", 213);
Drag.ATTRS = {
        /**
        * Y.Node instance to use as the element to initiate a drag operation
        * @attribute node
        * @type Node
        */
        node: {
            setter: function(node) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 220);
_yuitest_coverline("build/dd-drag/dd-drag.js", 221);
if (this._canDrag(node)) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 222);
return node;
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 224);
var n = Y.one(node);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 225);
if (!n) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 226);
Y.error('DD.Drag: Invalid Node Given: ' + node);
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 228);
return n;
            }
        },
        /**
        * Y.Node instance to use as the draggable element, defaults to node
        * @attribute dragNode
        * @type Node
        */
        dragNode: {
            setter: function(node) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 237);
_yuitest_coverline("build/dd-drag/dd-drag.js", 238);
if (this._canDrag(node)) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 239);
return node;
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 241);
var n = Y.one(node);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 242);
if (!n) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 243);
Y.error('DD.Drag: Invalid dragNode Given: ' + node);
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 245);
return n;
            }
        },
        /**
        * Offset the drag element by the difference in cursor position: default true
        * @attribute offsetNode
        * @type Boolean
        */
        offsetNode: {
            value: true
        },
        /**
        * Center the dragNode to the mouse position on drag:start: default false
        * @attribute startCentered
        * @type Boolean
        */
        startCentered: {
            value: false
        },
        /**
        * The number of pixels to move to start a drag operation, default is 3.
        * @attribute clickPixelThresh
        * @type Number
        */
        clickPixelThresh: {
            value: DDM.get('clickPixelThresh')
        },
        /**
        * The number of milliseconds a mousedown has to pass to start a drag operation, default is 1000.
        * @attribute clickTimeThresh
        * @type Number
        */
        clickTimeThresh: {
            value: DDM.get('clickTimeThresh')
        },
        /**
        * Set to lock this drag element so that it can't be dragged: default false.
        * @attribute lock
        * @type Boolean
        */
        lock: {
            value: false,
            setter: function(lock) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 287);
_yuitest_coverline("build/dd-drag/dd-drag.js", 288);
if (lock) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 289);
this.get(NODE).addClass(DDM.CSS_PREFIX + '-locked');
                } else {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 291);
this.get(NODE).removeClass(DDM.CSS_PREFIX + '-locked');
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 293);
return lock;
            }
        },
        /**
        * A payload holder to store arbitrary data about this drag object, can be used to store any value.
        * @attribute data
        * @type Mixed
        */
        data: {
            value: false
        },
        /**
        * If this is false, the drag element will not move with the cursor: default true. Can be used to "resize" the element.
        * @attribute move
        * @type Boolean
        */
        move: {
            value: true
        },
        /**
        * Use the protective shim on all drag operations: default true. Only works with dd-ddm, not dd-ddm-base.
        * @attribute useShim
        * @type Boolean
        */
        useShim: {
            value: true
        },
        /**
        * Config option is set by Drag to inform you of which handle fired the drag event (in the case that there are several handles): default false.
        * @attribute activeHandle
        * @type Node
        */
        activeHandle: {
            value: false
        },
        /**
        * By default a drag operation will only begin if the mousedown occurred with the primary mouse button.
        * Setting this to false will allow for all mousedown events to trigger a drag.
        * @attribute primaryButtonOnly
        * @type Boolean
        */
        primaryButtonOnly: {
            value: true
        },
        /**
        * This attribute is not meant to be used by the implementor, it is meant to be used as an Event tracker so you can listen for it to change.
        * @attribute dragging
        * @type Boolean
        */
        dragging: {
            value: false
        },
        parent: {
            value: false
        },
        /**
        * This attribute only works if the dd-drop module has been loaded. It will make this node a drop target as well as draggable.
        * @attribute target
        * @type Boolean
        */
        target: {
            value: false,
            setter: function(config) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 355);
_yuitest_coverline("build/dd-drag/dd-drag.js", 356);
this._handleTarget(config);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 357);
return config;
            }
        },
        /**
        * This attribute only works if the dd-drop module is active. It will set the dragMode (point, intersect, strict) of this Drag instance.
        * @attribute dragMode
        * @type String
        */
        dragMode: {
            value: null,
            setter: function(mode) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 367);
_yuitest_coverline("build/dd-drag/dd-drag.js", 368);
return DDM._setDragMode(mode);
            }
        },
        /**
        * Array of groups to add this drag into.
        * @attribute groups
        * @type Array
        */
        groups: {
            value: ['default'],
            getter: function() {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "getter", 378);
_yuitest_coverline("build/dd-drag/dd-drag.js", 379);
if (!this._groups) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 380);
this._groups = {};
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 381);
return [];
                }

                _yuitest_coverline("build/dd-drag/dd-drag.js", 384);
return Y.Object.keys(this._groups);
            },
            setter: function(g) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 386);
_yuitest_coverline("build/dd-drag/dd-drag.js", 387);
this._groups = Y.Array.hash(g);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 388);
return g;
            }
        },
        /**
        * Array of valid handles to add. Adding something here will set all handles, even if previously added with addHandle
        * @attribute handles
        * @type Array
        */
        handles: {
            value: null,
            setter: function(g) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 398);
_yuitest_coverline("build/dd-drag/dd-drag.js", 399);
if (g) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 400);
this._handles = {};
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 401);
Y.Array.each(g, function(v) {
                        _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 2)", 401);
_yuitest_coverline("build/dd-drag/dd-drag.js", 402);
var key = v;
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 403);
if (v instanceof Y.Node || v instanceof Y.NodeList) {
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 404);
key = v._yuid;
                        }
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 406);
this._handles[key] = v;
                    }, this);
                } else {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 409);
this._handles = null;
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 411);
return g;
            }
        },
        /**
        * Controls the default bubble parent for this Drag instance. Default: Y.DD.DDM. Set to false to disable bubbling. Use bubbleTargets in config
        * @deprecated
        * @attribute bubbles
        * @type Object
        */
        bubbles: {
            setter: function(t) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 421);
_yuitest_coverline("build/dd-drag/dd-drag.js", 422);
this.addTarget(t);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 423);
return t;
            }
        },
        /**
        * Should the mousedown event be halted. Default: true
        * @attribute haltDown
        * @type Boolean
        */
        haltDown: {
            value: true
        }
    };

    _yuitest_coverline("build/dd-drag/dd-drag.js", 436);
Y.extend(Drag, Y.Base, {
        /**
        * Checks the object for the methods needed to drag the object around.
        * Normally this would be a node instance, but in the case of Graphics, it
        * may be an SVG node or something similar.
        * @method _canDrag
        * @private
        * @param {Object} n The object to check
        * @return {Boolean} True or false if the Object contains the methods needed to Drag
        */
        _canDrag: function(n) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_canDrag", 446);
_yuitest_coverline("build/dd-drag/dd-drag.js", 447);
if (n && n.setXY && n.getXY && n.test && n.contains) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 448);
return true;
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 450);
return false;
        },
        /**
        * The default bubbleTarget for this object. Default: Y.DD.DDM
        * @private
        * @property _bubbleTargets
        */
        _bubbleTargets: Y.DD.DDM,
        /**
        * Add this Drag instance to a group, this should be used for on-the-fly group additions.
        * @method addToGroup
        * @param {String} g The group to add this Drag Instance to.
        * @return {Self}
        * @chainable
        */
        addToGroup: function(g) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "addToGroup", 465);
_yuitest_coverline("build/dd-drag/dd-drag.js", 466);
this._groups[g] = true;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 467);
DDM._activateTargets();
            _yuitest_coverline("build/dd-drag/dd-drag.js", 468);
return this;
        },
        /**
        * Remove this Drag instance from a group, this should be used for on-the-fly group removals.
        * @method removeFromGroup
        * @param {String} g The group to remove this Drag Instance from.
        * @return {Self}
        * @chainable
        */
        removeFromGroup: function(g) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "removeFromGroup", 477);
_yuitest_coverline("build/dd-drag/dd-drag.js", 478);
delete this._groups[g];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 479);
DDM._activateTargets();
            _yuitest_coverline("build/dd-drag/dd-drag.js", 480);
return this;
        },
        /**
        * This will be a reference to the Drop instance associated with this drag if the target: true config attribute is set..
        * @property target
        * @type {Object}
        */
        target: null,
        /**
        * Attribute handler for the target config attribute.
        * @private
        * @method _handleTarget
        * @param {Boolean/Object} config The Config
        */
        _handleTarget: function(config) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_handleTarget", 494);
_yuitest_coverline("build/dd-drag/dd-drag.js", 495);
if (Y.DD.Drop) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 496);
if (config === false) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 497);
if (this.target) {
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 498);
DDM._unregTarget(this.target);
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 499);
this.target = null;
                    }
                } else {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 502);
if (!Y.Lang.isObject(config)) {
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 503);
config = {};
                    }
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 505);
config.bubbleTargets = config.bubbleTargets || Y.Object.values(this._yuievt.targets);
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 506);
config.node = this.get(NODE);
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 507);
config.groups = config.groups || this.get('groups');
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 508);
this.target = new Y.DD.Drop(config);
                }
            }
        },
        /**
        * Storage Array for the groups this drag belongs to.
        * @private
        * @property _groups
        * @type {Array}
        */
        _groups: null,
        /**
        * This method creates all the events for this Event Target and publishes them so we get Event Bubbling.
        * @private
        * @method _createEvents
        */
        _createEvents: function() {

            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_createEvents", 524);
_yuitest_coverline("build/dd-drag/dd-drag.js", 526);
this.publish(EV_MOUSE_DOWN, {
                defaultFn: this._defMouseDownFn,
                queuable: false,
                emitFacade: true,
                bubbles: true,
                prefix: 'drag'
            });

            _yuitest_coverline("build/dd-drag/dd-drag.js", 534);
this.publish(EV_ALIGN, {
                defaultFn: this._defAlignFn,
                queuable: false,
                emitFacade: true,
                bubbles: true,
                prefix: 'drag'
            });

            _yuitest_coverline("build/dd-drag/dd-drag.js", 542);
this.publish(EV_DRAG, {
                defaultFn: this._defDragFn,
                queuable: false,
                emitFacade: true,
                bubbles: true,
                prefix: 'drag'
            });

            _yuitest_coverline("build/dd-drag/dd-drag.js", 550);
this.publish(EV_END, {
                defaultFn: this._defEndFn,
                preventedFn: this._prevEndFn,
                queuable: false,
                emitFacade: true,
                bubbles: true,
                prefix: 'drag'
            });

            _yuitest_coverline("build/dd-drag/dd-drag.js", 559);
var ev = [
                EV_AFTER_MOUSE_DOWN,
                EV_REMOVE_HANDLE,
                EV_ADD_HANDLE,
                EV_REMOVE_INVALID,
                EV_ADD_INVALID,
                EV_START,
                'drag:drophit',
                'drag:dropmiss',
                'drag:over',
                'drag:enter',
                'drag:exit'
            ];

            _yuitest_coverline("build/dd-drag/dd-drag.js", 573);
Y.Array.each(ev, function(v) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 3)", 573);
_yuitest_coverline("build/dd-drag/dd-drag.js", 574);
this.publish(v, {
                    type: v,
                    emitFacade: true,
                    bubbles: true,
                    preventable: false,
                    queuable: false,
                    prefix: 'drag'
                });
            }, this);
        },
        /**
        * A private reference to the mousedown DOM event
        * @private
        * @property _ev_md
        * @type {EventFacade}
        */
        _ev_md: null,
        /**
        * The getTime of the mousedown event. Not used, just here in case someone wants/needs to use it.
        * @private
        * @property _startTime
        * @type Date
        */
        _startTime: null,
        /**
        * The getTime of the mouseup event. Not used, just here in case someone wants/needs to use it.
        * @private
        * @property _endTime
        * @type Date
        */
        _endTime: null,
        /**
        * A private hash of the valid drag handles
        * @private
        * @property _handles
        * @type {Object}
        */
        _handles: null,
        /**
        * A private hash of the invalid selector strings
        * @private
        * @property _invalids
        * @type {Object}
        */
        _invalids: null,
        /**
        * A private hash of the default invalid selector strings: {'textarea': true, 'input': true, 'a': true, 'button': true, 'select': true}
        * @private
        * @property _invalidsDefault
        * @type {Object}
        */
        _invalidsDefault: {'textarea': true, 'input': true, 'a': true, 'button': true, 'select': true },
        /**
        * Private flag to see if the drag threshhold was met
        * @private
        * @property _dragThreshMet
        * @type {Boolean}
        */
        _dragThreshMet: null,
        /**
        * Flag to determine if the drag operation came from a timeout
        * @private
        * @property _fromTimeout
        * @type {Boolean}
        */
        _fromTimeout: null,
        /**
        * Holder for the setTimeout call
        * @private
        * @property _clickTimeout
        * @type {Boolean}
        */
        _clickTimeout: null,
        /**
        * The offset of the mouse position to the element's position
        * @property deltaXY
        * @type {Array}
        */
        deltaXY: null,
        /**
        * The initial mouse position
        * @property startXY
        * @type {Array}
        */
        startXY: null,
        /**
        * The initial element position
        * @property nodeXY
        * @type {Array}
        */
        nodeXY: null,
        /**
        * The position of the element as it's moving (for offset calculations)
        * @property lastXY
        * @type {Array}
        */
        lastXY: null,
        /**
        * The xy that the node will be set to. Changing this will alter the position as it's dragged.
        * @property actXY
        * @type {Array}
        */
        actXY: null,
        /**
        * The real xy position of the node.
        * @property realXY
        * @type {Array}
        */
        realXY: null,
        /**
        * The XY coords of the mousemove
        * @property mouseXY
        * @type {Array}
        */
        mouseXY: null,
        /**
        * A region object associated with this drag, used for checking regions while dragging.
        * @property region
        * @type Object
        */
        region: null,
        /**
        * Handler for the mouseup DOM event
        * @private
        * @method _handleMouseUp
        * @param {EventFacade} ev The Event
        */
        _handleMouseUp: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_handleMouseUp", 701);
_yuitest_coverline("build/dd-drag/dd-drag.js", 702);
this.fire('drag:mouseup');
            _yuitest_coverline("build/dd-drag/dd-drag.js", 703);
this._fixIEMouseUp();
            _yuitest_coverline("build/dd-drag/dd-drag.js", 704);
if (DDM.activeDrag) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 705);
DDM._end();
            }
        },
        /**
        * The function we use as the ondragstart handler when we start a drag
        * in Internet Explorer. This keeps IE from blowing up on images as drag handles.
        * @private
        * @method _fixDragStart
        * @param {Event} e The Event
        */
        _fixDragStart: function(e) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_fixDragStart", 715);
_yuitest_coverline("build/dd-drag/dd-drag.js", 716);
if (this.validClick(e)) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 717);
e.preventDefault();
            }
        },
        /**
        * The function we use as the onselectstart handler when we start a drag in Internet Explorer
        * @private
        * @method _ieSelectFix
        */
        _ieSelectFix: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_ieSelectFix", 725);
_yuitest_coverline("build/dd-drag/dd-drag.js", 726);
return false;
        },
        /**
        * We will hold a copy of the current "onselectstart" method on this property, and reset it after we are done using it.
        * @private
        * @property _ieSelectBack
        */
        _ieSelectBack: null,
        /**
        * This method copies the onselectstart listner on the document to the _ieSelectFix property
        * @private
        * @method _fixIEMouseDown
        */
        _fixIEMouseDown: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_fixIEMouseDown", 739);
_yuitest_coverline("build/dd-drag/dd-drag.js", 740);
if (Y.UA.ie) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 741);
this._ieSelectBack = Y.config.doc.body.onselectstart;
                _yuitest_coverline("build/dd-drag/dd-drag.js", 742);
Y.config.doc.body.onselectstart = this._ieSelectFix;
            }
        },
        /**
        * This method copies the _ieSelectFix property back to the onselectstart listner on the document.
        * @private
        * @method _fixIEMouseUp
        */
        _fixIEMouseUp: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_fixIEMouseUp", 750);
_yuitest_coverline("build/dd-drag/dd-drag.js", 751);
if (Y.UA.ie) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 752);
Y.config.doc.body.onselectstart = this._ieSelectBack;
            }
        },
        /**
        * Handler for the mousedown DOM event
        * @private
        * @method _handleMouseDownEvent
        * @param {EventFacade} ev  The Event
        */
        _handleMouseDownEvent: function(ev) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_handleMouseDownEvent", 761);
_yuitest_coverline("build/dd-drag/dd-drag.js", 762);
this.fire(EV_MOUSE_DOWN, { ev: ev });
        },
        /**
        * Handler for the mousedown DOM event
        * @private
        * @method _defMouseDownFn
        * @param {EventFacade} e  The Event
        */
        _defMouseDownFn: function(e) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_defMouseDownFn", 770);
_yuitest_coverline("build/dd-drag/dd-drag.js", 771);
var ev = e.ev;

            _yuitest_coverline("build/dd-drag/dd-drag.js", 773);
this._dragThreshMet = false;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 774);
this._ev_md = ev;

            _yuitest_coverline("build/dd-drag/dd-drag.js", 776);
if (this.get('primaryButtonOnly') && ev.button > 1) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 777);
return false;
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 779);
if (this.validClick(ev)) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 780);
this._fixIEMouseDown(ev);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 781);
if (Drag.START_EVENT.indexOf('gesture') !== 0) {
                    //Only do these if it's not a gesture
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 783);
if (this.get('haltDown')) {
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 784);
ev.halt();
                    } else {
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 786);
ev.preventDefault();
                    }
                }

                _yuitest_coverline("build/dd-drag/dd-drag.js", 790);
this._setStartPosition([ev.pageX, ev.pageY]);

                _yuitest_coverline("build/dd-drag/dd-drag.js", 792);
DDM.activeDrag = this;

                _yuitest_coverline("build/dd-drag/dd-drag.js", 794);
this._clickTimeout = Y.later(this.get('clickTimeThresh'), this, this._timeoutCheck);
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 796);
this.fire(EV_AFTER_MOUSE_DOWN, { ev: ev });
        },
        /**
        * Method first checks to see if we have handles, if so it validates the click
        * against the handle. Then if it finds a valid handle, it checks it against
        * the invalid handles list. Returns true if a good handle was used, false otherwise.
        * @method validClick
        * @param {EventFacade} ev  The Event
        * @return {Boolean}
        */
        validClick: function(ev) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "validClick", 806);
_yuitest_coverline("build/dd-drag/dd-drag.js", 807);
var r = false, n = false,
            tar = ev.target,
            hTest = null,
            els = null,
            nlist = null,
            set = false;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 813);
if (this._handles) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 814);
Y.Object.each(this._handles, function(i, n) {
                    _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 4)", 814);
_yuitest_coverline("build/dd-drag/dd-drag.js", 815);
if (i instanceof Y.Node || i instanceof Y.NodeList) {
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 816);
if (!r) {
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 817);
nlist = i;
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 818);
if (nlist instanceof Y.Node) {
                                _yuitest_coverline("build/dd-drag/dd-drag.js", 819);
nlist = new Y.NodeList(i._node);
                            }
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 821);
nlist.each(function(nl) {
                                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 5)", 821);
_yuitest_coverline("build/dd-drag/dd-drag.js", 822);
if (nl.contains(tar)) {
                                    _yuitest_coverline("build/dd-drag/dd-drag.js", 823);
r = true;
                                }
                            });
                        }
                    } else {_yuitest_coverline("build/dd-drag/dd-drag.js", 827);
if (Y.Lang.isString(n)) {
                        //Am I this or am I inside this
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 829);
if (tar.test(n + ', ' + n + ' *') && !hTest) {
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 830);
hTest = n;
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 831);
r = true;
                        }
                    }}
                });
            } else {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 836);
n = this.get(NODE);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 837);
if (n.contains(tar) || n.compareTo(tar)) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 838);
r = true;
                }
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 841);
if (r) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 842);
if (this._invalids) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 843);
Y.Object.each(this._invalids, function(i, n) {
                        _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 6)", 843);
_yuitest_coverline("build/dd-drag/dd-drag.js", 844);
if (Y.Lang.isString(n)) {
                            //Am I this or am I inside this
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 846);
if (tar.test(n + ', ' + n + ' *')) {
                                _yuitest_coverline("build/dd-drag/dd-drag.js", 847);
r = false;
                            }
                        }
                    });
                }
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 853);
if (r) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 854);
if (hTest) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 855);
els = ev.currentTarget.all(hTest);
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 856);
set = false;
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 857);
els.each(function(n) {
                        _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 7)", 857);
_yuitest_coverline("build/dd-drag/dd-drag.js", 858);
if ((n.contains(tar) || n.compareTo(tar)) && !set) {
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 859);
set = true;
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 860);
this.set('activeHandle', n);
                        }
                    }, this);
                } else {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 864);
this.set('activeHandle', this.get(NODE));
                }
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 867);
return r;
        },
        /**
        * Sets the current position of the Element and calculates the offset
        * @private
        * @method _setStartPosition
        * @param {Array} xy The XY coords to set the position to.
        */
        _setStartPosition: function(xy) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_setStartPosition", 875);
_yuitest_coverline("build/dd-drag/dd-drag.js", 876);
this.startXY = xy;

            _yuitest_coverline("build/dd-drag/dd-drag.js", 878);
this.nodeXY = this.lastXY = this.realXY = this.get(NODE).getXY();

            _yuitest_coverline("build/dd-drag/dd-drag.js", 880);
if (this.get('offsetNode')) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 881);
this.deltaXY = [(this.startXY[0] - this.nodeXY[0]), (this.startXY[1] - this.nodeXY[1])];
            } else {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 883);
this.deltaXY = [0, 0];
            }
        },
        /**
        * The method passed to setTimeout to determine if the clickTimeThreshold was met.
        * @private
        * @method _timeoutCheck
        */
        _timeoutCheck: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_timeoutCheck", 891);
_yuitest_coverline("build/dd-drag/dd-drag.js", 892);
if (!this.get('lock') && !this._dragThreshMet && this._ev_md) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 893);
this._fromTimeout = this._dragThreshMet = true;
                _yuitest_coverline("build/dd-drag/dd-drag.js", 894);
this.start();
                _yuitest_coverline("build/dd-drag/dd-drag.js", 895);
this._alignNode([this._ev_md.pageX, this._ev_md.pageY], true);
            }
        },
        /**
        * Remove a Selector added by addHandle
        * @method removeHandle
        * @param {String} str The selector for the handle to be removed.
        * @return {Self}
        * @chainable
        */
        removeHandle: function(str) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "removeHandle", 905);
_yuitest_coverline("build/dd-drag/dd-drag.js", 906);
var key = str;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 907);
if (str instanceof Y.Node || str instanceof Y.NodeList) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 908);
key = str._yuid;
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 910);
if (this._handles[key]) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 911);
delete this._handles[key];
                _yuitest_coverline("build/dd-drag/dd-drag.js", 912);
this.fire(EV_REMOVE_HANDLE, { handle: str });
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 914);
return this;
        },
        /**
        * Add a handle to a drag element. Drag only initiates when a mousedown happens on this element.
        * @method addHandle
        * @param {String} str The selector to test for a valid handle. Must be a child of the element.
        * @return {Self}
        * @chainable
        */
        addHandle: function(str) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "addHandle", 923);
_yuitest_coverline("build/dd-drag/dd-drag.js", 924);
if (!this._handles) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 925);
this._handles = {};
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 927);
var key = str;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 928);
if (str instanceof Y.Node || str instanceof Y.NodeList) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 929);
key = str._yuid;
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 931);
this._handles[key] = str;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 932);
this.fire(EV_ADD_HANDLE, { handle: str });
            _yuitest_coverline("build/dd-drag/dd-drag.js", 933);
return this;
        },
        /**
        * Remove an invalid handle added by addInvalid
        * @method removeInvalid
        * @param {String} str The invalid handle to remove from the internal list.
        * @return {Self}
        * @chainable
        */
        removeInvalid: function(str) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "removeInvalid", 942);
_yuitest_coverline("build/dd-drag/dd-drag.js", 943);
if (this._invalids[str]) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 944);
this._invalids[str] = null;
                _yuitest_coverline("build/dd-drag/dd-drag.js", 945);
delete this._invalids[str];
                _yuitest_coverline("build/dd-drag/dd-drag.js", 946);
this.fire(EV_REMOVE_INVALID, { handle: str });
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 948);
return this;
        },
        /**
        * Add a selector string to test the handle against. If the test passes the drag operation will not continue.
        * @method addInvalid
        * @param {String} str The selector to test against to determine if this is an invalid drag handle.
        * @return {Self}
        * @chainable
        */
        addInvalid: function(str) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "addInvalid", 957);
_yuitest_coverline("build/dd-drag/dd-drag.js", 958);
if (Y.Lang.isString(str)) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 959);
this._invalids[str] = true;
                _yuitest_coverline("build/dd-drag/dd-drag.js", 960);
this.fire(EV_ADD_INVALID, { handle: str });
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 962);
return this;
        },
        /**
        * Internal init handler
        * @private
        * @method initializer
        */
        initializer: function() {

            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "initializer", 969);
_yuitest_coverline("build/dd-drag/dd-drag.js", 971);
this.get(NODE).dd = this;

            _yuitest_coverline("build/dd-drag/dd-drag.js", 973);
if (!this.get(NODE).get('id')) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 974);
var id = Y.stamp(this.get(NODE));
                _yuitest_coverline("build/dd-drag/dd-drag.js", 975);
this.get(NODE).set('id', id);
            }

            _yuitest_coverline("build/dd-drag/dd-drag.js", 978);
this.actXY = [];

            _yuitest_coverline("build/dd-drag/dd-drag.js", 980);
this._invalids = Y.clone(this._invalidsDefault, true);

            _yuitest_coverline("build/dd-drag/dd-drag.js", 982);
this._createEvents();

            _yuitest_coverline("build/dd-drag/dd-drag.js", 984);
if (!this.get(DRAG_NODE)) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 985);
this.set(DRAG_NODE, this.get(NODE));
            }

            //Fix for #2528096
            //Don't prep the DD instance until all plugins are loaded.
            _yuitest_coverline("build/dd-drag/dd-drag.js", 990);
this.on('initializedChange', Y.bind(this._prep, this));

            //Shouldn't have to do this..
            _yuitest_coverline("build/dd-drag/dd-drag.js", 993);
this.set('groups', this.get('groups'));
        },
        /**
        * Attach event listners and add classname
        * @private
        * @method _prep
        */
        _prep: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_prep", 1000);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1001);
this._dragThreshMet = false;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1002);
var node = this.get(NODE);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1003);
node.addClass(DDM.CSS_PREFIX + '-draggable');
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1004);
node.on(Drag.START_EVENT, Y.bind(this._handleMouseDownEvent, this));
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1005);
node.on('mouseup', Y.bind(this._handleMouseUp, this));
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1006);
node.on('dragstart', Y.bind(this._fixDragStart, this));
        },
        /**
        * Detach event listeners and remove classname
        * @private
        * @method _unprep
        */
        _unprep: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_unprep", 1013);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1014);
var node = this.get(NODE);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1015);
node.removeClass(DDM.CSS_PREFIX + '-draggable');
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1016);
node.detachAll('mouseup');
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1017);
node.detachAll('dragstart');
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1018);
node.detachAll(Drag.START_EVENT);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1019);
this.mouseXY = [];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1020);
this.deltaXY = [0,0];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1021);
this.startXY = [];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1022);
this.nodeXY = [];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1023);
this.lastXY = [];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1024);
this.actXY = [];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1025);
this.realXY = [];
        },
        /**
        * Starts the drag operation
        * @method start
        * @return {Self}
        * @chainable
        */
        start: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "start", 1033);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1034);
if (!this.get('lock') && !this.get(DRAGGING)) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1035);
var node = this.get(NODE), ow, oh, xy;
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1036);
this._startTime = (new Date()).getTime();

                _yuitest_coverline("build/dd-drag/dd-drag.js", 1038);
DDM._start();
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1039);
node.addClass(DDM.CSS_PREFIX + '-dragging');
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1040);
this.fire(EV_START, {
                    pageX: this.nodeXY[0],
                    pageY: this.nodeXY[1],
                    startTime: this._startTime
                });
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1045);
node = this.get(DRAG_NODE);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1046);
xy = this.nodeXY;

                _yuitest_coverline("build/dd-drag/dd-drag.js", 1048);
ow = node.get(OFFSET_WIDTH);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1049);
oh = node.get(OFFSET_HEIGHT);

                _yuitest_coverline("build/dd-drag/dd-drag.js", 1051);
if (this.get('startCentered')) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 1052);
this._setStartPosition([xy[0] + (ow / 2), xy[1] + (oh / 2)]);
                }


                _yuitest_coverline("build/dd-drag/dd-drag.js", 1056);
this.region = {
                    '0': xy[0],
                    '1': xy[1],
                    area: 0,
                    top: xy[1],
                    right: xy[0] + ow,
                    bottom: xy[1] + oh,
                    left: xy[0]
                };
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1065);
this.set(DRAGGING, true);
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1067);
return this;
        },
        /**
        * Ends the drag operation
        * @method end
        * @return {Self}
        * @chainable
        */
        end: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "end", 1075);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1076);
this._endTime = (new Date()).getTime();
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1077);
if (this._clickTimeout) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1078);
this._clickTimeout.cancel();
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1080);
this._dragThreshMet = this._fromTimeout = false;

            _yuitest_coverline("build/dd-drag/dd-drag.js", 1082);
if (!this.get('lock') && this.get(DRAGGING)) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1083);
this.fire(EV_END, {
                    pageX: this.lastXY[0],
                    pageY: this.lastXY[1],
                    startTime: this._startTime,
                    endTime: this._endTime
                });
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1090);
this.get(NODE).removeClass(DDM.CSS_PREFIX + '-dragging');
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1091);
this.set(DRAGGING, false);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1092);
this.deltaXY = [0, 0];

            _yuitest_coverline("build/dd-drag/dd-drag.js", 1094);
return this;
        },
        /**
        * Handler for fixing the selection in IE
        * @private
        * @method _defEndFn
        */
        _defEndFn: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_defEndFn", 1101);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1102);
this._fixIEMouseUp();
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1103);
this._ev_md = null;
        },
        /**
        * Handler for preventing the drag:end event. It will reset the node back to it's start position
        * @private
        * @method _prevEndFn
        */
        _prevEndFn: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_prevEndFn", 1110);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1111);
this._fixIEMouseUp();
            //Bug #1852577
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1113);
this.get(DRAG_NODE).setXY(this.nodeXY);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1114);
this._ev_md = null;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1115);
this.region = null;
        },
        /**
        * Calculates the offsets and set's the XY that the element will move to.
        * @private
        * @method _align
        * @param {Array} xy The xy coords to align with.
        */
        _align: function(xy) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_align", 1123);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1124);
this.fire(EV_ALIGN, {pageX: xy[0], pageY: xy[1] });
        },
        /**
        * Calculates the offsets and set's the XY that the element will move to.
        * @private
        * @method _defAlignFn
        * @param {EventFacade} e The drag:align event.
        */
        _defAlignFn: function(e) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_defAlignFn", 1132);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1133);
this.actXY = [e.pageX - this.deltaXY[0], e.pageY - this.deltaXY[1]];
        },
        /**
        * This method performs the alignment before the element move.
        * @private
        * @method _alignNode
        * @param {Array} eXY The XY to move the element to, usually comes from the mousemove DOM event.
        */
        _alignNode: function(eXY, scroll) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_alignNode", 1141);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1142);
this._align(eXY);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1143);
if (!scroll) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1144);
this._moveNode();
            }
        },
        /**
        * This method performs the actual element move.
        * @private
        * @method _moveNode
        */
        _moveNode: function(scroll) {
            //if (!this.get(DRAGGING)) {
            //    return;
            //}
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_moveNode", 1152);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1156);
var diffXY = [], diffXY2 = [], startXY = this.nodeXY, xy = this.actXY;

            _yuitest_coverline("build/dd-drag/dd-drag.js", 1158);
diffXY[0] = (xy[0] - this.lastXY[0]);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1159);
diffXY[1] = (xy[1] - this.lastXY[1]);

            _yuitest_coverline("build/dd-drag/dd-drag.js", 1161);
diffXY2[0] = (xy[0] - this.nodeXY[0]);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1162);
diffXY2[1] = (xy[1] - this.nodeXY[1]);


            _yuitest_coverline("build/dd-drag/dd-drag.js", 1165);
this.region = {
                '0': xy[0],
                '1': xy[1],
                area: 0,
                top: xy[1],
                right: xy[0] + this.get(DRAG_NODE).get(OFFSET_WIDTH),
                bottom: xy[1] + this.get(DRAG_NODE).get(OFFSET_HEIGHT),
                left: xy[0]
            };

            _yuitest_coverline("build/dd-drag/dd-drag.js", 1175);
this.fire(EV_DRAG, {
                pageX: xy[0],
                pageY: xy[1],
                scroll: scroll,
                info: {
                    start: startXY,
                    xy: xy,
                    delta: diffXY,
                    offset: diffXY2
                }
            });

            _yuitest_coverline("build/dd-drag/dd-drag.js", 1187);
this.lastXY = xy;
        },
        /**
        * Default function for drag:drag. Fired from _moveNode.
        * @private
        * @method _defDragFn
        * @param {EventFacade} ev The drag:drag event
        */
        _defDragFn: function(e) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_defDragFn", 1195);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1196);
if (this.get('move')) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1197);
if (e.scroll && e.scroll.node) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 1198);
var domNode = e.scroll.node.getDOMNode();
                    //If it's the window
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 1200);
if (domNode === Y.config.win) {
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 1201);
domNode.scrollTo(e.scroll.left, e.scroll.top);
                    } else {
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 1203);
e.scroll.node.set('scrollTop', e.scroll.top);
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 1204);
e.scroll.node.set('scrollLeft', e.scroll.left);
                    }
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1207);
this.get(DRAG_NODE).setXY([e.pageX, e.pageY]);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1208);
this.realXY = [e.pageX, e.pageY];
            }
        },
        /**
        * Fired from DragDropMgr (DDM) on mousemove.
        * @private
        * @method _move
        * @param {EventFacade} ev The mousemove DOM event
        */
        _move: function(ev) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_move", 1217);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1218);
if (this.get('lock')) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1219);
return false;
            }

            _yuitest_coverline("build/dd-drag/dd-drag.js", 1222);
this.mouseXY = [ev.pageX, ev.pageY];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1223);
if (!this._dragThreshMet) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1224);
var diffX = Math.abs(this.startXY[0] - ev.pageX),
                diffY = Math.abs(this.startXY[1] - ev.pageY);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1226);
if (diffX > this.get('clickPixelThresh') || diffY > this.get('clickPixelThresh')) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 1227);
this._dragThreshMet = true;
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 1228);
this.start();
                    //This only happens on gestures to stop the page from scrolling
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 1230);
if (ev && ev.preventDefault) {
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 1231);
ev.preventDefault();
                    }
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 1233);
this._alignNode([ev.pageX, ev.pageY]);
                }
            } else {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1236);
if (this._clickTimeout) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 1237);
this._clickTimeout.cancel();
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1239);
this._alignNode([ev.pageX, ev.pageY]);
            }
        },
        /**
        * Method will forcefully stop a drag operation. For example calling this from inside an ESC keypress handler will stop this drag.
        * @method stopDrag
        * @return {Self}
        * @chainable
        */
        stopDrag: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "stopDrag", 1248);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1249);
if (this.get(DRAGGING)) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1250);
DDM._end();
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1252);
return this;
        },
        /**
        * Lifecycle destructor, unreg the drag from the DDM and remove listeners
        * @private
        * @method destructor
        */
        destructor: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "destructor", 1259);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1260);
this._unprep();
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1261);
if (this.target) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1262);
this.target.destroy();
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1264);
DDM._unregDrag(this);
        }
    });
    _yuitest_coverline("build/dd-drag/dd-drag.js", 1267);
Y.namespace('DD');
    _yuitest_coverline("build/dd-drag/dd-drag.js", 1268);
Y.DD.Drag = Drag;




}, '@VERSION@', {"requires": ["dd-ddm-base"]});
