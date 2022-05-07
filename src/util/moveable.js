export class MovementManager {
    constructor(root) {
        this.root = root
        this.moveables = []
        this.current = null
        this.bind(this.root)
    }
    bindMoveable(window) {
        window.addEventListener('mousedown',
            event => this.setTarget(event) )
        window.addEventListener('mouseup', 
            () => this.setTarget(null) )
    }
    setTarget(event) {
        this.current = null
        if(event == null) return
        for(var el of event.composedPath()) {
            if(el.classList?.value.includes("process")) {
                el.classList.remove("fullscreen")
                this.current = el
                break
            }
        }

        const { height, width, left, top } = el.getBoundingClientRect()
        this.current.height = height
        this.current.width = width
        this.current.x = left
        this.current.y = top
    }
    bind() {
        this.root.addEventListener('mousemove', event => {
            if(this.current == null || event.buttons == 0) return

            var canMove = false
            var canResize = false
            for(const part of event.composedPath()) {
                const classes = part.classList?.value || ""
                if(classes.includes('can-move')) canMove = true
                if(classes.includes('can-resize')) canResize = true
            }
            if(canMove) {
                this.current.x += event.movementX
                this.current.y += event.movementY
            }
            if(canResize) {
                this.current.width += event.movementX
                this.current.height += event.movementY
            }

            this.current.style = `width: ${this.current.width}px; height: ${this.current.height}px; top: ${this.current.y}px; left: ${this.current.x}px; z-index: ${Date.now() % 10000000}`
        })
    }
    
}