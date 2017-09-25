class ScratchCard extends Global {
    constructor (options) {
        super();

        this.style = options.style;
        this.awardBackgroundImage = options.awardBackgroundImage;

        this.eraserSize = options.eraserSize || 15;
        this.coverColor = options.coverColor || '#b5b5b5';

        this._dragging = false;
        
        this.ratio = options.ratio || .8;
        this.callback = options.callback || null;
        this.isMobile = options.isMobile || false;
    };

    /**
     * 绘制刮涂层
     * @param {Obj} context 
     */
    drawCover(context) {
        context.save();
        context.fillStyle = this.coverColor;
        context.beginPath();
        context.rect(0, 0, context.canvas.width, context.canvas.height);
        context.fill();
        context.restore();
    };

    /**
     * 绘制刮涂层
     * @param {Obj} context 
     */
    drawIcon(context) {
        context.save();
        context.fillStyle = '#ffff00';
        context.beginPath();
        context.moveTo(100, 200);
        context.lineTo(350, 200);
        context.bezierCurveTo(400, 200, 400, 100, 350, 100);
        context.bezierCurveTo(350, 20, 220, 20, 210, 80);
        context.bezierCurveTo(210, 80, 150, 50, 120, 120);
        context.bezierCurveTo(120, 120, 50, 140,100, 200);
        context.fill();
        context.restore();
    };

    /**
     * 绘制橡皮擦
     * @param {Obj} context 
     * @param {Obj} loc 
     */
    drawEraser(context, loc, isMobile) {
        context.save();
        context.beginPath();
        if (isMobile) {
            context.arc(loc.x*2, loc.y*2, this.eraserSize*2, 0, Math.PI * 2, false);
        } else {
            context.arc(loc.x, loc.y, this.eraserSize, 0, Math.PI * 2, false);
        }
        context.clip();
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();
    };

    drawAwardBackgroundImage(canvas) {
        canvas.setAttribute(
            'style', 
            `background: url(${this.awardBackgroundImage}) no-repeat center / cover;${this.style}`
        )
    }

    calcArea(context, callback, ratio) {
        var pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
        var transPixels = [];
        this._forEach(pixels.data, function(item, i) {
            var pixel = pixels.data[i + 3];
            if (pixel === 0) {
                transPixels.push(pixel);
            }
        });
        if (transPixels.length / pixels.data.length > ratio) {
            callback && typeof callback === 'function' && callback();
        }
    }

    _forEach(items, callback) {
        return Array.prototype.forEach.call(items, function(item, idx) {
            callback(item, idx);
        });
    }

    render(canvas, context) {
        // this.drawCover(context);
        // this.drawIcon(context);
        this.drawAwardBackgroundImage(canvas);

        ['touchstart', 'mousedown'].forEach((event) => {
            canvas.addEventListener(event, (e) => {
                let loc = super.windowToCanvas(canvas, e);
                this._dragging = true;
                this.drawEraser(context, loc, this.isMobile);
            })
        });

        ['touchmove', 'mousemove'].forEach((event) => {
            canvas.addEventListener(event, (e) => {
                let loc;
                if (this._dragging) {
                    loc = super.windowToCanvas(canvas, e);
                    this.drawEraser(context, loc, this.isMobile);
                }
            })
        });


        ['touchend', 'mouseup'].forEach((event) => {
            canvas.addEventListener(event, (e) => {
                this._dragging = false;
                if (this.callback && typeof this.callback === 'function') {
                    this.calcArea.call(this, context, this.callback, this.ratio);
                }
            })
        });
    }
}