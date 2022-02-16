export class SoundNode {
  constructor(
    private width: number,
    private height: number,
    private x = 0,

    private center: number = 0,
    private color: string | CanvasGradient | CanvasPattern = '#000'
  ) {}

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      throw new Error('Must have canvas2dContext to draw!');
    }

    context.fillRect(
      this.x,
      this.center - this.height,
      this.width,
      this.height
    );
    context.fillRect(this.x, this.center, this.width, this.height);
    context.fillStyle = this.color;
  }
}
