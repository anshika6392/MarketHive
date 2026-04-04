interface Drawable {
    void draw();
}

interface Resizable {
    void resize(int factor);
}

class Square implements Drawable, Resizable {
    int side = 5;
    public void draw() {
        System.out.println("Drawing Square with side = " + side);
    }
    public void resize(int factor) {
        side *= factor;
        System.out.println("Resized side = " + side);
    }
}

public class draw {
    public static void main(String[] args) {
        Square sq = new Square();
        sq.draw();
        sq.resize(3);
        sq.draw();
    }
}
